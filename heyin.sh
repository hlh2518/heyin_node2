#!/bin/bash
#set -x  #这里打开调试器，查看整个启动流程

# ==================== 颜色定义 ====================
# 前景色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'

# 亮色
BRIGHT_RED='\033[1;31m'
BRIGHT_GREEN='\033[1;32m'
BRIGHT_YELLOW='\033[1;33m'
BRIGHT_BLUE='\033[1;34m'
BRIGHT_PURPLE='\033[1;35m'
BRIGHT_CYAN='\033[1;36m'
BRIGHT_WHITE='\033[1;37m'

# 背景色
BG_RED='\033[41m'
BG_GREEN='\033[42m'
BG_YELLOW='\033[43m'
BG_BLUE='\033[44m'
BG_PURPLE='\033[45m'
BG_CYAN='\033[46m'

# 样式
BOLD='\033[1m'
UNDERLINE='\033[4m'
BLINK='\033[5m'
REVERSE='\033[7m'

# 重置
RESET='\033[0m'

# 颜色输出函数
echo_color() {
    echo -e "${1}${2}${RESET}"
}

echo_success() {
    echo -e "${BRIGHT_GREEN}✓ ${1}${RESET}"
}

echo_error() {
    echo -e "${BRIGHT_RED}✗ ${1}${RESET}"
}

echo_warning() {
    echo -e "${BRIGHT_YELLOW}⚠ ${1}${RESET}"
}

echo_info() {
    echo -e "${BRIGHT_CYAN}➤ ${1}${RESET}"
}

echo_step() {
    echo -e "${BOLD}${BRIGHT_BLUE}▸ ${1}${RESET}"
}

echo_title() {
    echo ""
    echo -e "${BOLD}${BG_WHITE}${BRIGHT_WHITE}═════════════════════════════════════════════════════════════════${RESET}"
    echo -e "${BOLD}${BG_WHITE}${BRIGHT_RED}  $1${RESET}"
    echo -e "${BOLD}${BG_WHITE}${BRIGHT_WHITE}═════════════════════════════════════════════════════════════════${RESET}"
    echo ""
}

echo_divider() {
    echo -e "${BOLD}${YELLOW}─────────────────────────────────────────────────────────────────${RESET}"
}

# ==================== 变量定义 ====================
# 定义常用路径
HEYIN_DIR="$HOME/heyin"  # 必须设置这个变量！


# 日志文件定义
LOG_DIR="/var/log/heyin"
mkdir -p "$LOG_DIR"

# ==================== 脚本开始 ====================
clear
echo ""
# 闪烁效果标题（如果终端支持）
echo -e "${BLINK}${BOLD}${BRIGHT_YELLOW}╔═══════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BLINK}${BOLD}${BRIGHT_YELLOW}║                                                               ║${RESET}"
echo -e "${BLINK}${BOLD}${BRIGHT_YELLOW}║                     荷影服务器系统  BY 黄荷                   ║${RESET}"
echo -e "${BLINK}${BOLD}${BRIGHT_YELLOW}║                                                               ║${RESET}"
echo -e "${BLINK}${BOLD}${BRIGHT_YELLOW}╚═══════════════════════════════════════════════════════════════╝${RESET}"
echo ""


echo_title "$(date +%Y-%m-%d\ %H:%M:%S) - 开始更新并启动所有服务"

# 0. 设置工作目录
echo_step "设置工作目录..."
cd "$HEYIN_DIR" || { echo_error "错误: 无法进入目录 $HEYIN_DIR"; exit 1; }
echo_success "工作目录设置完成: $HEYIN_DIR"
#所有服务线程先停止再启动原则
# 1. 停止所有可能运行的服务
echo_step "停止所有现有服务..."
pkill -f "node index.js" 2>/dev/null && echo_info "停止 荷影3.0"

sleep 2
echo_success "所有服务已停止"

echo_divider



# 2. 启动 drpyS (Node.js 应用)
echo_step "启动 荷影3.0 (drpyS)..."
cd "$HEYIN_DIR" || exit 1

