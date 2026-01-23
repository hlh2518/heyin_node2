/**
 * DRPY Node.js 主容器 - 集成智能路由视频嗅探器
 */

import * as fastlogger from './controllers/fastlogger.js'
import path from 'path';
import os from 'os';
import qs from 'qs';
import {fileURLToPath} from 'url';
import {validateBasicAuth, validateJs, validatePwd, validatHtml} from "./utils/api_validate.js";
import {startAllPlugins} from "./utils/pluginManager.js";
// 注册自定义import钩子
import './utils/esm-register.mjs';
// 引入python守护进程
import {daemon} from "./utils/daemonManager.js";
// 注册控制器
import {registerRoutes, registerWsRoutes} from './controllers/index.js';

const {fastify, wsApp} = fastlogger;

// 获取当前路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5757;
const WsPORT = 57575;
const SNIFFER_PORT = 2999; // 智能嗅探器API端口
const MAX_TEXT_SIZE = process.env.MAX_TEXT_SIZE || 0.1 * 1024 * 1024; // 设置最大文本大小为 0.1 MB
const MAX_IMAGE_SIZE = process.env.MAX_IMAGE_SIZE || 0.5 * 1024 * 1024; // 设置最大图片大小为 500 KB

// 定义options的目录
const rootDir = __dirname;
const docsDir = path.join(__dirname, 'docs');
const jxDir = path.join(__dirname, 'jx');
const publicDir = path.join(__dirname, 'public');
const appsDir = path.join(__dirname, 'apps');
const jsonDir = path.join(__dirname, 'json');
const jsDir = path.join(__dirname, 'spider/js');
const dr2Dir = path.join(__dirname, 'spider/js_dr2');
const pyDir = path.join(__dirname, 'spider/py');
const catDir = path.join(__dirname, 'spider/catvod');
const catLibDir = path.join(__dirname, 'spider/catLib');
const xbpqDir = path.join(__dirname, 'spider/xbpq');
const configDir = path.join(__dirname, 'config');

// 嗅探器相关变量
let snifferInstance = null;
let snifferServer = null;
let http = null; // 延迟导入

const pluginProcs = startAllPlugins(__dirname);
// console.log('pluginProcs:', pluginProcs);

// ============================
// 智能路由视频嗅探器相关函数
// ============================

/**
 * 初始化并启动智能路由视频嗅探器
 */
/**
 * 初始化并启动智能路由视频嗅探器
 */
async function initSniffer() {
    try {
        console.log('🚀 初始化智能路由视频嗅探器...');

        // 动态导入 http 模块
        http = await import('http');

        // 动态导入嗅探器模块
        // const snifferModule = await import('./asyncSnifferPro/src/index.js');
         const snifferModule = await import('./heyin_parser/index.js');
        const { Sniffer } = snifferModule;

        // 创建嗅探器实例
        snifferInstance = new Sniffer({
            debug: false,
            headless: true,
            enableJxRouter: true,
            blockImages: true,
            blockStyles: true,
            blockFonts: true,
            blockAds: true,
            blockAnalytics: true,
            useCache: true,
            cacheTimeout: 600000,
            timeout: 20000,
            isPc: true,
            useChrome: true
        });

        // 初始化浏览器
        console.log('正在初始化浏览器...');
        await snifferInstance.initBrowser();

        // 验证浏览器对象
        if (!snifferInstance.browser) {
            throw new Error('浏览器初始化失败：browser 对象为 null 或 undefined');
        }

        console.log('✅ 嗅探器浏览器初始化成功');
        console.log(`浏览器类型: ${typeof snifferInstance.browser}`);
        console.log(`浏览器方法: ${Object.keys(snifferInstance.browser).filter(key => typeof snifferInstance.browser[key] === 'function').join(', ')}`);

        return true;
    } catch (error) {
        console.error('❌ 初始化嗅探器失败:', error.message);
        console.error('错误堆栈:', error.stack);
        return false;
    }
}

/**
 * 启动嗅探器HTTP API服务
 */
