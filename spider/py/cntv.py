"""
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 1,
  title: '中央电视台',
  lang: 'hipy'
})
"""

# coding=utf-8
# !/usr/bin/python
import os.path
import random
import sys
import json
import time
import base64
import datetime
import re
from urllib import request, parse
from urllib.parse import urljoin
from pathlib import Path
import urllib
import urllib.request
import html as html_lib

# 尝试导入lxml，如果不可用则使用正则替代
try:
    from lxml import etree

    HAS_LXML = True
except ImportError:
    HAS_LXML = False

"""
配置示例:
t4的配置里ext节点会自动变成api对应query参数extend,但t4的ext字符串不支持路径格式，比如./开头或者.json结尾
api里会自动含有ext参数是base64编码后的选中的筛选条件

错误示例,ext含有json:
{
    "key":"hipy_cntv央视",
    "name":"cntv央视(hipy_t4)",
    "type":4,
    "api":"http://192.168.31.49:5707/api/v1/vod/cntv央视?api_ext={{host}}/txt/hipy/cntv央视.json",
    "searchable":1,
    "quickSearch":1,
    "filterable":0,
    "ext":"cntv央视.json"
 }
 正确示例。同时存在ext和api_ext会优先取ext作为extend加载init
 {
    "key":"hipy_t4_cntv央视",
    "name":"cntv央视(hipy_t4)",
    "type":4,
    "api":"http://192.168.31.49:5707/api/v1/vod/cntv央视?api_ext={{host}}/txt/hipy/cntv央视.json",
    "searchable":1,
    "quickSearch":0,
    "filterable":1,
    "ext":"{{host}}/files/hipy/cntv央视.json"
 },
 {
    "key": "hipy_t3_cntv央视",
    "name": "cntv央视(hipy_t3)",
    "type": 3,
    "api": "{{host}}/txt/hipy/cntv央视.py",
    "searchable": 1,
    "quickSearch": 0,
    "filterable": 1,
    "ext": "{{host}}/files/hipy/cntv央视.json"
},
"""


