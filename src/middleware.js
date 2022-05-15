import Data from './Data';

const dataRef = new Data();

// APPORTIONMENT
/**
 * @description Get total apportionment
 */
export const totalApportionment = async () => {
    const result = await dataRef.getApportionment();
    console.log(result);
    return result;
}

/**
 * @description Get apportionment by state
 * @param {string} state - State abbreviation
 */
export const apportionmentState = async (state) => {
    const result = await dataRef.getApportionmentByState(state).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get apportionment by year
 * @param {string} year - Year
 */
export const apportionmentYear = async (year) => {
    const result = await dataRef.getApportionmentByYear(year).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get apportionment by population greater than
 * @param {string} pop - Population
 */
export const apportionmentPopGreater = async (pop) => {
    const result = await dataRef.getApportionmentPopGreater(pop).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get apportionment by population less than
 * @param {string} pop - Population
 */
export const apportionmentPopLess = async (pop) => {
    const result = await dataRef.getApportionmentPopLess(pop).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get apportionment by representative greater than
 * @param {string} rep - Representative
 */
export const apportionmentRepGreater = async (rep) => {
    const result = await dataRef.getApportionmentRepGreater(rep).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get apportionment by representative less than
 * @param {string} rep - Representative
 */
export const apportionmentRepLess = async (rep) => {
    const result = await dataRef.getApportionmentRepLess(rep).then(data => {
        return data
    });
    return result;
}

// ITEMIZED TAXES
/**
 * @description Get total itemized taxes
 */
export const totalItemizedTaxes = async () => {
    const result = await dataRef.getItemizedTaxes().then(data => {
        return data
    });
    return result;
}

/**
 * @description Get itemized taxes by state
 * @param {string} state - State abbreviation
 */
export const itemizedTaxesState = async (state) => {
    const result = await dataRef.getItemizedTaxesByState(state).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get itemized taxes by year
 * @param {string} year - Year
 */
export const itemizedTaxesYear = async (year) => {
    const result = await dataRef.getItemizedTaxesByYear(year).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get itemized taxes by total greater than
 * @param {string} total - Total
 */
export const itemizedTaxesTotalGreater = async (total) => {
    const result = await dataRef.getItemizedTaxesByTotalTaxesGreater(total).then(data => {
        return data
    });
    return result;
}

/**
 * @description Get itemized taxes by total less than
 * @param {string} total - Total
 */
export const itemizedTaxesTotalLess = async (total) => {
    const result = await dataRef.getItemizedTaxesByTotalTaxesLess(total).then(data => {
        return data
    });
    return result;
}

// UNEMPLOYMENT COUNTY
export const unemploymentCountyRange = async (range) => {
    const result = await dataRef.getUnemploymentCountyRange(range).then(data => {
        return data
    });
    return result;
}

export const getFipRange = async (range) => {
    const result = await dataRef.getFipRange(range).then(data => {
        return data
    });
    return result;
}

export const getFipById = async (fip) => {
    const result = await dataRef.getFipById(fip).then(data => {
        return data
    });
    return result;
}

// // Copyright 2021 Observable, Inc.
// // Released under the ISC license.
// // https://observablehq.com/@d3/choropleth
// function Choropleth(data, {
//   id = d => d.id, // given d in data, returns the feature id
//   value = () => undefined, // given d in data, returns the quantitative value
//   title, // given a feature f and possibly a datum d, returns the hover text
//   format, // optional format specifier for the title
//   scale = d3.scaleSequential, // type of color scale
//   domain, // [min, max] values; input of color scale
//   range = d3.interpolateBlues, // output of color scale
//   width = 640, // outer width, in pixels
//   height, // outer height, in pixels
//   projection, // a D3 projection; null for pre-projected geometry
//   features, // a GeoJSON feature collection
//   featureId = d => d.id, // given a feature, returns its id
//   borders, // a GeoJSON object for stroking borders
//   outline = projection && projection.rotate ? {type: "Sphere"} : null, // a GeoJSON object for the background
//   unknown = "#ccc", // fill color for missing data
//   fill = "white", // fill color for outline
//   stroke = "white", // stroke color for borders
//   strokeLinecap = "round", // stroke line cap for borders
//   strokeLinejoin = "round", // stroke line join for borders
//   strokeWidth, // stroke width for borders
//   strokeOpacity, // stroke opacity for borders
// } = {}) {
//   // Compute values.
//   const N = d3.map(data, id);
//   const V = d3.map(data, value).map(d => d == null ? NaN : +d);
//   const Im = new d3.InternMap(N.map((id, i) => [id, i]));
//   const If = d3.map(features.features, featureId);
//
//   // Compute default domains.
//   if (domain === undefined) domain = d3.extent(V);
//
//   // Construct scales.
//   const color = scale(domain, range);
//   if (color.unknown && unknown !== undefined) color.unknown(unknown);
//
//   // Compute titles.
//   if (title === undefined) {
//     format = color.tickFormat(100, format);
//     title = (f, i) => `${f.properties.name}\n${format(V[i])}`;
//   } else if (title !== null) {
//     const T = title;
//     const O = d3.map(data, d => d);
//     title = (f, i) => T(f, O[i]);
//   }
//
//   // Compute the default height. If an outline object is specified, scale the projection to fit
//   // the width, and then compute the corresponding height.
//   if (height === undefined) {
//     if (outline === undefined) {
//       height = 400;
//     } else {
//       const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
//       const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
//       projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
//       height = dy;
//     }
//   }
//
//   // Construct a path generator.
//   const path = d3.geoPath(projection);
//
//   const svg = d3.create("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .attr("viewBox", [0, 0, width, height])
//       .attr("style", "width: 100%; height: auto; height: intrinsic;");
//
//   if (outline != null) svg.append("path")
//       .attr("fill", fill)
//       .attr("stroke", "currentColor")
//       .attr("d", path(outline));
//
//   svg.append("g")
//     .selectAll("path")
//     .data(features.features)
//     .join("path")
//       .attr("fill", (d, i) => color(V[Im.get(If[i])]))
//       .attr("d", path)
//     .append("title")
//       .text((d, i) => title(d, Im.get(If[i])));
//
//   if (borders != null) svg.append("path")
//       .attr("pointer-events", "none")
//       .attr("fill", "none")
//       .attr("stroke", stroke)
//       .attr("stroke-linecap", strokeLinecap)
//       .attr("stroke-linejoin", strokeLinejoin)
//       .attr("stroke-width", strokeWidth)
//       .attr("stroke-opacity", strokeOpacity)
//       .attr("d", path(borders));
//
//   return Object.assign(svg.node(), {scales: {color}});
// }
