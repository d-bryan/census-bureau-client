import React from "react";
import { MapContainer, TileLayer, Polygon, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import topoStates from '../json/geo-states.json';
import {binarySearch, apportionmentMapPolygonColorToDensity} from "../middleware";

export default function Map({currentData}) {
  const [onSelect, setOnSelect] = React.useState({});
  const countyData = topoStates.features;

  // todo: write middleware function to map data for geojson to make this reusable
  React.useEffect(() => {
    function modifyJsonData() {
      if (currentData.length > 0) {
        const temp = currentData.map((state) => state.state);
        countyData.forEach((county, index) => {
          let result = binarySearch(temp, county.properties['NAME'], 0, temp.length - 1);
          if (result !== false) {
            county.properties.averagePerRep = currentData[result].avg_per_rep;
            county.properties.population = currentData[result].pop;
            county.properties.reps = currentData[result].reps;
            county.properties.year = currentData[result].year;
            county.properties.stateName = currentData[result].state;
          }
        })
      }
    }
    modifyJsonData()
  }, [currentData, countyData]);

  const highlightFeature = (e=> {
    let layer = e.target;
    const { averagePerRep, population, reps, year, stateName } = e.target.feature.properties;
    setOnSelect({
      averagePerRep: averagePerRep,
      population: population,
      reps: reps,
      year: year,
      stateName: stateName
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
    console.log(e.target.feature);
    e.target.setStyle(style(e.target.feature));
  })


  const center = [40.557518727833326, -98.17037049764261];

  // const mapPolygonColorToDensity=(reps => {
  //   return reps > 50
  //     ? '#62F59F'
  //     : reps > 30
  //       ? '#9411F2'
  //       : reps > 20
  //         ? '#A61C70'
  //         : reps > 10
  //           ? '#F2119A'
  //           : reps > 5
  //             ? '#F2D729'
  //             : '#40698b';
  // })

  const style = (feature => {
    return ({
      fillColor: apportionmentMapPolygonColorToDensity(feature.properties.reps),
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

  // todo: add a legend to the map
  return(
    <div>
      <header>
        <div>
          {!onSelect.stateName && (
            <div className="census-info-hover">
              <p><strong>US Representatives By State</strong></p>
              <p>Hover over each state for more information</p>
            </div>
            )}
        </div>
        {onSelect.stateName && (
          <ul className="census-info">
            <li><strong>State: {onSelect.stateName}</strong></li>
            <li>Number of Representatives: <strong>{onSelect.reps}</strong></li>
            <li>Total Population: <strong>{onSelect.population}</strong></li>
            <li>Per Representative: <strong>{onSelect.averagePerRep}</strong></li>
            <li>Year: <strong>{onSelect.year}</strong></li>
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
          attribution='Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
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
