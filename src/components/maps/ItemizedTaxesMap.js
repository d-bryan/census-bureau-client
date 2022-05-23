import React from "react";
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/map.css';
import topoStates from '../../json/geo-states.json';
import {binarySearch} from "../../middleware";

export default function ItemizedTaxesMap({currentData}) {
  const [onSelect, setOnSelect] = React.useState({});
  const countyData = topoStates.features;

  React.useEffect(() => {
    function modifyJsonData() {
      if (currentData.length > 0) {
        const temp = currentData.map((state) => state.st);
        countyData.forEach((county) => {
          let result = binarySearch(temp, county.properties['NAME'], 0, temp.length - 1);
          if (result !== false) {
            let currentState = currentData[result];
            for (const property in currentState) {
              county.properties[property] = currentState[property];
            }
          }
        })
      }
    }
    modifyJsonData()
  }, [currentData, countyData]);

  const highlightFeature = (e=> {
    let layer = e.target;
    const {
      alcoholic_beverages_license, alcoholic_beverages_sales_tax,
      amusements_license, amusements_sales_tax, corporations_in_general_license,
      corporations_net_income_taxes, death_and_gift_taxes, documentarty_and_stock_transfer_taxes,
      general_sales_and_gross_receipts_taxes, hunting_and_fishing_license, income_taxes,
      individual_income_taxes, insurance_premiums_sales_tax, license_taxes, motor_fuels_sales_tax,
      motor_vehicle_license, motor_vehicle_operators_license, occupation_and_business_license_nec,
      other_license_taxes, other_selective_sales_and_gross_receipts_taxes, other_taxes, pari_mutuels_sales_tax,
      property_taxes, public_utilities_license, public_utilities_sales_tax, sales_and_gross_receipts_taxes,
      selective_sales_and_gross_receipts_taxes, severance_taxes, st, taxes_nec, tobacco_products_sales_tax,
      total_taxes, yr
    } = e.target.feature.properties;
    setOnSelect({
      alcoholic_beverages_license: alcoholic_beverages_license,
      alcoholic_beverages_sales_tax: alcoholic_beverages_sales_tax,
      amusements_license: amusements_license,
      amusements_sales_tax: amusements_sales_tax,
      corporations_in_general_license: corporations_in_general_license,
      corporations_net_income_taxes: corporations_net_income_taxes,
      death_and_gift_taxes: death_and_gift_taxes,
      documentarty_and_stock_transfer_taxes: documentarty_and_stock_transfer_taxes,
      general_sales_and_gross_receipts_taxes: general_sales_and_gross_receipts_taxes,
      hunting_and_fishing_license: hunting_and_fishing_license,
      income_taxes: income_taxes,
      individual_income_taxes: individual_income_taxes,
      insurance_premiums_sales_tax: insurance_premiums_sales_tax,
      license_taxes: license_taxes,
      motor_fuels_sales_tax: motor_fuels_sales_tax,
      motor_vehicle_license: motor_vehicle_license,
      motor_vehicle_operators_license: motor_vehicle_operators_license,
      occupation_and_business_license_nec: occupation_and_business_license_nec,
      other_license_taxes: other_license_taxes,
      other_selective_sales_and_gross_receipts_taxes: other_selective_sales_and_gross_receipts_taxes,
      other_taxes: other_taxes,
      pari_mutuels_sales_tax: pari_mutuels_sales_tax,
      property_taxes: property_taxes,
      public_utilities_license: public_utilities_license,
      public_utilities_sales_tax: public_utilities_sales_tax,
      sales_and_gross_receipts_taxes: sales_and_gross_receipts_taxes,
      selective_sales_and_gross_receipts_taxes: selective_sales_and_gross_receipts_taxes,
      severance_taxes: severance_taxes,
      st: st,
      taxes_nec: taxes_nec,
      tobacco_products_sales_tax: tobacco_products_sales_tax,
      total_taxes: total_taxes,
      yr: yr
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

  const mapPolygonColor=(totalTaxes => {
    return totalTaxes > 171964221
      ? '#62F59F'
      : totalTaxes > 92720853
        ? '#9411F2'
        : totalTaxes > 61013293
          ? '#A61C70'
          : totalTaxes > 23882882
            ? '#F2119A'
            : totalTaxes > 10256614
              ? '#F2D729'
              : totalTaxes > 3168410
                ? '#40698b'
                : '#D6AC63';
  })

  const style = (feature => {
    return ({
      fillColor: mapPolygonColor(feature.properties.total_taxes),
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
