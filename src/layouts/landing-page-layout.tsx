import Header from '@/components/layouts/Header'
import Footer from './components/Footer'

export default function Layout({ children, FixedHeader, LeanLogo }) {
    return (
        <>
            <Header FixedHeader={FixedHeader} LeanLogo={LeanLogo} />
            {children}
            <Footer />
        </>
    )
}