import { extend } from 'umi-request';

export const BasicURL = 'http://localhost:3000';

const errorHandler = (error: any) => {
  if (error.response) {
    console.log(error);
  } else {
    console.log(error.message);
  }

  throw error;
};

const request = extend({
  prefix: BasicURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler,
});

request.interceptors.response.use(async (response: any, options: any) => {
  const data = await response.clone().json();
  return response;
});

export default request;

export { request };
