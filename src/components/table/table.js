import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
class Table extends Component {

    render() {
        let title = this.props.title;
        let bodyTemp = this.props.vocabularyArr;

        const columns = [
            {
                text: "Word",
                dataField: "word",
                sort: true,
                filter: textFilter()
            },
            {
                text: "Synonyms",
                dataField: "synonyms",
                filter: textFilter()
            },
            {
                text: "Antonyms",
                dataField: "antonyms",
                filter: textFilter()
            },
            {
                text: "Meanings",
                dataField: "meanings",
                sort: true,
                filter: textFilter()
            },

        ]

        return (
            <div>
                <h2 style={{textAlign:"center", color:"red"}}>{title}</h2>
        <BootstrapTable
            keyField='id'
            columns={columns}
            data ={ bodyTemp}
            pagination={ paginationFactory() }
            filter={ filterFactory() } 
        ></BootstrapTable>
            </div>
        );
    }
}

export default Table;