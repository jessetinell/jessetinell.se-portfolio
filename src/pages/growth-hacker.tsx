import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import { Content } from '@/styled-components'


const HeroContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
h1,p{
  margin:0;
}
`
const VideoContainer = styled.div`
border-radius:50%;
overflow:hidden;

video{
  object-fit: cover;
  width: 9em;
  height: 9em;
}
`

const H1Sub = styled.div`
  font-size:.4em;
  font-weight:400;
`

function Home({ }) {
  return <>
    <Head>
      <title>Growth Hacker in Stockholm, Sweden</title>
    </Head>
    <div>
      <div className="container">
        <HeroContainer>
          <div>
            <h1>Portfolio & Cases
            <H1Sub className="light-text">
                As a Growth Hacker 🚀
              </H1Sub>
            </h1>
          </div>

          <div>

          </div>
        </HeroContainer>
        <br />
        <Content>
          <p>Hey! 👋
            <br />
            <br />
            I'm writing content for this page at this very moment.
            <br />
            <br />
            Will launch very very soon.
            <br />
            <br />
            <span className="box-light-text">
              Hint: Content will be mostly about growth-loops, rapid experimentation, customer journeys, and data.
              Only from real-world experiences from the projects in my
            <Link href="/fullstack-developer">
                <a> <u> Developer portfolio</u> ›</a>
              </Link>
            </span>
          </p>
          <br />
          <small>// Jesse (January 2021)</small>
        </Content>
      </div>
    </div>
  </>
}



export default Home;