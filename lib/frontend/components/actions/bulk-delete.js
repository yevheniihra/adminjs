"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BulkDelete = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
var _withNotice = _interopRequireDefault(require("../../hoc/with-notice"));
var _hooks = require("../../hooks");
var _utils = require("../../utils");
var _apiClient = _interopRequireDefault(require("../../utils/api-client"));
var _actionHeader = _interopRequireDefault(require("../app/action-header/action-header"));
var _propertyType = _interopRequireDefault(require("../property-type"));
var _appendForceRefresh = require("./utils/append-force-refresh");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * @name BulkDeleteAction
 * @category Actions
 * @description Deletes selected records.
 * @component
 * @private
 */
const BulkDelete = props => {
  const {
    resource,
    records,
    action,
    addNotice
  } = props;
  const navigate = (0, _reactRouter.useNavigate)();
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    translateMessage,
    translateButton
  } = (0, _hooks.useTranslation)();
  if (!records) {
    return /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('pickSomeFirstToRemove', resource.id));
  }
  const handleClick = () => {
    const api = new _apiClient.default();
    setLoading(true);
    const recordIds = records.map(r => r.id);
    api.bulkAction({
      resourceId: resource.id,
      actionName: action.name,
      recordIds,
      method: 'post'
    }).then(response => {
      setLoading(false);
      if (response.data.notice) {
        addNotice(response.data.notice);
      }
      if (response.data.redirectUrl) {
        const search = new URLSearchParams(window.location.search);
        // bulk function have recordIds in the URL so it has to be stripped before redirect
        search.delete('recordIds');
        navigate((0, _appendForceRefresh.appendForceRefresh)(response.data.redirectUrl, search.toString()));
      }
    }).catch(error => {
      setLoading(false);
      addNotice({
        message: translateMessage('bulkDeleteError', resource.id),
        type: 'error'
      });
      throw error;
    });
  };
  const contentTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-content');
  const tableTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'table');
  const footerTag = (0, _utils.getActionElementCss)(resource.id, action.name, 'drawer-footer');
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_designSystem.DrawerContent, {
    "data-css": contentTag
  }, action !== null && action !== void 0 && action.showInDrawer ? /*#__PURE__*/_react.default.createElement(_actionHeader.default, _extends({
    omitActions: true
  }, props)) : null, /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    mb: "xxl",
    variant: "danger",
    message: translateMessage(records.length > 1 ? 'theseRecordsWillBeRemoved_plural' : 'theseRecordsWillBeRemoved', resource.id, {
      count: records.length
    })
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Table, {
    "data-css": tableTag
  }, /*#__PURE__*/_react.default.createElement(_designSystem.TableBody, null, records.map(record => /*#__PURE__*/_react.default.createElement(_designSystem.TableRow, {
    key: record.id
  }, /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, null, /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    where: "list",
    property: resource.titleProperty,
    resource: resource,
    record: record
  }))))))), /*#__PURE__*/_react.default.createElement(_designSystem.DrawerFooter, {
    "data-css": footerTag
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary",
    size: "lg",
    onClick: handleClick,
    disabled: loading
  }, loading ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Fade",
    spin: true
  }) : null, translateButton(records.length > 1 ? 'confirmRemovalMany_plural' : 'confirmRemovalMany', resource.id, {
    count: records.length
  }))));
};
const FormattedBulkDelete = (0, _withNotice.default)(BulkDelete);
const OverridableFormattedBulkDelete = exports.BulkDelete = exports.default = (0, _allowOverride.default)(FormattedBulkDelete, 'DefaultBulkDeleteAction');