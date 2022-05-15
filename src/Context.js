import React, {Component} from "react";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.data = new Data();
  }

  render() {
    const value = {
      data: this.data,
      actions: {
        totalApportionment: this.totalApportionment,
        apportionmentState: this.apportionmentState,
        apportionmentYear: this.apportionmentYear,
        apportionmentPopGreater: this.apportionmentPopGreater,
        apportionmentPopLess: this.apportionmentPopLess,
        apportionmentRepGreater: this.apportionmentRepGreater,
        apportionmentRepLess: this.apportionmentRepLess,
        totalItemizedTaxes: this.totalItemizedTaxes,
        itemizedTaxesState: this.itemizedTaxesState,
        itemizedTaxesYear: this.itemizedTaxesYear,
        itemizedTaxesTotalGreater: this.itemizedTaxesTotalGreater,
        itemizedTaxesTotalLess: this.itemizedTaxesTotalLess,
        unemploymentCountyRange: this.unemploymentCountyRange,
        getFipRange: this.getFipRange,
        getFipById: this.getFipById,
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }


// APPORTIONMENT
  /**
   * @description Get total apportionment
   */
  totalApportionment = async () => {
    const result = await this.data.getApportionment();
    return result;
  }

  /**
   * @description Get apportionment by state
   * @param {string} state - State abbreviation
   */
  apportionmentState = async (state) => {
    const result = await this.data.getApportionmentByState(state);
    return result;
  }

  /**
   * @description Get apportionment by year
   * @param {string} year - Year
   */
  apportionmentYear = async (year) => {
    const result = await this.data.getApportionmentByYear(year);
    return result;
  }

  /**
   * @description Get apportionment by population greater than
   * @param {string} pop - Population
   */
  apportionmentPopGreater = async (pop) => {
    const result = await this.data.getApportionmentPopGreater(pop);
    return result;
  }

  /**
   * @description Get apportionment by population less than
   * @param {string} pop - Population
   */
  apportionmentPopLess = async (pop) => {
    const result = await this.data.getApportionmentPopLess(pop);
    return result;
  }

  /**
   * @description Get apportionment by representative greater than
   * @param {string} rep - Representative
   */
  apportionmentRepGreater = async (rep) => {
    const result = await this.data.getApportionmentRepGreater(rep)
    return result;
  }

  /**
   * @description Get apportionment by representative less than
   * @param {string} rep - Representative
   */
  apportionmentRepLess = async (rep) => {
    const result = await this.data.getApportionmentRepLess(rep);
    return result;
  }

// ITEMIZED TAXES
  /**
   * @description Get total itemized taxes
   */
  totalItemizedTaxes = async () => {
    const result = await this.data.getItemizedTaxes();
    return result;
  }

  /**
   * @description Get itemized taxes by state
   * @param {string} state - State abbreviation
   */
  itemizedTaxesState = async (state) => {
    const result = await this.data.getItemizedTaxesByState(state)
    return result;
  }

  /**
   * @description Get itemized taxes by year
   * @param {string} year - Year
   */
  itemizedTaxesYear = async (year) => {
    const result = await this.data.getItemizedTaxesByYear(year)
    return result;
  }

  /**
   * @description Get itemized taxes by total greater than
   * @param {string} total - Total
   */
  itemizedTaxesTotalGreater = async (total) => {
    const result = await this.data.getItemizedTaxesByTotalTaxesGreater(total)
    return result;
  }

  /**
   * @description Get itemized taxes by total less than
   * @param {string} total - Total
   */
  itemizedTaxesTotalLess = async (total) => {
    const result = await this.data.getItemizedTaxesByTotalTaxesLess(total)
    return result;
  }

// UNEMPLOYMENT COUNTY
  unemploymentCountyRange = async (range) => {
    const result = await this.data.getUnemploymentCountyRange(range)
    return result;
  }

  getFipRange = async (range) => {
    const result = await this.data.getFipRange(range)
    return result;
  }

  getFipById = async (fip) => {
    const result = await this.data.getFipById(fip)
    return result;
  }
} // end Provider class

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

