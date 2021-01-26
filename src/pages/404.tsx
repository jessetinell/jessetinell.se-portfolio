import Link from 'next/link'

function Home({ }) {
  return <>
    <div className="container text-center">
      <h1>404 - Page not found</h1>
      <br />
      <Link href="/"><a><u>Go to the startpage</u></a></Link>
    </div>
  </>
}

export default Home;