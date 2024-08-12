"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _styledComponents = require("styled-components");
var _reactI18next = require("react-i18next");
var _i18next = _interopRequireDefault(require("i18next"));
var _application = _interopRequireDefault(require("./components/application"));
var _propertyType = _interopRequireWildcard(require("./components/property-type"));
var _store = _interopRequireDefault(require("./store/store"));
var _viewHelpers = _interopRequireDefault(require("../backend/utils/view-helpers/view-helpers"));
var AppComponents = _interopRequireWildcard(require("./components/app"));
var Hooks = _interopRequireWildcard(require("./hooks"));
var _apiClient = _interopRequireDefault(require("./utils/api-client"));
var _withNotice = _interopRequireDefault(require("./hoc/with-notice"));
var _flat = require("../utils/flat");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const env = {
  NODE_ENV: process.env.NODE_ENV || 'development'
};
const store = (0, _store.default)(window.REDUX_STATE);
const theme = window.THEME;
const {
  locale
} = window.REDUX_STATE;
_i18next.default.use(_reactI18next.initReactI18next).init({
  resources: {
    [locale.language]: {
      translation: locale.translations
    }
  },
  lng: locale.language,
  interpolation: {
    escapeValue: false
  }
});
const Application = /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
  theme: theme
}, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_application.default, null))));

// eslint-disable-next-line no-undef
window.regeneratorRuntime = regeneratorRuntime;
var _default = exports.default = {
  withNotice: _withNotice.default,
  Application,
  ViewHelpers: _viewHelpers.default,
  UserComponents: {},
  ApiClient: _apiClient.default,
  BasePropertyComponent: _propertyType.default,
  CleanPropertyComponent: _propertyType.CleanPropertyComponent,
  env,
  ...AppComponents,
  ...Hooks,
  flat: _flat.flat
};