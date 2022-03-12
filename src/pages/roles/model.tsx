import * as services from './services';

export default {
  namespace: 'roles',
  state: {
    authorized: false,
  },
  effects: {
    *GET_JSON({ payload, callback }: any, { call, put }: any): any {
      try {
        const response = yield call(services.getJsonRole, payload);
        callback(response);
      } catch (error) {
        callback(null, error);
      }
    },
  },
  reducers: {
    SET_USER: (state: any, { payload }: any) => ({
      ...state,
      ...payload,
      authorized: true,
    }),
    SET_LOGOUT: (state: any) => ({
      ...state,
      user: {},
      authorized: false,
      logged: false,
      permissions: [],
    }),
  },
  subscriptions: {},
};
