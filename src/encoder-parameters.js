/**
 *  A encoder parameters function to transform data in params format
 *
 * @export
 * @param {*} data - Object with key/value to transform
 * @param {*} [serialize] - Serialize to convert keys into output keys [optional]
 * @returns
 */
export default function encoderParameters (data = {}, serialize) {
  let params = '?';

  Object.entries(data).map((values) => {
    const [index, value] = values;

    const key = (serialize && serialize[index]) || index;

    if (value) {
      params += `${key}=${value}`;
    }

    params += '&';

    return params;
  })

  params = params.slice(0, -1);

  return params;
}
