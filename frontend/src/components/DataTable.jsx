function DataTable({ headerContent = [], bodyContent = [] }) {
    const qtdHeader = headerContent.length;
    const qtdRows = qtdHeader > 0 ? Math.ceil(bodyContent.length / qtdHeader) : 0;
    
    return (
        <div className="table-responsive flex-grow-1 w-100" style={{ minWidth: 0 }}>
            <table className="table table-striped text-nowrap">
                <thead>
                    <tr>
                        {headerContent.map((texto, i) => (
                            <th key={i} className="sticky-top">{texto}</th>
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
                                            <td key={index}>
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