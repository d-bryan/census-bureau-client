# Census Bureau Client Project

## Description

Client to interact with the Census Bureau API I built, [GitHub Repository](https://github.com/d-bryan/census-data-api).
This only implements two features from the API - Apportionment and Itemized Taxes by year for 2020. It creates a Choropleth
map of the US with the data from the API.

## Libraries Used

[React](https://reactjs.org/)<br/>
[Leaflet](https://leafletjs.com/)<br/>
[React Leaflet](https://react-leaflet.js.org/)<br/>
[TopoJSON Client](https://github.com/topojson/topojson-client)

## Setup

### Requirements

Python 3.8.x<br/>
nodejs 16.x.x<br/>

### Installation

Clone the repository and run the following command:

` git clone https://github.com/d-bryan/census-bureau-client.git`

`npm install`

If running locally you will also need the API repository installed separately.

`git clone https://github.com/d-bryan/census-data-api.git`

`pip install -r requirements.txt`


## Live Demo

Visit a live demo of the application on Netlify [here](https://census-data-client.netlify.app/)
