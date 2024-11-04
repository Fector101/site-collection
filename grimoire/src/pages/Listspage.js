import { Link } from "react-router-dom";

export default function Listspage({text}){
    return (
        <>
            <p>{text}</p>
            <Link to="/lists/movie1">List 1</Link>
            <Link to="/lists/movie2">List 2</Link>
            <Link to="/lists/Testing Space and caps"> Testing Space and caps </Link>
            <Link to="/lists/new-list">Create Movie</Link>
        </>
    )
}