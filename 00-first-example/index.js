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
        volumeCredits += volumeCreditsFor(perf);
        result += `  ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }

    result += `total: ${format(totalAmount / 100)}\n`;
    result += `points: ${volumeCredits}\n`;

    return result;

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        let result = 0;

        switch (playFor(aPerformance).type) {
            case "tragedy":
                result = 40000;

                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }

                break;

            case "comedy":
                result = 30000;

                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }

                result += 300 * aPerformance.audience;

                break;

            default:
                throw new Error(`Unknown genre: ${playFor(aPerformance).type}`);
        }

        return result;
    }

    function volumeCreditsFor(perf) {
        let volumeCredits = 0;

        volumeCredits += Math.max(perf.audience - 30, 0);

        if ("comedy" === playFor(perf).type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        return volumeCredits;
    }
}


module.exports ={
    plays,
    invoices,
    statement
};
