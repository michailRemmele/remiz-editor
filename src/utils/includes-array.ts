/**
 * Checks if array includes subarray from zero index
 */
export const includesArray = (array?: Array<unknown>, subarray?: Array<unknown>): boolean => {
  if (!Array.isArray(array) || !Array.isArray(subarray)) {
    return false
  }

  if (subarray.length > array.length) {
    return false
  }

  return subarray.every((item, index) => array[index] === item)
}
