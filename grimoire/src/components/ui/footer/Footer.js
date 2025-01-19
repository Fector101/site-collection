import { Link } from "react-router-dom";
import ImgwithPL from "./../../js/ImgwithPL";
import './footer.css'
import logo_src from "../../imgs/logo.png"
export default function Footer(){
    return(
        <div className="footer flex">
            <img className="logo" src={logo_src} alt="logo" />
            <div className="basic">
                <Link to='lists'>Lists</Link>
                <Link to='lists'>Help</Link>
                <Link to='lists'>Chat</Link>
            </div>
            <div className="site-sections">
                <Link to="trending">Trending</Link>
                <Link to="top">Top</Link>
                <Link to="ongoing">Ongoing</Link>
                <Link to="upcoming">Upcoming</Link>
            </div>
            <div className="company-sections">
                <Link>About</Link>
                <Link>Contact Us</Link>
                <Link>Terms of Service</Link>
                <Link>Hire</Link>
            </div>
            <div className="contant-handlers">
                <Link>Twitter</Link>
                <Link>Email</Link>
            </div>
        </div>
    )
}
// how to add th in linux mint time