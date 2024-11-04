import { useParams } from "react-router-dom";

export default function NotFoundpage(){
    const {'*':url_extension} = useParams()
    return(
        <p> {url_extension} does not exist, It a lie </p>
    )
}