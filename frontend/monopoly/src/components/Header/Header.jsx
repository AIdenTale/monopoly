import './header.css';

import logo from "../../assets/icons/logo.png";


const Header = () => {
    let is_anonymous = true;
    return (
        <div className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <img src={logo}/>
                </div>
                <div className="search_button">
                    <button>Поиск игр</button>
                </div>
                <div className="header__logo__name">
                    <p>Империя бизнеса</p>
                </div>
                {
                    is_anonymous ? (
                        <div className="header__auth_button">
                            <button>Войти</button>
                        </div>
                    ) : (
                        <>2</>
                    )
                }
            </div>
        </div>
    )
}

export default Header;