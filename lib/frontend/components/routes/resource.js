"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers/view-helpers"));
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
var _utils = require("../../utils");
var _app = require("../app");
var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));
var _errorMessage = require("../app/error-message");
var _filterDrawer = _interopRequireDefault(require("../app/filter-drawer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getAction = resource => {
  const h = new _viewHelpers.default();
  const resourceId = ':resourceId';
  const actionName = ':actionName';
  const recordId = ':recordId';
  const recordActionUrl = h.recordActionUrl({
    resourceId,
    recordId,
    actionName
  });
  const resourceActionUrl = h.resourceActionUrl({
    resourceId,
    actionName
  });
  const bulkActionUrl = h.bulkActionUrl({
    resourceId,
    actionName
  });
  const resourceActionMatch = (0, _reactRouter.useMatch)(resourceActionUrl);
  const recordActionMatch = (0, _reactRouter.useMatch)(recordActionUrl);
  const bulkActionMatch = (0, _reactRouter.useMatch)(bulkActionUrl);
  const action = (resourceActionMatch === null || resourceActionMatch === void 0 ? void 0 : resourceActionMatch.params.actionName) || (recordActionMatch === null || recordActionMatch === void 0 ? void 0 : recordActionMatch.params.actionName) || (bulkActionMatch === null || bulkActionMatch === void 0 ? void 0 : bulkActionMatch.params.actionName);
  return action ? resource.actions.find(a => a.name === action) : undefined;
};
const ResourceAction = props => {
  const params = (0, _reactRouter.useParams)();
  const {
    resources
  } = props;
  const {
    resourceId
  } = params;
  const [filterVisible, setFilterVisible] = (0, _react.useState)(false);
  const [tag, setTag] = (0, _react.useState)('');
  if (!resourceId) {
    return null;
  }
  const resource = resources.find(r => r.id === resourceId);
  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoResourceError, {
      resourceId: resourceId
    });
  }
  const realEndAction = getAction(resource);
  if (realEndAction && !realEndAction.showInDrawer) {
    return null;
  }
  const listActionName = 'list';
  const listAction = resource.resourceActions.find(r => r.name === listActionName);
  if (!listAction) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoActionError, {
      resourceId: resourceId,
      actionName: listActionName
    });
  }
  const toggleFilter = listAction.showFilter ? () => setFilterVisible(!filterVisible) : undefined;
  const contentTag = (0, _utils.getResourceElementCss)(resource.id, 'list');
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    variant: "grey",
    width: listAction.containerWidth,
    mx: "auto",
    "data-css": contentTag
  }, /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: listAction,
    tag: tag,
    toggleFilter: toggleFilter
  }), /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
    action: listAction,
    resource: resource,
    setTag: setTag
  }), listAction.showFilter ? /*#__PURE__*/_react.default.createElement(_filterDrawer.default, {
    key: filterVisible.toString(),
    resource: resource,
    isVisible: filterVisible,
    toggleFilter: () => {
      setFilterVisible(!filterVisible);
    }
  }) : '');
};
const mapStateToProps = state => ({
  resources: state.resources
});
var _default = exports.default = (0, _allowOverride.default)((0, _reactRedux.connect)(mapStateToProps)(ResourceAction), 'ResourceRoute');