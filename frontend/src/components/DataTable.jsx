function DataTable({
    headerContent = [],
    bodyContent = [],
    headerColumnClass = {},
    bodyColumnClass = {},
    maxHeight = "100%",
}) {
    // O body é recebido como array achatado; calculamos quantas linhas renderizar.
    const headerCount = headerContent.length;

    let propriedades = [];
    for (let key in bodyContent[0]) {
        propriedades.push(key);
    }

    const getHeaderClass = colIndex => {
        return `sticky-top text-center app-table__head-cell ${headerColumnClass[colIndex + 1] || ''}`;
    };

    const getBodyClass = colIndex => {
        // Mantém alinhamento explícito quando já definido; caso contrário, centraliza.
        const columnClass = bodyColumnClass[colIndex + 1] || "";
        return `${columnClass.includes("text-start") || columnClass.includes("text-end") ? columnClass : `${columnClass} text-center`}`;
    };

    return (
        <div
            className="table-responsive flex-grow-1 w-100 overflow-auto app-table-shell"
            style={{ minWidth: 0, maxHeight }}
        >
            <table className="table table-bordered table-hover align-middle text-nowrap m-0 app-table">
                <thead className="app-table__head border-bottom">
                    <tr>
                        {headerContent.map((headerLabel, columnIndex) => (
                            <th key={columnIndex} className={`${getHeaderClass(columnIndex)} border-0`}>
                                {headerLabel}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="app-table__body">
                    {bodyContent.map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {propriedades.map((prop, colIndex) => {
                                const cellContent = bodyContent[rowIndex][propriedades[colIndex]];
                                return <td>{cellContent}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;