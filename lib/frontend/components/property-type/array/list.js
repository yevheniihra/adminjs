"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _useTranslation = require("../../../hooks/use-translation");
var _utils = require("../../../../utils");
var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const List = props => {
  const {
    property,
    record
  } = props;
  const values = _utils.flat.get(record.params, property.path) || [];
  const {
    translateProperty
  } = (0, _useTranslation.useTranslation)();
  return /*#__PURE__*/_react.default.createElement("span", null, `${translateProperty('length')}: ${values.length}`);
};
var _default = exports.default = (0, _allowOverride.default)(List, 'DefaultArrayListProperty');