async function startSnifferServer() {
    if (!snifferInstance || !http) {
        console.error('❌ 嗅探器未初始化，无法启动API服务');
        return false;
    }

    try {
        console.log('🌐 启动嗅探器HTTP API服务...');

        snifferServer = http.createServer(async (req, res) => {
            // 设置CORS头
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Content-Type', 'application/json; charset=utf-8');

            // 处理OPTIONS预检请求
            if (req.method === 'OPTIONS') {
                res.writeHead(200);
                res.end();
                return;
            }

            try {
                const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
                const pathname = url.pathname;

                if (pathname === '/parse' && req.method === 'GET') {
                    await handleParseRequest(req, res, url);
                } else if (pathname === '/health') {
                    await handleHealthRequest(req, res);
                } else if (pathname === '/stats') {
                    await handleStatsRequest(req, res);
                } else if (pathname === '/') {
                    handleRootRequest(req, res);
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({
                        code: 404,
                        msg: '接口不存在',
                        endpoints: [
                            'GET /parse?url={视频URL} - 解析视频地址',
                            'GET /health - 健康检查',
                            'GET /stats - 统计信息'
                        ]
                    }));
                }
            } catch (error) {
                console.error(`[嗅探器API] 处理请求错误:`, error);
                res.writeHead(500);
                res.end(JSON.stringify({
                    code: 500,
                    msg: `服务器内部错误: ${error.message}`
                }));
            }
        });

        // 启动服务器
        return new Promise((resolve, reject) => {
            snifferServer.listen(SNIFFER_PORT, '0.0.0.0', () => {
                console.log(`🔍 智能路由嗅探器API启动成功`);
                console.log(`   - 端口: ${SNIFFER_PORT}`);
                console.log(`   - 接口: GET /parse?url={视频URL}`);
                console.log(`   - 健康检查: GET /health`);
                console.log(`   - 统计信息: GET /stats`);
                resolve(true);
            });

            snifferServer.on('error', (error) => {
                console.error('❌ 启动嗅探器API服务失败:', error);
                reject(error);
            });
        });

    } catch (error) {
        console.error('❌ 启动嗅探器API服务失败:', error);
        return false;
    }
}

/**
 * 处理解析请求
 */
async function handleParseRequest(req, res, url) {
    const videoUrl = url.searchParams.get('url');
    if (!videoUrl) {
        res.writeHead(400);
        res.end(JSON.stringify({
            code: 400,
            msg: '缺少url参数，请提供视频URL'
        }));
        return;
    }

    console.log(`[嗅探器API] 解析请求: ${videoUrl.substring(0, 80)}...`);

    // 平台识别
    let platform = '其他';
    if (videoUrl.includes('iqiyi.com')) platform = '爱奇艺';
    else if (videoUrl.includes('qq.com') || videoUrl.includes('v.qq.com')) platform = '腾讯视频';
    else if (videoUrl.includes('youku.com')) platform = '优酷';
    else if (videoUrl.includes('mgtv.com')) platform = '芒果';
    else if (videoUrl.includes('bilibili.com')) platform = '哔哩哔哩';
    else if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) platform = 'YouTube';

    // 执行嗅探
    const result = await snifferInstance.snifferWithJxRouter(videoUrl, {
        timeout: parseInt(url.searchParams.get('timeout')) || 20000,
        isPc: true,
        fastMode: url.searchParams.get('fast') === '1'
    });

    // 格式化响应
    const response = {
        code: result.code || 500,
        msg: result.msg || (result.url ? '解析成功' : '解析失败'),
        parse: result.url ? 0 : 1, // 0:直接播放, 1:需要嗅探
        jx: result.jxSource ? 1 : 0,
        url: result.url || '',
        header: result.headers || {},
        flag: platform,
        cost: result.cost || '0 ms',
        originalUrl: videoUrl,
        jxSource: result.jxSource || null
    };

    res.writeHead(result.code === 200 ? 200 : 400);
    res.end(JSON.stringify(response, null, 2));
}

/**
 * 处理健康检查请求
 */
/**
 * 处理健康检查请求
 */
