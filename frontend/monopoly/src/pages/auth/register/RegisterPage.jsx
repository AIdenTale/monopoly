import { Link } from "react-router-dom";
import './register.scss';
import Header from "../../../components/Header/Header";
import { useRef } from "react";
import axios from "axios";

const RegisterPage = () => {

    const form = useRef()

    const send_register = (e) =>{
        e.preventDefault()

        const email = encodeURIComponent(form.current.email.value);
        const password = encodeURIComponent(form.current.password.value);
        const username = encodeURIComponent(form.current.username.value);

        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers"
        
        axios.post('http://127.0.0.1:8000/v1/register/' , {
            'email' : email,
            'password': password,
            'username' : username
        }).then((response) => {
            const data = response.data
            if(data.status == 'success'){
                window.location.replace(window.origin)
            }
        })
    }

    return (
        <div className="register__block">
            <Header/>
            <div className="register__form__block">
                <div className="register__title">
                    <p>регистрация</p>
                </div>
                <form ref={form} className="register__form">
                    <div className="register__form__input">
                        <label>Электронная почта</label>
                        <input name='email'/>
                    </div>
                    <div className="register__form__input">
                        <label>Пароль</label>
                        <input name='password' type="password"/>
                    </div>
                    <div className="register__form__input">
                        <label>Повторите пароль</label>
                        <input/>
                    </div>
                    <div className="register__form__input">
                        <label>Никнейм</label>
                        <input name="username"/>
                    </div>
                    <div className="register__form__button">
                        <button onClick={send_register} >Зарегистрироваться</button>
                    </div>
                    <Link to="/login" className="register__form__link">
                        Вход
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;