import { useEffect } from "react";
// import { useLocation } from "react-router";


export default function GoToTop() {
    // const routePath = useLocation();
    // useEffect(onTop, [routePath]);
    const onTop = () => window.scrollTo(0, 0);
    useEffect(onTop, []);
    return null;
}
