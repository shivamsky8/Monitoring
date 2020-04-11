import httpClient from "../../utils/http-client";
// ------------------------------------
// Actions Types
// ------------------------------------
export const FETCH_AFFECTED_COUNTRIES = "[HOME] FETCH_AFFECTED_COUNTRIES";
export const FETCH_AFFECTED_COUNTRIES_SUCCESS =
  "[HOME] FETCH_AFFECTED_COUNTRIES_SUCCESS";
export const FETCH_AFFECTED_COUNTRIES_ERROR =
  "[HOME] FETCH_AFFECTED_COUNTRIES_ERROR";

export const FETCH_WORLD_WIDE = "[HOME] FETCH_WORLD_WIDE";
export const FETCH_WORLD_WIDE_SUCCESS = "[HOME] FETCH_WORLD_WIDE_SUCCESS";
export const FETCH_WORLD_WIDE_ERROR = "[HOME] FETCH_AFFECTED_COUNTRIES_ERROR";

export const FETCH_COUNTRY_WISE = "[HOME] FETCH_COUNTRY_WISE";
export const FETCH_COUNTRY_WISE_SUCCESS = "[HOME] FETCH_COUNTRY_WISE_SUCCESS";
export const FETCH_COUNTRY_WISE_ERROR = "[HOME] FETCH_COUNTRY_WISE_ERROR";

export const FETCH_COUNTRY_WISE_STATS = "[HOME] FETCH_COUNTRY_WISE_STATS";
export const FETCH_COUNTRY_WISE_STATS_SUCCESS =
  "[HOME] FETCH_COUNTRY_WISE_STATS_SUCCESS";
export const FETCH_COUNTRY_WISE_STATS_ERROR =
  "[HOME] FETCH_COUNTRY_WISE_STATS_ERROR";
export const SELECTED_MAP_COUNTRY = "[HOME] SELECTED_MAP_COUNTRY";

export const FETCH_ALL_STATS = "[HOME] FETCH_ALL_STATS";
export const FETCH_ALL_STATS_SUCCESS = "[HOME] FETCH_ALL_STATS_SUCCESS";
export const FETCH_ALL_STATS_ERROR = "[HOME] FETCH_ALL_STATS_ERROR";

// ------------------------------------
// Actions
// ------------------------------------

export const fetchAllStatsSuccess = (data) => ({
  type: FETCH_ALL_STATS_SUCCESS,
  payload: data,
});

export const fetchAllStatsError = (e) => ({
  type: FETCH_ALL_STATS_ERROR,
  payload: e,
});

export const fetchAllStats = () => async (dispatch) => {
  try {
    const url = "cases_by_country.php";
    const response = await httpClient.get(url);
    dispatch(fetchAllStatsSuccess(response.data.countries_stat));
  } catch (e) {
    dispatch(fetchAllStatsError(e));
  }
};

export const fetchAffectedCountriesSuccess = (affected) => ({
  type: FETCH_AFFECTED_COUNTRIES_SUCCESS,
  payload: affected,
});

export const fetchAffectedCountriesError = (e) => ({
  type: FETCH_AFFECTED_COUNTRIES_ERROR,
  payload: e,
});

export const fetchAffectedCountries = () => async (dispatch) => {
  try {
    const url = "/affected.php";
    const response = await httpClient.get(url);
    const affectedCountries = [];
    response.data.affected_countries.forEach((element) => {
      affectedCountries.push({ value: element, label: element });
    });
    affectedCountries.push({ value: "World Wide", label: "World Wide" });
    dispatch(fetchAffectedCountriesSuccess(affectedCountries));
  } catch (e) {
    dispatch(fetchAffectedCountriesError(e));
  }
};

export const fetchWorldWideSuccess = (worldWide) => ({
  type: FETCH_WORLD_WIDE_SUCCESS,
  payload: worldWide,
});

export const fetchWorldWideError = (e) => ({
  type: FETCH_WORLD_WIDE_ERROR,
  payload: e,
});

export const fetchWorldWide = () => async (dispatch) => {
  try {
    const url = "/worldstat.php";
    const response = await httpClient.get(url);
    dispatch(fetchWorldWideSuccess(response.data));
  } catch (e) {
    dispatch(fetchWorldWideError(e));
  }
};

export const fetchCountryWiseSuccess = (countyData) => ({
  type: FETCH_COUNTRY_WISE_SUCCESS,
  payload: countyData,
});

export const fetchCountryWiseError = (e) => ({
  type: FETCH_COUNTRY_WISE_ERROR,
  payload: e,
});

export const setSelectedMapCountry = (country) => ({
  type: SELECTED_MAP_COUNTRY,
  payload: country,
});

export const fetchCountryWise = (countryName) => async (dispatch) => {
  try {
    const url = `/latest_stat_by_country.php?country=${countryName}`;
    const response = await httpClient.get(url);
    dispatch(fetchCountryWiseSuccess(response.data.latest_stat_by_country[0]));
  } catch (e) {
    dispatch(fetchCountryWiseError(e));
  }
};

export const fetchCountryWiseStatsSuccess = (countyData) => ({
  type: FETCH_COUNTRY_WISE_STATS_SUCCESS,
  payload: countyData,
});

export const fetchCountryWiseStatsError = (e) => ({
  type: FETCH_COUNTRY_WISE_STATS_ERROR,
  payload: e,
});

export const fetchCountryWiseStats = (countryName) => async (dispatch) => {
  try {
    const url = `/cases_by_particular_country.php?country=${countryName}`;
    const response = await httpClient.get(url);
    const data = response.data.stat_by_country.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.record_date.substr(0, t.record_date.indexOf(" ")) ===
            thing.record_date.substr(0, thing.record_date.indexOf(" "))
        )
    );

    const reqData = data.splice(data.length - 10, data.length);
    let date = [];
    let death = [];
    let newCase = [];
    reqData.forEach((elem) => {
      date.push(elem.record_date.substr(0, elem.record_date.indexOf(" ")));
      death.push(
        parseInt(
          elem.total_deaths.length > 0 ? elem.total_deaths.replace(",", "") : 0
        )
      );
      newCase.push(
        parseInt(
          elem.total_cases.length > 0 ? elem.total_cases.replace(",", "") : 0
        )
      );
    });

    dispatch(fetchCountryWiseStatsSuccess({ date, death, newCase }));
  } catch (e) {
    dispatch(fetchCountryWiseStatsError(e));
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  affectedCountries: [],
  worldWide: {},
  filteredStats: {},
  mapCountry: "",
  allStats: [],
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_STATS_SUCCESS: {
      return {
        ...state,
        allStats: action.payload,
      };
    }
    case FETCH_AFFECTED_COUNTRIES_SUCCESS: {
      return {
        ...state,
        affectedCountries: [...action.payload],
      };
    }
    case FETCH_WORLD_WIDE_SUCCESS: {
      return {
        ...state,
        worldWide: action.payload,
      };
    }
    case FETCH_COUNTRY_WISE_SUCCESS: {
      return {
        ...state,
        worldWide: action.payload,
      };
    }
    case FETCH_COUNTRY_WISE_STATS_SUCCESS: {
      return {
        ...state,
        filteredStats: action.payload,
      };
    }
    case SELECTED_MAP_COUNTRY: {
      return {
        ...state,
        mapCountry: action.payload,
      };
    }
    default:
      return state;
  }
}
