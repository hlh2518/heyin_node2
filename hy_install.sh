# 直接强制安装，忽略所有警告
apt install python3-pip -y && pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple 

apt install -y libpq-dev tmux && pip3 install --upgrade pip --break-system-packages 2>/dev/null || true && pip3 install -r requirements.txt --no-cache-dir --break-system-packages --ignore-installed 

# pip3 install click dotenv virtualenv --break-system-packages --ignore-installed && playwright install chromium

# apt-get install libnss3  libnspr4 libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64   libdrm2 libxkbcommon0  libxcomposite1  libxdamage1 libxfixes3   libxrandr2   libgbm1  libpango-1.0-0  libcairo2 libasound2t64 libatspi2.0-0t64

# 1. 卸载现有的 Node.js
#sudo apt remove nodejs npm -y

# 2. 清理残留
#sudo apt autoremove -y

# 3. 安装 curl（如果没有）
#sudo apt install curl -y

# 4. 添加 NodeSource 仓库（Node.js 22.x 最新版）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# 5. 安装 Node.js 和 npm
sudo apt install nodejs -y

# 6. 验证安装
node --version

 npm config set registry https://registry.npmmirror.com  && npm install