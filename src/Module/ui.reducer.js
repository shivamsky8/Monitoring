// ------------------------------------
// Actions Types
// ------------------------------------
export const START_HTTP_REQUEST = "[UI] START_HTTP_REQUEST";
export const END_HTTP_REQUEST = "[UI] END_HTTP_REQUEST";

export const OPEN_MENU = "[UI] OPEN_MENU";
export const CLOSE_MENU = "[UI] CLOSE_MENU";
export const SELECTED_MENU_ITEM = "[UI] SELECTED_MENU_ITEM";

export const SHOW_LOADER = "[UI] SHOW_LOADER";
export const HIDE_LOADER = "[UI] HIDE_LOADER";

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

export const loading = bool => ({
  type: SHOW_LOADER,
  data: bool
});
//  {
// console.log("bool", bool)
//   return bool
//     ? {
//         type: "SHOW_LOADER",
//         data: bool
//       }
//     : {
//         type: "HIDE_LOADER",
//         data: bool
//       };
// };

export const stopLoading = bool => ({
  type: HIDE_LOADER,
  data: bool
});

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  menu: {
    isOpen: false,
    selectedMenu: 3
  },
  loader: false,
  // checkerQuestions: [
  //   {
  //     id: 1,
  //     que: "Do yoh have symptoms of ferver ?",
  //     select: false
  //   },
  //   {
  //     id: 2,
  //     que: "Do yoh have any cough in past 15 days ?",
  //     select: false
  //   },
  //   {
  //     id: 3,
  //     que: "Do you sneeze often  ?",
  //     select: false
  //   },
  //   {
  //     id: 4,
  //     que: "Do you have symptoms of sore throat ?",
  //     select: false
  //   },
  //   {
  //     id: 5,
  //     que: "Do you have any pain  in a muscle or group of muscles?",
  //     select: false
  //   },
  //   {
  //     id: 6,
  //     que: "Do you have symptoms of Fatigue ?",
  //     select: false
  //   },
  //   {
  //     id: 7,
  //     que: "Do you have any  difficulty while breathing ?",
  //     select: false
  //   },
  //   {
  //     id: 8,
  //     sysptoms: [],
  //     que: "Have you travelled outside your country in past 30 days?",
  //     select: false
  //   },
  //   {
  //     id: 9,
  //     sysptoms: [],
  //     que:
  //       "Have anyone from your family / close contact travelled outside your country in past 30 days?",
  //     select: false
  //   },
  //   {
  //     id: 10,
  //     sysptoms: [],
  //     que:
  //       "Have you travelled inside your country to other cities in past 15 days?",
  //     select: false
  //   },
  //   {
  //     id: 11,
  //     sysptoms: [],
  //     que:
  //       "Have anyone from your family / close contact travelled inside your country to other cities in past 15 days?",
  //     select: false
  //   },
  //   {
  //     id: 12,
  //     sysptoms: [],
  //     que:
  //       "Exposure to a confirmed covid-19 case or suspicious patient in the last two weeks?",
  //     select: false
  //   },
  //   {
  //     id: 13,
  //     sysptoms: [],
  //     que: "Have you visited a health care facility in the past two weeks?",
  //     select: false
  //   }
  // ]
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

    case SHOW_LOADER: {
      return {
        ...state,
        loader: action.data
      };
    }

    case HIDE_LOADER: {
      return {
        ...state,
        loader: action.data
      };
    }

    default:
      return state;
  }
}
