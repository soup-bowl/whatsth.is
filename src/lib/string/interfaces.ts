export interface UserAgent {
	browser: {
		name: string
		version: string
	}
	engine: {
		name: string
		version: string
	}
	system: {
		name: string
		version: string
	}
	device?: string
	cpu?: string
}

export interface ConversionTime {
	string: Date
	unix: number
	overflow: boolean
	type: SecondType
}

export enum SecondType {
	s = 1,
	ms = 2,
	us = 3,
}

export interface RGB {
	r: number
	g: number
	b: number
}

export interface HSL {
	h: number
	s: number
	l: number
}

export interface CMYK {
	c: number
	m: number
	y: number
	k: number
}

export interface Hue {
	p: number
	q: number
	t: number
}

export interface IColourValues {
	hex: string
	rgb: RGB
	hsl: HSL
	cmyk: CMYK
	htmlCode: string
	xkcdCode: string
	oxVar: string
}

export enum ConversionType {
	Base64 = 0,
	Hex = 1,
	URI = 2,
	AES = 10,
	TDES = 11,
}
