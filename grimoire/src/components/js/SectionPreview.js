import "./../css/SectionPreview.css"
function Card(){
    return (
        <div className="card">
            
        </div>
    )
}
export default function SectionPreview({title, icon}){
    return (
        <section className="SectionPreview">
            <div className="header">
                {icon && icon}
                <h3>{title}</h3>
            </div>
            <ol className="collection">
                
            </ol>
        </section>
    )
}