"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _designSystem = require("@adminjs/design-system");
var _errorType = require("../../../utils/error-type.enum");
var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));
var _apiClient = _interopRequireDefault(require("../../utils/api-client"));
var _errorMessage = require("../app/error-message");
var _wrapper = _interopRequireDefault(require("./utils/wrapper"));
var _app = require("../app");
var _hooks = require("../../hooks");
var _drawerPortal = _interopRequireDefault(require("../app/drawer-portal"));
var _mergeRecordResponse = _interopRequireDefault(require("../../hooks/use-record/merge-record-response"));
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const api = new _apiClient.default();
const RecordAction = () => {
  const [record, setRecord] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const params = (0, _reactRouter.useParams)();
  const addNotice = (0, _hooks.useNotice)();
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  const {
    actionName,
    recordId,
    resourceId
  } = params;
  const resource = (0, _hooks.useResource)(resourceId);
  const action = record && record.recordActions.find(r => r.name === actionName);
  const fetchRecord = () => {
    setLoading(true);
    api.recordAction(params).then(response => {
      var _response$data$record, _response$data$record2;
      if (response.data.notice && response.data.notice.type === 'error') {
        addNotice(response.data.notice);
      }
      if (!((_response$data$record = response.data.record) !== null && _response$data$record !== void 0 && (_response$data$record = _response$data$record.baseError) !== null && _response$data$record !== void 0 && _response$data$record.type) || ![_errorType.ErrorTypeEnum.App, _errorType.ErrorTypeEnum.NotFound, _errorType.ErrorTypeEnum.Forbidden].includes((_response$data$record2 = response.data.record) === null || _response$data$record2 === void 0 || (_response$data$record2 = _response$data$record2.baseError) === null || _response$data$record2 === void 0 ? void 0 : _response$data$record2.type)) {
        setRecord(response.data.record);
      }
    }).catch(error => {
      addNotice({
        message: translateMessage('errorFetchingRecord', resourceId),
        type: 'error'
      });
      throw error;
    }).finally(() => {
      setLoading(false);
    });
  };
  (0, _react.useEffect)(() => {
    fetchRecord();
  }, [actionName, recordId, resourceId]);
  const handleActionPerformed = (0, _react.useCallback)((oldRecord, response) => {
    if (response.record) {
      setRecord((0, _mergeRecordResponse.default)(oldRecord, response));
    } else {
      fetchRecord();
    }
  }, [fetchRecord]);
  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoResourceError, {
      resourceId: resourceId
    });
  }

  // When the user visits this route (record action) from a different, than the current one, record.
  // It renders everything with a new resource. The old record remains until useEffect fetches data
  // from the API. that is why we have to check if the current record has correct record.id.
  // Alternative approach would be to setRecord(undefined) before the fetch, but it is async and
  // we cannot be sure that the component wont be rendered (it will be at least once) with the
  // wrong data.
  const hasDifferentRecord = record && record.id && record.id.toString() !== recordId;
  if (loading || hasDifferentRecord) {
    const actionFromResource = resource.actions.find(r => r.name === actionName);
    return actionFromResource !== null && actionFromResource !== void 0 && actionFromResource.showInDrawer ? /*#__PURE__*/_react.default.createElement(_drawerPortal.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null)) : /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null);
  }
  if (!action) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoActionError, {
      resourceId: resourceId,
      actionName: actionName
    });
  }
  if (!record) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoRecordError, {
      resourceId: resourceId,
      recordId: recordId
    });
  }
  if (action.showInDrawer) {
    return /*#__PURE__*/_react.default.createElement(_drawerPortal.default, {
      width: action.containerWidth
    }, /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
      action: action,
      resource: resource,
      record: record
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_wrapper.default, {
    width: action.containerWidth
  }, /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: action,
    record: record,
    actionPerformed: response => handleActionPerformed(record, response)
  }), /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
    action: action,
    resource: resource,
    record: record
  }));
};
var _default = exports.default = (0, _allowOverride.default)(RecordAction, 'RecordActionRoute');