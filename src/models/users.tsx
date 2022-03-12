import * as services from '@/services/users';
import { history } from 'umi';
import { notification } from 'antd';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const UserModel = {
  namespace: 'user',
  state: {
    authorized: false,
  },
  effects: {
    *LOGIN({ payload }: any, { call, put }: any): any {
      try {
        const response = yield call(services.login, payload);
        if (response.status === 200) {
          yield put({
            type: 'SET_USER',
            payload: response,
          });
        } else {
          notification.error({
            message: 'THÔNG BÁO',
            description: 'Đăng nhập không thành công. Bạn vui lòng kiểm tra lại thông tin đã nhập.',
          });
        }
      } catch (error) {
        notification.error({
          message: 'THÔNG BÁO',
          description: 'Đăng nhập không thành công. Bạn vui lòng kiểm tra lại thông tin đã nhập.',
        });
        yield put({
          type: 'SET_ERROR',
        });
      }
    },
    *LOGOUT(_: any, saga: any) {
      try {
        yield saga.put({
          type: 'SET_LOGOUT',
        });
        history.push('/login');
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
        });
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
  subscriptions: {
    setup: ({ dispatch }: any) => {
      dispatch({
        type: 'LOAD_CURRENT_ACCOUNT',
        payload: {
          access_token: cookies.get('access_token'),
          token_type: cookies.get('token_type'),
        },
      });
    },
  },
};
export default UserModel;
