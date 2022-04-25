import { genSalt, hash, compare } from 'bcryptjs';

export function devLog(...keys) {
    if (process.env.NODE_ENV !== "production") {
        const title = typeof keys[0] === "string" ? keys.shift() : "Log start";
        console.log(
            `\n\n\n=============${title}\n${new Date()}===================\n`
        );
        keys.forEach((log) => console.log(log));
        console.log("\n==============Log end==================\n");
    }
}

export async function hashPassword(plainText) {
    try {
        const salt = await genSalt(10);
        return await hash(plainText, salt);
    } catch (err) {
        throw err;
    }
}

export async function comparePassword(plainText, hash) {
    try {
        return await compare(plainText, hash);
    } catch (err) {
        throw err;
    }
}

export function parseJSON(value) {
    try {
        return JSON.parse(value);
    } catch (err) {
        return value;
    }
}

export function validateEmail(email) {
    if (!email) return false;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
}

// VALIDATE PHONE
export function validatePhone(phone) {
    phone = typeof phone != "undefined" ? phone.toString() : "";
    if (phone.length < 10 || Number.isNaN(phone) == true || phone.substring(0, 1) != "+" || phone.substring(0, 3) == "000" || phone.length > 16) {
        return false;
    } else {
        var phone_regex = new RegExp(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g);
        if (!phone_regex.test(phone)) {
            return false;
        } else {
            return true;
        }
    }
}