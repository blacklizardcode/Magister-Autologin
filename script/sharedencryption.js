function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    for (let b of bytes) binary += String.fromCharCode(b);
    return btoa(binary);
}
function base64ToArrayBuffer(base64) {
    let binary = atob(base64);
    let bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
}

async function getOrCreateCryptoKey() {
    // Check if the key exists in storage
    let data = await browser.storage.local.get("encryptionKey");
    let key;
    if (!data.encryptionKey) {
        // Generate a random AES key
        key = await crypto.subtle.generateKey(
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
        // Export key to base64
        const raw = await crypto.subtle.exportKey("raw", key);
        const b64 = arrayBufferToBase64(raw);
        await browser.storage.local.set({ encryptionKey: b64 });
    } else {
        // Import the stored key
        const raw = base64ToArrayBuffer(data.encryptionKey);
        key = await crypto.subtle.importKey(
            "raw",
            raw,
            { name: "AES-GCM" },
            false,
            ["encrypt", "decrypt"]
        );
    }
    return key;
}

async function encryptString(key, plaintext) {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(plaintext)
    );
    return {
        iv: arrayBufferToBase64(iv.buffer),
        data: arrayBufferToBase64(ciphertext),
    };
}

async function decryptString(key, encryptedObj) {
    const iv = base64ToArrayBuffer(encryptedObj.iv);
    const data = base64ToArrayBuffer(encryptedObj.data);
    const dec = new TextDecoder();
    const plaintext = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) },
        key,
        data
    );
    return dec.decode(plaintext);
}
