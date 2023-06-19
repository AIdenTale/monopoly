import "./footer.scss";
import logo from '../../assets/icons/logo.png'
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_logo">
                <img src={logo}/>
                <p>Империя бизнеса — бесплатная онлайн-игра по типу легендарной игры “монополия”.</p>
            </div>
            <div className="footer__social"></div>
        </div>
    )
}
export default Footer;