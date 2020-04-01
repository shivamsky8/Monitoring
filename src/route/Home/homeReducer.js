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

// ------------------------------------
// Actions
// ------------------------------------

export const fetchAffectedCountriesSuccess = affected => ({
  type: FETCH_AFFECTED_COUNTRIES_SUCCESS,
  payload: affected
});

export const fetchAffectedCountriesError = e => ({
  type: FETCH_AFFECTED_COUNTRIES_ERROR,
  payload: e
});

export const fetchAffectedCountries = () => async dispatch => {
  try {
    const url = "/affected.php";
    const response = await httpClient.get(url);
    const affectedCountries = [];
    response.data.affected_countries.forEach(element => {
      affectedCountries.push({ value: element, label: element });
    });
    affectedCountries.push({ value: "World Wide", label: "World Wide" });
    dispatch(fetchAffectedCountriesSuccess(affectedCountries));
  } catch (e) {
    dispatch(fetchAffectedCountriesError(e));
  }
};

export const fetchWorldWideSuccess = worldWide => ({
  type: FETCH_WORLD_WIDE_SUCCESS,
  payload: worldWide
});

export const fetchWorldWideError = e => ({
  type: FETCH_WORLD_WIDE_ERROR,
  payload: e
});

export const fetchWorldWide = () => async dispatch => {
  try {
    const url = "/worldstat.php";
    const response = await httpClient.get(url);
    dispatch(fetchWorldWideSuccess(response.data));
  } catch (e) {
    dispatch(fetchWorldWideError(e));
  }
};

export const fetchCountryWiseSuccess = countyData => ({
  type: FETCH_COUNTRY_WISE_SUCCESS,
  payload: countyData
});

export const fetchCountryWiseError = e => ({
  type: FETCH_COUNTRY_WISE_ERROR,
  payload: e
});

export const fetchCountryWise = countryName => async dispatch => {
  try {
    const url = `/latest_stat_by_country.php?country=${countryName}`;
    const response = await httpClient.get(url);
    dispatch(fetchCountryWiseSuccess(response.data.latest_stat_by_country[0]));
  } catch (e) {
    dispatch(fetchCountryWiseError(e));
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  affectedCountries: [],
  worldWide: {}
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AFFECTED_COUNTRIES_SUCCESS: {
      return {
        ...state,
        affectedCountries: [...action.payload]
      };
    }
    case FETCH_WORLD_WIDE_SUCCESS: {
      return {
        ...state,
        worldWide: action.payload
      };
    }
    case FETCH_COUNTRY_WISE_SUCCESS: {
      return {
        ...state,
        worldWide: action.payload
      };
    }

    default:
      return state;
  }
}
