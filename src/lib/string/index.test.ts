import { formatBytes, isValidIP } from "."

jest.mock("ua-parser-js")

describe("formatBytes Function", () => {
	test("should format bytes as a human-readable string", () => {
		const fileSize = formatBytes(1024)
		expect(fileSize).toBe("1 KB")
	})

	test("should handle zero bytes", () => {
		const fileSize = formatBytes(0)
		expect(fileSize).toBe("0 Bytes")
	})
})

describe("isValidIP Function", () => {
	test("should return true for a valid IPv4 address", () => {
		const isValid = isValidIP("192.0.2.1")
		expect(isValid).toBe(true)
	})

	test("should return true for a valid IPv6 address", () => {
		const isValid = isValidIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334")
		expect(isValid).toBe(true)
	})

	test("should return false for an invalid IP address", () => {
		const isValid = isValidIP("invalid-ip-address")
		expect(isValid).toBe(false)
	})
})
