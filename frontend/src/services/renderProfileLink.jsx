import { Link } from 'react-router-dom';

function renderProfileLink (route, icon, item_id) {
    return (
        <Link to={`${route + item_id}`}>
            <i className={icon}></i>
        </Link>
    )
} 

export default renderProfileLink;