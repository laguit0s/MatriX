// converte data iso para formato brasileiro exibido na interface
function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-br');
}

// mascara cpf para manter exibicao padronizada
function formatCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// mascara telefone para leitura rapida no painel
function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

// aplica formato monetario pt-br nos valores de curso
function formatCurrency(value) {
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(value);
    return formattedValue;
}

module.exports = {
    formatCpf,
    formatDate,
    formatPhone,
    formatCurrency
};
