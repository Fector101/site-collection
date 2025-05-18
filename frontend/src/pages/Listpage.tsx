import { useParams,useOutletContext } from "react-router"

export default function Listpage({text}:{text:string}){
    const {list_name} = useParams()
    const obj = useOutletContext()
    console.log(obj,text)
    return (
        <>
            {/* <p>{obj?.user_name}</p> */}
            <p>{list_name} List</p>
        </>
    )
}