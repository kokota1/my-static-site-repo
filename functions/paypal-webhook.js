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
  
      // ここでデータベースの更新やメール通知を行います
      console.log(`Sale completed: ${saleId} for ${amount}`);
  
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
  