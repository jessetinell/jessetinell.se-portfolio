import { gql, GraphQLClient } from 'graphql-request'

// Not an optimal function since using Graphql but whatever. Personal site :)
export function GetProjectById(item_id) {
    return new Promise((resolve, reject) => {

        if (!item_id)
            return resolve(null)

        const queryByPlatformItemId = gql`
        query getProject($id: ObjectId!) {
          project(query:{_id: $id}) {
              _id
              name
              year_from
              year_to
              role
              type
              url
              short_description
              technologies{
                  _id
                  name
                  weight
              }
          }
        }
      `

        const client = new GraphQLClient(process.env.GRAPHQL_API, { headers: { apiKey: process.env.GRAPHQL_API_KEY } })

        client.request(queryByPlatformItemId, { id: item_id })
            .then(async data => {
                if (data && data.project && data.project._id)
                    return resolve(data.project)

                return resolve(null)
            }).
            catch(err => {
                console.log(err)
                return reject(err)
            })
    })
}