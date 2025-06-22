import { hexToAll, rgbToAll, isValidColorString } from "./colour"
import { IColourValues } from "./interfaces"

const expectedValues: IColourValues = {
	hex: "#9c27b0",
	rgb: { r: 156, g: 39, b: 176 },
	cmyk: { c: 11, m: 78, y: 0, k: 31 },
	hsl: { h: 291, s: 64, l: 42 },
	htmlCode: "Not Defined",
	xkcdCode: "Not Defined",
	oxVar: "0x9C27B0",
}

describe("Color Conversion Functions", () => {
	test("hexToAll should convert a hex color to all color formats", () => {
		expect(hexToAll("#9c27b0")).toEqual(expectedValues)
	})

	test("rgbToAll should convert RGB to all color formats", () => {
		expect(rgbToAll({ r: 156, g: 39, b: 176 })).toEqual(expectedValues)
	})

	test("isValidColorString should return true for valid color strings", () => {
		expect(isValidColorString("#FF5733")).toBe(true)
		expect(isValidColorString("FF5733")).toBe(true)
		expect(isValidColorString("#ABC")).toBe(true)
	})

	test("isValidColorString should return false for invalid color strings", () => {
		expect(isValidColorString("#GHIJKL")).toBe(false)
		expect(isValidColorString("12345")).toBe(false)
		expect(isValidColorString("#1234567")).toBe(false)
	})
})
