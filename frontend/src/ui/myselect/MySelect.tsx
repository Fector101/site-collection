import { ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function MySelect({ options=[''] }: { options: string[] }) {
    const [open_state, setOpenState] = useState<boolean>(false)
    // const [selected, setSelected] = useState<string>(options[0])
    useEffect(()=>{
        setOpenState(false)
    },[])
    return (
        <div>
            <div className="head flex">
                <p>{options[0]}</p>
                {open_state ? <ChevronUp /> : <ChevronDown />}
            </div>
            {/* <ol>
                {options.map(each=><li className={each==selected?'active':''}>{each}</li>)}
            </ol> */}
        </div>
    )
}