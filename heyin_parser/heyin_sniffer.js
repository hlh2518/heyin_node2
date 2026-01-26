import CryptoJS from 'crypto-js';
import axios from 'axios';
import https from 'https';

// ==========================================
// 1. CONFIGURATION
// ==========================================
const API_ENDPOINT = "https://202.189.8.170/Api.js";

// Parse Command Line Arguments
const args = process.argv.slice(2);
const urlIndex = args.indexOf('-url');
let TARGET_VIDEO_URL = "";

if (urlIndex !== -1 && args[urlIndex + 1]) {
    TARGET_VIDEO_URL = args[urlIndex + 1];
} else {
    // Check if user provided url without flag (simple usage) or just warn
    // But strictly following user "missing need prompt"
    console.log("Usage: node heyin_sniffer.js -url <video_url>");
    console.log("Example: node heyin_sniffer.js -url https://www.iqiyi.com/v_16ne2x4z6zc.html");
    process.exit(1);
}

// Headers to mimic the browser request
const COMMON_HEADERS = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://jx.xmflv.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0'
};

// ==========================================
// 2. CRYPTO ALGORITHMS (CryptoJS Implementation)
// ==========================================

function generateKey(time, url) {
    const encodedUrl = encodeURIComponent(url);
    const inputStr = time + encodedUrl;

    // Inner MD5
    const innerHashHex = CryptoJS.MD5(inputStr).toString(CryptoJS.enc.Hex);

    // Derive AES Key
    const keyHashHex = CryptoJS.MD5(innerHashHex).toString(CryptoJS.enc.Hex);
    const key = CryptoJS.enc.Utf8.parse(keyHashHex);

    // IV
    const iv = CryptoJS.enc.Utf8.parse("OrSrAd8RtISPnooc");

    // Encrypt
    const data = CryptoJS.enc.Utf8.parse(innerHashHex);
    const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });

    return encrypted.toString();
}

function generateToken(keyStr) {
    const xorKeyProto = "m7EgOccP4xSeyjwQ";
    const xorKey = Buffer.from(xorKeyProto, 'utf8');
    const inputBuf = Buffer.from(keyStr, 'utf8');

    const len = inputBuf.length;
    const paddedLen = (len + 15) >> 4 << 4;

    const buffer = Buffer.alloc(paddedLen);
    inputBuf.copy(buffer);
    if (paddedLen > len) {
        buffer[len] = 0x80;
    }

    const output = Buffer.alloc(paddedLen);
    for (let i = 0; i < paddedLen; i++) {
        output[i] = buffer[i] ^ xorKey[i % 16];
    }

    return output.toString('base64');
}

function decryptResponse(encryptedData) {
    const key = CryptoJS.enc.Utf8.parse("4zYgSAsEAUS6YAud");
    const iv = CryptoJS.enc.Utf8.parse("ppa7qtR4McCIMCX4");

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

// ==========================================
// 3. MAIN FLOW
// ==========================================

async function heyin_sniffer() {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        console.log(">>> 1. Fetching Time and Area...");
        const vUrl = "https://data.video.iqiyi.com/v.f4v?src=iqiyi.com";
        const preResponse = await axios.get(vUrl, {
            headers: {
                ...COMMON_HEADERS,
                'accept': '*/*',
                'origin': 'https://jx.xmflv.com'
            },
            httpsAgent: agent
        });

        const preData = preResponse.data;
        // console.log("    [Response]", JSON.stringify(preData));

        const serverTime = preData.time;
        const serverArea = preData.t;

        if (!serverTime || !serverArea) {
            throw new Error("Failed to retrieve time or area from v.f4v");
        }

        console.log("\n>>> 2. Generating Parameters...");
        const key = generateKey(serverTime, TARGET_VIDEO_URL);
        const token = generateToken(key);

        console.log(`    [Time]  ${serverTime}`);
        console.log(`    [URL]   ${TARGET_VIDEO_URL}`);
        console.log(`    [Key]   ${key}`);
        console.log(`    [Token] ${token}`);
        console.log(`    [Area]  ${serverArea}`);

        console.log("\n>>> 3. Requesting Target API...");

        const params = new URLSearchParams();
        params.append('ua', '0');
        params.append('url', encodeURIComponent(TARGET_VIDEO_URL));
        params.append('time', serverTime);
        params.append('key', key);
        params.append('token', token);
        params.append('area', serverArea);

        const res = await axios.post(API_ENDPOINT, params.toString(), {
            headers: COMMON_HEADERS,
            httpsAgent: agent
        });

        console.log("    [Status]", res.status);
        console.log("    [Message]", res.data.message);

        console.log("\n>>> 4. Decrypting Response...");
        if (res.data && res.data.data) {
            const decrypted = decryptResponse(res.data.data);
            console.log("    [Decrypted Body]:");
            // ANSI Color: Green (\x1b[32m), Reset (\x1b[0m)
            console.log("\x1b[32m" + decrypted + "\x1b[0m");
        } else {
            console.log("    ❌ No 'data' field or error in response");
        }

    } catch (e) {
        console.error("❌ Error:", e.message);
        if (e.response) {
            console.error("   Status:", e.response.status);
            // console.info("   Data:", e.response.data);
        }
    }
}

heyin_sniffer();
