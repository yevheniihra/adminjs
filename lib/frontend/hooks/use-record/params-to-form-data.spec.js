"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));
var _chai = require("chai");
var _paramsToFormData = _interopRequireWildcard(require("./params-to-form-data"));
require("../../components/spec/record-json.factory");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('recordToFormData', function () {
  const propertyKey = 'someProperty';
  it('converts objects to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: {}
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_EMPTY_OBJECT);
  });
  it('converts nulls to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: null
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_NULL);
  });
  it('converts empty array to const', async function () {
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: []
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(_paramsToFormData.FORM_VALUE_EMPTY_ARRAY);
  });
  it('does not convert date to empty object', async () => {
    const date = new Date();
    const record = await _factoryGirl.default.build('RecordJSON', {
      params: {
        [propertyKey]: date
      }
    });
    (0, _chai.expect)((0, _paramsToFormData.default)(record.params).get(propertyKey)).to.equal(date.toISOString());
  });
});