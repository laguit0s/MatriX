// renderiza a tabela dinamica de dados
function DataTable({
    headerContent = [],
    bodyContent = [],
    headerColumnClass = {},
    bodyColumnClass = {},
    propertiesIgnore = [],
    standardStart = {},
    standardEnd = {}
}) {

    // filtra propriedades que devem ser ignoradas
    const properties = bodyContent[0]
        ? Object.keys(bodyContent[0]).filter(key => !propertiesIgnore.includes(key))
        : [];

    // define classes css do cabecalho com base no indice
    const getHeaderClass = colIndex => {
        return `sticky-top text-center app-table__head-cell ${headerColumnClass[colIndex + 1] || ''}`;
    };

    // define classes css do corpo, aplica alinhamento central caso nao definido
    const getBodyClass = colIndex => {
        const columnClass = bodyColumnClass[colIndex + 1] || "";
        return `${columnClass.includes("text-start") || columnClass.includes("text-end") ? columnClass : `${columnClass} text-center`}`;
    };

    return (
        <div
            className="table-responsive flex-grow-1 w-100 overflow-auto app-table-shell"
            style={{ minWidth: 0, maxHeight: '100%' }}
        >
            <table className="table table-bordered table-hover align-middle text-nowrap m-0 app-table">
                <thead className="app-table__head border-bottom">
                    <tr>
                        {headerContent.map((headerLabel, colIndex) => (
                            <th key={colIndex} className={`${getHeaderClass(colIndex)} border-0`}>
                                {headerLabel}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="app-table__body">
                    {bodyContent.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className={getBodyClass(0)}>{standardStart.profileLink ? standardStart.renderProfile(row['id']) : standardStart.value}</td>
                            {properties.map((prop, colIndex) => {
                                const cellContent = row[prop];
                                return <td key={prop} className={getBodyClass(colIndex + 1)}>{cellContent}</td>
                            })}
                            <td className={getBodyClass(bodyContent.length - 2)}>{standardEnd.delete ? standardEnd.deleteCell(row['id']) : standardEnd.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;