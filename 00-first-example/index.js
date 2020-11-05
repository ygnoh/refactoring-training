const plays = {
    hamlet: {
        name: "Hamlet",
        type: "tragedy"
    },
    "as-like": {
        name: "As You Like It",
        type: "comedy"
    },
    othello: {
        name: "Othello",
        type: "tragedy"
    }
};
const invoices = {
    customer: "BigCo",
    performances: [
        {
            playID: "hamlet",
            audience: 55
        },
        {
            playID: "as-like",
            audience: 35
        },
        {
            playID: "othello",
            audience: 40
        }
    ]
};

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `> result (customer: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat(
        "en-Us",
        {style: "currency", currency: "USD", minimumFractionDigits: 2}
    ).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = amountFor(perf, play);

        volumeCredits += Math.max(perf.audience - 30, 0);

        if ("comedy" === play.type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `total: ${format(totalAmount / 100)}\n`;
    result += `points: ${volumeCredits}\n`;

    return result;

    function amountFor(perf, play) {
        let result = 0;

        switch (play.type) {
            case "tragedy":
                result = 40000;

                if (perf.audience > 30) {
                    result += 1000 * (perf.audience - 30);
                }

                break;

            case "comedy":
                result = 30000;

                if (perf.audience > 20) {
                    result += 10000 + 500 * (perf.audience - 20);
                }

                result += 300 * perf.audience;

                break;

            default:
                throw new Error(`Unknown genre: ${play.type}`);
        }

        return result;
    }
}


module.exports ={
    plays,
    invoices,
    statement
};
