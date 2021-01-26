import Link from 'next/link'
import SocialIcons from "@/components/SocialIcons"

export default function Footer() {
    return <>
        <footer>

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Contact</h3>
                        <a href="https://www.linkedin.com/in/jessetinell" target="_blank">Send a message on LinkedIn</a>

                        <SocialIcons className="footer__social-icons" darkMode={true} />

                    </div>

                    <div className="col-sm-12 footer__right">
                        {/* <div className="footer__icon-container">
                            <p className="footer__powered-by">Powered by <a href="/">Reverify</a></p>
                        </div> */}

                    </div>
                </div>

                <div className="footer_divider"></div>
            </div>

            <div className="footer__bottom">
                <div className="container text-center">
                    {/* <ul>
                        <li>
                            <a href="https://nadareklamo.se/villkor/" target="_blank">
                                Terms
                            </a>
                        </li>
                        <li>
                            <a href="https://nadareklamo.se/privacy/" target="_blank">
                                Privacy policy
                            </a>
                        </li>
                    </ul> */}
                    <p>©{new Date().getFullYear()} - All rights reserved</p>

                </div>
            </div>


        </footer>
    </>

}