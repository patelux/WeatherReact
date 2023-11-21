
import Header from '../components/Header';
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Default() {
    return (
        <>
            <Header />           
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}