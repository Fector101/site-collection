import { Link } from "react-router";
import '../assets/css/list-page.css'
export default function ListsPage({text}:{text:string}){
    return (
        <div className="list-page margin-auto flex-page">
            <p>{text}</p>
            {/* 'replace' Keyword means we're Removing current page from links visted (i.e We can't come back to the page with the link about to be clicked)
            <Link to="/lists/movie1" replace>List 1</Link> */}
            <Link to="/lists/movie1">List 1</Link>
            <Link to="/lists/movie2">List 2</Link>
            <Link to="/lists/Testing Space and caps"> Testing Space and caps </Link>
            <Link to="/lists/new-list">Create Movie</Link>
        </div>
    )
}