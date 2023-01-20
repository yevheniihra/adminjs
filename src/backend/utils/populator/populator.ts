import BaseRecord from '../../adapters/record/base-record'
import { populateProperty } from './populate-property'
import { ActionContext } from "../../actions";

/**
 * @load ./populator.doc.md
 * @param {Array<BaseRecord>} records
 * @new In version 3.3
 */
export async function populator(
  records: Array<BaseRecord>,
  excludePopulate: Array<string> = [],
): Promise<Array<BaseRecord>> {
  if (!records || !records.length) {
    return records
  }
  const resourceDecorator = records[0].resource.decorate()
  const allProperties = Object.values(resourceDecorator.getFlattenProperties())

  const lowercaseExclude = excludePopulate.map((str) => str.toLowerCase())

  const references = allProperties.filter(
    (p) => !!p.reference()
      && !lowercaseExclude.includes(p.name().toLowerCase()),
  )

  await Promise.all(references.map(async (propertyDecorator) => {
    // here we have resourceDecorator.options.properties
    // each can have [] excludeOnPopulate
    const {properties = {}} = resourceDecorator.options;

    const key = propertyDecorator.name();
    // @ts-ignore
    const {excludeOnPopulate = null} = properties[key] || {};

    // @ts-ignore
    const context = excludeOnPopulate
      ? excludeOnPopulate.reduce((acc, key) => {
        acc[key] = 0;
        return acc;
      }, {})
      : {};

    await populateProperty(records, propertyDecorator, context as ActionContext)
  }))
  return records
}

export default populator
