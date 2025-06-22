import { ConversionTime, SecondType } from "./interfaces"

const maxInt32 = 2147483647
const MaxAcceptUnix = 253402300799999

export const timeOutput = (time: number): ConversionTime => {
	if (time > MaxAcceptUnix) {
		return timeOutput(MaxAcceptUnix)
	}

	const conversionDate: Date = time >= 1e11 ? new Date(time) : new Date(time * 1e3)

	return {
		string: conversionDate,
		unix: time,
		overflow: time > maxInt32 ? true : false,
		type: time >= 1e11 ? SecondType.ms : SecondType.s,
	}
}
