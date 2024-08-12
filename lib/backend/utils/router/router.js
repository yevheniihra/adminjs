"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Router = void 0;
var path = _interopRequireWildcard(require("path"));
var _userComponentsBundler = require("../../bundler/user-components-bundler");
var _appController = _interopRequireDefault(require("../../controllers/app-controller"));
var _apiController = _interopRequireDefault(require("../../controllers/api-controller"));
var _bundlerEnv = _interopRequireDefault(require("../../bundler/bundler-env"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ASSETS_ROOT = `${__dirname}/../../../frontend/assets/`;

/**
 * Type representing the AdminJS.Router
 * @memberof Router
 * @alias RouterType
 */

/**
 * @load ./router.doc.md
 * @namespace
 */
const Router = exports.Router = {
  assets: [{
    path: '/frontend/assets/icomoon.css',
    src: path.join(ASSETS_ROOT, 'styles/icomoon.css')
  }, {
    path: '/frontend/assets/icomoon.eot',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.eot')
  }, {
    path: '/frontend/assets/icomoon.svg',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.svg')
  }, {
    path: '/frontend/assets/icomoon.ttf',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.ttf')
  }, {
    path: '/frontend/assets/icomoon.woff',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.woff')
  }, {
    path: '/frontend/assets/app.bundle.js',
    src: path.join(ASSETS_ROOT, `scripts/app-bundle.${_bundlerEnv.default}.js`)
  }, {
    path: '/frontend/assets/global.bundle.js',
    src: path.join(ASSETS_ROOT, `scripts/global-bundle.${_bundlerEnv.default}.js`)
  }, {
    path: '/frontend/assets/design-system.bundle.js',
    src: path.join(path.parse(require.resolve('@adminjs/design-system')).dir, `../bundle.${_bundlerEnv.default}.js`)
  }, {
    path: '/frontend/assets/logo.svg',
    src: path.join(ASSETS_ROOT, 'images/logo.svg')
  }, {
    path: '/frontend/assets/logo-mini.svg',
    src: path.join(ASSETS_ROOT, 'images/logo-mini.svg')
  }],
  routes: [{
    method: 'GET',
    path: '',
    Controller: _appController.default,
    action: 'index'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}',
    Controller: _appController.default,
    action: 'resource'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search/{query}',
    Controller: _apiController.default,
    action: 'search'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/actions/{action}',
    Controller: _appController.default,
    action: 'resourceAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: _apiController.default,
    action: 'resourceAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/actions/{action}/{query}',
    Controller: _apiController.default,
    action: 'resourceAction'
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: _apiController.default,
    action: 'resourceAction'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/records/{recordId}/{action}',
    Controller: _appController.default,
    action: 'recordAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: _apiController.default,
    action: 'recordAction'
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: _apiController.default,
    action: 'recordAction'
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/bulk/{action}',
    Controller: _appController.default,
    action: 'bulkAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/bulk/{action}',
    Controller: _apiController.default,
    action: 'bulkAction'
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/bulk/{action}',
    Controller: _apiController.default,
    action: 'bulkAction'
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search',
    Controller: _apiController.default,
    action: 'search'
  }, {
    method: 'GET',
    path: '/api/dashboard',
    Controller: _apiController.default,
    action: 'dashboard'
  },
  // Pages
  {
    method: 'GET',
    path: '/pages/{pageName}',
    Controller: _appController.default,
    action: 'page'
  }, {
    method: 'GET',
    path: '/api/pages/{pageName}',
    Controller: _apiController.default,
    action: 'page'
  }, {
    method: 'POST',
    path: '/api/pages/{pageName}',
    Controller: _apiController.default,
    action: 'page'
  }]
};
if (process.env.NODE_ENV === 'production') {
  Router.assets.push({
    path: '/frontend/assets/components.bundle.js',
    src: _userComponentsBundler.outPath
  });
} else {
  Router.routes.push({
    method: 'GET',
    path: '/frontend/assets/components.bundle.js',
    Controller: _appController.default,
    action: 'bundleComponents',
    contentType: 'text/javascript;charset=utf-8'
  });
}
var _default = exports.default = Router;