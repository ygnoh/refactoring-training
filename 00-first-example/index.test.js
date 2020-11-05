const {expect} = require("chai");
const {plays, invoices, statement} = require("./index");

describe("statement", () => {
    it("should return text result", () => {
        // given
        const expected = `> result (customer: BigCo)
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
total: $1,730.00
points: 47
`;

        // when
        const actual = statement(invoices, plays);

        // then
        expect(expected).to.be.eql(actual);
    });
});
