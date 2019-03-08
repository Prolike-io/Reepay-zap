const recipe_create = require('./creates/recipe');
const authentication = require('./authentication');

const includeApiKey = (request, z, bundle) => {
  if (bundle.authData.apiKey) {
    request.params = request.params || {};
    request.headers.Authorization = bundle.authData.apiKey;
  }
  return request;
};

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: includeApiKey,

  afterResponse: [],

  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: {},

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [recipe_create.key]: recipe_create
  }
};

// Finally, export the app.
module.exports = App;