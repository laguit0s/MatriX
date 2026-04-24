function DataTable({
    headerContent = [],
    bodyContent = [],
    headerColumnClass = {},
    bodyColumnClass = {},
    maxHeight = "100%",
}) {
    // O body é recebido como array achatado; calculamos quantas linhas renderizar.
    const headerCount = headerContent.length;
    const rowCount = headerCount > 0 ? Math.ceil(bodyContent.length / headerCount) : 0;

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
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: headerCount }).map((_, colIndex) => {
                                // Mapeia (linha, coluna) para o índice do array achatado.
                                const flatIndex = headerCount * rowIndex + colIndex;
                                const cellContent = bodyContent[flatIndex];

                                return (
                                    <td key={flatIndex} className={getBodyClass(colIndex)}>
                                        {cellContent !== undefined ? cellContent : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;