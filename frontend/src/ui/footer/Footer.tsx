import { Link } from "react-router";
// import ImgwithPL from "./../../js/ImgwithPL";
import './footer.css'
// import logo_src from "../../imgs/logo.png"
import { toTitleCase } from "../../assets/js/helper";
import { ILinks } from "../../assets/js/myTypes";
function Row({ header, links, className }: { header: string, links: ILinks[], className: string }) {
    return (
        <div className={className}>
            <p>{header}</p>
            {
                links.map(({ url, name }) => {
                    const link_name = toTitleCase(name || url)

                    return <Link key={link_name} to={url}>{link_name}</Link>
                })
            }
        </div>
    )
}
export default function Footer() {
    return (
        <footer className="footer flex">
            {/* <img className="logo" src={logo_src} alt="logo" /> */}
            <Row className="basic" header="Grimorie" links={[{ name: "Home", url: '/' }, { name: "Lists", url: 'lists' }, { name: 'Help', url: 'help' }, { name: "Chat", url: 'chat' }]} />
            <Row className="site-sections" header='Categories' links={[{ url: 'trending' }, { url: 'top' }, { url: 'ongoning' }, { url: 'upcoming' }]} />
            {/* <Row className="company-sections" header="Company" links={[{ url: 'about' }, { url: 'contant-us' }, { url: 'terms', name: 'Terms of Service' }, { url: 'hire' }]} /> */}
            <Row className="contant-handlers" header='Contact Me' links={[{ url: 'twitter' }, { url: 'email' }, { url: 'whatsapp' }]} />
        </footer>
    )
}