function DataTable({
    headerContent = [],
    bodyContent = [],
    headerColumnClass = {},
    bodyColumnClass = {},
    maxHeight = "100%",
}) {
    const qtdHeader = headerContent.length;
    const qtdRows = qtdHeader > 0 ? Math.ceil(bodyContent.length / qtdHeader) : 0;

    const getHeaderClass = (colIndex) => {
        return `sticky-top text-center app-table__head-cell ${headerColumnClass[colIndex + 1] || ''}`
    }

    const getBodyClass = (colIndex) => {
        return `${bodyColumnClass[colIndex + 1] || ''}`
    }
    
    return (
        <div
            className="table-responsive flex-grow-1 w-100 overflow-auto app-table-shell"
            style={{ minWidth: 0, maxHeight }}
        >
            <table className="table table-borderless table-hover align-middle text-nowrap m-0 app-table">
                <thead className="app-table__head">
                    <tr>
                        {headerContent.map((texto, i) => (
                            <th key={i} className={getHeaderClass(i)}>{texto}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="app-table__body">
                    {
                        Array.from({ length: qtdRows }).map((_, i) => (
                            <tr key={i}>
                                {
                                    Array.from({ length: qtdHeader }).map((_, j) => {
                                        const index = qtdHeader * i + j;
                                        const cellContent = bodyContent[index];
                                        
                                        return (
                                            <td key={index} className={getBodyClass(j)}>
                                                {cellContent !== undefined ? cellContent : ""}
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;