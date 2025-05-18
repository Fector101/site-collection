
export function CarouselBtn({ text, icon, class_ }:{ text:string, icon:React.ReactNode, class_:string }) {

    return (
        <button className={class_} tabIndex={-1}>
            {icon}
            <p>{text}</p>
        </button>
    )
}