# 安装依赖
echo_info "安装 荷影3.0依赖..."
npm install 2>&1 | while read line; do
    if echo "$line" | grep -q "added"; then
        echo -e "${GREEN}  ${line}${RESET}"
    elif echo "$line" | grep -q "WARN"; then
        echo -e "${YELLOW}  ${line}${RESET}"
    elif echo "$line" | grep -q "ERR!"; then
        echo -e "${RED}  ${line}${RESET}"
    else
        echo -e "${CYAN}  ${line}${RESET}"
    fi
done || { echo_error "npm install 失败"; exit 1; }

# 清理旧文件
echo_info "清理旧文件..."
rm -rf nohup.out docs soft

# 启动 Node.js 应用并等待
echo_info "启动 荷影3.0 应用..."
#nohup node index.js > "${LOG_DIR}/drpys.log" 2>&1 &

node index.js & echo $! > nohup2.pid 

NODE_PID=$!
echo_info "荷影3.0 应用 PID: ${BRIGHT_YELLOW}$NODE_PID${RESET}"

# 等待 Node.js 启动完成
echo -ne "${BLUE}等待应用启动完成"
for i in {1..5}; do
    echo -ne "${BLUE}.${RESET}"
    sleep 1
done
echo ""

if ! kill -0 $NODE_PID 2>/dev/null; then
    echo_error "荷影3.0 应用启动失败"
    tail -20 "${LOG_DIR}/drpys.log"
    exit 1
fi

echo_success "$(date +%Y-%m-%d\ %H:%M:%S) - 荷影3.0 应用启动成功"

echo_divider



# 3. 检查所有服务状态
echo_title "服务状态检查报告"

echo -e "${BOLD}${BRIGHT_WHITE}服务状态概览:${RESET}"
echo ""

# 1. 荷影3.0 (drpyS)
echo -ne "${BOLD}${CYAN}[1] 荷影3.0 (drpyS):${RESET} "
if ps -p $NODE_PID >/dev/null; then
    echo -e "${BRIGHT_GREEN}✓ 运行中${RESET} ${WHITE}(PID: ${BRIGHT_YELLOW}$NODE_PID${WHITE})${RESET}"
    echo -e "   ${WHITE}日志: ${UNDERLINE}${LOG_DIR}/drpys.log${RESET}"
else
    echo -e "${RED}✗ 未运行${RESET}"
fi
echo ""

# 2. 荷影解析服务器 (heyinx)
echo -ne "${BOLD}${CYAN}[2] 荷影解析服务器 :${RESET} "
if ps -p $HEYINX_PID >/dev/null; then
    echo -e "${BRIGHT_GREEN}✓ 运行中${RESET} ${WHITE}(PID: ${BRIGHT_YELLOW}$HEYINX_PID${WHITE})${RESET}"
    PORT_STATUS=$(ss -tulpn | grep :2999 >/dev/null && echo -e "${BRIGHT_GREEN}监听中${RESET}" || echo -e "${RED}未监听${RESET}")
    echo -e "   ${WHITE}解析端口 2999 状态: $PORT_STATUS${RESET}"
    echo -e "   ${WHITE}日志: ${UNDERLINE}${LOG_DIR}/heyinx.log${RESET}"
else
    echo -e "${RED}✗ 未运行${RESET}"
fi
echo ""



echo_divider



# 4. 管理命令
echo -e "${BOLD}${BRIGHT_WHITE}🔧 管理命令:${RESET}"
echo ""
echo -e "  ${YELLOW}查看所有日志:${RESET}   ${WHITE}tail -f ${LOG_DIR}/*.log${RESET}"

echo ""

echo_divider

# 5. 完成提示
echo -e "${BOLD}${BRIGHT_GREEN}🎉 所有服务启动完成!${RESET}"
echo -e "${BRIGHT_CYAN}$(date +%Y-%m-%d\ %H:%M:%S) - 荷影影视系统已就绪，祝您使用愉快！${RESET}"
echo ""
echo -e "${BRIGHT_YELLOW}💡 提示: 系统启动可能需要一些时间进行初始化，请稍等片刻再访问。${RESET}"

# 播放完成音效（可选）
if command -v beep &> /dev/null; then
    beep -f 1000 -l 100 -n -f 1500 -l 100 2>/dev/null
fi

# 等待用户按键
echo ""
read -n 1 -s -p "$(echo -e ${BRIGHT_CYAN}'按任意键返回系统或 Ctrl+C 退出...'${RESET})"
echo ""