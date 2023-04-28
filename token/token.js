import {secret} from "../config/jwtConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const BCRYPT_SALT_ROUNDS = 12;


export async function createToken(customer) {
    const token = jwt.sign({ customer: customer }, "jwt-secret", {
        expiresIn: 60 * 60,
      });
      return token
}

export async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    return hashedPassword
}

export async function comparePasswords(password, userPassword){
    const response = bcrypt.compare(password, userPassword)
    return response
}