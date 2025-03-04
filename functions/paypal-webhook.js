// functions/paypal-webhook.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body);

  // イベントタイプを確認
  if (body.event_type === 'PAYMENT.SALE.COMPLETED') {
    // 支払い成功時の処理
    const sale = body.resource;
    const saleId = sale.id;
    const amount = sale.amount.total;

    // 任意のURLにリダイレクト
    const redirectUrl = 'https://www.yahoo.co.jp/'; // 任意のURLを指定
    
    // リダイレクトレスポンスを返す
    return {
      statusCode: 302,
      headers: {
        Location: redirectUrl
      },
      body: JSON.stringify({ status: 'success' })
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ status: 'error', message: 'Unsupported event type' })
  };
};
