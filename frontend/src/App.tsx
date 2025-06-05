import { useContext } from "react"
import { Route, Routes } from "react-router";
import { UserContext } from "./assets/js/UserContextInstance";

import './assets/css/quick-style.css'
import './assets/css/app.css'

// components
import Header from "./ui/header/Header.tsx";
import Footer from "./ui/footer/Footer.tsx";

// routes
import ListRoutes from "./pages/ListRoutes.tsx";

// pages
import SignupPage from "./pages/SignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import MoviePage from "./pages/MoviePage.tsx";
import ForgotPSPage from "./pages/ForgotPSPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

// responsive fixes
import "./assets/css/responsive.css"


// markup data
import { top_movies_data } from "./assets/js/api_data.tsx";
import AddToList from "./ui/popups/AddToList.tsx";



function App() {
    const data = top_movies_data.results.map(movie => ({
        ...movie,
        rated: "PG",
        secs: 6000
    }))
    const context = useContext(UserContext);

    return (
        <>
            <Header />
            {context?.add_to_list_modal_data.state && <AddToList item_name={context.add_to_list_modal_data.item_name} itemId={context.add_to_list_modal_data.itemId} />}

            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage top_movies_data={data} />} />
                <Route path="/movie" element={<MoviePage />} />
                <Route path="/forgot-ps" element={<ForgotPSPage />} />
                <Route path="/lists/*" element={<ListRoutes />} />
                <Route path="*" element={<NotFoundPage redirect_path='/' timeout_secs={5} />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