async function handleHealthRequest(req, res) {
    try {
        let isHealthy = false;
        let browserStatus = 'unknown';

        if (snifferInstance && snifferInstance.browser) {
            const browser = snifferInstance.browser;

            // 尝试不同的方法检查浏览器状态
            if (typeof browser.isConnected === 'function') {
                isHealthy = browser.isConnected();
                browserStatus = isHealthy ? 'connected' : 'disconnected';
            } else if (typeof browser.process === 'function' || browser.process) {
                // 检查浏览器进程是否存在
                try {
                    const process = browser.process ? browser.process() : browser.process;
                    isHealthy = process && !process.killed;
                    browserStatus = isHealthy ? 'running' : 'stopped';
                } catch (error) {
                    console.warn('检查浏览器进程失败:', error.message);
                    isHealthy = false;
                    browserStatus = 'error';
                }
            } else if (typeof browser.close === 'function') {
                // 如果浏览器有 close 方法，假设它是存活的
                isHealthy = true;
                browserStatus = 'connected (assumed)';
            } else {
                // 其他情况，直接检查浏览器对象是否存在
                isHealthy = !!browser;
                browserStatus = isHealthy ? 'present' : 'missing';
            }
        }

        res.writeHead(isHealthy ? 200 : 503);
        res.end(JSON.stringify({
            code: isHealthy ? 200 : 503,
            status: isHealthy ? 'healthy' : 'unhealthy',
            service: 'smart-video-sniffer',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            browser: browserStatus,
            details: {
                hasInstance: !!snifferInstance,
                hasBrowser: !!(snifferInstance && snifferInstance.browser)
            }
        }));
    } catch (error) {
        console.error('健康检查处理失败:', error);
        res.writeHead(500);
        res.end(JSON.stringify({
            code: 500,
            status: 'error',
            service: 'smart-video-sniffer',
            error: error.message,
            timestamp: new Date().toISOString()
        }));
    }
}

/**
 * 处理统计信息请求
 */
async function handleStatsRequest(req, res) {
    if (!snifferInstance) {
        res.writeHead(503);
        res.end(JSON.stringify({
            code: 503,
            error: '嗅探器未初始化'
        }));
        return;
    }

    const stats = snifferInstance.getStats();
    res.writeHead(200);
    res.end(JSON.stringify({
        code: 200,
        service: 'smart-video-sniffer',
        stats: {
            totalRequests: stats.totalRequests || 0,
            blockedRequests: stats.blockedRequests || 0,
            cacheHits: stats.cacheHits || 0,
            cacheMisses: stats.cacheMisses || 0,
            cacheSize: stats.cacheSize || 0,
            activePages: stats.activePages || 0
        },
        performance: {
            cacheHitRate: stats.cacheHits + stats.cacheMisses > 0
                ? `${((stats.cacheHits / (stats.cacheHits + stats.cacheMisses)) * 100).toFixed(2)}%`
                : '0%',
            requestBlockRate: stats.totalRequests > 0
                ? `${((stats.blockedRequests / stats.totalRequests) * 100).toFixed(2)}%`
                : '0%'
        },
        timestamp: new Date().toISOString()
    }));
}

/**
 * 处理根路径请求
 */
function handleRootRequest(req, res) {
    res.writeHead(200);
    res.end(JSON.stringify({
        code: 200,
        msg: '智能路由视频嗅探器 API',
        version: '1.0.0',
        endpoints: {
            'GET /parse?url={video_url}': '解析视频URL',
            'GET /health': '健康检查',
            'GET /stats': '统计信息'
        },
        docs: '集成在 DRPY Node.js 容器中'
    }));
}

/**
 * 停止嗅探器服务
 */
async function stopSnifferServer() {
    if (snifferInstance) {
        try {
            await snifferInstance.close();
            console.log('✅ 嗅探器浏览器已关闭');
        } catch (error) {
            console.error('关闭嗅探器浏览器失败:', error);
        }
    }

    if (snifferServer) {
        return new Promise((resolve) => {
            snifferServer.close(() => {
                console.log('🛑 嗅探器API服务已停止');
                resolve();
            });

            // 如果关闭超时，强制关闭
            setTimeout(() => {
                if (snifferServer.listening) {
                    snifferServer.closeAllConnections();
                    console.log('🛑 嗅探器API服务强制关闭');
                    resolve();
                }
            }, 5000);
        });
    }
}

// ============================
// 主容器原有功能
// ============================

// 添加钩子事件
fastify.addHook('onReady', async () => {
    try {
        await daemon.startDaemon();
        fastify.log.info('Python守护进程已启动');

        // 启动智能嗅探器
        const snifferInited = await initSniffer();
        if (snifferInited) {
            await startSnifferServer();
        } else {
            console.log('⚠️  智能嗅探器初始化失败，相关功能将不可用');
        }
    } catch (error) {
        fastify.log.error(`启动Python守护进程失败: ${error.message}`);
        fastify.log.error('Python相关功能将不可用');
    }
});

