import CryptoJS from 'crypto-js';
import axios from 'axios';
import https from 'https';

// ==========================================
// 1. 添加Crawlee浏览器指纹
// ==========================================

// 浏览器指纹管理器
class BrowserFingerprint {
    static async getFingerprint() {
        try {
            // 尝试使用Crawlee获取真实浏览器指纹
            const { launchPuppeteer } = await import('crawlee');
            const browser = await launchPuppeteer({
                headless: 'new',
                stealth: true,
                launchOptions: {
                    args: ['--disable-blink-features=AutomationControlled']
                }
            });
            
            const page = await browser.newPage();
            const userAgent = await page.evaluate(() => navigator.userAgent);
            await browser.close();
            
            console.log(`[Crawlee] 使用真实浏览器指纹: ${userAgent.substring(0, 50)}...`);
            return userAgent;
            
        } catch (error) {
            // Crawlee不可用，使用随机User-Agent
            const userAgents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            ];
            
            const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
            console.log(`[传统] 使用随机User-Agent: ${userAgent.substring(0, 50)}...`);
            return userAgent;
        }
    }
    
    static async getHeaders() {
        const userAgent = await this.getFingerprint();
        
        // 返回原有的Headers结构，只替换user-agent
        return {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://jx.xmflv.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Chromium";v="121", "Google Chrome";v="121", "Not-A.Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': userAgent, // 使用动态生成的User-Agent
            'referer': 'https://jx.xmflv.com/',
            'x-requested-with': 'XMLHttpRequest'
        };
    }
}

// ==========================================
// 2. 配置
// ==========================================
const API_ENDPOINT = "https://202.189.8.170/Api.js";

// Parse Command Line Arguments
const args = process.argv.slice(2);
const urlIndex = args.indexOf('-url');
let TARGET_VIDEO_URL = "";

if (urlIndex !== -1 && args[urlIndex + 1]) {
    TARGET_VIDEO_URL = args[urlIndex + 1];
} else {
    console.log("Usage: node heyin_sniffer.js -url <video_url>");
    console.log("Example: node heyin_sniffer.js -url https://www.iqiyi.com/v_16ne2x4z6zc.html");
    process.exit(1);
}

// ==========================================
// 3. 加密算法
// ==========================================

function generateKey(time, url) {
    const encodedUrl = encodeURIComponent(url);
    const inputStr = time + encodedUrl;

    const innerHashHex = CryptoJS.MD5(inputStr).toString(CryptoJS.enc.Hex);
    const keyHashHex = CryptoJS.MD5(innerHashHex).toString(CryptoJS.enc.Hex);
    const key = CryptoJS.enc.Utf8.parse(keyHashHex);
    const iv = CryptoJS.enc.Utf8.parse("OrSrAd8RtISPnooc");

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
// 4. 主流程（Headers获取方式）
// ==========================================

async function heyin_sniffer() {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    try {
        console.log(">>> 1. Fetching Time and Area...");
        
        // 使用Crawlee生成的Headers（修改这一行）
        const headers = await BrowserFingerprint.getHeaders();

        const vUrl = "https://data.video.iqiyi.com/v.f4v?src=iqiyi.com";
        const preResponse = await axios.get(vUrl, {
            headers: {
                ...headers,
                'accept': '*/*',
                'origin': 'https://jx.xmflv.com'
            },
            httpsAgent: agent
        });

        const preData = preResponse.data;
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
            headers: headers,
            httpsAgent: agent
        });

        console.log("    [Status]", res.status);
        console.log("    [Message]", res.data.message);

        console.log("\n>>> 4. Decrypting Response...");
        if (res.data && res.data.data) {
            const decrypted = decryptResponse(res.data.data);
            console.log("    [Decrypted Body]:");
            console.log("\x1b[32m" + decrypted + "\x1b[0m");
        } else {
            console.log("    ❌ No 'data' field or error in response");
        }

    } catch (e) {
        console.error("❌ Error:", e.message);
        if (e.response) {
            console.error("   Status:", e.response.status);
        }
    }
}

heyin_sniffer();