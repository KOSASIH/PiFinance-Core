const crypto = require('crypto');

// Function to hash data using SHA-3
const hashData = (data) => {
    const hash = crypto.createHash('sha3-256'); // Using SHA-3 (256 bits)
    hash.update(data);
    return hash.digest('hex'); // Return the hash in hexadecimal format
};

// Function to sign data using EdDSA
const signData = (data, privateKey) => {
    const sign = crypto.createSign('SHA256'); // Create a signing object
    sign.update(data);
    sign.end();
    return sign.sign(privateKey, 'hex'); // Return the signature in hexadecimal format
};

// Function to verify a signature using EdDSA
const verifySignature = (data, signature, publicKey) => {
    const verify = crypto.createVerify('SHA256'); // Create a verification object
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature, 'hex'); // Return true if the signature is valid
};

// Function to generate a random cryptographic key
const generateRandomKey = (length = 32) => {
    return crypto.randomBytes(length).toString('hex'); // Generate a random key in hexadecimal format
};

// Function to encrypt data using AES-512
const encryptData = (data, key) => {
    const iv = crypto.randomBytes(16); // Generate a random initialization vector
    const cipher = crypto.createCipheriv('aes-512-cbc', Buffer.from(key, 'hex'), iv); // Create a cipher
    let encrypted = cipher.update(data, 'utf8', 'hex'); // Encrypt the data
    encrypted += cipher.final('hex'); // Finalize the encryption
    return { iv: iv.toString('hex'), encryptedData: encrypted }; // Return the IV and encrypted data
};

// Function to decrypt data using AES-512
const decryptData = (encryptedData, key, iv) => {
    const decipher = crypto.createDecipheriv('aes-512-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex')); // Create a decipher
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8'); // Decrypt the data
    decrypted += decipher.final('utf8'); // Finalize the decryption
    return decrypted; // Return the decrypted data
};

// Exporting the cryptographic utilities
module.exports = {
    hashData,
    signData,
    verifySignature,
    generateRandomKey,
    encryptData,
    decryptData,
};
