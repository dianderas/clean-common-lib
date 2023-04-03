"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const Result_1 = require("./Result");
class Guard {
    static combine(guardResults) {
        for (let result of guardResults) {
            if (result.isFailure)
                return result;
        }
        return Result_1.Result.ok();
    }
    static greaterThan(minValue, actualValue) {
        return actualValue > minValue
            ? Result_1.Result.ok()
            : Result_1.Result.fail(`Number given {${actualValue}} is not greater than {${minValue}}`);
    }
    static againstAtLeast(numChars, text) {
        return text.length >= numChars
            ? Result_1.Result.ok()
            : Result_1.Result.fail(`Text is not at least ${numChars} chars.`);
    }
    static againstAtMost(numChars, text) {
        return text.length <= numChars
            ? Result_1.Result.ok()
            : Result_1.Result.fail(`Text is greater than ${numChars} chars.`);
    }
    static againstNullOrUndefined(argument, argumentName) {
        if (argument === null || argument === undefined) {
            return Result_1.Result.fail(`${argumentName} is null or undefined`);
        }
        else {
            return Result_1.Result.ok();
        }
    }
    static againstNullOrUndefinedBulk(args) {
        for (let arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (result.isFailure)
                return result;
        }
        return Result_1.Result.ok();
    }
    static isOneOf(value, validValues, argumentName) {
        let isValid = false;
        for (let validValue of validValues) {
            if (value === validValue) {
                isValid = true;
            }
        }
        if (isValid) {
            return Result_1.Result.ok();
        }
        else {
            return Result_1.Result.fail(`${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`);
        }
    }
    static inRange(num, min, max, argumentName) {
        const isInRange = num >= min && num <= max;
        if (!isInRange) {
            return Result_1.Result.fail(`${argumentName} is not within range ${min} to ${max}.`);
        }
        else {
            return Result_1.Result.ok();
        }
    }
    static allInRange(numbers, min, max, argumentName) {
        let failingResult = null;
        for (let num of numbers) {
            const numIsInRangeResult = this.inRange(num, min, max, argumentName);
            if (!numIsInRangeResult.isFailure)
                failingResult = numIsInRangeResult;
        }
        if (failingResult) {
            return Result_1.Result.fail(`${argumentName} is not within the range.`);
        }
        else {
            return Result_1.Result.ok();
        }
    }
}
exports.Guard = Guard;
//# sourceMappingURL=Guard.js.map