import {LoginView} from "../LoginView";
import {Link} from "react-router-dom";
import {PagePath} from "../../helpers/page_helper";

export const Header = () => {

    return (
        <div style={{display: "flex", paddingBottom: "10px", marginBottom: "10px", borderBottom: "1px dotted black"}}>
            <LoginView/>
            <div style={{width: "1px", border: "1px solid", margin: "0 10px"}}/>
            <Link to={PagePath.LANDING}>Home</Link>
        </div>
    );
};