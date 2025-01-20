import { Link } from "react-router-dom";
import ImgwithPL from "./../../js/ImgwithPL";
import './footer.css'
import logo_src from "../../imgs/logo.png"
import { toTitleCase } from "../../js/helper";
function Row({header,links,className}){
    

    return(
        <div className={className}>
            <p>{header}</p>
            {
                links.map(({url,name_})=>{
                    let link_name = toTitleCase(name_ || url)
                    
                    return <Link to={url}>{link_name}</Link>
                })
            }
        </div>
    )
}
export default function Footer(){
    return(
        <div className="footer flex">
            {/* <img className="logo" src={logo_src} alt="logo" /> */}
            <Row className="basic" header="Grimorie" links={[{name_:"Lists",url:'lists'},{name_:'Help',url:'help'},{name_:"Chat",url:'chat'}]}/>
            <Row className="site-sections" header='Categories' links={[{url:'trending'},{url:'top'},{url:'ongoning'},{url:'upcoming'}]} />
            <Row className="company-sections" header="Company" links={[{url:'about'},{url:'contant-us'},{url:'terms', name_:'Terms of Service'},{url:'hire'}]} />
            <Row className="contant-handlers" header='' links={[{url:'twitter'},{url:'email'}]} />
        </div>
    )
}
// how to add th in linux mint time