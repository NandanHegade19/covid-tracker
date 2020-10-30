import './Styles/App.css';
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import Infobox from './Components/Infobox';
import Map from './Components/Map';
import Table from './Components/Table';
import {prettyPrintStat, sortData} from './util';
import LineGraph from './Components/LineGraph';
import "leaflet/dist/leaflet.css";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Fulltable from './Components/Fulltable';


function App() {

  const [dropdownCountries, setDropdownCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [selectedCountryInfo, setSelectedCountryInfo] = useState({});
  const [countriesTableData, setCountriesTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    //async call to server to get countries data
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => { //gets all data
              //get only country name  
              const allCountries = data.map((country) => (
                {
                  name: country.country,
                  value: country.countryInfo.iso2, //UK, USA, FR
                }
              ));
              setDropdownCountries(allCountries);
              let sortedData = sortData(data);
              setCountriesTableData(sortedData);
              setMapCountries(data);
            })
    }
    getCountriesData(); //call the async function !!!!
  }, []);

  //to fetch worldwide data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setSelectedCountryInfo(data);
    })
  }, [])

  //Sets the selected country on dropdown menu
  const onCountrySelected = async (evt) => {
    const countryCode = evt.target.value;
    setSelectedCountry(countryCode);

    const countryURL = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" :
                                                      `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(countryURL)
          .then(response => response.json())
          .then(data => {
            setSelectedCountryInfo(data);
            setMapCenter([data.countryInfo.lat, data.countryInfo.long])
            setMapZoom(4);
          })
  }

  return (

    <Router>
      <div className="app">
        <Switch>
          <Route path = "/fulltable">
            <Fulltable countries = {countriesTableData}/>
          </Route>
          <Route path = "/">
            <div className = "app__left">
              {/**Header section */}
              <div className = "app__header">
                <h1>COVID-19 TRACKER</h1>
                <FormControl className = "app__dropdown">
                  <Select variant = "outlined" value = {selectedCountry} onChange = {onCountrySelected} >
                    <MenuItem value = "worldwide">Worldwide</MenuItem>
                    {dropdownCountries.map((country) => (
                      <MenuItem value = {country.value}> {country.name} </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/**Info boxes- covid cases, recoveries, deaths etc */}
              <div className = "app__infobox">
                      <Infobox isRed onClick = {(e) => setCasesType("cases")} active = {casesType === "cases"}
                        title = "Coronavirus cases" cases = {prettyPrintStat(selectedCountryInfo.todayCases)} 
                        total = {prettyPrintStat(selectedCountryInfo.cases)} />
                      <Infobox onClick = {(e) => setCasesType("recovered")} active = {casesType === "recovered"}
                        title = "Recovered" cases = {prettyPrintStat(selectedCountryInfo.todayRecovered)} 
                        total = {prettyPrintStat(selectedCountryInfo.recovered)} />
                      <Infobox isRed onClick = {(e) => setCasesType("deaths")} active = {casesType === "deaths"}
                        title = "Deaths" cases = {prettyPrintStat(selectedCountryInfo.todayDeaths)} 
                        total = {prettyPrintStat(selectedCountryInfo.deaths)}/>
              </div>
              <Map center = {mapCenter} zoom = {mapZoom} mapCountries = {mapCountries} casesType = {casesType}/>
            </div>
            <Card className = "app__right">
              <CardContent>
                {/**Table */}
                  <div className = "table__heading">
                    <h3>Live cases by Country</h3>
                    <Link to = "/fulltable"><button className = "app__expandtable" >More details</button></Link>
                  </div>
                  <Table countriesTableData = {countriesTableData}/>
                  <div className = "app__graphsection">
                    {/**Graph */}
                    <h3>Worldwide new {casesType} </h3>
                    <LineGraph casesType = {casesType}/>
                </div>
              </CardContent>
            </Card>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;

{/**
  * API call used to get dropdown countries list: //https://disease.sh/v3/covid-19/countries
 */}