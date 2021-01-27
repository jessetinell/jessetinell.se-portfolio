import { useEffect, useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styled from 'styled-components'

import { Content } from '@/styled-components'
import ProjectsTable from '@/components/ProjectsTable'

const HeroContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
h1,p{
  margin:0;
}
`
const VideoContainer = styled.div`
border-radius:10px;
overflow:hidden;

video{
  object-fit: cover;
  width: 16em;
  height: 9em;
}

  @media (max-width: 768px){
    border-radius:50%;
  video{
    width: 6em;
height: 6em;
  }
  }
`

const H1Sub = styled.div`
  font-size:.4em;
  font-weight:400;
`

const MobileWarning = styled.div`
padding: 0.5em;
    background: #686c86;
    border-radius: 8px;
margin-bottom:1em;
@media (min-width: 500px){
  display:none;
}
`
function Home({ }) {
  const [projects, setProjects] = useState([])
  useEffect(() => {

    function getProjects() {
      // Todo - error handling
      axios.get('/api/portfolios')
        .then(response => {
          if (response.status === 200) {
            setProjects(response.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

    getProjects()

  }, [])

  return <>
    <Head>
      <title>Fullstack Developer in Stockholm, Sweden</title>
    </Head>
    <div className="container">
      <HeroContainer>
        <div>
          <h1>
            Portfolio
              <H1Sub className="light-text">
              As a fullstack Developer
              </H1Sub>
          </h1>
        </div>

        <div>
          <VideoContainer>
            <video autoPlay muted loop playsInline>
              <source src="/videos/codin.mp4" type="video/mp4" />
            </video>
          </VideoContainer>
        </div>
      </HeroContainer>
      <br />
      <Content>
        <MobileWarning>The table is not optimized for mobile. Scroll right/left 👇 🙃</MobileWarning>
        <ProjectsTable projects={projects} />
      </Content>
    </div>
  </>
}



export default Home;