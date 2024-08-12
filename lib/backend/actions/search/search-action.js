"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SearchAction = void 0;
var _flat = require("../../../utils/flat");
var _filter = _interopRequireDefault(require("../../utils/filter/filter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * @implements Action
 * @category Actions
 * @module SearchAction
 * @description
 * Used to search particular record based on "title" property. It is used by
 * select fields with autocomplete.
 * Uses {@link ShowAction} component to render form
 * @private
 */
const SearchAction = exports.SearchAction = {
  name: 'search',
  isVisible: false,
  actionType: 'resource',
  /**
   * Search records by query string.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   * @memberof module:SearchAction
   *
   * @return  {Promise<SearchResponse>}  populated record
   * @implements ActionHandler
   */
  handler: async (request, response, data) => {
    var _request$query, _decorated$options;
    const {
      currentAdmin,
      resource
    } = data;
    const {
      query
    } = request;
    const decorated = resource.decorate();
    const titlePropertyName = ((_request$query = request.query) === null || _request$query === void 0 ? void 0 : _request$query.searchProperty) ?? decorated.titleProperty().name();
    const {
      sortBy = ((_decorated$options = decorated.options) === null || _decorated$options === void 0 || (_decorated$options = _decorated$options.sort) === null || _decorated$options === void 0 ? void 0 : _decorated$options.sortBy) || titlePropertyName,
      direction = 'asc',
      filters: customFilters = {},
      perPage = 50,
      page = 1
    } = _flat.flat.unflatten(query || {});
    const queryString = request.params && request.params.query;
    const queryFilter = queryString ? {
      [titlePropertyName]: queryString
    } : {};
    const filters = {
      ...customFilters,
      ...queryFilter
    };
    const filter = new _filter.default(filters, resource);
    const records = await resource.find(filter, {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort: {
        sortBy,
        direction
      }
    });
    return {
      records: records.map(record => record.toJSON(currentAdmin))
    };
  }
};
var _default = exports.default = SearchAction;
/**
 * Response of a [Search]{@link ApiController#search} action in the API
 * @memberof module:SearchAction
 * @alias SearchResponse
 */