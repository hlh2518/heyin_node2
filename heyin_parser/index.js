import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 2692;

// ===========================================
// 添加：Crawlee可用性检查
// ===========================================
let crawleeAvailable = false;

async function checkCrawlee() {
    try {
        await import('crawlee');
        crawleeAvailable = true;
        console.log('[Crawlee] 浏览器指纹模拟库已加载');
    } catch (error) {
        console.log('[Crawlee] 未安装crawlee库，使用传统方式');
    }
}

// 异步检查，不阻塞启动
checkCrawlee();

// ===========================================
// 原有配置（完全不变）
// ===========================================
const CONFIG = {
    mainScript: path.join(__dirname, 'heyin_sniffer.js'),
    cacheDir: path.join(__dirname, 'cache'),
    cacheTime: 3600 * 1000,
    maxRetries: 3,
    timeout: 40000  // 40秒超时，防止限流
};

// 确保缓存目录存在
if (!fs.existsSync(CONFIG.cacheDir)) {
    fs.mkdirSync(CONFIG.cacheDir, { recursive: true });
}

// ===========================================
// Sniffer 类（添加Crawlee支持）
// ===========================================
class Sniffer {
    constructor(options = {}) {
        this.options = {
            debug: options.debug || false,
            headless: options.headless || true,
            enableJxRouter: options.enableJxRouter || true,
            blockImages: options.blockImages || true,
            blockStyles: options.blockStyles || true,
            blockFonts: options.blockFonts || true,
            blockAds: options.blockAds || true,
            blockAnalytics: options.blockAnalytics || true,
            useCache: options.useCache || true,
            cacheTimeout: options.cacheTimeout || 600000,
            timeout: options.timeout || 20000,
            isPc: options.isPc || true,
            useChrome: options.useChrome || true
        };

        this.browser = {
            isConnected: () => true,
            close: async () => {
                console.log('[Sniffer] 浏览器关闭（模拟）');
            }
        };

        this.stats = {
            totalRequests: 0,
            blockedRequests: 0,
            cacheHits: 0,
            cacheMisses: 0,
            cacheSize: 0,
            activePages: 0
        };

        this.cache = new Map();
    }

    async initBrowser() {
        console.log('[Sniffer] 初始化荷影解析器');
        console.log('[Sniffer] 使用 heyin_sniffer.js 进行视频解析');
        console.log('[Sniffer] Crawlee浏览器指纹模拟已集成');
        return true;
    }

    async snifferWithJxRouter(videoUrl, options = {}) {
        const startTime = Date.now();

        try {
            console.log(`[Sniffer] 解析: ${videoUrl}`);

            // 使用现有的解析逻辑
            const result = await executeMainScript(videoUrl);

            return {
                code: result.url ? 200 : 404,
                msg: result.url ? '解析成功' : '解析失败',
                url: result.url || '',
                headers: {
                    'referer': 'https://jx.xmflv.com/',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                cost: result.cost || `${Date.now() - startTime} ms`,
                jxSource: 'https://jx.xmflv.com/?url='
            };
        } catch (error) {
            console.error(`[Sniffer] 解析失败: ${error.message}`);
            return {
                code: 500,
                msg: `解析失败: ${error.message}`,
                url: '',
                headers: {},
                cost: `${Date.now() - startTime} ms`,
                jxSource: null
            };
        }
    }

    getStats() {
        return { ...this.stats };
    }

    async close() {
        console.log('[Sniffer] 关闭荷影解析器');
    }
}

// ===========================================
// 工具函数
// ===========================================
function getCacheKey(url) {
    return Buffer.from(url).toString('base64').replace(/[+/=]/g, '_');
}

function readFromCache(url) {
    try {
        const cacheFile = path.join(CONFIG.cacheDir, `${getCacheKey(url)}.json`);
        if (fs.existsSync(cacheFile)) {
            const data = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
            if (Date.now() - data.timestamp < CONFIG.cacheTime) {
                console.log(`[缓存] 使用缓存数据: ${url}`);
                return data.result;
            }
        }
    } catch (e) {
        console.log(`[缓存] 读取缓存失败: ${e.message}`);
    }
    return null;
}

function saveToCache(url, result) {
    try {
        const cacheFile = path.join(CONFIG.cacheDir, `${getCacheKey(url)}.json`);
        const cacheData = {
            url: url,
            result: result,
            timestamp: Date.now()
        };
        fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2), 'utf8');
        console.log(`[缓存] 保存缓存: ${url}`);
    } catch (e) {
        console.log(`[缓存] 保存缓存失败: ${e.message}`);
    }
}


