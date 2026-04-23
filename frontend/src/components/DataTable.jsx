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
        return `sticky-top text-center ${headerColumnClass[colIndex] || ''}`
    }

    const getBodyClass = (colIndex) => {
        return `${bodyColumnClass[colIndex] || ''}`
    }
    
    return (
        <div
            className="table-responsive flex-grow-1 w-100 overflow-auto"
            style={{ minWidth: 0, maxHeight }}
        >
            <table className="table table-bordered table-striped text-nowrap m-0">
                <thead>
                    <tr>
                        {headerContent.map((texto, i) => (
                            <th key={i} className={getHeaderClass(i)}>{texto}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
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