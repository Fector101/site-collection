import { Eye } from "lucide-react"


export function InputCom({title,type,placeholder}:{title:string,type:string,placeholder:string}){
    return (
        // TODO If para undefined throw error
        <>
            <label htmlFor={type}> {title} </label>
            <input required id={type} placeholder={placeholder} />
        </>
    )
}

export function PasswordInput({title,placeholder}:{title:string,placeholder:string}){
    return(
        <>
            <label htmlFor='password'> {title} </label>
            <div className="form-password-input-container">
                <input required className="form-input" type="password" id="password" placeholder={placeholder} />
                <button className="flex"> <Eye /> </button>
            </div>
        
        </>
    )
}