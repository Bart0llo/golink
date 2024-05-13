import { customAlphabet } from "nanoid";

/**
 * generateID
 * Generates a random ID based on the specified options.
 * @param {number} length - The length of the ID to generate.
 * @param {Options} [options] - Options for customizing ID generation.
 * @param {boolean} [options.onlyNumbers] - If true, generate ID with only numeric characters.
 * @param {boolean} [options.onlyLetters] - If true, generate ID with only alphabetic characters.
 * @param {string} [options.customAlb] - Custom alphabet to generate ID from.
 * @returns {string} The generated ID.
 *
 * The Options object allows for customizing the ID generation to specific needs.
 * If no Options object is provided, the function will use a default alphabet
 * that includes both letters and numbers.
 *
 * If the onlyNumbers option is true, the function will generate an ID with only
 * numeric characters.
 *
 * If the onlyLetters option is true, the function will generate an ID with only
 * alphabetic characters.
 *
 * If a custom alphabet is provided using the customAlb option, the function will
 * use that custom alphabet to generate the ID.
 *
 * The length parameter specifies how long the ID should be.
 *
 * The function will return a string which is the generated ID.
 */
export function generateID(length: number, options?: Options): string {
  if (options === null || options === undefined) {
    options = {};
  }
  let letters: string;
  if (options.onlyNumbers) {
    letters = "0123456789";
  } else if (options.onlyLetters) {
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  } else if (options.customAlb) {
    letters = options.customAlb;
  } else {
    letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }

  const alphabet = customAlphabet(letters);
  return alphabet(length);
}

/**
 * Options for customizing ID generation.
 *
 * @typedef {Object} Options
 * @property {boolean} [onlyNumbers] - If true, generate ID with only numeric characters.
 * @property {boolean} [onlyLetters] - If true, generate ID with only alphabetic characters.
 * @property {string} [customAlb] - Custom alphabet to generate ID from.
 */
interface Options {
  onlyNumbers?: boolean;
  onlyLetters?: boolean;
  customAlb?: string;
}
