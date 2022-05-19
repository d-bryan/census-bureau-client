import React from "react";
import { MapContainer, TileLayer, Polygon, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import topoStates from '../json/geo-states.json';
import {binarySearch} from "../middleware";

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
    e.target.setStyle(style(e.target.feature));
  })


  const center = [40.557518727833326, -98.17037049764261];

  const mapPolygonColorToDensity=(reps => {
    return reps > 50
      ? '#a50f15'
      : reps > 40
        ? '#de2d26'
        : reps > 30
          ? '#fb6a4a'
          : reps > 20
            ? '#fc9272'
            : reps > 10
              ? '#fcbba1'
              : '#fee5d9';
  })

  const style = (feature => {
    return ({
      fillColor: mapPolygonColorToDensity(feature.properties.reps),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '2',
      fillOpacity: 0.5
    });
  });
  const mapStyle = {
    height: '80vh',
    width: '80vw',
    margin: '0 auto',
  }
  const feature = countyData.map(feature=>{
    return(feature);
  });

  // todo: add a legend to the map
  return(
    <div>
      <header
        style={{
          margin: '.5rem auto',
          padding: '.5rem',
          height: '150px',
        }}
      >
        <div>
          {!onSelect.stateName && (
            <div>
              <p><strong>US Representatives By State</strong></p>
              <p>Hover over each state for more information</p>
            </div>
            )}
        </div>
        {onSelect.stateName && (
          <ul style={{
            listStyle: 'none'
          }}>
            <li><strong>State: {onSelect.stateName}</strong></li>
            <li>Number of Representatives: <strong>{onSelect.reps}</strong></li>
            <li>Total Population: <strong>{onSelect.population}</strong></li>
            <li>Population Per Representative: <strong>{onSelect.averagePerRep}</strong></li>
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
          url={`https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=${process.env.REACT_APP_MAPTILER_KEY}`}
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {countyData && (
          <GeoJSON
            data={countyData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}


//       {
//         countyData.map((state) => {
//           const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
//
//           return (<Polygon
//             key={state.properties.name}
//             pathOptions={{
//               fillColor: '#FD8D3C',
//               fillOpacity: 0.7,
//               weight: 2,
//               opacity: 1,
//               dashArray: 3,
//               color: 'white'
//             }}
//             positions={coordinates}
//             eventHandlers={{
//               mouseover: (e) => {
//                 const layer = e.target;
//                 layer.setStyle({
//                   dashArray: "",
//                   fillColor: "#BD0026",
//                   fillOpacity: 0.7,
//                   weight: 2,
//                   opacity: 1,
//                   color: "white",
//                 })
//               },
//               mouseout: (e) => {
//                 const layer = e.target;
//                 layer.setStyle({
//                   fillOpacity: 0.7,
//                   weight: 2,
//                   dashArray: "3",
//                   color: 'white',
//                   fillColor: '#FD8D3C'
//                 });
//               },
//               click: (e) => {
//
//               }
//             }}
//           />)
//         })
//       }
