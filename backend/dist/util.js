"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculate_individual_rating(appraised_value, sold_value) {
    let err = 10 * Math.abs(appraised_value - sold_value) / sold_value;
    if (err <= 3) {
        return 10 - err;
    }
    else if (err > 3 && err <= 5) {
        return -0.5 * err * err + 3 * err + 2.5;
    }
    else if (err > 5 && err <= 100) {
        return -(31 * Math.pow(err, 3)) / 5130000 + (49 * Math.pow(err, 2)) / 41040 - (9577 * err) / 102600 + 5579 / 1026;
    }
    else // err > 100
     {
        return 1 + 100 / err;
    }
}
exports.calculate_individual_rating = calculate_individual_rating;
function calculate_new_rating(rating) {
    let rating_val = 0;
    // console.log("calculate new rating");
    // console.log(rating);
    if (rating == null)
        return 5;
    else if (rating.ratings == null)
        return 5;
    else {
        for (let i = 0; i < rating.ratings.length; i++) {
            rating_val += rating.ratings[i];
        }
        if (rating.ratings.length > 0)
            return rating_val / rating.ratings.length;
        else
            return 5;
    }
}
exports.calculate_new_rating = calculate_new_rating;
//# sourceMappingURL=util.js.map