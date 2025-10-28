import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function NavLink(props) {
    return(
      <li>
          <Link to={props.pageUrl} className="w-full text-left px-4 py-3 rounded-lg">{props.pageLabel}</Link>
      </li>
    );
}