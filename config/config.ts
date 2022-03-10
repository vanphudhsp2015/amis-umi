import defaultSettings from './defaultSettings';
import { defineConfig } from 'umi';
import routes from './config.route';
import dotenv from 'dotenv';

const env = dotenv.config().parsed;
const envKeys = (Object.keys(env) as Array<keyof typeof env>).reduce((prev, next) => {
  prev[next] = env[next];
  return prev;
}, {});

export default defineConfig({
  metas: [
    {
      name: 'fb:app_id',
      content: '911093392778917',
    },
    {
      name: 'og:image',
      content: '/thumbnail.png',
    },
    {
      name: 'og:locale',
      content: 'vi_VN',
    },
    {
      name: 'og:type',
      content: 'website',
    },
    {
      name: 'og:title',
      content: 'Amis',
    },
    {
      name: 'og:description',
      content: 'Amis',
    },
    {
      name: 'description',
      content: 'Amis',
    },
  ],
  hash: true,
  antd: {},
  define: envKeys,
  dva: {
    hmr: true,
  },
  lessLoader: {},
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: false,
    title: false,
  },
  // dynamicImport: {
  //   loading: '@/components/LayoutComponents/Loader',
  // },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: 'Amis',
  ignoreMomentLocale: true,
  publicPath: '/',
  manifest: {
    basePath: '/',
  },
  // chunks: ['vendors', 'umi'],
  // chainWebpack: function (config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
  fastRefresh: {},
});
