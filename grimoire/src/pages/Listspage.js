import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom"

export default function Listspage({text}){
    const obj = useOutletContext()
    // console.log(obj.foxxy())
    return (
        <>
            <p>{obj?.user_name}</p>
            <p>{text}</p>
            {/* 'replace' Keyword means we're Removing current page from links visted (i.e We can't come back to the page with the link about to be clicked)
            <Link to="/lists/movie1" replace>List 1</Link> */}
            <Link to="/lists/movie1">List 1</Link>
            <Link to="/lists/movie2">List 2</Link>
            <Link to="/lists/Testing Space and caps"> Testing Space and caps </Link>
            <Link to="/lists/new-list">Create Movie</Link>
        </>
    )
}