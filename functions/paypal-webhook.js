// functions/paypal-webhook.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body);

  // イベントタイプを確認
  if (body.event_type === 'PAYMENT.SALE.COMPLETED' || body.event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
    // 支払い成功時の処理
    const sale = body.resource;
    const saleId = sale.id;
    const amount = sale.amount ? sale.amount.total : 'N/A'; // サブスクリプションの場合、amountがないかもしれません

    // 任意のURLにリダイレクト
    const redirectUrl = 'https://www.yahoo.co.jp/'; // 任意のURLを指定

    // リダイレクトを実行
    await fetch(redirectUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success' })
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ status: 'error', message: 'Unsupported event type' })
  };
};
