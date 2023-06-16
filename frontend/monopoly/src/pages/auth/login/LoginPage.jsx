import { Link } from "react-router-dom";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import './login.css'

const LoginPage = () => {

    return (
        <div className="wrapper">
            <div className="wrapper__inner">
                <Header/>
                {/* <p>Login Page</p>
                <Link to="/">
                    Главная
                </Link> */}
            </div>
        </div>
    )
}
export default LoginPage;