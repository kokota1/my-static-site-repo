exports.handler = async (event, context) => {
    console.log('Test Webhook received:', event);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'Test webhook received successfully!' })
    };
  };
  