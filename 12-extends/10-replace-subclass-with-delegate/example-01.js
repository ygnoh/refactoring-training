class Booking {
    constructor(show, date) {
        this._show = show;
        this._date = date;
    }

    get hasTalkback() {
        return this._premiumDelegate ?
            this._premiumDelegate.hasTalkback :
            this._show.hasOwnProperty("talkback") && !this.isPeakDay;
    }

    get basePrice() {
        let result = this._show.price;

        if (this.isPeakDay) {
            result += Math.round(result * 0.15);
        }

        return this._premiumDelegate ?
            this._premiumDelegate.extendBasePrice(result) :
            result;
    }

    get isPeakDay() {
        return false;
    }

    get hasDinner() {
        return this._premiumDelegate ?
            this._premiumDelegate.hasDinner :
            undefined;
    }

    _bePremium() {
        this._premiumDelegate = new PremiumBookingDelegate(this, extras);
    }
}

class PremiumBookingDelegate {
    constructor(hostBooking, extras) {
        this._host = hostBooking;
        this._extras = extras;
    }

    extendBasePrice(base) {
        return Math.round(base + this._extras.premiumFee);
    }

    get hasTalkback() {
        return this._host._show.hasOwnProperty("talkback");
    }

    get hasDinner() {
        return this._extras.hasOwnProperty("dinner") && !this._host.isPeakDay;
    }
}

const show = {};
const date = {};
const extras = {};

let booking = createBooking(show, date)
let premiumBooking = createPremiumBooking(show, date, extras);

function createBooking(show, date) {
    return new Booking(show, date);
}

function createPremiumBooking(show, date, extras) {
    const result = new Booking(show, date, extras);

    result._bePremium(extras);

    return result;
}
