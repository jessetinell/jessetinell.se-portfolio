import { gql, GraphQLClient } from 'graphql-request'

const createMutation = gql`
mutation AddProject($data:ProjectInsertInput!) {
    insertOneProject(data:$data) {
    _id
  }
}
`

const updateMutation = gql`
mutation UpdateProject($id: ObjectId,$data:ProjectUpdateInput!) {
    updateOneProject(query:{_id:$id}, set:$data) {
    _id
  }
}
`

async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let project_id = req.body._id;
            let is_update = false;

            if (project_id) {
                is_update = true;
            }

            let mutation = is_update ? updateMutation : createMutation;

            let body = req.body;

            body.technologies = { "link": body.technologies ? body.technologies.split(',') : [] }

            if (!is_update) {
                delete body._id;
                delete body._id;
            }

            const client = new GraphQLClient(process.env.GRAPHQL_API, { headers: { apiKey: process.env.GRAPHQL_API_KEY } })

            let data = await client.request(mutation, { id: project_id ? project_id : null, data: body })

            res.json(data)

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