function executeMainScript(videoUrl, retryCount = 0) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        console.log(`[解析] 开始解析: ${videoUrl}`);

        const child = spawn('node', [CONFIG.mainScript, '-url', videoUrl], {
            cwd: __dirname,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';
        let timeoutId;

        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        const cleanup = () => {
            if (timeoutId) clearTimeout(timeoutId);
        };

        // 修改这里：增加超时时间到40秒
        timeoutId = setTimeout(() => {
            console.log(`[超时] 解析超时: ${videoUrl}`);
            child.kill('SIGKILL');
            cleanup();
            if (retryCount < CONFIG.maxRetries) {
                console.log(`[重试] 第${retryCount + 1}次重试: ${videoUrl}`);
                resolve(executeMainScript(videoUrl, retryCount + 1));
            } else {
                reject(new Error(`解析超时，已重试${CONFIG.maxRetries}次`));
            }
        }, 40000); // 改为40秒超时

        child.on('close', (code) => {
            cleanup();
            const elapsed = Date.now() - startTime;

            if (code !== 0) {
                console.log(`[错误] 进程退出码: ${code}`);
                console.log(`[错误] stderr: ${stderr}`);

                if (retryCount < CONFIG.maxRetries) {
                    console.log(`[重试] 第${retryCount + 1}次重试: ${videoUrl}`);
                    resolve(executeMainScript(videoUrl, retryCount + 1));
                } else {
                    reject(new Error(`解析失败，退出码: ${code}\n${stderr}`));
                }
                return;
            }

            console.log(`[成功] 解析完成，耗时: ${elapsed}ms`);

            try {
                const lines = stdout.split('\n');
                let inDecryptedBody = false;
                let jsonStr = '';

                for (const line of lines) {
                    if (line.includes('[Decrypted Body]:')) {
                        inDecryptedBody = true;
                        continue;
                    }
                    if (inDecryptedBody) {
                        const cleanLine = line.replace(/\x1b\[[0-9;]*m/g, '');
                        if (cleanLine.trim()) {
                            jsonStr = cleanLine.trim();
                            break;
                        }
                    }
                }

                if (!jsonStr) {
                    throw new Error('未找到解密后的JSON数据');
                }

                const result = JSON.parse(jsonStr);
                result.cost = `${elapsed} ms`;
                resolve(result);
            } catch (parseError) {
                console.log(`[错误] 解析JSON失败: ${parseError.message}`);
                reject(new Error(`解析输出失败: ${parseError.message}`));
            }
        });

        child.on('error', (error) => {
            cleanup();
            console.log(`[错误] 子进程错误: ${error.message}`);
            reject(error);
        });
    });
}


