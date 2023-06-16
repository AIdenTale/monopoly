import React from "react";
import { Link } from "react-router-dom"
import Header from "../components/Header/Header";
import './index.m.scss'

const IndexPage = () => {

    return(
        <div className="wrapper">
            <Header/>
            <div className="navigation">
                <div className="wrapper__inner">
                <Link to="/login">
            Вход
            </Link>
            <Link to="/register">
                Регистрация
            </Link>
            <Link to="/search">
                Поиск игр
            </Link>
                </div>
            </div>
        </div>
    )
}

export default IndexPage;