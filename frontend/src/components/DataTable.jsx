import React from 'react';

// renderiza a tabela dinamica de dados
function DataTable({
    headerContent = [],
    headerByProp = {},
    bodyContent = [],
    headerColumnClass = {},
    bodyColumnClass = {},
    propertiesIgnore = [],
    standardStart = {},
    standardEnd = {},
    colOrder = {},
}) {

    // filtra propriedades que devem ser ignoradas
    let properties = bodyContent[0]
        ? Object.keys(bodyContent[0]).filter(key => !propertiesIgnore.includes(key))
        : [];
    
    // aplica reordenação baseada em colOrder
    if (Object.keys(colOrder).length !== 0) {
        const colOrderKeys = Object.keys(colOrder);
        for (let i = 0; i < colOrderKeys.length; i++) {
            const key = colOrderKeys[i];
            const targetOneBased = Number(key);
            if (Number.isNaN(targetOneBased)) continue;

            // Contagem a partir da coluna de configuração (1 = config).
            // As propriedades começam na posição 2, portanto mapeamos
            // targetOneBased -> índice em `properties` subtraindo 2.
            const propTargetIndex = targetOneBased - 2;
            const propName = colOrder[key];
            const currentIndex = properties.indexOf(propName);

            if (currentIndex === -1) continue;
            if (propTargetIndex < 0 || propTargetIndex >= properties.length) continue;

            const temp = properties[propTargetIndex];
            properties[propTargetIndex] = propName;
            properties[currentIndex] = temp;
        }
    }

    // constroi header final: prioriza headerContent (tableHeaders). Se não houver,
    // mapeia properties via headerByProp ou usa o nome da propriedade.
    let finalHeader = [];
    if (headerContent && headerContent.length) {
        finalHeader = headerContent;
    } else {
        const middle = properties.map((p) => headerByProp[p] ?? String(p).toUpperCase());
        finalHeader = [standardStart.header ?? '', ...middle, standardEnd.header ?? ''];
    }

    // define classes css do cabecalho com base no indice (1-based mapping)
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
            <table className="table table-hover align-middle text-nowrap m-0 app-table">
                <thead className="app-table__head border-bottom">
                    <tr>
                        {finalHeader.map((headerLabel, colIndex) => (
                            <th key={colIndex} className={`${getHeaderClass(colIndex)} border-0`}>
                                {headerLabel}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="app-table__body font-monospace">
                    {bodyContent.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className={getBodyClass(0)}>{standardStart.profileLink ? standardStart.renderProfile(row['id']) : standardStart.value}</td>
                            {properties.map((prop, colIndex) => {
                                const cellContent = row[prop];
                                return <td key={prop} className={(getBodyClass(colIndex + 1))}>{cellContent}</td>
                            })}
                            <td className={getBodyClass(properties.length + 1)}>{standardEnd.delete ? standardEnd.deleteCell(row['id']) : standardEnd.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
