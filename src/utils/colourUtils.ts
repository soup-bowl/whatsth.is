import { RGB } from "../interfaces";

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

export const isValidColorString = (str: string) => {
	const colorPattern = /^(#)?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
	return colorPattern.test(str);
}

export const getContrastingColor = (rgb: RGB) => {
	const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	return brightness > 128 ? [0, 0, 0] : [255, 255, 255];
}
