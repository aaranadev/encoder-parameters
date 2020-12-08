interface Options {
  nullAllowed: boolean;
}

type Value = boolean | string | number | object | Array<any>;

/**
 *  A encoder parameters function to transform data in params format
 *
 * @export
 * @param {*} data - Object with key/value to transform
 * @param {*} [serialize] - Serialize to convert keys into output keys [optional]
 * @param {*} [options] - Options to config function [optional]
 * @returns
 */
export default function encoderParameters(
  data: object = {},
  serialize?: object,
  {nullAllowed}: Options = {
    nullAllowed: false,
  },
) {
  const params: string = Object.entries(data)
    .reduce((acc: [string, any], [key, value]: [string, Value]) => {
      if (nullAllowed || (!nullAllowed && value)) {
        const prop: string = serialize ? serialize[key] : key;
        let params: string = `${prop}=${getValueTransformed(value)}`;

        acc.push(params);
      }

      return acc;
    })
    .join('&');

  return encodeURIComponent(params);
}

function getValueTransformed(value: Value) {
  if (!value) {
    return null;
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value;
}
