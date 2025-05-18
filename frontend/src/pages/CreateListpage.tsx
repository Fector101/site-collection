import { useOutletContext } from "react-router"

export default function CreateListpage({text}:{text:string}){
    const obj = useOutletContext()
    console.log(obj,text)
    return (
        <>
        {/* <p>{obj?.user_name}</p> */}
         <p>Create some shit</p>
        </>
    )
}