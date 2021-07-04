/* Import faunaDB sdk */


const { query, Client } = require('faunadb')

const client = new Client({
  secret:'fnAEEtdjlzACDYp6TxC0Nq5KbI6I6ui8F92TncPl',
})

const handler = async (event) => {
  const { id } = JSON.parse(event.body)
  console.log(`Function 'delete' invoked. delete id: ${id}`)
  try {
    const response = await client.query(query.Delete(query.Ref(query.Collection('message'), id)))
    console.log('success', response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
