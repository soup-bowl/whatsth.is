import { timeOutput } from "./time"
import { SecondType } from "./interfaces"

describe("timeOutput", () => {
	test("should convert a valid timestamp to ConversionTime object", () => {
		const timestamp = 1632739200

		const result = timeOutput(timestamp)

		expect(result.string).toBeInstanceOf(Date)
		expect(result.unix).toBe(timestamp)
		expect(result.type).toBe(SecondType.s)
	})

	test("should handle timestamps in milliseconds", () => {
		const timestamp = 1632739200000

		const result = timeOutput(timestamp)

		expect(result.string).toBeInstanceOf(Date)
		expect(result.unix).toBe(timestamp)
		expect(result.type).toBe(SecondType.ms)
	})

	test("should handle timestamps beyond MaxAcceptUnix", () => {
		const result = timeOutput(9999999999999999)

		expect(result.string).toBeInstanceOf(Date)
		expect(result.unix).toBe(253402300799999) // Returns nearest neighbour.
		expect(result.type).toBe(SecondType.ms)
	})
})
