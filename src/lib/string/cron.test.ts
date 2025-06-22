import { calculateCronString, checkForValidCronCode, encodeCronCode, decodeCronCode } from "./cron"

describe("calculateCronString Function", () => {
	test("should calculate a human-readable description of a valid cron expression", () => {
		const description = calculateCronString("* 1 8 9 * FRI")
		expect(description).toBe(
			"Every second, at 1 minutes past the hour, between 08:00 AM and 08:59 AM, on day 9 of the month, and on Friday"
		)
	})

	test("should return an error message for an invalid cron expression", () => {
		const description = calculateCronString("invalid-cron-expression")
		expect(description).toBe("Unable to calculate - check string is valid")
	})
})

describe("checkForValidCronCode Function", () => {
	test("should return true for a valid cron expression code", () => {
		const isValid = checkForValidCronCode("0_0_*_*_*")
		expect(isValid).toBe(true)
	})

	test("should return false for an invalid cron expression code", () => {
		const isValid = checkForValidCronCode("invalid_cron_code")
		expect(isValid).toBe(false)
	})
})

describe("encodeCronCode Function", () => {
	test("should encode a cron expression code string by replacing spaces with underscores", () => {
		const encoded = encodeCronCode("0 0 * * *")
		expect(encoded).toBe("0_0_*_*_*")
	})
})

describe("decodeCronCode Function", () => {
	test("should decode a cron expression code string by replacing underscores with spaces", () => {
		const decoded = decodeCronCode("0_0_*_*_*")
		expect(decoded).toBe("0 0 * * *")
	})
})
