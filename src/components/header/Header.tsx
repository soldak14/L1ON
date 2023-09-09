import { LoginView } from "../LoginView";
import { Link } from "react-router-dom";
import { PagePath } from "../../helpers/page_helper";
import Styles from "./Header.module.scss";
import logo from "../../images/header/logo.svg";
import link from "../../images/header/link.svg";
import twitter from "../../images/header/twitter.svg";

export const Header = () => {
  return (
    <header className={Styles.header}>
      <Link to={PagePath.LANDING}>
        <img src={logo} alt="logo" />
      </Link>
      <div className={Styles.links_wrapper}>
        <div className={Styles.links}>
          <a
            href="https://twitter.com/L1ON_BTC"
            target="_blank"
            rel="noreferrer"
          >
            <img src={link} alt="link" />
          </a>
          <a
            href="https://twitter.com/L1ON_BTC"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitter} alt="twitter" />
          </a>
        </div>
        <LoginView />
      </div>
    </header>
  );
};
