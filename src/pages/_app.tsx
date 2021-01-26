import DefaultLayout from '../layouts/content-page-layout'

import '../styles/css/_bundles.scss'

function Jesse({ Component, pageProps }) {

  const Layout = Component.Layout ? Component.Layout : DefaultLayout;

  return (
    <Layout FixedHeader={Component.FixedHeader} LeanLogo={Component.LeanLogo}>
      <Component {...pageProps} />
    </Layout>

  )
}

export default Jesse;