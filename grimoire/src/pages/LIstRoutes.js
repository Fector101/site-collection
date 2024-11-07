import { Route, Routes } from "react-router-dom"
import Listspage from "./Listspage"
import CreateListpage from "./CreateListpage"
import Listpage from "./Listpage"
// import HeaderSticky from "../components/js/HeaderSticky"

export default function ListRoutes(){
    return (
        <Routes>
            <Route>
                <Route index  element={ <Listspage text='Frm App Component to Route'/> } />
                <Route path=":list_name" element={ <Listpage text='Frm App Component to Route'/> }/>
                <Route path="new-list" element={ <CreateListpage text='Frm App Component to Route'/> }/>
            </Route>
        </Routes >
    )
}

// <Routes>
// <Route element={<HeaderSticky />}>
//     <Route index  element={ <Listspage text='Frm App Component to Route'/> } />
//     <Route path=":list_name" element={ <Listpage text='Frm App Component to Route'/> }/>
//     <Route path="new-list" element={ <CreateListpage text='Frm App Component to Route'/> }/>
// </Route>
// </Routes >