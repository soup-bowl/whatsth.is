import { CMYK, HSL, RGB } from "../interfaces";
import htmlCodes from "./colourCodes/htmlColours.json";
import xkcdCodes from "./colourCodes/xkcdColours.json";

export const hexToRgb = (hex: string): RGB => {
	hex = hex.replace("#", "");

	return {
		r: parseInt(hex.substring(0, 2), 16),
		g: parseInt(hex.substring(2, 4), 16),
		b: parseInt(hex.substring(4, 6), 16)
	};
}

export const rgbToHex = (rgb: RGB): string => {
	rgb.r = Math.min(255, Math.max(0, rgb.r));
	rgb.g = Math.min(255, Math.max(0, rgb.g));
	rgb.b = Math.min(255, Math.max(0, rgb.b));

	const hexR = rgb.r.toString(16).padStart(2, "0");
	const hexG = rgb.g.toString(16).padStart(2, "0");
	const hexB = rgb.b.toString(16).padStart(2, "0");

	return `#${hexR}${hexG}${hexB}`;
}

export const rgbToHSL = (rgb: RGB): HSL => {
	const rNormalized = rgb.r / 255;
	const gNormalized = rgb.g / 255;
	const bNormalized = rgb.b / 255;

	const max = Math.max(rNormalized, gNormalized, bNormalized);
	const min = Math.min(rNormalized, gNormalized, bNormalized);
	let h = 0, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case rNormalized:
				h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
				break;
			case gNormalized:
				h = (bNormalized - rNormalized) / d + 2;
				break;
			case bNormalized:
				h = (rNormalized - gNormalized) / d + 4;
				break;
		}

		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100)
	};
}

export const rgbToCMYK = (rgb: RGB): CMYK => {
	const rNormalized = rgb.r / 255;
	const gNormalized = rgb.g / 255;
	const bNormalized = rgb.b / 255;

	const k = 1 - Math.max(rNormalized, gNormalized, bNormalized);
	const c = (1 - rNormalized - k) / (1 - k);
	const m = (1 - gNormalized - k) / (1 - k);
	const y = (1 - bNormalized - k) / (1 - k);

	return {
		c: Math.round(c * 100),
		m: Math.round(m * 100),
		y: Math.round(y * 100),
		k: Math.round(k * 100)
	};
}

export const isValidColorString = (str: string) => {
	const colorPattern = /^(#)?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
	return colorPattern.test(str);
}

export const getContrastingColor = (rgb: RGB): RGB => {
	const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	if (brightness > 128) {
		return { r: 0, g: 0, b: 0 }
	} else {
		return { r: 255, g: 255, b: 255 }
	}
}

export const rgbToString = (rgb: RGB): string => {
	return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export const getHTMLColorName = (hexColor: string): string => getColorName(hexColor, htmlCodes);
export const getXKCDColorName = (hexColor: string): string => getColorName(hexColor, xkcdCodes);

const getColorName = (hexColor: string, collective: { [key: string]: string }): string => {
	hexColor = hexColor.toUpperCase();

	for (const colorName in collective) {
		if (collective[colorName] === hexColor) {
			return colorName;
		}
	}

	return "Not Defined";
}
