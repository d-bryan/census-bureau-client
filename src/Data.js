import {config} from './ApiConfig'

export default class Data {

  constructor() {
    this._baseUrl = config.urls.testing;
    if (process.env.NODE_ENV === 'production') {
      this._baseUrl = config.urls.live;
    }
  }

  /*********** APPORTIONMENT *************************************** */

  /**
   * Gets the apportionment data of apportionment
   * @returns {JSON} json value of apportionment
   */
  async getApportionment() {
    const current = config.routes.apportionment.full;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}`;
    const response = await fetch(localUrl);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Error fetching apportionment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves the current values for apportionment by state
   * @param {string} state value for the current state
   * @returns {JSON} json value of apportionment by state
   */
  async getApportionmentByState(state) {
    const current = config.routes.apportionment.state;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${state}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, state);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Error fetching apportionment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves the current values for apportionment by year
   * @param {string} year value for the current year
   * @returns {JSON} json value of apportionment by year
   */
  async getApportionmentByYear(year) {
    const current = config.routes.apportionment.year;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${year}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, year);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching apportionment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves the current values for apportionment by population greater than number
   * @param {string} pop value for the current apportionment by population greater than number
   * @returns {JSON} json value of apportionment by population greater than number
   */
  async getApportionmentPopGreater(pop) {
    const current = config.routes.apportionment.popGreater;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${pop}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, pop);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching apportionment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves the current values for apportionment by population less than number
   * @param {string} pop value for the current state by population less than number
   * @returns {JSON} json value of apportionment by population less than number
   */
  async getApportionmentPopLess(pop) {
    const current = config.routes.apportionment.popLess;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${pop}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, pop);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching apportionment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves the current values for apportionment by reps greater than number
   * @param {string} reps value for the current state by reps greater than number
   * @returns {JSON} json value of apportionment by reps greater than number
   */
  async getApportionmentRepGreater(reps) {
    const current = config.routes.apportionment.repGreater;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${reps}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, reps);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching apportionment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves the current values for apportionment by reps less than number
   * @param {string} reps value for the current state by reps less than number
   * @returns {JSON} json value of apportionment by reps less than number
   */
  async getApportionmentRepLess(reps) {
    const current = config.routes.apportionment.repLess;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${reps}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, reps);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching apportionment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /*********** ITEMIZED TAXES *************************************** */

  /**
   * Retrieves total itemized taxes for 2019 and 2020
   * @returns {JSON} json value of itemized taxes
   */
  async getItemizedTaxes() {
    const current = config.routes.itemizedTaxes.full;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, current.value);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching itemized taxes data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves total itemized taxes for 2019 and 2020 by state
   * @param {String} state State to query the database by
   * @returns {JSON} json value of itemized taxes
   */
  async getItemizedTaxesByState(state) {
    const current = config.routes.itemizedTaxes.state;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${state}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, state);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Error fetching itemized taxes data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves total itemized taxes for 2019 and 2020 by state
   * @param {String} year Specific string value for year to query
   * @returns {JSON} json value of itemized taxes
   */
  async getItemizedTaxesByYear(year) {
    const current = config.routes.itemizedTaxes.year;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${year}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, year);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching itemized taxes data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves total itemized taxes for 2019 and 2020 by total taxes less than specific value
   * @param {String} taxes Specific string value for total taxes
   * @returns {JSON} json value of itemized taxes
   */
  async getItemizedTaxesByTotalTaxesGreater(taxes) {
    const current = config.routes.itemizedTaxes.taxesGreater;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${taxes}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, taxes);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching itemized taxes data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves total itemized taxes for 2019 and 2020 by total taxes less than specific value
   * @param {String} taxes Specific string value for total taxes
   * @returns {JSON} json value of itemized taxes
   */
  async getItemizedTaxesByTotalTaxesLess(taxes) {
    const current = config.routes.itemizedTaxes.taxesLess;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${taxes}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, taxes);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching itemized taxes data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /*********** UNEMPLOYMENT COUNTY *************************************** */

  /**
   * Retrieves Total Unemployment data from api
   * @returns {JSON} json value of Unemployment data
   */
  async getUnemploymentCountyRange(from, to) {
    const current = config.routes.unemploymentCounty.full;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${from}&${current.paramType}=${to}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, range);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching unemployment data');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves Total FIP Codes from api
   * @returns {JSON} json value of FIP codes
   */
  async getFipRange(range) {
    const current = config.routes.unemploymentCounty.fullFip;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${range[0]}&${current.paramType}=${range[1]}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, range);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching FIP codes');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

  /**
   * Retrieves Individual FIP Code data from api
   * @param {String} fip Queried FIP code
   * @returns {JSON} json value of FIP code
   */
  async getFipById(fip) {
    const current = config.routes.unemploymentCounty.fip;
    let localUrl = this._baseUrl;
    localUrl += `${current.route}?${current.paramType}=${fip}`;
    const response = await fetch(localUrl);
    // const response = await this.api(current.route, current.paramType, fip);
    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Error fetching FIP code');
      // return Promise.reject({
      //   status: response.status,
      //   message: response.statusText
      // });
    }
  }

}
