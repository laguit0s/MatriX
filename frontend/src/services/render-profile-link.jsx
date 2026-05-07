import { Link } from 'react-router-dom';

function renderProfileLink(route, itemId, icon) {
    return (
        <Link to={`${route + itemId}`}>
            <i className={(icon ? icon : 'bi bi-pencil') + ' btn'}></i>
        </Link> 
    )
} 

export default renderProfileLink;
