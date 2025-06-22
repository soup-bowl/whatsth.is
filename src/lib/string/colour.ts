import htmlCodes from "../codes/html.json"
import xkcdCodes from "../codes/xkcd.json"
import { CMYK, HSL, IColourValues, RGB } from "./interfaces"

const hexToRgb = (hex: string): RGB => {
	hex = hex.replace("#", "")

	return {
		r: parseInt(hex.substring(0, 2), 16),
		g: parseInt(hex.substring(2, 4), 16),
		b: parseInt(hex.substring(4, 6), 16),
	}
}

const rgbToHex = (rgb: RGB): string => {
	rgb.r = Math.min(255, Math.max(0, rgb.r))
	rgb.g = Math.min(255, Math.max(0, rgb.g))
	rgb.b = Math.min(255, Math.max(0, rgb.b))

	const hexR = rgb.r.toString(16).padStart(2, "0")
	const hexG = rgb.g.toString(16).padStart(2, "0")
	const hexB = rgb.b.toString(16).padStart(2, "0")

	return `#${hexR}${hexG}${hexB}`
}

const rgbToHSL = (rgb: RGB): HSL => {
	const rNormalized = rgb.r / 255
	const gNormalized = rgb.g / 255
	const bNormalized = rgb.b / 255

	const max = Math.max(rNormalized, gNormalized, bNormalized)
	const min = Math.min(rNormalized, gNormalized, bNormalized)
	let h = 0,
		s
	const l = (max + min) / 2

	if (max === min) {
		h = s = 0 // achromatic
	} else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

		switch (max) {
			case rNormalized:
				h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0)
				break
			case gNormalized:
				h = (bNormalized - rNormalized) / d + 2
				break
			case bNormalized:
				h = (rNormalized - gNormalized) / d + 4
				break
		}

		h /= 6
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	}
}

const rgbToCMYK = (rgb: RGB): CMYK => {
	const rNormalized = rgb.r / 255
	const gNormalized = rgb.g / 255
	const bNormalized = rgb.b / 255

	const k = 1 - Math.max(rNormalized, gNormalized, bNormalized)
	const c = (1 - rNormalized - k) / (1 - k)
	const m = (1 - gNormalized - k) / (1 - k)
	const y = (1 - bNormalized - k) / (1 - k)

	return {
		c: Math.round(c * 100),
		m: Math.round(m * 100),
		y: Math.round(y * 100),
		k: Math.round(k * 100),
	}
}

const hslToRGB = (hsl: HSL): RGB => {
	const hueToRGB = (p: number, q: number, t: number): number => {
		if (t < 0) t += 1
		if (t > 1) t -= 1
		if (t < 1 / 6) return p + (q - p) * 6 * t
		if (t < 1 / 2) return q
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
		return p
	}

	const { h, s, l } = hsl
	const hNormalized = h / 360
	const sNormalized = s / 100
	const lNormalized = l / 100

	if (sNormalized === 0) {
		// Achromatic color (gray)
		const grayValue = Math.round(lNormalized * 255)
		return { r: grayValue, g: grayValue, b: grayValue }
	}

	const q = lNormalized < 0.5 ? lNormalized * (1 + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized
	const p = 2 * lNormalized - q

	const r = Math.round(hueToRGB(p, q, hNormalized + 1 / 3) * 255)
	const g = Math.round(hueToRGB(p, q, hNormalized) * 255)
	const b = Math.round(hueToRGB(p, q, hNormalized - 1 / 3) * 255)

	return { r, g, b }
}

const cmykToRGB = (cmyk: CMYK): RGB => {
	const { c, m, y, k } = cmyk
	const cNormalized = c / 100
	const mNormalized = m / 100
	const yNormalized = y / 100
	const kNormalized = k / 100

	const r = Math.round(255 * (1 - cNormalized) * (1 - kNormalized))
	const g = Math.round(255 * (1 - mNormalized) * (1 - kNormalized))
	const b = Math.round(255 * (1 - yNormalized) * (1 - kNormalized))

	return { r, g, b }
}

const getHTMLColorName = (hexColor: string): string => getColorName(hexColor, htmlCodes)
const getXKCDColorName = (hexColor: string): string => getColorName(hexColor, xkcdCodes)

const getColorName = (hexColor: string, collective: { [key: string]: string }): string => {
	hexColor = hexColor.toUpperCase()

	for (const colorName in collective) {
		if (collective[colorName] === hexColor) {
			return colorName
		}
	}

	return "Not Defined"
}

export const isValidColorString = (str: string) => {
	const colorPattern = /^(#)?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
	return colorPattern.test(str)
}

export const rgbToAll = (rgb: RGB): IColourValues => {
	const hex = rgbToHex(rgb)
	return {
		hex: hex,
		rgb: rgb,
		cmyk: rgbToCMYK(rgb),
		hsl: rgbToHSL(rgb),
		htmlCode: getHTMLColorName(hex),
		xkcdCode: getXKCDColorName(hex),
		oxVar: hex.toUpperCase().replace("#", "0x"),
	}
}

export const hexToAll = (hex: string): IColourValues => rgbToAll(hexToRgb(hex))

export const hslToAll = (hsl: HSL): IColourValues => rgbToAll(hslToRGB(hsl))

export const cmykToAll = (cmyk: CMYK): IColourValues => rgbToAll(cmykToRGB(cmyk))
