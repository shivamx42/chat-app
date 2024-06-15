import crypto from "crypto";

const algorithm = 'aes-256-ctr'; // encryption algorithm

export const encrypt = (text) => {
    
    const secretKey = process.env.CRYPTO_SECRET; 
    const iv = crypto.randomBytes(16); // initialization vector used to ensure that same plain text encrypted multiple times will produce different ciphertexts, will also be passed to the database for decryption
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export const decrypt = (hash) => {
    const secretKey = process.env.CRYPTO_SECRET; 

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.from(hash.iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrypted.toString();
};
