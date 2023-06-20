import './header.scss';

import logo from "../../assets/icons/logo.png";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


const Header = () => {
    let is_anonymous = true;
    
    const refm = useRef();
    const [bb, setbb] = useState(null);


    const get_user = () => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers"

        axios.get('http://127.0.0.1:8000/v1/user', {
        }).then((response) =>{
            console.log(response.data)
            setbb(response.data.user)
        })
        
        

        return true;
    }

    get_user()

    // useEffect(() => {
    //     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    //     axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers"
        
    //     axios.get('http://127.0.0.1:8000/v1/user').then((response) =>{
    //         console.log(response.data)
    //     })
    // })

    return (
        <div className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <img src={logo}/>
                    {
                    bb == null ? (
                        <div className="header__auth_button">
                            <button ref={refm} onClick={() => window.location.replace(window.origin + "/login")}>Вход</button>
                        </div>
                    ) : (
                        <div className="header__auth_button">
                            <button ref={refm} onClick={() => window.location.replace(window.origin + "/profile")}>{bb}</button>
                        </div>
                    )
                    }
                </div>
                <div className="header__logo__name">
                    <p>Империя бизнеса</p>
                </div>
                <div className="search_button">
                    <button onClick={() => window.location.replace(window.origin + "/search")} >Поиск игр</button>
                </div>
                
                
            </div>
        </div>
    )
}

export default Header;