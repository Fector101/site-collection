import { useOutletContext } from "react-router-dom"

export default function CreateListpage(){
    const obj = useOutletContext()
    return (
        <>
        <p>{obj.user_name}</p>
         <p>Create some shit</p>
        </>
    )
}