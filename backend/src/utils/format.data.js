// converte data iso para padrao brasileiro
function date(dateIso) {
    const date = new Date(dateIso);
    return date.toLocaleDateString('pt-br');
}

// formata cpf colocando pontos e traco
function CPF(CPF) {
    return CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// formata telefone incluindo parenteses e traco
function phone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

function valor(valor) {
    const formatado = new Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(valor)
    return formatado;
}

// exporta utilitarios de formatacao
module.exports = {
    CPF, 
    date,
    phone,
    valor
}