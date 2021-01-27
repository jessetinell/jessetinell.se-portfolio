import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import LandingLayout from '@/layouts/landing-page-layout'

const Hero = styled.div`
  height:100%;
  min-height: 500px;
  min-height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const HeroContainer = styled.div`
padding-top:5em;
padding-bottom:5em;
`
const H1 = styled.h1`
font-size:3.4em;
margin:0 0 .8em;

@media (max-width: 768px){
  font-size:3.2em;
}
@media (max-width: 380px){
  font-size:2.8em;
}
`

const Since = styled.small`
font-size:1em;
`
const PortfolioLink = styled.div`
margin-bottom:2em;

h2:hover{
    text-decoration: underline;
}
&:last-of-type{
  margin-bottom:0;
}
`
const WorkTitle = styled.h2`
 margin:0;
 font-size:1.6em;
 font-weight:700;
`

const Chevron = styled.svg`
width:.4em;
margin-left:.4em;
opacity:.5;
`
const MeImg = styled.img`
    border: 7px solid #1d2142;
    border-radius: 50%;
    width: 200px;

  @media (max-width: 768px){
    width: 170px;
}
`

function Home({ }) {
  return <>
    <Head>
      <title>Jesse Tinell | Fullstack Developer & Growth Hacker</title>
    </Head>
    <Hero>
      <HeroContainer className="container">
        <MeImg src={"/img/jesse.png"} />
        <H1>Jesse Tinell</H1>
        <PortfolioLink>
          <Link href="/fullstack-developer">
            <a>
              <WorkTitle>
                Fullstack Developer
                <Chevron xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M367.954 213.588L160.67 5.872c-7.804-7.819-20.467-7.831-28.284-.029-7.819 7.802-7.832 20.465-.03 28.284l207.299 207.731c7.798 7.798 7.798 20.486-.015 28.299L132.356 477.873c-7.802 7.819-7.789 20.482.03 28.284 3.903 3.896 9.016 5.843 14.127 5.843 5.125 0 10.25-1.958 14.157-5.873l207.269-207.701c23.394-23.394 23.394-61.459.015-84.838z" /></Chevron>
              </WorkTitle>
            </a>
          </Link>
          <Since className="light-text">
            Since 2009
        </Since>
        </PortfolioLink>

        <PortfolioLink>
          <Link href="/growth-hacker">
            <a>
              <WorkTitle>
                Growth Hacker
          <Chevron xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M367.954 213.588L160.67 5.872c-7.804-7.819-20.467-7.831-28.284-.029-7.819 7.802-7.832 20.465-.03 28.284l207.299 207.731c7.798 7.798 7.798 20.486-.015 28.299L132.356 477.873c-7.802 7.819-7.789 20.482.03 28.284 3.903 3.896 9.016 5.843 14.127 5.843 5.125 0 10.25-1.958 14.157-5.873l207.269-207.701c23.394-23.394 23.394-61.459.015-84.838z" /></Chevron>
              </WorkTitle>
            </a>
          </Link>
          <Since className="light-text">Since 2015</Since>
        </PortfolioLink>
      </HeroContainer>
    </Hero>
  </>
}

Home.Layout = LandingLayout;
Home.FixedHeader = true;
Home.LeanLogo = true;

export default Home;