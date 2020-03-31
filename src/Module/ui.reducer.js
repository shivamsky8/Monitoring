// ------------------------------------
// Actions Types
// ------------------------------------
export const START_HTTP_REQUEST = "[UI] START_HTTP_REQUEST";
export const END_HTTP_REQUEST = "[UI] END_HTTP_REQUEST";

export const OPEN_MENU = "[UI] OPEN_MENU";
export const CLOSE_MENU = "[UI] CLOSE_MENU";
export const SELECTED_MENU_ITEM = "[UI] SELECTED_MENU_ITEM";

// ------------------------------------
// Actions
// ------------------------------------

export const startHTTPRequest = url => ({
  type: START_HTTP_REQUEST,
  payload: url
});

export const endHTTPRequest = url => ({
  type: END_HTTP_REQUEST,
  payload: url
});

export const openMenu = () => ({
  type: OPEN_MENU
});

export const closeMenu = () => ({
  type: CLOSE_MENU
});

export const SelectedMenuItem = e => ({
  type: SELECTED_MENU_ITEM,
  payload: e
});

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  menu: {
    isOpen: false,
    selectedMenu: 1
  }
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MENU: {
      return {
        ...state,
        menu: {
          ...state.menu,
          isOpen: true
        }
      };
    }

    case CLOSE_MENU: {
      return {
        ...state,
        menu: {
          ...state.menu,
          isOpen: false
        }
      };
    }

    case SELECTED_MENU_ITEM: {
      return {
        ...state,
        menu: {
          ...state.menu,
          selectedMenu: action.payload
        }
      };
    }

    default:
      return state;
  }
}
