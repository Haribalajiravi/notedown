import packageJson from './../package.json';
export default {
  swagger: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: packageJson.name,
        version: packageJson.version,
      },
    },
  },
  mongo: {
      url: 'mongodb://localhost/notedown'
  },
  port: '3000'
};
