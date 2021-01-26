import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

async function handler(req, res) {
    if (req.method === "GET") {
        try {

            const client = new ApolloClient({
                uri: process.env.GRAPHQL_API,
                headers: {
                    'apiKey': process.env.GRAPHQL_API_KEY
                },
                cache: new InMemoryCache()
            });

            const { data } = await client.query({
                query: gql`
                    query GetProjects{
                    projects(sortBy:NAME_ASC) {
                        _id
                        name
                        url
                        short_description
                        technologies{
                        name
                        weight
                        }
                        year_from
                        year_to
                        role
                    }
                    }
    `
            });

            let projects = data.projects ? JSON.parse(JSON.stringify(data.projects)) : [];

            // Mongo + Realm = Can't sort sub-documents
            projects.forEach(project => {
                project.technologies = project.technologies.sort((a, b) => { return b['weight'] - a['weight'] })
            })

            // Mongo + Realm = Does not sort case insensitively.
            projects = projects.sort((a, b) => {
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            })

            return res.json(projects)

        }
        catch (e) {
            console.log(e)
            res.status(500).end()
        }
    }
    else {
        res.setHeader("Allow", "GET");
        res.status(405).end("Method Not Allowed");
    }
}

export default handler
