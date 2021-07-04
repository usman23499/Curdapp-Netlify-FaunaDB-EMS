var faunadb = require('faunadb'),
  q = faunadb.query;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event,contex) => {

    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

  try {

  

    const DataFromClient=JSON.parse(event.body)
    var adminClient = new faunadb.Client({ secret: 'fnAEEtdjlzACDYp6TxC0Nq5KbI6I6ui8F92TncPl' });
      const result= await adminClient.query(

      q.Create(
            q.Collection('message'),
            { data: { name: DataFromClient.name ,id:DataFromClient.id,salary:DataFromClient.salary} },
           )

    )

    // const subject = event.queryStringParameters.name || 'World'
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result.ref.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