class Spider:  # 元类 默认的元类 type
    module = None

    def __init__(self, t4_api=None):
        self.t4_api = t4_api
        self.extend = ""
        # 初始化配置，保留老框架中的所有配置
        self.config = {
            "player": {},
            "filter": {
                "电视剧": [
                    {
                        "key": "datafl-sc",
                        "name": "类型",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "谍战", "v": "谍战"},
                            {"n": "悬疑", "v": "悬疑"},
                            {"n": "刑侦", "v": "刑侦"},
                            {"n": "历史", "v": "历史"},
                            {"n": "古装", "v": "古装"},
                            {"n": "武侠", "v": "武侠"},
                            {"n": "军旅", "v": "军旅"},
                            {"n": "战争", "v": "战争"},
                            {"n": "喜剧", "v": "喜剧"},
                            {"n": "青春", "v": "青春"},
                            {"n": "言情", "v": "言情"},
                            {"n": "偶像", "v": "偶像"},
                            {"n": "家庭", "v": "家庭"},
                            {"n": "年代", "v": "年代"},
                            {"n": "革命", "v": "革命"},
                            {"n": "农村", "v": "农村"},
                            {"n": "都市", "v": "都市"},
                            {"n": "其他", "v": "其他"},
                        ],
                    },
                    {
                        "key": "datadq-area",
                        "name": "地区",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "中国大陆", "v": "中国大陆"},
                            {"n": "中国香港", "v": "香港"},
                            {"n": "美国", "v": "美国"},
                            {"n": "欧洲", "v": "欧洲"},
                            {"n": "泰国", "v": "泰国"},
                        ],
                    },
                    {
                        "key": "datanf-year",
                        "name": "年份",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "2024", "v": "2024"},
                            {"n": "2023", "v": "2023"},
                            {"n": "2022", "v": "2022"},
                            {"n": "2021", "v": "2021"},
                            {"n": "2020", "v": "2020"},
                            {"n": "2019", "v": "2019"},
                            {"n": "2018", "v": "2018"},
                            {"n": "2017", "v": "2017"},
                            {"n": "2016", "v": "2016"},
                            {"n": "2015", "v": "2015"},
                            {"n": "2014", "v": "2014"},
                            {"n": "2013", "v": "2013"},
                            {"n": "2012", "v": "2012"},
                            {"n": "2011", "v": "2011"},
                            {"n": "2010", "v": "2010"},
                            {"n": "2009", "v": "2009"},
                            {"n": "2008", "v": "2008"},
                            {"n": "2007", "v": "2007"},
                            {"n": "2006", "v": "2006"},
                            {"n": "2005", "v": "2005"},
                            {"n": "2004", "v": "2004"},
                            {"n": "2003", "v": "2003"},
                            {"n": "2002", "v": "2002"},
                            {"n": "2001", "v": "2001"},
                            {"n": "2000", "v": "2000"},
                            {"n": "1999", "v": "1999"},
                            {"n": "1998", "v": "1998"},
                            {"n": "1997", "v": "1997"},
                        ],
                    },
                    {
                        "key": "dataszm-letter",
                        "name": "字母",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "A", "v": "A"},
                            {"n": "C", "v": "C"},
                            {"n": "E", "v": "E"},
                            {"n": "F", "v": "F"},
                            {"n": "G", "v": "G"},
                            {"n": "H", "v": "H"},
                            {"n": "I", "v": "I"},
                            {"n": "J", "v": "J"},
                            {"n": "K", "v": "K"},
                            {"n": "L", "v": "L"},
                            {"n": "M", "v": "M"},
                            {"n": "N", "v": "N"},
                            {"n": "O", "v": "O"},
                            {"n": "P", "v": "P"},
                            {"n": "Q", "v": "Q"},
                            {"n": "R", "v": "R"},
                            {"n": "S", "v": "S"},
                            {"n": "T", "v": "T"},
                            {"n": "U", "v": "U"},
                            {"n": "V", "v": "V"},
                            {"n": "W", "v": "W"},
                            {"n": "X", "v": "X"},
                            {"n": "Y", "v": "Y"},
                            {"n": "Z", "v": "Z"},
                            {"n": "0-9", "v": "0-9"},
                        ],
                    },
                ],
                "动画片": [
                    {
                        "key": "datafl-sc",
                        "name": "类型",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "亲子", "v": "亲子"},
                            {"n": "搞笑", "v": "搞笑"},
                            {"n": "冒险", "v": "冒险"},
                            {"n": "动作", "v": "动作"},
                            {"n": "宠物", "v": "宠物"},
                            {"n": "体育", "v": "体育"},
                            {"n": "益智", "v": "益智"},
                            {"n": "历史", "v": "历史"},
                            {"n": "教育", "v": "教育"},
                            {"n": "校园", "v": "校园"},
                            {"n": "言情", "v": "言情"},
                            {"n": "武侠", "v": "武侠"},
                            {"n": "经典", "v": "经典"},
                            {"n": "未来", "v": "未来"},
                            {"n": "古代", "v": "古代"},
                            {"n": "神话", "v": "神话"},
                            {"n": "真人", "v": "真人"},
                            {"n": "励志", "v": "励志"},
                            {"n": "热血", "v": "热血"},
                            {"n": "奇幻", "v": "奇幻"},
                            {"n": "童话", "v": "童话"},
                            {"n": "剧情", "v": "剧情"},
                            {"n": "夺宝", "v": "夺宝"},
                            {"n": "其他", "v": "其他"},
                        ],
                    },
                    {
                        "key": "datadq-area",
                        "name": "地区",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "中国大陆", "v": "中国大陆"},
                            {"n": "美国", "v": "美国"},
                            {"n": "欧洲", "v": "欧洲"},
                        ],
                    },
                    {
                        "key": "dataszm-letter",
                        "name": "字母",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "A", "v": "A"},
                            {"n": "C", "v": "C"},
                            {"n": "E", "v": "E"},
                            {"n": "F", "v": "F"},
                            {"n": "G", "v": "G"},
                            {"n": "H", "v": "H"},
                            {"n": "I", "v": "I"},
                            {"n": "J", "v": "J"},
                            {"n": "K", "v": "K"},
                            {"n": "L", "v": "L"},
                            {"n": "M", "v": "M"},
                            {"n": "N", "v": "N"},
                            {"n": "O", "v": "O"},
                            {"n": "P", "v": "P"},
                            {"n": "Q", "v": "Q"},
                            {"n": "R", "v": "R"},
                            {"n": "S", "v": "S"},
                            {"n": "T", "v": "T"},
                            {"n": "U", "v": "U"},
                            {"n": "V", "v": "V"},
                            {"n": "W", "v": "W"},
                            {"n": "X", "v": "X"},
                            {"n": "Y", "v": "Y"},
                            {"n": "Z", "v": "Z"},
                            {"n": "0-9", "v": "0-9"},
                        ],
                    },
                ],
                "纪录片": [
                    {
                        "key": "datafl-sc",
                        "name": "类型",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "人文历史", "v": "人文历史"},
                            {"n": "人物", "v": "人物"},
                            {"n": "军事", "v": "军事"},
                            {"n": "探索", "v": "探索"},
                            {"n": "社会", "v": "社会"},
                            {"n": "时政", "v": "时政"},
                            {"n": "经济", "v": "经济"},
                            {"n": "科技", "v": "科技"},
                        ],
                    },
                    {
                        "key": "datanf-year",
                        "name": "年份",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "2024", "v": "2024"},
                            {"n": "2023", "v": "2023"},
                            {"n": "2022", "v": "2022"},
                            {"n": "2021", "v": "2021"},
                            {"n": "2020", "v": "2020"},
                            {"n": "2019", "v": "2019"},
                            {"n": "2018", "v": "2018"},
                            {"n": "2017", "v": "2017"},
                            {"n": "2016", "v": "2016"},
                            {"n": "2015", "v": "2015"},
                            {"n": "2014", "v": "2014"},
                            {"n": "2013", "v": "2013"},
                            {"n": "2012", "v": "2012"},
                            {"n": "2011", "v": "2011"},
                            {"n": "2010", "v": "2010"},
                            {"n": "2009", "v": "2009"},
                            {"n": "2008", "v": "2008"},
                        ],
                    },
                    {
                        "key": "dataszm-letter",
                        "name": "字母",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "A", "v": "A"},
                            {"n": "C", "v": "C"},
                            {"n": "E", "v": "E"},
                            {"n": "F", "v": "F"},
                            {"n": "G", "v": "G"},
                            {"n": "H", "v": "H"},
                            {"n": "I", "v": "I"},
                            {"n": "J", "v": "J"},
                            {"n": "K", "v": "K"},
                            {"n": "L", "v": "L"},
                            {"n": "M", "v": "M"},
                            {"n": "N", "v": "N"},
                            {"n": "O", "v": "O"},
                            {"n": "P", "v": "P"},
                            {"n": "Q", "v": "Q"},
                            {"n": "R", "v": "R"},
                            {"n": "S", "v": "S"},
                            {"n": "T", "v": "T"},
                            {"n": "U", "v": "U"},
                            {"n": "V", "v": "V"},
                            {"n": "W", "v": "W"},
                            {"n": "X", "v": "X"},
                            {"n": "Y", "v": "Y"},
                            {"n": "Z", "v": "Z"},
                            {"n": "0-9", "v": "0-9"},
                        ],
                    },
                ],
                "特别节目": [
                    {
                        "key": "datafl-sc",
                        "name": "类型",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "全部", "v": "全部"},
                            {"n": "新闻", "v": "新闻"},
                            {"n": "经济", "v": "经济"},
                            {"n": "综艺", "v": "综艺"},
                            {"n": "体育", "v": "体育"},
                            {"n": "军事", "v": "军事"},
                            {"n": "影视", "v": "影视"},
                            {"n": "科教", "v": "科教"},
                            {"n": "戏曲", "v": "戏曲"},
                            {"n": "青少", "v": "青少"},
                            {"n": "音乐", "v": "音乐"},
                            {"n": "社会", "v": "社会"},
                            {"n": "公益", "v": "公益"},
                            {"n": "其他", "v": "其他"},
                        ],
                    },
                    {
                        "key": "dataszm-letter",
                        "name": "字母",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "A", "v": "A"},
                            {"n": "C", "v": "C"},
                            {"n": "E", "v": "E"},
                            {"n": "F", "v": "F"},
                            {"n": "G", "v": "G"},
                            {"n": "H", "v": "H"},
                            {"n": "I", "v": "I"},
                            {"n": "J", "v": "J"},
                            {"n": "K", "v": "K"},
                            {"n": "L", "v": "L"},
                            {"n": "M", "v": "M"},
                            {"n": "N", "v": "N"},
                            {"n": "O", "v": "O"},
                            {"n": "P", "v": "P"},
                            {"n": "Q", "v": "Q"},
                            {"n": "R", "v": "R"},
                            {"n": "S", "v": "S"},
                            {"n": "T", "v": "T"},
                            {"n": "U", "v": "U"},
                            {"n": "V", "v": "V"},
                            {"n": "W", "v": "W"},
                            {"n": "X", "v": "X"},
                            {"n": "Y", "v": "Y"},
                            {"n": "Z", "v": "Z"},
                            {"n": "0-9", "v": "0-9"},
                        ],
                    },
                ],
                "栏目大全": [
                    {
                        "key": "cid",
                        "name": "频道",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "CCTV-1综合", "v": "EPGC1386744804340101"},
                            {"n": "CCTV-2财经", "v": "EPGC1386744804340102"},
                            {"n": "CCTV-3综艺", "v": "EPGC1386744804340103"},
                            {"n": "CCTV-4中文国际", "v": "EPGC1386744804340104"},
                            {"n": "CCTV-5体育", "v": "EPGC1386744804340107"},
                            {"n": "CCTV-6电影", "v": "EPGC1386744804340108"},
                            {"n": "CCTV-7国防军事", "v": "EPGC1386744804340109"},
                            {"n": "CCTV-8电视剧", "v": "EPGC1386744804340110"},
                            {"n": "CCTV-9纪录", "v": "EPGC1386744804340112"},
                            {"n": "CCTV-10科教", "v": "EPGC1386744804340113"},
                            {"n": "CCTV-11戏曲", "v": "EPGC1386744804340114"},
                            {"n": "CCTV-12社会与法", "v": "EPGC1386744804340115"},
                            {"n": "CCTV-13新闻", "v": "EPGC1386744804340116"},
                            {"n": "CCTV-14少儿", "v": "EPGC1386744804340117"},
                            {"n": "CCTV-15音乐", "v": "EPGC1386744804340118"},
                            {"n": "CCTV-16奥林匹克", "v": "EPGC1634630207058998"},
                            {"n": "CCTV-17农业农村", "v": "EPGC1563932742616872"},
                            {"n": "CCTV-5+体育赛事", "v": "EPGC1468294755566101"},
                        ],
                    },
                    {
                        "key": "fc",
                        "name": "分类",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "新闻", "v": "新闻"},
                            {"n": "体育", "v": "体育"},
                            {"n": "综艺", "v": "综艺"},
                            {"n": "健康", "v": "健康"},
                            {"n": "生活", "v": "生活"},
                            {"n": "科教", "v": "科教"},
                            {"n": "经济", "v": "经济"},
                            {"n": "农业", "v": "农业"},
                            {"n": "法治", "v": "法治"},
                            {"n": "军事", "v": "军事"},
                            {"n": "少儿", "v": "少儿"},
                            {"n": "动画", "v": "动画"},
                            {"n": "纪实", "v": "纪实"},
                            {"n": "戏曲", "v": "戏曲"},
                            {"n": "音乐", "v": "音乐"},
                            {"n": "影视", "v": "影视"},
                        ],
                    },
                    {
                        "key": "fl",
                        "name": "字母",
                        "value": [
                            {"n": "全部", "v": ""},
                            {"n": "A", "v": "A"},
                            {"n": "B", "v": "B"},
                            {"n": "C", "v": "C"},
                            {"n": "D", "v": "D"},
                            {"n": "E", "v": "E"},
                            {"n": "F", "v": "F"},
                            {"n": "G", "v": "G"},
                            {"n": "H", "v": "H"},
                            {"n": "I", "v": "I"},
                            {"n": "J", "v": "J"},
                            {"n": "K", "v": "K"},
                            {"n": "L", "v": "L"},
                            {"n": "M", "v": "M"},
                            {"n": "N", "v": "N"},
                            {"n": "O", "v": "O"},
                            {"n": "P", "v": "P"},
                            {"n": "Q", "v": "Q"},
                            {"n": "R", "v": "R"},
                            {"n": "S", "v": "S"},
                            {"n": "T", "v": "T"},
                            {"n": "U", "v": "U"},
                            {"n": "V", "v": "V"},
                            {"n": "W", "v": "W"},
                            {"n": "X", "v": "X"},
                            {"n": "Y", "v": "Y"},
                            {"n": "Z", "v": "Z"},
                        ],
                    },
                ],
            },
        }
        self.header = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36",
            "Host": "tv.cctv.com",
            "Referer": "https://tv.cctv.com/",
        }

    def setExtendInfo(self, ext):
        """设置扩展信息，用于hipy框架"""
        self.extend = ext

    def getDependence(self):
        """获取依赖项"""
        return []

    def init_api_ext_file(self):
        ext_file = __file__.replace(".py", ".json")
        print(f"ext_file:{ext_file}")
        # 特别节目网页: https://tv.cctv.com/yxg/index.shtml?spm=C28340.PlFTqGe6Zk8M.E2PQtIunpEaz.65
        # 特别节目分类筛选获取页面: https://tv.cctv.com/yxg/tbjm/index.shtml
        # 纪录片网页: https://tv.cctv.com/yxg/index.shtml?spm=C28340.PlFTqGe6Zk8M.E2PQtIunpEaz.65
        # 纪录片分类筛选获取页面:https://tv.cctv.com/yxg/jlp/index.shtml
        # ==================== 获取特别节目的筛选条件 ======================
        try:
            r = self.fetch("https://tv.cctv.com/yxg/tbjm/index.shtml")
            html = r.text
            # 由于我们不能引入lxml，所以这里简化处理
            # 在实际环境中，需要实现HTML解析逻辑
        except:
            pass

        # ==================== 纪录片筛选获取 ======================
        try:
            r = self.fetch("https://tv.cctv.com/yxg/jlp/index.shtml")
            html = r.text
        except:
            pass

        ext_file_dict = {
            "特别节目": [],
            "纪录片": [],
        }

        # print(json.dumps(ext_file_dict,ensure_ascii=False,indent=4))
        with open(ext_file, mode="w+", encoding="utf-8") as f:
            # f.write(json.dumps(ext_file_dict,ensure_ascii=False,indent=4))
            f.write(json.dumps(ext_file_dict, ensure_ascii=False))

    def init(self, extend=""):
        def init_file(ext_file):
            ext_file = Path(ext_file).as_posix()
            # print(f'ext_file:{ext_file}')
            if os.path.exists(ext_file):
                # print('存在扩展文件')
                with open(ext_file, mode="r", encoding="utf-8") as f:
                    try:
                        ext_dict = json.loads(f.read())
                        # print(ext_dict)
                        self.config["filter"].update(ext_dict)
                    except Exception as e:
                        print(f"更新扩展筛选条件发生错误:{e}")

        print("============依赖列表:{0}============".format(extend))
        ext = extend
        print("============ext:{0}============".format(ext))
        if isinstance(ext, str) and ext:
            if ext.startswith("./"):
                ext_file = os.path.join(os.path.dirname(__file__), ext)
                init_file(ext_file)
            elif ext.startswith("http"):
                try:
                    import urllib.request
                    req = urllib.request.Request(ext, headers=self.header)
                    with urllib.request.urlopen(req) as response:
                        ext_dict = json.loads(response.read().decode("utf-8"))
                        self.config["filter"].update(ext_dict)
                except Exception as e:
                    print(f"更新扩展筛选条件发生错误:{e}")
            elif not ext.startswith("./") and not ext.startswith("http"):
                ext_file = os.path.join(os.path.dirname(__file__), "./" + ext + ".json")
                init_file(ext_file)

        # ==================== 栏目大全加载年月筛选 ======================
        lanmu_list = self.config["filter"]["栏目大全"]
        lanmu_keys_list = [lanmu["key"] for lanmu in lanmu_list]
        if "year" not in lanmu_keys_list:
            currentYear = datetime.date.today().year
            yearList = [{"n": "全部", "v": ""}]
            for year in range(currentYear, currentYear - 10, -1):
                yearList.append({"n": year, "v": year})
            yearDict = {"key": "year", "name": "年份", "value": yearList}
            lanmu_list.append(yearDict)
        if "month" not in lanmu_keys_list:
            monthList = [{"n": "全部", "v": ""}]
            for month in range(1, 13):
                text = str(month).rjust(2, "0")
                monthList.append({"n": text, "v": text})
            monthDict = {"key": "month", "name": "月份", "value": monthList}
            lanmu_list.append(monthDict)

        # 装载模块，这里只要一个就够了
        if isinstance(extend, list):
            for lib in extend:
                if '.Spider' in str(type(lib)):
                    self.module = lib
                    break

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass

    def homeContent(self, filter):
        result = {}
        cateManual = {
            "4K专区": "4K专区",
            "栏目大全": "栏目大全",
            "特别节目": "特别节目",
            "纪录片": "纪录片",
            "电视剧": "电视剧",
            "动画片": "动画片",
            "频道直播": "频道直播",
        }
        classes = []
        for k in cateManual:
            classes.append({"type_name": k, "type_id": cateManual[k]})
        result["class"] = classes
        if filter:
            result["filters"] = self.config["filter"]
        return result

    def homeVideoContent(self):
        result = {"list": []}
        if self.module:
            result = self.module.homeVideoContent()
        return result

    def categoryContent(self, tid, pg, filter, extend):
        result = {}
        month = ""  # 月
        year = ""  # 年
        area = ""  # 地区
        channel = ""  # 频道
        datafl = ""  # 类型
        letter = ""  # 字母
        year_prefix = ""  # 栏目大全的年月筛选过滤
        pagecount = 24

        # 修复：确保extend是字典类型
        if not extend:
            extend = {}
        elif isinstance(extend, str):
            try:
                extend = json.loads(extend)
            except:
                extend = {}

        # 修改请求头，添加必要的头部信息
        self.header = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": "https://tv.cctv.com/",
            "Origin": "https://tv.cctv.com",
            "Connection": "keep-alive",
            "Host": "api.cntv.cn",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
        }

        if tid == "动画片":
            id = parse.quote(tid)
            if "datadq-area" in extend.keys():
                area = parse.quote(extend["datadq-area"])
            if "dataszm-letter" in extend.keys():
                letter = extend["dataszm-letter"]
            if "datafl-sc" in extend.keys():
                datafl = parse.quote(extend["datafl-sc"])
            # 修复URL，去除多余参数
            url = f"https://api.cntv.cn/list/getVideoAlbumList?channelid=CHAL1460955899450127&area={area}&sc={datafl}&fc={id}&letter={letter}&p={pg}&n=24&serviceId=tvcctv&t=json"

        elif tid == "纪录片":
            id = parse.quote(tid)
            if "datapd-channel" in extend.keys():
                channel = parse.quote(extend["datapd-channel"])
            if "datafl-sc" in extend.keys():
                datafl = parse.quote(extend["datafl-sc"])
            if "datanf-year" in extend.keys():
                year = extend["datanf-year"]
            if "dataszm-letter" in extend.keys():
                letter = extend["dataszm-letter"]
            # 修复URL
            url = f"https://api.cntv.cn/list/getVideoAlbumList?channelid=CHAL1460955924871139&fc={id}&channel={channel}&sc={datafl}&year={year}&letter={letter}&p={pg}&n=24&serviceId=tvcctv&t=json"

        elif tid == "电视剧":
            id = parse.quote(tid)
            if "datafl-sc" in extend.keys():
                datafl = parse.quote(extend["datafl-sc"])
            if "datanf-year" in extend.keys():
                year = extend["datanf-year"]
            if "dataszm-letter" in extend.keys():
                letter = extend["dataszm-letter"]
            # 修复：为电视剧分类添加地区参数
            if "datadq-area" in extend.keys():
                area = parse.quote(extend["datadq-area"])
            # 修复URL，简化参数
            url = f"https://api.cntv.cn/list/getVideoAlbumList?channelid=CHAL1460955853485115&area={area}&sc={datafl}&fc={id}&year={year}&letter={letter}&p={pg}&n=24&serviceId=tvcctv&t=json"

        elif tid == "特别节目":
            id = parse.quote(tid)
            if "datapd-channel" in extend.keys():
                channel = parse.quote(extend["datapd-channel"])
            if "datafl-sc" in extend.keys():
                datafl = parse.quote(extend["datafl-sc"])
            if "dataszm-letter" in extend.keys():
                letter = extend["dataszm-letter"]
            # 修复URL
            url = f"https://api.cntv.cn/list/getVideoAlbumList?channelid=CHAL1460955953877151&channel={channel}&sc={datafl}&fc={id}&letter={letter}&p={pg}&n=24&serviceId=tvcctv&t=json"

        elif tid == "栏目大全":
            cid = ""  # 频道
            if "cid" in extend.keys():
                cid = extend["cid"]
            fc = ""  # 分类
            if "fc" in extend.keys():
                fc = extend["fc"]
            fl = ""  # 字母
            if "fl" in extend.keys():
                fl = extend["fl"]
            year = extend.get("year") or ""
            month = extend.get("month") or ""
            if year:
                year_prefix = year + month
            # 修复URL：使用测试可用的API地址
            url = f"https://api.cntv.cn/lanmu/columnSearch?fl={fl}&fc={fc}&cid={cid}&p={pg}&n=20&serviceId=tvcctv&t=json"
            pagecount = 20

        elif tid == "4K专区":
            cid = "CHAL1558416868484111"
            # 修复URL
            url = f"https://api.cntv.cn/NewVideo/getLastVideoList4K?serviceId=cctv4k&cid={cid}&p={pg}&n={pagecount}&t=json"

        elif tid == "频道直播":
            url = "https://tv.cctv.com/epg/index.shtml"
        else:
            url = "https://tv.cctv.com/epg/index.shtml"

        videos = []
        print(f"正在请求URL: {url}")

        try:
            # 使用urllib.request进行请求
            req = urllib.request.Request(url, headers=self.header)

            # 添加超时设置
            response = urllib.request.urlopen(req, timeout=10)
            htmlText = response.read().decode("utf-8")

            print(f"API响应状态: {response.status}")
            print(f"API响应长度: {len(htmlText)}")
            print(f"API响应前100字符: {htmlText[:100]}")

            if tid == "栏目大全":
                videos = self.get_list1(html=htmlText, tid=tid, year_prefix=year_prefix)
            elif tid == "4K专区":
                videos = self.get_list_4k(html=htmlText, tid=tid)
            elif tid == "频道直播":
                # 使用正则解析HTML
                videos = self.parse_live_channels(htmlText)
            else:
                videos = self.get_list(html=htmlText, tid=tid)

            print(f"获取到视频数量: {len(videos)}")

        except urllib.error.HTTPError as e:
            print(f"HTTP错误: {e.code} - {e.reason}")
            print(f"错误URL: {url}")
            # 尝试使用简化URL
            try:
                print("尝试使用简化URL...")
                # 根据类型简化URL
                if tid in ["电视剧", "动画片", "纪录片", "特别节目"]:
                    # 获取基本URL
                    base_url = url.split('?')[0]
                    print(f"基础URL: {base_url}")
            except Exception as e2:
                print(f"简化URL也失败: {e2}")

        except Exception as e:
            print(f"获取分类内容失败: {type(e).__name__}: {e}")
            print(f"请求URL: {url}")

        result["list"] = videos
        result["page"] = pg
        result["pagecount"] = 9999 if len(videos) >= pagecount else pg
        result["limit"] = 90
        result["total"] = 999999

        return result

    def detailContent(self, array):
        result = {}
        year_prefix = ""
        did = array[0]
        if "$$$" in did:
            year_prefix = did.split("$$$")[0]
            did = did.split("$$$")[1]
        aid = did.split("||")
        tid = aid[0]
        title = aid[1]
        lastVideo = aid[2]
        logo = aid[3]

        if tid == "频道直播":
            vod = {
                "vod_id": did,
                "vod_name": title.replace(" ", ""),
                "vod_pic": logo,
                "vod_content": f"频道{title}正在直播中",
                "vod_play_from": "heyin在线直播",
                "vod_play_url": f"在线观看${title}||{lastVideo}",
            }
            result = {"list": [vod]}
            return result

        # 其他分类的详情处理
        id = aid[4] if len(aid) > 4 else ""
        vod_year = aid[5] if len(aid) > 5 else ""
        actors = aid[6] if len(aid) > 6 else ""
        brief = aid[7] if len(aid) > 7 else ""

        fromId = "HE影"
        if tid == "栏目大全":
            lastUrl = f"https://api.cntv.cn/video/videoinfoByGuid?guid={id}&serviceId=tvcctv"
            try:
                htmlTxt = self.fetch(lastUrl).text
                json_data = json.loads(htmlTxt)
                topicId = json_data.get("ctid", "")
                Url = f"https://api.cntv.cn/NewVideo/getVideoListByColumn?id={topicId}&d=&p=1&n=100&sort=desc&mode=0&serviceId=tvcctv&t=json&d={year_prefix}"
            except:
                return {"list": []}
        elif tid == "4K专区":
            Url = f"https://api.cntv.cn/NewVideo/getVideoListByAlbumIdNew?id={id}&serviceId=cctv4k&p=1&n=100&mode=0&pub=1"
        else:
            Url = f"https://api.cntv.cn/NewVideo/getVideoListByAlbumIdNew?id={id}&serviceId=tvcctv&p=1&n=100&mode=0&pub=1"

        videoList = []
        try:
            if tid == "搜索":
                fromId = "中央台"
                videoList = [title + "$" + lastVideo]
            else:
                htmlTxt = self.fetch(Url).text
                jRoot = json.loads(htmlTxt)
                data = jRoot.get("data", {})
                jsonList = data.get("list", [])
                videoList = self.get_EpisodesList(jsonList=jsonList)

                if len(videoList) < 1:
                    htmlTxt = self.fetch(lastVideo).text
                    if tid in ["电视剧", "纪录片", "4K专区"]:
                        patternTxt = r"'title':\s*'(?P<title>.+?)',\n{0,1}\s*'brief':\s*'(.+?)',\n{0,1}\s*'img':\s*'(.+?)',\n{0,1}\s*'url':\s*'(?P<url>.+?)'"
                    elif tid == "特别节目":
                        patternTxt = r'class="tp1"><a\s*href="(?P<url>https://.+?)"\s*target="_blank"\s*title="(?P<title>.+?)"></a></div>'
                    elif tid == "动画片":
                        patternTxt = r"'title':\s*'(?P<title>.+?)',\n{0,1}\s*'img':\s*'(.+?)',\n{0,1}\s*'brief':\s*'(.+?)',\n{0,1}\s*'url':\s*'(?P<url>.+?)'"
                    elif tid == "栏目大全":
                        patternTxt = r'href="(?P<url>.+?)" target="_blank" alt="(?P<title>.+?)" title=".+?">'
                    else:
                        patternTxt = r'href="(?P<url>.+?)".*?title="(?P<title>.+?)"'

                    videoList = self.get_EpisodesList_re(htmlTxt=htmlTxt, patternTxt=patternTxt)
                    fromId = "央视"
        except Exception as e:
            print(f"获取详情出错: {e}")
            videoList = []

        if len(videoList) == 0:
            videoList = [f"第1集${lastVideo}"]

        vod = {
            "vod_id": did,
            "vod_name": title.replace(" ", ""),
            "vod_pic": logo,
            "type_name": tid,
            "vod_year": vod_year,
            "vod_area": "",
            "vod_remarks": "",
            "vod_actor": actors,
            "vod_director": "",
            "vod_content": brief,
            "vod_play_from": fromId,
            "vod_play_url": "#".join(videoList)
        }

        return {"list": [vod]}

    # ===================== 辅助方法 =====================

    def fetch(self, url, timeout=10):
        """获取网页内容"""
        try:
            headers = self.header.copy()
            req = urllib.request.Request(url, headers=headers)
            response = urllib.request.urlopen(req, timeout=timeout)
            content = response.read().decode('utf-8')
            return type('Response', (), {'text': content, 'status_code': response.status})()
        except Exception as e:
            print(f"请求失败: {url}, 错误: {e}")
            return type('Response', (), {'text': '', 'status_code': 500})()

    def parse_html(self, html_text):
        """解析HTML"""
        if HAS_LXML:
            return etree.HTML(html_text)
        else:
            # 如果没有lxml，使用正则解析
            return html_text

    def parse_live_channels(self, html_text):
        """解析直播频道"""
        videos = []
        # 使用正则解析直播频道
        pattern = r'<img[^>]*title="([^"]+)"[^>]*src="([^"]+)"'
        matches = re.findall(pattern, html_text)

        for title, img_src in matches:
            # 提取频道名称，如cctv1, cctv2等
            channel_match = re.search(r'(cctv\d+)', title.lower())
            if channel_match:
                channel_id = channel_match.group(1)
                full_url = f"https://tv.cctv.com/live/{channel_id}/"
                vod_id = f"频道直播||{title}||{full_url}||{img_src}"
                videos.append({
                    "vod_id": vod_id,
                    "vod_name": title,
                    "vod_pic": img_src,
                    "vod_mark": "直播",
                })

        return videos

    def get_list(self, html, tid):
        """解析普通列表"""
        videos = []
        try:
            data = json.loads(html)
            data_list = data.get("data", {}).get("list", [])

            for item in data_list:
                url = item.get("url", "")
                title = item.get("title", "")
                img = item.get("image", "")
                id = item.get("id", "")
                brief = item.get("brief", "")
                year = item.get("year", "")
                actors = item.get("actors", "")

                if url:
                    guid = f"{tid}||{title}||{url}||{img}||{id}||{year}||{actors}||{brief}"
                    videos.append({
                        "vod_id": guid,
                        "vod_name": title,
                        "vod_pic": img,
                        "vod_remarks": year if year else ""
                    })
        except Exception as e:
            print(f"解析列表失败: {e}")

        return videos

    def get_list1(self, html, tid, year_prefix=None):
        """解析栏目大全列表"""
        videos = []
        try:
            data = json.loads(html)
            response_data = data.get("response", {})
            docs = response_data.get("docs", [])

            for item in docs:
                last_video = item.get("lastVIDE", {})
                id = last_video.get("videoSharedCode", "")
                desc = last_video.get("videoTitle", "")
                title = item.get("column_name", "")
                url = item.get("column_website", "")
                img = item.get("column_logo", "")
                year = item.get("column_playdate", "")
                brief = item.get("column_brief", "")
                actors = ""

                if url:
                    guid = f"{tid}||{title}||{url}||{img}||{id}||{year}||{actors}||{brief}"
                    vod_id = f"{year_prefix}$$${guid}" if year_prefix else guid

                    remarks = ""
                    if "》" in desc:
                        parts = desc.split("》")
                        remarks = parts[1].strip() if len(parts) > 1 else desc.strip()
                    else:
                        remarks = desc.strip()

                    videos.append({
                        "vod_id": vod_id,
                        "vod_name": title,
                        "vod_pic": img,
                        "vod_remarks": remarks
                    })
        except Exception as e:
            print(f"解析栏目列表失败: {e}")

        return videos

    def get_list_4k(self, html, tid):
        """解析4K专区列表"""
        videos = []
        try:
            data = json.loads(html)
            data_list = data.get("data", {}).get("list", [])

            for item in data_list:
                vod_remarks = item.get("title", "")
                id = item.get("id", "")
                vod = item.get("last_video", {})

                img = vod.get("image", "")
                url = vod.get("url", "")
                title = vod.get("title", "")
                brief = vod.get("brief", "")
                year = vod.get("year", "")
                actors = vod.get("actors", "")

                if url:
                    guid = f"{tid}||{title}||{url}||{img}||{id}||{year}||{actors}||{brief}"
                    videos.append({
                        "vod_id": guid,
                        "vod_name": title,
                        "vod_pic": img,
                        "vod_remarks": vod_remarks
                    })
        except Exception as e:
            print(f"解析4K列表失败: {e}")

        return videos

    def get_EpisodesList(self, jsonList):
        """获取剧集列表"""
        videos = []
        for vod in jsonList:
            url = vod.get("guid", "")
            title = vod.get("title", "")
            if url:
                videos.append(title + "$" + url)
        return videos

    def get_EpisodesList_re(self, htmlTxt, patternTxt):
        """正则获取剧集列表"""
        videos = []
        ListRe = re.finditer(patternTxt, htmlTxt, re.M | re.S)
        for vod in ListRe:
            url = vod.group("url")
            title = vod.group("title")
            if url:
                videos.append(title + "$" + url)
        return videos

    def searchContent(self, key, quick, pg=1):
        """搜索内容"""
        key_encoded = parse.quote(key)
        Url = f"https://search.cctv.com/ifsearch.php?page={pg}&qtext={key_encoded}&sort=relevance&pageSize=20&type=video&vtime=-1&datepid=1&channel=&pageflag=0&qtext_str={key_encoded}"

        try:
            htmlTxt = self.fetch(Url).text
            videos = self.get_list_search(html=htmlTxt, tid="搜索")
        except:
            videos = []

        return {"list": videos}

    def get_list_search(self, html, tid):
        """解析搜索结果"""
        try:
            jRoot = json.loads(html)
            jsonList = jRoot.get("list", [])
            videos = []
            for vod in jsonList:
                url = vod.get("urllink", "")
                title = self.removeHtml(vod.get("title", ""))
                img = vod.get("imglink", "")
                id = vod.get("id", "")
                brief = vod.get("channel", "")
                year = vod.get("uploadtime", "")

                if url:
                    guid = f"{tid}||{title}||{url}||{img}||{id}||{year}|||{brief}"
                    videos.append({
                        "vod_id": guid,
                        "vod_name": title,
                        "vod_pic": img,
                        "vod_remarks": year
                    })
            return videos
        except:
            return []

    def removeHtml(self, txt):
        """移除HTML标签"""
        soup = re.compile(r"<[^>]+>", re.S)
        txt = soup.sub("", txt)
        return txt.replace("&nbsp;", " ")

    def playerContent(self, flag, id, vipFlags):
        """
        修复播放地址获取 - 针对4K和动画片的特殊处理
        """
        result = {}
        url = ""
        parse = 0

        print(f"【播放调试】开始获取播放地址，flag={flag}, id={id}")

        try:
            if flag == "HE影":
                # 处理4K专区和动画片的特殊逻辑
                if "4K专区" in id or "动画片" in id:
                    # 尝试多种方法获取播放地址
                    url = self.get_video_url_for_4k_cartoon(id)
                else:
                    url = self.get_simple_m3u8(id)

            elif flag == "heyin在线直播":
                # 直播处理 - 简化版
                url = self.get_direct_live_url(id)
                if not url:
                    parse = 1  # 让TVBox自己嗅探

            else:
                # 其他播放源处理
                url = self.get_simple_m3u8(id)
                if not url and "http" in id:
                    url = id
                    if "m3u8" not in id:
                        parse = 1

            # 最终的URL检查和修复
            if url:
                # 确保是完整的URL
                if url.startswith("//"):
                    url = "https:" + url
                elif not url.startswith("http"):
                    url = "https://" + url

                # 4K专区特殊处理 - 使用特定的CDN
                if "4K专区" in id:
                    url = self.fix_4k_url(url)

            if not url:
                url = id
                parse = 1

            print(f"【播放调试】最终结果: parse={parse}, url长度={len(url) if url else 0}")

        except Exception as e:
            print(f"【播放错误】获取播放地址失败: {e}")
            import traceback
            traceback.print_exc()
            url = id
            parse = 1

        result["parse"] = parse
        result["playUrl"] = ""
        result["url"] = url
        result["header"] = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://tv.cctv.com/",
            "Origin": "https://tv.cctv.com"
        }

        return result

    def get_video_url_for_4k_cartoon(self, video_id):
        """
        专门处理4K专区和动画片的播放地址
        """
        print(f"【4K/动画处理】开始处理: {video_id}")

        # 方法1: 尝试从缓存中获取
        cache_key = f"video_url_{hash(video_id)}"
        cached_url = getattr(self, '_video_cache', {}).get(cache_key)
        if cached_url:
            print(f"【4K/动画处理】使用缓存地址")
            return cached_url

        # 方法2: 尝试多种API
        urls_to_try = []

        # 方案A: 标准的视频信息API
        urls_to_try.append(f"https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid={video_id}")

        # 方案B: 4K专区专用API
        urls_to_try.append(f"https://api.cntv.cn/NewVideo/getVideoListByAlbumIdNew?id={video_id}&serviceId=cctv4k")

        # 方案C: 通用视频API
        urls_to_try.append(f"https://api.cntv.cn/video/videoinfoByGuid?guid={video_id}")

        for api_url in urls_to_try:
            try:
                print(f"【4K/动画处理】尝试API: {api_url}")
                response = self.fetch(api_url, timeout=5)
                if hasattr(response, 'text') and response.text:
                    data = json.loads(response.text)

                    # 查找播放地址
                    m3u8_url = self.find_m3u8_in_data(data)
                    if m3u8_url:
                        # 4K专区特殊修复
                        if "4K专区" in video_id:
                            m3u8_url = self.fix_4k_url(m3u8_url)

                        # 缓存结果
                        if not hasattr(self, '_video_cache'):
                            self._video_cache = {}
                        self._video_cache[cache_key] = m3u8_url

                        print(f"【4K/动画处理】找到地址: {m3u8_url[:80]}...")
                        return m3u8_url

            except Exception as e:
                print(f"【4K/动画处理】API {api_url} 失败: {e}")
                continue

        # 方法3: 如果以上都失败，尝试构造地址
        print(f"【4K/动画处理】尝试构造地址")
        constructed_url = self.construct_video_url(video_id)
        if constructed_url:
            return constructed_url

        return None

    def find_m3u8_in_data(self, data):
        """
        从API响应数据中查找m3u8地址
        """

        # 深度搜索m3u8地址
        def deep_search(obj, path=""):
            if isinstance(obj, dict):
                for key, value in obj.items():
                    if isinstance(value, str) and "m3u8" in value:
                        print(f"【地址搜索】在 {path}.{key} 找到m3u8")
                        return value
                    elif isinstance(value, (dict, list)):
                        result = deep_search(value, f"{path}.{key}")
                        if result:
                            return result
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    result = deep_search(item, f"{path}[{i}]")
                    if result:
                        return result
            return None

        m3u8_url = deep_search(data, "root")

        # 如果没找到，尝试常见字段
        if not m3u8_url:
            common_fields = [
                ("hls_url", ""),
                ("hls_h5e_url", ""),
                ("video_url", ""),
                ("url", ""),
                ("hls1", ""),
                ("play_url", ""),
                ("video", "hls_url"),
                ("video", "url"),
                ("manifest", "hls_h5e_url"),
                ("data", "video", "url"),
                ("data", "list", 0, "url")
            ]

            for field_path in common_fields:
                try:
                    value = data
                    for field in field_path:
                        if field == "":
                            continue
                        if isinstance(value, dict) and field in value:
                            value = value[field]
                        elif isinstance(value, list) and isinstance(field, int) and field < len(value):
                            value = value[field]
                        else:
                            value = None
                            break

                    if isinstance(value, str) and "m3u8" in value:
                        m3u8_url = value
                        print(f"【地址搜索】在字段 {field_path} 找到m3u8")
                        break

                except Exception as e:
                    continue

        return m3u8_url

    def fix_4k_url(self, url):
        """
        修复4K视频的CDN地址
        """
        if not url:
            return url

        # 4K专区通常使用特定的CDN
        cdn_replacements = [
            ("newcntv.qcloudcdn.com", "dh5.cntv.myhwcdn.cn"),
            ("dh5.cntv.qcloudcdn.com", "dh5.cntv.myhwcdn.cn"),
            ("//newcntv.qcloudcdn.com", "//dh5.cntv.myhwcdn.cn"),
            ("//dh5.cntv.qcloudcdn.com", "//dh5.cntv.myhwcdn.cn"),
            ("hls.cntv.qcloudcdn.com", "hls.cntv.myalicdn.com"),
            ("//hls.cntv.qcloudcdn.com", "//hls.cntv.myalicdn.com"),
        ]

        for old, new in cdn_replacements:
            if old in url:
                url = url.replace(old, new)
                print(f"【4K地址修复】{old} -> {new}")

        return url

    def construct_video_url(self, video_id):
        """
        构造视频地址
        """
        # 移除可能的前缀
        clean_id = video_id
        for prefix in ["4K专区||", "动画片||", "电视剧||", "纪录片||", "特别节目||"]:
            if video_id.startswith(prefix):
                clean_id = video_id.split("||")[4] if len(video_id.split("||")) > 4 else video_id
                break

        # 尝试构造标准格式的URL
        if clean_id.startswith("VID"):
            # 可能是视频ID，构造播放页面
            return f"https://tv.cctv.com/{clean_id[:4]}/{clean_id[4:8]}/{clean_id}.shtml"
        elif len(clean_id) == 32:
            # 可能是GUID
            return f"https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid={clean_id}"

        return None

    def get_simple_m3u8(self, guid):
        """
        简化版的m3u8获取
        """
        try:
            # 方法1: 直接使用标准API
            api_url = f"https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid={guid}"
            print(f"【M3U8调试】请求API: {api_url}")

            response = self.fetch(api_url)
            if hasattr(response, 'text'):
                data = json.loads(response.text)

                # 尝试多个可能的字段
                possible_fields = ['hls_url', 'hls_h5e_url', 'video_url', 'url']

                for field in possible_fields:
                    if field in data:
                        url = data[field]
                        if url and 'm3u8' in url:
                            print(f"【M3U8调试】从字段 {field} 找到地址: {url[:100]}...")
                            return url.strip()

                # 尝试manifest中的字段
                if 'manifest' in data and 'hls_h5e_url' in data['manifest']:
                    url = data['manifest']['hls_h5e_url']
                    if url and 'm3u8' in url:
                        print(f"【M3U8调试】从manifest找到地址: {url[:100]}...")
                        return url.strip()

            # 方法2: 备用API
            backup_url = f"https://api.cntv.cn/NewVideo/getVideoListByAlbumIdNew?id={guid}&serviceId=tvcctv&p=1&n=1"
            response = self.fetch(backup_url)
            if hasattr(response, 'text'):
                data = json.loads(response.text)
                if 'data' in data and 'list' in data['data'] and len(data['data']['list']) > 0:
                    video = data['data']['list'][0]
                    if 'url' in video and 'm3u8' in video['url']:
                        print(f"【M3U8调试】从备用API找到地址: {video['url'][:100]}...")
                        return video['url'].strip()

        except Exception as e:
            print(f"【M3U8错误】获取失败: {e}")

        return None

    def get_live_url(self, channel_name):
        """
        获取直播地址
        """
        try:
            # 常见的直播频道映射
            channel_map = {
                "cctv1": "cctv1",
                "cctv2": "cctv2",
                "cctv3": "cctv3",
                "cctv4": "cctv4",
                "cctv5": "cctv5",
                "cctv6": "cctv6",
                "cctv7": "cctv7",
                "cctv8": "cctv8",
                "cctv9": "cctv9",
                "cctv10": "cctv10",
                "cctv11": "cctv11",
                "cctv12": "cctv12",
                "cctv13": "cctv13",
                "cctv14": "cctv14",
                "cctv15": "cctv15",
                "cctv16": "cctv16",
                "cctv17": "cctv17",
                "cctv5+": "cctv5plus",
            }

            # 提取频道ID
            channel_id = channel_name.lower()
            for key, value in channel_map.items():
                if key in channel_id:
                    channel_id = value
                    break

            # 尝试获取直播m3u8
            live_api = f"https://vdn.live.cntv.cn/api2/liveHtml5.do?channel=pc://cctv_p2p_hd{channel_id}&channel_id={channel_id}"
            print(f"【直播调试】请求直播API: {live_api}")

            response = self.fetch(live_api)
            if hasattr(response, 'text'):
                # 查找m3u8地址
                import re
                matches = re.findall(r'"hls_url"\s*:\s*{[^}]+"hls1"\s*:\s*"([^"]+)"', response.text)
                if matches:
                    m3u8_url = matches[0].replace('\\/', '/')
                    print(f"【直播调试】找到直播地址: {m3u8_url[:100]}...")
                    return m3u8_url

                # 尝试其他匹配
                matches = re.findall(r'(http[^"\s]+\.m3u8[^"\s]*)', response.text)
                if matches:
                    m3u8_url = matches[0].replace('\\/', '/')
                    print(f"【直播调试】找到直播地址(正则): {m3u8_url[:100]}...")
                    return m3u8_url

        except Exception as e:
            print(f"【直播错误】获取失败: {e}")

        return None

    def extract_m3u8_from_page(self, page_url):
        """
        从页面提取m3u8地址
        """
        try:
            print(f"【页面提取】从页面提取: {page_url}")
            response = self.fetch(page_url)
            if hasattr(response, 'text'):
                html = response.text

                # 查找guid
                import re
                guid_match = re.search(r'var\s+guid\s*=\s*["\']([^"\']+)["\']', html)
                if guid_match:
                    guid = guid_match.group(1)
                    print(f"【页面提取】找到GUID: {guid}")
                    return self.get_simple_m3u8(guid)

                # 直接查找m3u8
                m3u8_matches = re.findall(r'(http[^"\'\s]+\.m3u8[^"\'\s]*)', html)
                for match in m3u8_matches:
                    if 'm3u8' in match:
                        url = match.replace('\\/', '/')
                        print(f"【页面提取】直接找到M3U8: {url[:100]}...")
                        return url

        except Exception as e:
            print(f"【页面提取错误】失败: {e}")

        return None

    def get_m3u8_v2(self, urlTxt):
        """改进的M3U8获取方法"""
        try:
            # 方法1: 使用新的API接口
            url = f"https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid={urlTxt}"
            print(f"尝试获取M3U8地址: {url}")

            response = self.fetch(url)
            if response.status_code != 200:
                raise Exception(f"API请求失败: {response.status_code}")

            data = response.json()

            # 尝试多种可能的m3u8地址字段
            m3u8_urls = []

            # 字段1: hls_url
            if "hls_url" in data and data["hls_url"]:
                m3u8_urls.append(data["hls_url"])

            # 字段2: hls_h5e_url (在manifest中)
            if "manifest" in data and "hls_h5e_url" in data["manifest"]:
                m3u8_urls.append(data["manifest"]["hls_h5e_url"])

            # 字段3: video_url (有时会在这里)
            if "video_url" in data:
                m3u8_urls.append(data["video_url"])

            # 字段4: url (备用字段)
            if "url" in data:
                m3u8_urls.append(data["url"])

            # 过滤并选择最佳地址
            valid_urls = [u for u in m3u8_urls if u and "m3u8" in u]

            if not valid_urls:
                # 如果没有找到m3u8地址，尝试方法2
                return self.get_m3u8_backup(urlTxt)

            # 选择第一个有效的地址
            m3u8_url = valid_urls[0].strip()

            # 修复可能的域名问题
            m3u8_url = self.fix_m3u8_domain(m3u8_url)

            # 尝试获取最高质量的流
            m3u8_url = self.get_best_quality_stream(m3u8_url)

            print(f"获取到M3U8地址: {m3u8_url[:100]}...")
            return m3u8_url

        except Exception as e:
            print(f"获取M3U8失败: {e}")
            # 回退到原来的方法
            return self.get_m3u8_original(urlTxt)

    def get_m3u8_backup(self, urlTxt):
        """备用M3U8获取方法"""
        try:
            # 尝试使用另一个API
            url = f"https://api.cntv.cn/video/videoinfoByGuid?guid={urlTxt}&serviceId=tvcctv"
            print(f"尝试备用API: {url}")

            response = self.fetch(url)
            if response.status_code != 200:
                raise Exception(f"备用API请求失败: {response.status_code}")

            data = response.json()

            # 查找可能的视频地址
            if "video" in data and "chapters" in data["video"]:
                chapters = data["video"]["chapters"]
                for chapter in chapters:
                    if "url" in chapter and "m3u8" in chapter["url"]:
                        m3u8_url = chapter["url"].strip()
                        m3u8_url = self.fix_m3u8_domain(m3u8_url)
                        print(f"从备用API获取到M3U8地址: {m3u8_url[:100]}...")
                        return m3u8_url

            return None

        except Exception as e:
            print(f"备用API获取失败: {e}")
            return None

    def get_m3u8_original(self, urlTxt):
        """保持原来的M3U8获取方法（用于兼容性）"""
        try:
            url = f"https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid={urlTxt}"
            htmlTxt = self.fetch(url).text
            jo = json.loads(htmlTxt)

            # 尝试获取链接
            link = jo.get("hls_url", "").strip()
            link1 = jo.get("manifest", {}).get("hls_h5e_url", "").strip()

            # 优先使用link1
            target_link = link1 if link1 else link

            if not target_link:
                return ""

            # 修复域名
            target_link = self.fix_m3u8_domain(target_link)

            # 尝试获取高质量流
            try:
                best_link = self.get_best_quality_stream(target_link)
                return best_link
            except:
                return target_link

        except Exception as e:
            print(f"原始方法获取M3U8失败: {e}")
            return ""

    def fix_m3u8_domain(self, m3u8_url):
        """修复M3U8域名问题"""
        if not m3u8_url:
            return m3u8_url

        # 常见的域名替换
        domain_replacements = {
            "newcntv.qcloudcdn.com": "dh5.cntv.myhwcdn.cn",
            "dh5.cntv.qcloudcdn.com": "dh5.cntv.myhwcdn.cn",
            "//newcntv.qcloudcdn.com": "//dh5.cntv.myhwcdn.cn",
            "//dh5.cntv.qcloudcdn.com": "//dh5.cntv.myhwcdn.cn",
        }

        for old_domain, new_domain in domain_replacements.items():
            if old_domain in m3u8_url:
                m3u8_url = m3u8_url.replace(old_domain, new_domain)
                print(f"域名替换: {old_domain} -> {new_domain}")

        return m3u8_url

    def get_best_quality_stream(self, m3u8_url):
        """获取最高质量的视频流"""
        try:
            if not m3u8_url or "m3u8" not in m3u8_url:
                return m3u8_url

            # 获取m3u8文件内容
            response = self.fetch(m3u8_url, timeout=5)
            if response.status_code != 200:
                return m3u8_url

            content = response.text

            # 查找最高质量的流（通常以2000、1080、720等结尾）
            lines = content.split('\n')
            quality_streams = []

            for line in lines:
                if line.endswith('.m3u8') and not line.startswith('#'):
                    quality_streams.append(line)

            if quality_streams:
                # 按质量排序（假设数字越大质量越高）
                quality_streams.sort(key=lambda x: self.extract_quality_number(x), reverse=True)
                best_stream = quality_streams[0]

                # 构建完整URL
                if best_stream.startswith('http'):
                    return best_stream
                else:
                    # 相对路径转绝对路径
                    base_url = '/'.join(m3u8_url.split('/')[:-1])
                    return f"{base_url}/{best_stream}"

            return m3u8_url

        except Exception as e:
            print(f"获取高质量流失败: {e}")
            return m3u8_url

    def extract_quality_number(self, stream_url):
        """从流URL中提取质量数字"""
        try:
            # 查找类似2000、1080、720等数字
            match = re.search(r'(\d{3,4})\.m3u8$', stream_url)
            if match:
                return int(match.group(1))
            return 0
        except:
            return 0

    def extract_m3u8_directly(self, video_url):
        """直接从视频页面提取M3U8地址"""
        try:
            response = self.fetch(video_url)
            html = response.text

            # 查找可能的m3u8地址
            patterns = [
                r'"hls_url"\s*:\s*"([^"]+\.m3u8[^"]*)"',
                r'"url"\s*:\s*"([^"]+\.m3u8[^"]*)"',
                r'src\s*=\s*"([^"]+\.m3u8[^"]*)"',
                r'http[s]?://[^"\s]+\.m3u8[^"\s]*'
            ]

            for pattern in patterns:
                matches = re.findall(pattern, html, re.IGNORECASE)
                for match in matches:
                    if isinstance(match, tuple):
                        match = match[0]
                    if 'm3u8' in match:
                        # 清理URL
                        m3u8_url = match.replace('\\/', '/')
                        m3u8_url = self.fix_m3u8_domain(m3u8_url)
                        print(f"从页面提取到M3U8地址: {m3u8_url[:100]}...")
                        return m3u8_url

            return None

        except Exception as e:
            print(f"直接提取M3U8失败: {e}")
            return None

    def fixm3u8_url_v2(self, url):
        """修复直播M3U8链接（简化版）"""
        try:
            if not url:
                return url

            # 如果是完整URL，直接返回
            if url.startswith('http'):
                return url

            # 添加调试日志
            print(f"修复M3U8 URL: {url}")

            # 简单的修复：确保是完整的URL
            if url.startswith('//'):
                return f"https:{url}"
            elif not url.startswith('http'):
                # 尝试添加常见的前缀
                possible_prefixes = [
                    'https://dh5.cntv.myhwcdn.cn',
                    'https://hls.cntv.myalicdn.com',
                    'https://tv.cctv.com'
                ]

                for prefix in possible_prefixes:
                    test_url = f"{prefix}{url if url.startswith('/') else '/' + url}"
                    try:
                        # 测试URL是否可达
                        test_response = self.fetch(test_url, timeout=3, method='HEAD')
                        if test_response.status_code == 200:
                            return test_url
                    except:
                        continue

            return url

        except Exception as e:
            print(f"修复M3U8 URL失败: {e}")
            return url

    def fetch(self, url, method='GET', data=None, headers=None, cookies="", timeout=10):
        """
        统一的fetch方法，兼容urllib和requests
        """
        # 确保有默认headers
        if headers is None:
            headers = self.header.copy()

        # 添加必要的headers
        headers.update({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
        })

        print(f"【请求调试】{method} {url}")

        try:
            # 使用urllib.request
            import urllib.request
            import urllib.parse

            if method.upper() == 'POST' and data:
                if isinstance(data, dict):
                    data = urllib.parse.urlencode(data).encode('utf-8')
                elif isinstance(data, str):
                    data = data.encode('utf-8')

            req = urllib.request.Request(
                url,
                data=data if method.upper() == 'POST' else None,
                headers=headers
            )

            response = urllib.request.urlopen(req, timeout=timeout)
            content = response.read().decode('utf-8')

            # 创建类似requests的响应对象
            class Response:
                def __init__(self, text, status_code):
                    self.text = text
                    self.status_code = status_code

                def json(self):
                    import json
                    return json.loads(self.text)

            return Response(content, response.status)

        except Exception as e:
            print(f"【请求错误】{url} 失败: {e}")

            # 返回一个空响应对象
            class EmptyResponse:
                text = ""
                status_code = 500

                def json(self):
                    return {}

            return EmptyResponse()
    # 在Spider类中添加以下方法

    def home(self, filter=True):
        """
        hipy.js调用的主页方法
        """
        return self.homeContent(filter)

    def homeVod(self):
        """
        hipy.js调用的首页推荐视频方法
        """
        return {"list": []}

    def category(self, tid, pg, filter, extend):
        """
        hipy.js调用的分类方法
        """
        # 处理extend参数，确保是字典
        if isinstance(extend, str):
            try:
                extend = json.loads(extend)
            except:
                extend = {}
        return self.categoryContent(tid, pg, filter, extend)

    def detail(self, ids):
        """
        hipy.js调用的详情方法
        """
        if not ids:
            return {"list": []}
        return self.detailContent(ids)

    def search(self, wd, quick=0, pg=1):
        """
        hipy.js调用的搜索方法
        """
        return self.searchContent(wd, quick, pg)

    def play(self, flag, id, flags):
        """
        hipy.js调用的播放方法
        """
        return self.playerContent(flag, id, flags)

    def proxy(self, params):
        """
        hipy.js调用的代理方法
        """
        # 返回一个空代理响应
        return {"code": 0, "msg": "代理功能未实现"}

    def action(self, action, value):
        """
        hipy.js调用的自定义操作方法
        """
        # 处理自定义操作
        if action == "test":
            return {"code": 0, "msg": "测试成功", "data": value}
        return {"code": 0, "msg": "action处理成功"}

    def get_RegexGetText(self, Text, RegexText, Index=1):
        """正则获取文本"""
        returnTxt = ""
        Regex = re.search(RegexText, Text, re.M | re.S)
        if Regex is None:
            returnTxt = ""
        else:
            returnTxt = Regex.group(Index)
        return returnTxt

    def get_m3u8(self, urlTxt):
        """获取M3U8链接"""
        url = f"https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid={urlTxt}"
        try:
            htmlTxt = self.fetch(url).text
            jo = json.loads(htmlTxt)
            link = jo.get("hls_url", "").strip()
            link1 = jo.get("manifest", {}).get("hls_h5e_url", "").strip()

            if not link1:
                return ""

            # 简化处理，直接返回第一个链接
            return link1
        except Exception as e:
            print(f"获取m3u8出错: {e}")
            return ""

    def fixm3u8_url(self, url):
        """简化修复M3U8链接"""
        return url

    def webReadFile(self, urlStr):
        """读取网页内容"""
        return self.fetch(urlStr).text

    def TestWebPage(self, urlStr):
        """测试网页"""
        try:
            req = urllib.request.Request(urlStr, method="HEAD")
            with urllib.request.urlopen(req) as response:
                return response.getcode()
        except:
            return 404








