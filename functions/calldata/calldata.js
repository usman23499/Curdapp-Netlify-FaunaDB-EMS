const { query, Client } = require('faunadb')

const client = new Client({
  secret: 'fnAEEtdjlzACDYp6TxC0Nq5KbI6I6ui8F92TncPl',
})

const handler = async () => {
  console.log('Function `read-all` invoked')

  try {
    const response = await client.query(query.Paginate(query.Documents(query.Collection('message'))))
    const itemRefs = response.data
    // create new query out of item refs. http://bit.ly/2LG3MLg
    const getAllItemsDataQuery = itemRefs.map((ref) => query.Get(ref))
    // then query the refs
    const ret = await client.query(getAllItemsDataQuery)
    
    return {
      statusCode: 200,
      body: JSON.stringify(ret),
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


// /* Import faunaDB sdk */
// const process = require('process')

// const { query, Client } = require('faunadb')

// const client = new Client({
//   secret: 'fnAEEtdjlzACDYp6TxC0Nq5KbI6I6ui8F92TncPl',
// })

// const handler = async (event) => {
//   // const { id } = event
//   // console.log(`Function 'read' invoked. Read id: ${id}`)

//   try {
//     const response = await client.query(query.Get(query.Ref(query.Collection('message'), '303104879229927947')))
//     console.log('success', response)
//     return {
//       statusCode: 200,
//       body: JSON.stringify(response),
//     }
//   } catch (error) {
//     console.log('error', error)
//     return {
//       statusCode: 400,
//       body: JSON.stringify(error),
//     }
//   }
// }

// module.exports = { handler }
