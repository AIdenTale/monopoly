import { Link } from "react-router-dom";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer"
import './login.scss'
import { useRef } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

const LoginPage = () => {

    const register__form = useRef();

    const send_register = (e) => {
        e.preventDefault();
        
        const username = encodeURIComponent(register__form.current.username.value);
        const password = encodeURIComponent(register__form.current.password.value);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers"
        
        axios.post('http://127.0.0.1:8000/v1/login/' , {
            'username' : username,
            'password': password
        }).then((response) => {
            const data = response.data
            if(data.status == 'success'){
                window.location.replace(window.origin)
            }
        })

        

    }

    return (
        <div className="wrapper">
            <Header/>
            <div className="login__block">
                <div className="login__title">
                    <p>Вход</p>
                </div>
                <form ref={register__form} className="login__form">
                    <div className="login__form__input">
                        <label>Никнейм</label>
                        <input name="username" type="text"/>
                    </div>
                    <div className="login__form__input">
                        <label>Пароль</label>
                        <input name="password" type="password"/>
                    </div>
                    <div className="login__form__button">
                        <button onClick={send_register}>Вход</button>
                    </div>
                    <Link className="login__form__link" to="/register">
                        Регистрация
                    </Link>
                </form>
            </div>
            {/* <Footer/> */}
        </div>
    )
}
export default LoginPage;