async function onClose() {
    try {
        await daemon.stopDaemon();
        fastify.log.info('Python守护进程已停止');
    } catch (error) {
        fastify.log.error(`停止Python守护进程失败: ${error.message}`);
    }
}

// 停止时清理守护进程和嗅探器
fastify.addHook('onClose', async () => {
    await onClose();
    await stopSnifferServer();
});

// 给静态目录插件中心挂载basic验证
fastify.addHook('preHandler', (req, reply, done) => {
    if (req.raw.url.startsWith('/apps/')) {
        if (req.raw.url.includes('clipboard-pusher/index.html')) {
            validateBasicAuth(req, reply, async () => {
                validatHtml(req, reply, rootDir).then(() => done());
            });
        } else {
            validateBasicAuth(req, reply, done);
        }

    } else if (req.raw.url.startsWith('/js/') || req.raw.url.startsWith('/py/')) {
        validatePwd(req, reply, done).then(async () => {
            validateJs(req, reply, dr2Dir).then(() => done());
        });
    } else {
        done();
    }
});

// 自定义插件替换 querystring 解析行为.避免出现两个相同参数被解析成列表
fastify.addHook('onRequest', async (req, reply) => {
    // 获取原始 URL 中的 query 部分
    const rawUrl = req.raw.url;
    const urlParts = rawUrl.split('?');
    const urlPath = urlParts[0];
    let rawQuery = urlParts.slice(1).join('?'); // 处理可能存在的多个 '?' 情况
    // log('rawQuery:', rawQuery);
    // 使用 qs 库解析 query 参数，确保兼容参数值中包含 '?' 的情况
    req.query = qs.parse(rawQuery, {
        strictNullHandling: true, // 确保 `=` 被解析为空字符串
        arrayLimit: 100,         // 自定义数组限制
        allowDots: false,        // 禁止点号表示嵌套对象
    });
    // 如果需要，可以在这里对 req.query 进行进一步处理
});

process.on("uncaughtException", (err) => {
    console.error("未捕获异常:", err);
    // 不退出，让主进程继续跑
});

process.on('unhandledRejection', (err) => {
    fastify.log.error(`未处理的Promise拒绝:${err.message}`);
    console.log(`发生了致命的错误，已阻止进程崩溃。${err.stack}`);
});

// 统一退出处理函数
const handleExit = async (signal) => {
    console.log(`\n收到信号 ${signal}，正在优雅关闭服务器...`);
    try {
        await onClose();

        // 停止嗅探器服务
        await stopSnifferServer();

        // 停止 WebSocket 服务器
        await stopWebSocketServer();

        // 停止主服务器
        await fastify.server.close();
        console.log('🛑 所有服务器已优雅关闭');
        process.exit(0);
    } catch (error) {
        console.error('关闭服务器时出错:', error);
        process.exit(1);
    }
};

// 捕获常见退出信号（Linux 上 pm2 stop 会发 SIGINT 或 SIGTERM）
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((sig) => {
    process.on(sig, () => handleExit(sig));
});

// Windows 上的兼容处理：捕获 Ctrl+C
if (process.platform === 'win32') {
    const rl = (await import('readline')).createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', () => {
        handleExit('SIGINT');
    });
}

// 捕获 Node.js 主动退出
process.on('exit', async (code) => {
    console.log(`Process exiting with code: ${code}`);
    // 清理插件进程
    for (const [name, proc] of Object.entries(pluginProcs)) {
        console.log(`[pluginManager] 结束插件 ${name} ${proc.pid}`);
        proc.kill();
    }
});

const registerOptions = {
    rootDir,
    docsDir,
    jxDir,
    publicDir,
    appsDir,
    jsonDir,
    jsDir,
    dr2Dir,
    pyDir,
    catDir,
    catLibDir,
    xbpqDir,
    PORT,
    WsPORT,
    SNIFFER_PORT,
    MAX_TEXT_SIZE,
    MAX_IMAGE_SIZE,
    configDir,
    indexFilePath: path.join(__dirname, 'index.json'),
    customFilePath: path.join(__dirname, 'custom.json'),
    subFilePath: path.join(__dirname, 'public/sub/sub.json'),
    wsApp,
    fastify,
};

