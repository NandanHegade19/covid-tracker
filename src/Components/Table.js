import React from 'react';
import '../Styles/Table.css';
import numeral from "numeral";

function Table({countriesTableData}) {
    return (
        <div className = "table">
            {
                countriesTableData.map(({country, cases}) => (
                    <tr>
                        <td>{country}</td>
                        <td> <strong>{numeral(cases).format("0,0")} </strong></td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
