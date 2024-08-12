"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.populator = populator;
var _populateProperty = require("./populate-property");
/**
 * @load ./populator.doc.md
 * @param {Array<BaseRecord>} records
 * @new In version 3.3
 */
async function populator(records, excludePopulate = []) {
  if (!records || !records.length) {
    return records;
  }
  const resourceDecorator = records[0].resource.decorate();
  const allProperties = Object.values(resourceDecorator.getFlattenProperties());
  const lowercaseExclude = excludePopulate.map(str => str.toLowerCase());
  const references = allProperties.filter(p => !!p.reference() && !lowercaseExclude.includes(p.name().toLowerCase()));
  await Promise.all(references.map(async propertyDecorator => {
    // here we have resourceDecorator.options.properties
    // each can have [] excludeOnPopulate
    const {
      properties = {}
    } = resourceDecorator.options;
    const key = propertyDecorator.name();
    // @ts-ignore
    const {
      excludeOnPopulate = null,
      preventFromPopulate = false
    } = properties[key] || {};
    if (preventFromPopulate) return;

    // @ts-ignore
    const context = excludeOnPopulate ? excludeOnPopulate.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {}) : {};
    await (0, _populateProperty.populateProperty)(records, propertyDecorator, context);
  }));
  return records;
}
var _default = exports.default = populator;