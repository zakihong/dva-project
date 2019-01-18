const publicPath = '/';
export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ],
    'lodash'
  ],
  proxy: {
    '/api': {
      changeOrigin: true,
      target: 'http://172.16.42.205:7001/',
      pathRewrite: { '^/api': '' }
    }
  },
  publicPath,
  define: { publicPath },
  alias: {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    request: `${__dirname}/src/utils/request`,
    config: `${__dirname}/src/utils/config`,
    services: `${__dirname}/src/services`,
    assets: `${__dirname}/src/assets`
  },
  es5ImcompatibleVersions: true,
  theme: './src/styles/theme.js'
};
