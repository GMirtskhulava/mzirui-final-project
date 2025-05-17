import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const HashString = async (string) => {
    const hash = await bcrypt.hash(string, parseInt(process.env.BCRYPT_SALT, 10));
    return hash;
}
export const CompareHash = async (string, hash) => {
    const isMatch = await bcrypt.compare(string, hash);
    return isMatch;
}