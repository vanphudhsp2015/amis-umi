import store from 'store';

const STORED_SETTINGS = (storedSettings: any) => {
  const settings = {};
  Object.keys(storedSettings).forEach((key: any) => {
    const item = store.get(`app.settings.${key}`);
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key];
  });
  return settings;
};

export default {
  namespace: 'settings',
  state: {
    ...STORED_SETTINGS({
      isMobileView: false,
      isMobileMenuOpen: false,
      isLightTheme: true,
      isSettingsOpen: false,
      isMenuTop: false,
      isMenuCollapsed: false,
      isBorderless: true,
      isSquaredBorders: false,
      isFixedWidth: false,
      isMenuShadow: true,
      isGreenTheme: false,
    }),
    categories: [],
  },
  reducers: {
    SET_SETTING_COLLAPSED: (state: any, action: any) => ({ ...state, ...action.payload }),
    SET_STATE: (state: any, action: any) => ({ ...state, ...action.payload }),
    SET_CHANGE_BACKGROUND: (state: any, { payload }: any) => ({ ...state, background: payload }),
    SET_COUNT_CONTRACT: (state: any, { payload }: any) => ({
      ...state,
      categories: { data: payload.parsePayload },
    }),
  },
  effects: {
    *CHANGE_SETTING({ payload: { setting, value } }: any, { put }: any) {
      yield store.set(`app.settings.${setting}`, value);
      yield put({
        type: 'SET_STATE',
        payload: {
          [setting]: value,
        },
      });
    },
    *CHANGE_BACKGROUND({ payload }: any, { put }: any) {
      localStorage.setItem('background', payload);
      yield put({
        type: 'SET_CHANGE_BACKGROUND',
        payload,
      });
    },
    *CHANGE_SETTING_COLLAPSED({ payload: { setting, value } }: any, { put }: any) {
      yield put({
        type: 'SET_SETTING_COLLAPSED',
        payload: {
          [setting]: value,
        },
      });
    },
  },
  subscriptions: {
    setup: ({ dispatch, history }: any) => {
      // load settings from url on app load
      history.listen((params: any) => {
        const { query } = params;
        Object.keys(query).forEach((key) => {
          dispatch({
            type: 'CHANGE_SETTING',
            payload: {
              setting: key,
              value: query[key] === 'true',
            },
          });
        });
      });

      // detect isMobileView setting on app load and window resize
      const isMobileView = (load = false) => {
        const currentState = global.window.innerWidth < 768;
        const prevState = store.get('app.settings.isMobileView');
        if (currentState !== prevState || load) {
          dispatch({
            type: 'CHANGE_SETTING',
            payload: {
              setting: 'isMobileView',
              value: currentState,
            },
          });
        }
      };
      window.addEventListener('resize', () => {
        isMobileView();
      });
      isMobileView(true);
    },
  },
};
