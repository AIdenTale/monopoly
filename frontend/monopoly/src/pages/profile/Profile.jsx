import './profile.scss';

import Header from '../../components/Header/Header';
import userlogo from "../../assets/user 2.png";
import { useEffect, useState } from 'react';

import axios from 'axios';

export const Profile = () => {

    const [user, setUser] = useState(0);

    useEffect(() => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers"

        axios.get('http://127.0.0.1:8000/v1/user', {
        }).then((response) =>{
            setUser(response.data.user)
        })
    })

    return (
        <div className="wrapper">
            <Header/>
            <div className="profile__block">
                <div className="profile__info">
                    <div className="profile__info__image">
                        <img src={userlogo} />
                        <p>{user}</p>
                    </div>
                    <div className="profile__info__stats">
                        <div>
                            <p>1</p>
                            <p>Матчей</p>
                        </div>
                        <div>
                            <p>1</p>
                            <p>Побед</p>
                        </div>
                        <div>
                            <p>1</p>
                            <p>Друзей</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}