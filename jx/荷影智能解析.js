/**
 * 智能解析 -荷影 (2692端口)
 * 路径: /jx/智能解析.js
 */

const { requestJson } = $.require('./_lib.request.js');

async function lazy(input, params) {
    const videoUrl = typeof input === 'object' ? input.url : input;
    log(`[智能解析] 输入: ${videoUrl}`);

    // 1. 确定flag（平台标识）
    let flag = 'other';
    if (videoUrl.includes('iqiyi.com')) flag = '爱奇艺';
    else if (videoUrl.includes('qq.com') || videoUrl.includes('v.qq.com')) flag = '腾讯视频';
    else if (videoUrl.includes('youku.com')) flag = '优酷';
    else if (videoUrl.includes('mgtv.com')) flag = '芒果';
    else if (videoUrl.includes('bilibili.com')) flag = '哔哩哔哩';

    // 2. 使用荷影 (2692端口)
    const NODE_API = 'http://127.0.0.1:2692/parse';

    let result = null;

    try {
        log(`[智能解析] 使用 荷影 (2692端口)`);
        const nodeUrl = `${NODE_API}?url=${encodeURIComponent(videoUrl)}`;

        result = await requestJson(nodeUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'TVBox-Player/1.0',
                'Accept': 'application/json'
            },
            timeout: 15000  // 15秒超时
        });

        log(`✅ [智能解析] 荷影成功`);

    } catch (nodeError) {
        log(`❌ [智能解析] 荷影失败: ${nodeError.message}`);
        
        // 直接返回需要嗅探的结果，不尝试Python版本
        return {
            parse: 1,  // 需要嗅探
            jx: 0,
            url: videoUrl,
            flag: flag.toLowerCase()
                .replace('视频', '')
                .replace('奇艺', 'qiyi')
                .replace('腾讯', 'qq')
                .replace('优酷', 'youku')
                .replace('芒果', 'mgtv')
                .replace('哔哩哔哩', 'bili'),
            msg: `智能解析失败: ${nodeError.message}`
        };
    }

    // 3. 处理返回结果
    if (result && result.code === 200 && result.url) {
        log(`✅ [智能解析] 成功: ${result.url.substring(0, 80)}...`);
        if (result.cost) {
            log(`✅ [智能解析] 耗时: ${result.cost}`);
        }

        // 根据parse字段决定返回格式
        if (result.parse === 0) {
            // 直接播放链接
            return result.url;
        } else {
            // 返回完整对象
            const response = {
                parse: result.parse || 0,
                jx: result.jx || 0,
                url: result.url,
                flag: flag.toLowerCase()
                    .replace('视频', '')
                    .replace('奇艺', 'qiyi')
                    .replace('腾讯', 'qq')
                    .replace('优酷', 'youku')
                    .replace('芒果', 'mgtv')
                    .replace('哔哩哔哩', 'bili'),
                header: result.header || {},
                msg: `${result.msg || '解析成功'} (Node.js)`
            };

            // 添加解析站信息
            if (result.jxSource) {
                try {
                    const jxUrl = new URL(result.jxSource);
                    response.msg += ` [${jxUrl.hostname}]`;
                } catch (e) {
                    response.msg += ' [解析站]';
                }
            }

            return response;
        }
    } else {
        // API返回了失败
        const errorMsg = result?.msg || `API返回失败 code=${result?.code || '未知'}`;
        log(`❌ [智能解析] 失败: ${errorMsg}`);

        // 降级方案：返回原始URL让系统嗅探
        return {
            parse: 1,  // 需要嗅探
            jx: 0,
            url: videoUrl,
            flag: flag.toLowerCase()
                .replace('视频', '')
                .replace('奇艺', 'qiyi')
                .replace('腾讯', 'qq')
                .replace('优酷', 'youku')
                .replace('芒果', 'mgtv')
                .replace('哔哩哔哩', 'bili'),
            msg: `智能解析失败: ${errorMsg}`
        };
    }
}

module.exports = {
    name: '智能解析(Node.js版)',
    version: '2.0.1',
    lazy: lazy
};