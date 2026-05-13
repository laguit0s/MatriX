import api from "../../services/api";

function deleteActionCell(route, itemId, setter) {
    return (
        <i className='bi bi-trash btn' data-bs-toggle="modal" data-bs-target="#delete-modal" onClick={() => setter(route + itemId)}></i>
    )
}

export default deleteActionCell;
