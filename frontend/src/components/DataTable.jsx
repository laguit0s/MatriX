function DataTable({ qtdHead, contentHead, qtdBody, contentBody }) {
    let qtdRows = qtdBody / qtdHead;
    
    return (
        <div className="table-responsive flex-grow-1 w-100" style={{ minWidth: 0 }}>
            <table className="table table-striped text-nowrap">
                <thead>
                    <tr>
                        {
                            Array.from({length: qtdHead}).map((e, i) => {
                                e = contentHead[i];
                                return <th key={i} className="sticky-top">{e}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from({length: qtdRows}).map((_, i) => {
                            return (
                                <tr key={i}>
                                    {
                                        Array.from({length: qtdHead}).map((e, j) => {
                                            let index = qtdHead * i + j;
                                            e = contentBody[index];
                                            return <td key={index}>{e}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DataTable