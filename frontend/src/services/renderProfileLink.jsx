import { Link } from 'react-router-dom';

function renderProfileLink (route, item_id, icon) {
    return (
        <Link to={`${route + item_id}`}>
            <i className={(icon ? icon : 'bi bi-pencil') + ' btn'}></i>
        </Link> 
    )
} 

export default renderProfileLink;