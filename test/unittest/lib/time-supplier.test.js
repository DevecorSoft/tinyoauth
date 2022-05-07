const { expect } = require("chai")
const { time_suppiler } = require("../../../lib/timeSupplier")

describe("Given a time supplier", () => {
    describe("When I want to konw what time it is in UTC", () => {
        it("Then should return a string to tell me", () => {
            const utc_time_now = time_suppiler.utc_now
            expect(utc_time_now).to.have.string("GMT")
        })
    })
})