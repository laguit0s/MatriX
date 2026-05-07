import api from "../../services/api";

function deleteActionCell(route, itemId, icon) {
    async function sendRequest() {
        await api.delete(route + itemId);
        window.location.reload(); // atualiza a tabela carregando os dados do servidor
    }
    return (
        <i className={(icon ? icon : 'bi bi-trash') + ' btn'} onClick={sendRequest}></i>
    )
}

export default deleteActionCell;
