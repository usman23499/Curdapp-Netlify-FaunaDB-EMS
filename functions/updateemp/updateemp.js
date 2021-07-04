/* Import faunaDB sdk */

const { query, Client } = require('faunadb')

const client = new Client({
  secret: 'fnAEEtdjlzACDYp6TxC0Nq5KbI6I6ui8F92TncPl',
})

const handler = async (event) => {
  const data = JSON.parse(event.body)
  const { keys } = JSON.parse(event.body)
  console.log(`Function 'update' invoked. update id: ${keys}`)
  
  try {
    const response = await client.query(query.Update(query.Ref(query.Collection('message'), keys), { data: { name: data.name ,id:data.id,salary:data.salary}}))
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