# 测试代码
def test_all_methods():
    """测试所有hipy.js调用的方法"""
    spider = Spider()

    print("=" * 50)
    print("测试 hipy.js 兼容性")
    print("=" * 50)

    # 测试init
    print("\n1. 测试 init 方法:")
    try:
        result = spider.init("")
        print(f"  成功: {result}")
    except Exception as e:
        print(f"  失败: {e}")

    # 测试home
    print("\n2. 测试 home 方法:")
    try:
        result = spider.home(True)
        print(f"  成功: 获取到 {len(result.get('class', []))} 个分类")
    except Exception as e:
        print(f"  失败: {e}")

    # 测试homeVod
    print("\n3. 测试 homeVod 方法:")
    try:
        result = spider.homeVod()
        print(f"  成功: {result}")
    except Exception as e:
        print(f"  失败: {e}")

    # 测试category
    print("\n4. 测试 category 方法 (电视剧):")
    try:
        result = spider.category("电视剧", 1, True, {})
        print(f"  成功: 获取到 {len(result.get('list', []))} 个视频")
        if result.get('list'):
            print(f"  第一个视频: {result['list'][0]['vod_name']}")
    except Exception as e:
        print(f"  失败: {e}")

    # 测试detail
    print("\n5. 测试 detail 方法:")
    try:
        # 先获取一个视频ID
        cat_result = spider.category("电视剧", 1, True, {})
        if cat_result.get('list'):
            vid = cat_result['list'][0]['vod_id']
            result = spider.detail([vid])
            print(f"  成功: 获取到详情")
            if result.get('list'):
                print(f"  视频标题: {result['list'][0]['vod_name']}")
                print(f"  播放源: {result['list'][0]['vod_play_from']}")
                print(f"  播放地址数量: {len(result['list'][0]['vod_play_url'].split('#'))}")
        else:
            print("  无法测试: 没有获取到视频列表")
    except Exception as e:
        print(f"  失败: {e}")

    # 测试search
    print("\n6. 测试 search 方法:")
    try:
        result = spider.search("新闻", 0, 1)
        print(f"  成功: 搜索到 {len(result.get('list', []))} 个结果")
    except Exception as e:
        print(f"  失败: {e}")

    # 测试play
    print("\n7. 测试 play 方法:")
    try:
        # 创建一个测试播放地址
        test_id = "VIDAtNhUx4FoUpNyFkdt2KYc251222"  # 示例视频ID
        result = spider.play("HE影", test_id, None)
        print(f"  成功: parse={result.get('parse')}")
        print(f"  播放地址: {result.get('url', '')[:100]}...")
    except Exception as e:
        print(f"  失败: {e}")

    print("\n" + "=" * 50)
    print("测试完成")
    print("=" * 50)
    pass


if __name__ == "__main__":
    spider = Spider()

    # 测试初始化
    print("=== 测试初始化 ===")
    spider.init("")

    # 测试首页
    print("\n=== 测试首页 ===")
    home_result = spider.homeContent(True)
    print(f"首页分类: {home_result['class']}")
    print(f"筛选条件: {list(home_result['filters'].keys())}")

    # 测试电视剧分类
    print("\n=== 测试电视剧分类 ===")
    cate_result = spider.categoryContent("电视剧", 1, True, {})
    print(f"分类结果条数: {len(cate_result['list'])}")
    if cate_result['list']:
        print(f"第一个视频: {cate_result['list'][0]['vod_name']}")

    # 测试栏目大全
    print("\n=== 测试栏目大全 ===")
    cate_result2 = spider.categoryContent("栏目大全", 1, True, {})
    print(f"栏目大全结果条数: {len(cate_result2['list'])}")
    if cate_result2['list']:
        print(f"第一个栏目: {cate_result2['list'][0]['vod_name']}")

    # 运行测试
    test_all_methods()