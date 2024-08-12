"use strict";

var _react = _interopRequireDefault(require("react"));
var _sinon = _interopRequireDefault(require("sinon"));
var _chai = require("chai");
var _merge = _interopRequireDefault(require("lodash/merge"));
var _i18next = _interopRequireDefault(require("i18next"));
var _react2 = require("@testing-library/react");
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _store = _interopRequireDefault(require("../../store/store"));
var _recordAction = _interopRequireDefault(require("./record-action"));
var _apiClient = _interopRequireDefault(require("../../utils/api-client"));
var _testContextProvider = _interopRequireDefault(require("../spec/test-context-provider"));
var _factory = _interopRequireDefault(require("../spec/factory"));
var TranslateFunctionsFactory = _interopRequireWildcard(require("../../../utils/translate-functions.factory"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultStore = {
  paths: {}
};
const renderSubject = (store = {}, location) => {
  const path = '/resources/:resourceId/records/:recordId/:actionName';
  const storeWithDefault = (0, _merge.default)(defaultStore, store);
  const renderResult = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, {
    location: location
  }, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)(storeWithDefault)
  }, /*#__PURE__*/_react.default.createElement(_reactRouter.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
    path: path,
    element: /*#__PURE__*/_react.default.createElement(_recordAction.default, null)
  })))));
  return renderResult;
};
describe('<RecordAction />', function () {
  let record;
  beforeEach(async function () {
    record = await _factory.default.build('RecordJSON.total');
    _sinon.default.stub(TranslateFunctionsFactory, 'createFunctions').returns({
      translateMessage: _sinon.default.stub().returns('someMessage')
    });
    _sinon.default.stub(_apiClient.default, 'getBaseUrl').returns('/admin');
    _sinon.default.stub(_i18next.default, 'exists').returns(false);
    _sinon.default.stub(_apiClient.default.prototype, 'recordAction').resolves({
      data: {
        record
      }
    });
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  it('renders 404 when there is no resource', async function () {
    const {
      findByTestId
    } = renderSubject({}, '/resources/someResource/records/1234/show');
    const errorBox = await findByTestId('NoResourceError');
    (0, _chai.expect)(errorBox).not.to.be.undefined;
  });
});