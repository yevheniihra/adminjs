"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.List = void 0;
var _designSystem = require("@adminjs/design-system");
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));
var _useRecords = _interopRequireDefault(require("../../hooks/use-records/use-records"));
var _useSelectedRecords = _interopRequireDefault(require("../../hooks/use-selected-records/use-selected-records"));
var _utils = require("../../utils");
var _recordsTable = _interopRequireDefault(require("../app/records-table/records-table"));
var _appendForceRefresh = require("./utils/append-force-refresh");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const List = ({
  resource,
  setTag
}) => {
  const {
    records,
    loading,
    direction,
    sortBy,
    page,
    total,
    fetchData,
    perPage
  } = (0, _useRecords.default)(resource.id);
  const {
    selectedRecords,
    handleSelect,
    handleSelectAll,
    setSelectedRecords
  } = (0, _useSelectedRecords.default)(records);
  const location = (0, _reactRouter.useLocation)();
  const navigate = (0, _reactRouter.useNavigate)();
  (0, _react.useEffect)(() => {
    if (setTag) {
      setTag(total.toString());
    }
  }, [total]);
  (0, _react.useEffect)(() => {
    setSelectedRecords([]);
  }, [resource.id]);
  (0, _react.useEffect)(() => {
    const search = new URLSearchParams(location.search);
    if (search.get(_appendForceRefresh.REFRESH_KEY)) {
      setSelectedRecords([]);
    }
  }, [location.search]);
  const handleActionPerformed = () => fetchData();
  const handlePaginationChange = pageNumber => {
    const search = new URLSearchParams(location.search);
    search.set('page', pageNumber.toString());
    navigate({
      search: search.toString()
    });
  };
  const contentTag = (0, _utils.getActionElementCss)(resource.id, 'list', 'table-wrapper');
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    variant: "white",
    "data-css": contentTag
  }, /*#__PURE__*/_react.default.createElement(_recordsTable.default, {
    resource: resource,
    records: records,
    actionPerformed: handleActionPerformed,
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
    selectedRecords: selectedRecords,
    direction: direction,
    sortBy: sortBy,
    isLoading: loading
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    mt: "xl",
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Pagination, {
    page: page,
    perPage: perPage,
    total: total,
    onChange: handlePaginationChange
  })));
};
const OverridableList = exports.List = exports.default = (0, _allowOverride.default)(List, 'DefaultListAction');