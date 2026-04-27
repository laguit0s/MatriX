function date(dateIso) {
    const date = new Date(dateIso);
    return date.toLocaleDateString('pt-br');
}

function CPF(CPF) {
    return CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function phone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

module.exports = {
    CPF, 
    date,
    phone
}