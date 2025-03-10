const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  console.log('Webhook received:', event);

  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed');
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  console.log('Parsing body...');
  const body = JSON.parse(event.body);
  console.log('Parsed body:', body);

  // イベントタイプを確認
  if (body.event_type === 'PAYMENT.SALE.COMPLETED' || body.event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
    console.log('Processing event:', body.event_type);

    // 支払い成功時の処理
    const sale = body.resource;
    const saleId = sale.id;
    const amount = sale.amount ? sale.amount.total : 'N/A';

    console.log('Sale completed:', saleId, 'Amount:', amount);

    // 任意のURLにリダイレクト（変更点）
    const redirectUrl = 'https://www.yahoo.co.jp/';
    console.log('Redirecting to:', redirectUrl);

    // リダイレクトを実行
    await fetch(redirectUrl);
    console.log('Redirect executed');

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success' })
    };
  }

  console.log('Unsupported event type:', body.event_type);
  return {
    statusCode: 400,
    body: JSON.stringify({ status: 'error', message: 'Unsupported event type' })
  };
};
