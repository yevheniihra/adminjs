"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateProperties = decorateProperties;
var _adapters = require("../../../adapters");
var _property = require("../../property");
var _getPropertyByKey = require("./get-property-by-key");
var _pathToParts = require("../../../../utils/flat/path-to-parts");
const decorateDatabaseProperties = (resource, admin, decorator) => {
  const {
    options
  } = decorator;
  return resource.properties().reduce((memo, property) => {
    const decoratedProperty = new _property.PropertyDecorator({
      property,
      admin,
      options: options.properties && options.properties[property.name()],
      resource: decorator
    });
    memo[property.name()] = decoratedProperty;
    return memo;
  }, {});
};
const decorateVirtualProperties = (dbProperties, admin, decorator) => {
  const {
    options
  } = decorator;
  if (options.properties) {
    return Object.keys(options.properties).reduce((memo, key) => {
      const existingProperty = (0, _getPropertyByKey.getPropertyByKey)(key, dbProperties);
      if (!existingProperty) {
        const property = new _adapters.BaseProperty({
          path: key,
          isSortable: false
        });
        memo[key] = new _property.PropertyDecorator({
          property,
          admin,
          options: options.properties && options.properties[key],
          resource: decorator,
          isVirtual: true
        });
        return memo;
      }
      return memo;
    }, {});
  }
  return {};
};

/**
 * This function moves nested properties to existing mixed properties if there are any.
 * So that they could be printed as Section in the UI, and handled together as an Array if there
 * is a need for that.
 *
 * @param {DecoratedProperties} dbProperties
 * @param {DecoratedProperties} virtualProperties
 * @private
 * @hide
 */
const organizeNestedProperties = (dbProperties, virtualProperties) => {
  const properties = {
    ...dbProperties,
    ...virtualProperties
  };
  const rootPropertyKeys = Object.keys(properties).filter(key => {
    const property = properties[key];
    // reverse because we start by by finding from the longest path
    // and removes itself. (skips arrays)
    // changes 'root.nested.0.nested1' to [root.nested', 'root']
    const parts = (0, _pathToParts.pathToParts)(property.propertyPath, {
      skipArrayIndexes: true
    }).reverse().splice(1);
    if (parts.length) {
      const mixedPropertyPath = parts.find(part => properties[part] && properties[part].type() === 'mixed');
      if (mixedPropertyPath) {
        const mixedProperty = properties[mixedPropertyPath];
        mixedProperty.addSubProperty(property);
        // remove from the root properties
        return false;
      }
    }
    return true;
  });
  return rootPropertyKeys.reduce((memo, key) => {
    memo[key] = properties[key];
    return memo;
  }, {});
};

/**
 * Initializes PropertyDecorator for all properties within a resource. When
 * user passes new property in the options - it will be created as well.
 *
 * @returns {Object<string,PropertyDecorator>}
 * @private
 */
function decorateProperties(resource, admin, decorator) {
  const dbProperties = decorateDatabaseProperties(resource, admin, decorator);
  const virtualProperties = decorateVirtualProperties(dbProperties, admin, decorator);
  return organizeNestedProperties(dbProperties, virtualProperties);
}