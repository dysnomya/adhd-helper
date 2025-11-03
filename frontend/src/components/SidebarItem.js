import {Link} from "react-router-dom";

export default function SidebarItem(props) {
    return(
      <li className='nav-item'>
          <Link to={props.pageUrl} className="nav-link">{props.pageLabel}</Link>
      </li>
    );
}