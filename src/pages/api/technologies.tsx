import { gql, GraphQLClient } from 'graphql-request'

const createMutation = gql`
mutation AddTechnology($data:TechnologyInsertInput!) {
    insertOneTechnology(data:$data) {
    _id
  }
}
`

async function handler(req, res) {
    if (req.method === "POST") {
        try {

            const client = new GraphQLClient(process.env.GRAPHQL_API, { headers: { apiKey: process.env.GRAPHQL_API_KEY } })

            client.request(createMutation, { data: req.body })
                .then(async data => {
                    console.log('data returned:', data)
                    res.json(data)
                }).
                catch(err => {
                    console.log(err)
                    res.status(500).end()
                })

        }
        catch (e) {
            console.log(e)
            res.status(500).end()
        }
    }
    else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

export default handler