function DataTable({
    headerContent = [],
    bodyContent = [],
    headerColumnClass = {},
    bodyColumnClass = {},
    propertiesIgnore = [],
    standard
}) {

    const properties = bodyContent[0]
        ? Object.keys(bodyContent[0]).filter(key => !propertiesIgnore.includes(key))
        : [];

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
                            {standard && (
                                <td className={getBodyClass(0)}>{standard}</td>
                            )}
                            {properties.map((prop, colIndex) => {
                                const cellContent = row[prop];
                                return <td key={prop} className={getBodyClass(colIndex + 1)}>{cellContent}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;