// 注册路由
registerRoutes(fastify, registerOptions);
registerWsRoutes(wsApp, registerOptions);

// 启动WebSocket服务器
const startWebSocketServer = async (option) => {
    try {
        const address = await wsApp.listen(option);
        return wsApp;
    } catch (err) {
        wsApp.log.error(`WebSocket服务器启动失败,将会影响一些实时弹幕源的使用:${err.message}`);
    }
};

// 停止WebSocket服务器
const stopWebSocketServer = async () => {
    try {
        await wsApp.server.close();
        wsApp.log.info('WebSocket服务器已停止');
    } catch (err) {
        wsApp.log.error(`停止WebSocket服务器失败:${err.message}`);
    }
};



// 启动服务
const start = async () => {
    try {
        // 启动 Fastify 主服务
        await fastify.listen({port: PORT, host: '0.0.0.0'});

        // 启动 WebSocket 服务器
        await startWebSocketServer({port: WsPORT, host: '0.0.0.0'});

        // 获取地址信息（带错误处理）
        const getNetworkInfo = () => {
            const localAddress = `http://localhost:${PORT}`;
            const wsLocalAddress = `http://localhost:${WsPORT}`;
            const snifferLocalAddress = `http://localhost:${SNIFFER_PORT}`;
            
            let lanAddress = `http://0.0.0.0:${PORT}`;
            let wsLanAddress = `http://0.0.0.0:${WsPORT}`;
            let snifferLanAddress = `http://0.0.0.0:${SNIFFER_PORT}`;
            
            try {
                const interfaces = os.networkInterfaces();
                if (interfaces) {
                    for (const [key, iface] of Object.entries(interfaces)) {
                        if (!iface) continue;
                        for (const config of iface) {
                            if (config.family === 'IPv4' && !config.internal && !config.address.startsWith('169.254')) {
                                lanAddress = `http://${config.address}:${PORT}`;
                                wsLanAddress = `http://${config.address}:${WsPORT}`;
                                snifferLanAddress = `http://${config.address}:${SNIFFER_PORT}`;
                                break;
                            }
                        }
                    }
                }
            } catch (error) {
                console.warn(`⚠️ 无法获取网络接口信息，使用默认地址: ${error.message}`);
            }
            
            return {
                localAddress, wsLocalAddress, snifferLocalAddress,
                lanAddress, wsLanAddress, snifferLanAddress
            };
        };

        const networkInfo = getNetworkInfo();

        console.log(`\n🚀 DRPY Node.js 容器启动成功:`);
        console.log(`\n📡 主服务 (端口 ${PORT}):`);
        console.log(`  - 本地: ${networkInfo.localAddress}`);
        console.log(`  - 局域网: ${networkInfo.lanAddress}`);
        console.log(`\n🔌 WebSocket服务 (端口 ${WsPORT}):`);
        console.log(`  - 本地: ${networkInfo.wsLocalAddress}`);
        console.log(`  - 局域网: ${networkInfo.wsLanAddress}`);
        console.log(`\n🔍 智能路由嗅探器 (端口 ${SNIFFER_PORT}):`);
        console.log(`  - 本地: ${networkInfo.snifferLocalAddress}`);
        console.log(`  - 局域网: ${networkInfo.snifferLanAddress}`);
        console.log(`  - 接口: GET /parse?url={视频URL}`);
        
        // ... 其他信息 ...

    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};



// 停止服务
const stop = async () => {
    try {
        // 停止嗅探器服务
        await stopSnifferServer();

        // 停止 WebSocket 服务器
        await stopWebSocketServer();

        // 停止主服务器
        await fastify.server.close();
        console.log('🛑 所有服务已优雅停止');
    } catch (err) {
        fastify.log.error(`停止服务器时发生错误:${err.message}`);
    }
};

// 导出 start 和 stop 方法
export {start, stop};
export default async function handler(req, res) {
    await fastify.ready()
    fastify.server.emit('request', req, res)
}

// 判断当前模块是否为主模块，如果是主模块，则启动服务
const currentFile = path.normalize(fileURLToPath(import.meta.url)); // 使用 normalize 确保路径一致
const indexFile = path.normalize(path.resolve(__dirname, 'index.js')); // 标准化路径

if (currentFile === indexFile) {
    start();
}