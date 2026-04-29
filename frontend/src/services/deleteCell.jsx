import { Link } from "react-router-dom";
import api from "./api";

function DeleteCell(route, item_id, icon) {
    async function sendRequest() {
        await api.delete(route + item_id);
    }
    return (
        <i className={(icon ? icon : 'bi bi-trash') + ' btn'} onClick={sendRequest}></i>
    )
}

export default DeleteCell;