import React from "react";
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map.css';
import topoCounties from '../../json/geo-counties.json';
import {binarySearch} from "../../middleware";

export default function UnemploymentMap({currentData}) {
  const [onSelect, setOnSelect] = React.useState({});
  const countyData = topoCounties.features;

  function createFipCode(state, county) {
    if (state === typeof 'number' || county === typeof 'number') {
      if (state < 10) {
        state = '0' + state;
      }
      if (county < 100) {
        county = '0' + county;
      }
    }
    return `${state}${county}`;
  }

  React.useEffect(() => {
    function modifyJsonData() {
      if (currentData.length === 3153) {
        const currentDataTemp = [];
        currentData.forEach((county) => {
            let updated = createFipCode(county.state_fips, county.county_fips);
          currentDataTemp.push(updated);
        });
        countyData.forEach((county) => {
          let editedFips = createFipCode(county.properties['STATE'], county.properties['COUNTY']);
          let result = binarySearch(currentDataTemp, editedFips, 0, currentDataTemp.length - 1);
          // let result = binarySearch(temp, county.properties['NAME'], 0, temp.length - 1);
          if (result !== false) {
            // console.log(currentData[result]);
            let currentState = currentData[result];
            for (const property in currentState) {
              county.properties[property] = currentState[property];
            }
            console.log(county.properties['rate']);
          }
        })
      }
    }
    modifyJsonData()
  }, [currentData, countyData]);

  console.log(countyData);
  console.log(currentData);

  const highlightFeature = (e=> {
    let layer = e.target;
    const {
      county_fips, county_name_state, employed, full_fips, id, labor_force, rate, state_fips, unemployed, year
    } = e.target.feature.properties;
    setOnSelect({
      county_fips: county_fips,
      county_name_state: county_name_state,
      employed: employed,
      full_fips: full_fips,
      id: id,
      labor_force: labor_force,
      rate: rate,
      state_fips: state_fips,
      unemployed: unemployed,
      year: year
    });
    layer.setStyle({
      weight: 1,
      color: "black",
      fillOpacity: 1
    });
  });

  const onEachFeature = (feature, layer)=> {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  const resetHighlight= (e =>{
    setOnSelect({});
    e.target.setStyle(style(e.target.feature));
  })

  const center = [40.557518727833326, -98.17037049764261];

  const mapPolygonColor=(rate => {
    return rate < 7
      ? '#8C2C23'
      : rate < 6
        ? '#FF7E73'
        : rate < 5
          ? '#D9584C'
          : rate < 4
            ? '#BC6F4C'
            : rate < 3
              ? '#337D73'
              : rate < 2
                ? '#4BBDAE'
                : '#ececec';
  })

  const style = (feature => {
    return ({
      fillColor: mapPolygonColor(feature.properties.rate),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '2',
      fillOpacity: 0.5
    });
  });
  const mapStyle = {
    height: '85vh',
    width: '85vw',
    margin: '0 auto',
  }
  const feature = countyData.map(feature => {
    return(feature);
  });

  return (
    <div>
      <header>
        <div>
          {!onSelect.st && (
            <div
              className="census-info-hover"
              style={{
                width: '20%',
                height: '20%'
              }}
            >
              <p><strong>Tax Collection By State</strong></p>
              <p>Hover over each state for more information</p>
            </div>
          )}
        </div>
        {onSelect.st && (
          <ul
            className="census-info"
            style={{
              width: '29%',
              height: '50%'
            }}
          >
            <li><strong>State: {onSelect.st}</strong></li>
            <li>Year: <strong>{onSelect.yr}</strong></li>
            <li>Total Taxes: <strong>{onSelect.total_taxes}</strong></li>
            <li>Alcoholic Beverages Sales Tax: <strong>{onSelect.alcoholic_beverages_sales_tax}</strong></li>
            <li>Amusements Sales Tax: <strong>{onSelect.amusements_sales_tax}</strong></li>
            <li>Corporations Net Income Taxes: <strong>{onSelect.corporations_net_income_taxes}</strong></li>
            <li>Death and Gift Taxes: <strong>{onSelect.death_and_gift_taxes}</strong></li>
            <li>Documentary and Stock Transfer Taxes: <strong>{onSelect.documentarty_and_stock_transfer_taxes}</strong></li>
            <li>General Sales and Gross Receipts Taxes: <strong>{onSelect.general_sales_and_gross_receipts_taxes}</strong></li>
            <li>Income Taxes: <strong>{onSelect.income_taxes}</strong></li>
            <li>Individual Income Taxes: <strong>{onSelect.individual_income_taxes}</strong></li>
            <li>Insurance Premiums Sales Tax: <strong>{onSelect.insurance_premiums_sales_tax}</strong></li>
            <li>Motor Fuel Sales Tax: <strong>{onSelect.motor_fuels_sales_tax}</strong></li>
            <li>Motor Vehicle License: <strong>{onSelect.motor_vehicle_license}</strong></li>
            <li>Property Taxes: <strong>{onSelect.property_taxes}</strong></li>
            <li>Public Utilities Sales Tax: <strong>{onSelect.public_utilities_sales_tax}</strong></li>
            <li>Severance Taxes: <strong>{onSelect.severance_taxes}</strong></li>
            <li>Tobacco Products Sales Tax: <strong>{onSelect.tobacco_products_sales_tax}</strong></li>
          </ul>
        )}
      </header>
      <MapContainer
        center={center}
        zoom={4}
        style={mapStyle}
      >
        <TileLayer
          // url={`https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=${process.env.REACT_APP_MAPTILER_KEY}`}
          // attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url={`http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png`}
          attribution='ApportionmentMap tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
        />
        {feature && (
          <GeoJSON
            data={feature}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}
