import React from 'react';
import numeral from "numeral";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Fulltable({countries}) {
    return (
        <div >
        <TableContainer component={Paper}>
            <Table className="" size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell><strong>Country</strong></TableCell>
                    <TableCell align="right"><strong>Total cases</strong></TableCell>
                    <TableCell align="right"><strong>New Cases</strong></TableCell>
                    <TableCell align="right"><strong>Total Deaths</strong></TableCell>
                    <TableCell align="right"><strong>Total Recovered</strong></TableCell>
                    <TableCell align="right"><strong>Active cases</strong></TableCell>
                    <TableCell align="right"><strong>Critical cases</strong></TableCell>
                    <TableCell align="right"><strong>Total cases/1M Pop</strong></TableCell>
                    <TableCell align="right"><strong>Deaths/1M pop</strong></TableCell>
                    <TableCell align="right"><strong>Total Tests</strong></TableCell>
                    <TableCell align="right"><strong>Tests/1M pop</strong></TableCell>
                    <TableCell align="right"><strong>Population</strong></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    countries.map(({country, cases, todayCases, deaths, recovered, active, critical, casesPerOneMillion, deathsPerOneMillion,
                        tests, testsPerOneMillion, population, name}) => (
                    <TableRow key={name}>
                    <TableCell component="th" scope="row">
                        {country}
                    </TableCell>
                    <TableCell align="right"> {cases}</TableCell>
                    <TableCell align="right"> {todayCases}</TableCell>
                    <TableCell align="right"> {deaths}</TableCell>
                    <TableCell align="right"> {recovered}</TableCell>
                    <TableCell align="right"> {active}</TableCell>
                    <TableCell align="right"> {critical}</TableCell>
                    <TableCell align="right"> {casesPerOneMillion}</TableCell>
                    <TableCell align="right"> {deathsPerOneMillion}</TableCell>
                    <TableCell align="right"> {tests}</TableCell>
                    <TableCell align="right"> {testsPerOneMillion}</TableCell>
                    <TableCell align="right"> {population}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        
            {/*{
                countries.map(({country, cases, recovered, deaths}) => (
                    <tr>
                        <td>{country}</td>
                        <td> <strong>{numeral(cases).format("0,0")} </strong></td>
                        <td> <strong>{numeral(recovered).format("0,0")} </strong></td>
                        <td> <strong>{numeral(deaths).format("0,0")} </strong></td>
                    </tr>
                ))
            }*/}
        </div>
    )
}

export default Fulltable;
