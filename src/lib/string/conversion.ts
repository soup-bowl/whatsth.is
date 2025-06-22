import { AES } from "crypto-es/lib/aes"
import { TripleDES } from "crypto-es/lib/tripledes"
import { ConversionType } from "./interfaces"

/**
 * Converts a string to or from a specified encoding type.
 *
 * @param toConvert - Whether to convert the string to or from the specified encoding type.
 * @param type - The encoding type to convert to or from.
 * @param thing - The string to be converted.
 * @param phrase - The encryption phrase to use (if the specified encoding type is AES or TDES).
 * @returns The converted string.
 *
 * @throws Error If the specified encoding type is invalid.
 *
 * @example
 * const encoded = StringConversion('to', ConversionType.Base64, 'Hello, world!');
 * const decoded = StringConversion('from', ConversionType.Base64, encoded);
 */
export const StringConversion = (
	toConvert: "to" | "from",
	type: ConversionType,
	thing: string,
	phrase: string = ""
) => {
	switch (type) {
		case ConversionType.Base64:
			return toConvert === "to" ? window.btoa(thing) : window.atob(thing)
		case ConversionType.Hex:
			// https://stackoverflow.com/a/60435654
			return toConvert === "to"
				? thing
						.split("")
						.map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
						.join("")
				: thing
						.split(/(\w\w)/g)
						.filter((p) => !!p)
						.map((c) => String.fromCharCode(parseInt(c, 16)))
						.join("")
		case ConversionType.URI:
			return toConvert === "to" ? encodeURIComponent(thing) : decodeURIComponent(thing)
		case ConversionType.AES:
			return toConvert === "to" ? AES.encrypt(thing, phrase).toString() : AES.decrypt(thing, phrase).toString()
		case ConversionType.TDES:
			return toConvert === "to"
				? TripleDES.encrypt(thing, phrase).toString()
				: TripleDES.decrypt(thing, phrase).toString()
		default:
			return thing
	}
}