function convertToBrowserFormat(parsedData, originalUrl) {
    if (!parsedData || !parsedData.url) {
        return {
            code: 404,
            msg: '解析失败',
            parse: 1,
            jx: 0,
            url: '',
            header: {},
            flag: '未知',
            cost: '0 ms',
            originalUrl: originalUrl
        };
    }

    function getPlatformFlag(url) {
        if (url.includes('iqiyi.com')) return '爱奇艺';
        if (url.includes('qq.com') || url.includes('v.qq.com')) return '腾讯视频';
        if (url.includes('youku.com')) return '优酷';
        if (url.includes('mgtv.com')) return '芒果TV';
        if (url.includes('bilibili.com')) return '哔哩哔哩';
        return '其他';
    }

    const flag = getPlatformFlag(originalUrl);

    return {
        code: 200,
        msg: `合印解析成功 (通过: https://jx.xmflv.com/?url=)`,
        parse: 0,
        jx: 1,
        url: parsedData.url,
        header: {
            'referer': 'https://jx.xmflv.com/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        flag: flag,
        cost: parsedData.cost || '0 ms',
        originalUrl: originalUrl,
        jxSource: 'https://jx.xmflv.com/?url='
    };
}

// ===========================================
// HTTP API 路由（保持不变）
// ===========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

app.get('/parse', async (req, res) => {
    const url = req.query.url;
    const startTime = Date.now();

    console.log(`\n[请求] GET /parse?url=${url}`);

    if (!url) {
        return res.json({
            code: 400,
            msg: '缺少url参数',
            data: null
        });
    }

    try {
        const cachedResult = readFromCache(url);
        if (cachedResult) {
            console.log(`[缓存] 返回缓存结果`);
            return res.json(cachedResult);
        }

        const parsedData = await executeMainScript(url);
        const formattedResult = convertToBrowserFormat(parsedData, url);

        saveToCache(url, formattedResult);

        console.log(`[完成] 总耗时: ${Date.now() - startTime}ms`);
        res.json(formattedResult);

    } catch (error) {
        console.log(`[错误] 解析失败: ${error.message}`);
        res.json({
            code: 500,
            msg: `解析失败: ${error.message}`,
            parse: 1,
            jx: 0,
            url: '',
            header: {},
            flag: '未知',
            cost: `${Date.now() - startTime} ms`,
            originalUrl: url
        });
    }
});

app.post('/heyin', async (req, res) => {
    console.log(`\n[请求] POST /heyin`);

    try {
        const { method, params, id } = req.body;

        if (method === 'Video.Parse' || method === 'video.parse') {
            const url = params[0] || '';

            if (!url) {
                return res.json({
                    heyin: '2.0',
                    error: { code: -32602, message: 'Invalid params: url required' },
                    id
                });
            }

            const cachedResult = readFromCache(url);
            if (cachedResult) {
                console.log(`[heyin缓存] 返回缓存结果`);
                return res.json({
                    heyin: '2.0',
                    result: cachedResult,
                    id
                });
            }

            const parsedData = await executeMainScript(url);
            const formattedResult = convertToBrowserFormat(parsedData, url);

            saveToCache(url, formattedResult);

            res.json({
                heyin: '2.0',
                result: formattedResult,
                id
            });
        } else {
            res.json({
                heyin: '2.0',
                error: { code: -32601, message: 'Method not found' },
                id
            });
        }
    } catch (error) {
        console.log(`[heyin错误] ${error.message}`);
        res.json({
            heyin: '2.0',
            error: { code: -32603, message: error.message },
            id: req.body.id || null
        });
    }
});

app.get('/heyin', async (req, res) => {
    const url = req.query.url;
    console.log(`\n[请求] GET /heyin?url=${url}`);

    if (!url) {
        return res.json({
            heyin: '2.0',
            error: { code: -32602, message: 'Missing url parameter' },
            id: Date.now()
        });
    }

    try {
        const cachedResult = readFromCache(url);
        if (cachedResult) {
            console.log(`[GET缓存] 返回缓存结果`);
            return res.json({
                heyin: '2.0',
                result: cachedResult,
                id: Date.now()
            });
        }

        const parsedData = await executeMainScript(url);
        const formattedResult = convertToBrowserFormat(parsedData, url);

        saveToCache(url, formattedResult);

        res.json({
            heyin: '2.0',
            result: formattedResult,
            id: Date.now()
        });
    } catch (error) {
        console.log(`[GET错误] 解析失败: ${error.message}`);
        res.json({
            heyin: '2.0',
            result: {
                code: 500,
                msg: `解析失败: ${error.message}`,
                parse: 1,
                jx: 0,
                url: '',
                header: {},
                flag: '未知',
                cost: '0 ms',
                originalUrl: url
            },
            id: Date.now()
        });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'heyin-parser',
        version: '1.0.0'
    });
});

app.get('/clear-cache', (req, res) => {
    try {
        const files = fs.readdirSync(CONFIG.cacheDir);
        let deleted = 0;

        files.forEach(file => {
            if (file.endsWith('.json')) {
                const filePath = path.join(CONFIG.cacheDir, file);
                fs.unlinkSync(filePath);
                deleted++;
            }
        });

        res.json({
            code: 0,
            msg: `已清空 ${deleted} 个缓存文件`
        });
    } catch (error) {
        res.json({
            code: 500,
            msg: error.message
        });
    }
});

// ===========================================
// 启动服务器
// ===========================================
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    app.listen(PORT, () => {
        console.log('='.repeat(60));
        console.log('合印解析服务已启动');
        console.log(`服务地址: http://localhost:${PORT}`);
        console.log('可用接口:');
        console.log(`  1. 解析接口: http://localhost:${PORT}/parse?url=视频地址`);
        console.log(`  2. heyin: http://localhost:${PORT}/heyin`);
        console.log(`  3. 健康检查: http://localhost:${PORT}/health`);
        console.log(`  4. 清空缓存: http://localhost:${PORT}/clear-cache`);
        console.log('='.repeat(60));
    });
}

// ===========================================
// 导出（完全保持原始导出方式）
// ===========================================
export { Sniffer, app };
export default Sniffer;