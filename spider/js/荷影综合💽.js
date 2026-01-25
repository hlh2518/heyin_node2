/**
 * HE影综合 - Bilibili视频源
 * 异步版本，保持原有播放逻辑
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: 'HE影综合',
  '类型': '影视',
  lang: '荷影'
})
*/
var rule = {
    title:'HE影综合',
    host:'https://api.bilibili.com',
    homeUrl:'/x/web-interface/ranking/v2?rid=0&type=origin',
    url:'/x/web-interface/search/type?search_type=video&keyword=fyclass&page=fypage&duration={{fl.duration}}&order={{fl.order}}',

    class_name:'推荐&历史记录&齐秦&徐子尧&徒步&刀郎&埙&白玛次仁&阿桑&张国荣&张学友&蒙面唱将&花样滑冰&轮滑&民族舞&古典舞&广场舞&中医&白族舞蹈&洞经音乐&书法&诗词&围棋&象棋&古筝&洞箫&笛子&尺八&吉他&戏曲&罗小罗&爱唱歌的罗小罗&郭涛&许巍&赵雷&旅游&风景4k&食谱&历史',
    class_url:'推荐&历史记录&齐秦&徐子尧&徒步&刀郎&埙&白玛次仁&阿桑&张国荣&张学友&蒙面唱将&花样滑冰&轮滑&民族舞&古典舞&广场舞&中医&白族舞蹈&洞经音乐&书法&诗词&围棋&象棋&古筝&洞箫&笛子&尺八&吉他&戏曲&罗小罗&爱唱歌的罗小罗&郭涛&许巍&赵雷&旅游&风景4k&食谱&历史',

    filterable: 1,
    filter_url: '&keyword={{fl.tid}}&page=fypage&duration={{fl.duration}}&order={{fl.order}}',
    filter_def: {
        齐秦:{tid:'齐秦'},
        徐子尧:{tid:'徐子尧'},
        徒步:{tid:'徒步'},
        刀郎:{tid:'刀郎'},
        埙:{tid:'埙'},
        白玛次仁:{tid:'白玛次仁'},
        阿桑:{tid:'阿桑'},
        张国荣:{tid:'张国荣'},
        张学友:{tid:'张学友'},
        蒙面唱将:{tid:'蒙面唱将'},
        花样滑冰:{tid:'花样滑冰'},
        历史记录:{tid:'历史记录'},
        轮滑:{tid:'轮滑'},
        民族舞:{tid:'民族舞'},
        古典舞:{tid:'古典舞'},
        广场舞:{tid:'广场舞'},
        中医:{tid:'中医'},
        白族舞蹈:{tid:'白族舞蹈'},
        洞经音乐:{tid:'洞经音乐'},
        书法:{tid:'书法'},
        诗词:{tid:'诗词'},
        围棋:{tid:'围棋'},
        象棋:{tid:'象棋'},
        古筝:{tid:'古筝'},
        洞箫:{tid:'洞箫'},
        笛子:{tid:'笛子'},
        尺八:{tid:'尺八'},
        吉他:{tid:'吉他'},
        戏曲:{tid:'戏曲'},
        罗小罗:{tid:'罗小罗'},
        爱唱歌的罗小罗:{tid:'爱唱歌的罗小罗'},
        郭涛:{tid:'郭涛'},
        许巍:{tid:'许巍'},
        赵雷:{tid:'赵雷'},
        旅游:{tid:'旅游'},
        风景4K:{tid:'风景4K'},
        食谱:{tid:'食谱'},
        历史:{tid:'历史'}
    },

    // 保持原有的filter配置（这里简略显示，实际需要完整复制）
     filter: {
	     "徐子尧":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
		  "徒步":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
		 "刀郎":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
		 "齐秦":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
		 "埙":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
		 "白玛次仁":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "阿桑":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "张国荣":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "张学友":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "蒙面唱将":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "花样滑冰":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "轮滑":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "民族舞":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "古典舞":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "广场舞":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "中医":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "白族舞蹈":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "洞经音乐":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "书法":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "诗词":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "围棋":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "象棋":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "古筝":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
      "洞箫":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "笛子":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "尺八":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "吉他":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
       "戏曲":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"戏曲4K"},{"n":"B梆子腔","v":"梆子腔戏曲4K"},{"n":"C采茶戏","v":"采茶戏戏曲4K"},{"n":"C潮剧","v":"潮剧戏曲4K"},{"n":"C彩调","v":"彩调戏曲4K"},{"n":"C川剧","v":"川剧戏曲4K"},{"n":"D滇剧","v":"滇剧戏曲4K"},{"n":"D傣剧","v":"傣剧戏曲4K"},{"n":"E二人台","v":"二人台戏曲4K"},{"n":"G高腔","v":"高腔戏曲4K"},{"n":"G高甲戏","v":"高甲戏戏曲4K"},{"n":"G赣剧","v":"赣剧戏曲4K"},{"n":"G桂剧","v":"桂剧戏曲4K"},{"n":"H黄梅戏","v":"黄梅戏戏曲4K"},{"n":"H河北梆子","v":"河北梆子戏曲4K"},{"n":"H河南曲剧","v":"河南曲剧戏曲4K"},{"n":"H淮剧","v":"淮剧戏曲4K"},{"n":"H沪剧","v":"沪剧戏曲4K"},{"n":"H滑稽戏","v":"滑稽戏戏曲4K"},{"n":"H徽剧","v":"徽剧4K"},{"n":"H汉剧","v":"汉剧戏曲4K"},{"n":"H湖南花鼓戏","v":"湖南花鼓戏戏曲4K"},{"n":"J京剧","v":"京剧戏曲4K"},{"n":"J晋剧","v":"晋剧戏曲4K"},{"n":"J吉剧","v":"吉剧戏曲4K"},{"n":"K昆曲","v":"昆曲戏曲4K"},{"n":"L梨园戏","v":"梨园戏戏曲4K"},{"n":"L龙江剧","v":"龙江剧戏曲4K"},{"n":"M闽剧","v":"闽剧戏曲4K"},{"n":"P评剧","v":"评剧戏曲4K"},{"n":"P蒲剧","v":"蒲剧戏曲4K"},{"n":"P皮影戏","v":"皮影戏戏曲4K"},{"n":"P莆仙戏","v":"莆仙戏戏曲4K"},{"n":"Q黔剧","v":"黔剧戏曲4K"},{"n":"Q祁剧","v":"祁剧戏曲4K"},{"n":"Q秦腔","v":"秦腔戏曲4K"},{"n":"S上党梆子","v":"上党梆子戏曲4K"},{"n":"S山东梆子","v":"山东梆子戏曲4K"},{"n":"S绍剧","v":"绍剧戏曲4K"},{"n":"W武安平调","v":"武安平调戏曲4K"},{"n":"W婺剧","v":"婺剧戏曲4K"},{"n":"X湘剧","v":"湘剧戏曲4K"},{"n":"Y越剧","v":"越剧戏曲4K"},{"n":"Y豫剧","v":"豫剧戏曲4K"},{"n":"Y雁剧","v":"雁剧戏曲4K"},{"n":"Y越调","v":"越调戏曲4K"},{"n":"Y粤剧","v":"粤剧戏曲4K"},{"n":"Z壮剧","v":"壮剧戏曲4K"},{"n":"Z藏剧","v":"藏剧戏曲4K"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
      "罗小罗":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
      "爱唱歌的罗小罗":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "郭涛":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "赵雷":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
         "海来阿木":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
          "许巍":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "教程":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"平面设计教学"},{"n":"AI绘画","v":"AI绘画"},{"n":"AdobePhotoshop","v":"AdobePhotoshop教程"},{"n":"AdobeIllustrator","v":"AdobeIllustrator教程"},{"n":"CorelDRAW","v":"CorelDRAW教程"},{"n":"AdobeInDesign","v":"AdobeInDesign教程"},{"n":"AdobePagermaker","v":"AdobePagermaker教程"},{"n":"SAI","v":"SAI教程"},{"n":"AdobeBridge","v":"AdobeBridge教程"},{"n":"AdobePagermaker","v":"AdobePagermake教程r"},{"n":"3DStudioMax","v":"3DStudioMax教程"},{"n":"PR","v":"PR教程"},{"n":"AE","v":"AE教程"},{"n":"CINEMA4D","v":"CINEMA4D教程"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "软件教程":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"软件教程"},{"n":"Windows","v":"Windows"},{"n":"MT管理器","v":"MT管理器"},{"n":"NP管理器","v":"NP管理器"},{"n":"mixplorer","v":"mixplorer"},{"n":"脱壳","v":"脱壳"},{"n":"爬虫","v":"爬虫"},{"n":"json&jar","v":"json&jar"},{"n":"网盘挂载","v":"网盘挂载"},{"n":"alist+WebDav","v":"alist+WebDav"},{"n":"TVBox","v":"TVBox"},{"n":"EXCEL","v":"EXCEL教程"},{"n":"Git入门到精通","v":"Git入门到精通"},{"n":"java","v":"java教程"},{"n":"phyton","v":"phyton教程"},{"n":"xml","v":"xml教程"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "实用教程":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"实用教程"},{"n":"考公考证","v":"考公考证"},{"n":"风水","v":"风水教学"},{"n":"水电维修","v":"水电维修"},{"n":"装修","v":"装修"},{"n":"生活小技巧","v":"生活小技巧"},{"n":"绿植","v":"绿植"},{"n":"宠物","v":"宠物"},{"n":"汽车","v":"汽车养护"},{"n":"穿衣搭配","v":"穿衣搭配"},{"n":"毛衣编织","v":"毛衣编织"},{"n":"美妆","v":"美妆"},{"n":"数独","v":"数独教程"},{"n":"魔方","v":"魔方教程"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "旅游":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"旅游"},{"n":"A澳门","v":"澳门旅游"},{"n":"A安徽","v":"安徽旅游"},{"n":"B布达拉宫","v":"布达拉宫旅游"},{"n":"B北京","v":"北京旅游"},{"n":"C重庆","v":"重庆旅游"},{"n":"C草原","v":"草原旅游"},{"n":"D大海","v":"大海旅游"},{"n":"F福建","v":"福建旅游"},{"n":"G广东","v":"广东旅游"},{"n":"G广西","v":"广西旅游"},{"n":"G贵州","v":"贵州旅游"},{"n":"G甘肃","v":"甘肃旅游"},{"n":"H海南","v":"海南旅游"},{"n":"H河北","v":"河北旅游"},{"n":"H河南","v":"河南旅游"},{"n":"H湖北","v":"湖北旅游"},{"n":"H湖南","v":"湖南旅游"},{"n":"H黑龙江","v":"黑龙江旅游"},{"n":"J吉林","v":"吉林旅游"},{"n":"J江苏","v":"江苏旅游"},{"n":"J江西","v":"江西旅游"},{"n":"L辽宁","v":"辽宁旅游"},{"n":"M民宿","v":"民宿旅游"},{"n":"N内蒙古","v":"内蒙古旅游"},{"n":"N宁夏","v":"宁夏旅游"},{"n":"Q青海","v":"青海旅游"},{"n":"S上海","v":"上海旅游"},{"n":"S陕西","v":"陕西旅游"},{"n":"S四川","v":"四川旅游"},{"n":"S山西","v":"山西旅游"},{"n":"S山东","v":"山东旅游"},{"n":"T天津","v":"天津旅游"},{"n":"T台湾","v":"台湾旅游"},{"n":"T天空","v":"天空旅游"},{"n":"X西湖","v":"西湖旅游"},{"n":"X西藏","v":"西藏旅游"},{"n":"X新疆","v":"新疆旅游"},{"n":"X香港","v":"香港旅游"},{"n":"Y云南","v":"云南旅游"},{"n":"Z浙江","v":"浙江旅游"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "风景4K":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"风景4K"},{"n":"A澳门","v":"澳门风景4K"},{"n":"A安徽","v":"安徽风景4K"},{"n":"B布达拉宫","v":"布达拉宫风景4K"},{"n":"B北京","v":"北京风景4K"},{"n":"C重庆","v":"重庆风景4K"},{"n":"C草原","v":"草原风景4K"},{"n":"D大海","v":"大海风景4K"},{"n":"F福建","v":"福建风景4K"},{"n":"G广东","v":"广东风景4K"},{"n":"G广西","v":"广西风景4K"},{"n":"G贵州","v":"贵州风景4K"},{"n":"G甘肃","v":"甘肃风景4K"},{"n":"H海南","v":"海南风景4K"},{"n":"H河北","v":"河北风景4K"},{"n":"H河南","v":"河南风景4K"},{"n":"H湖北","v":"湖北风景4K"},{"n":"H湖南","v":"湖南风景4K"},{"n":"H黑龙江","v":"黑龙江风景4K"},{"n":"J吉林","v":"吉林风景4K"},{"n":"J江苏","v":"江苏风景4K"},{"n":"J江西","v":"江西风景4K"},{"n":"L辽宁","v":"辽宁风景4K"},{"n":"L洛阳","v":"洛阳风景4K"},{"n":"M民宿","v":"民宿风景4K"},{"n":"N南京","v":"南京风景4K"},{"n":"N内蒙古","v":"内蒙古风景4K"},{"n":"N宁夏","v":"宁夏风景4K"},{"n":"Q青海","v":"青海风景4K"},{"n":"S上海","v":"上海风景4K"},{"n":"S陕西","v":"陕西风景4K"},{"n":"S四川","v":"四川风景4K"},{"n":"S山西","v":"山西风景4K"},{"n":"S山东","v":"山东风景4K"},{"n":"S苏州","v":"苏州风景4K"},{"n":"T天津","v":"天津风景4K"},{"n":"T台湾","v":"台湾风景4K"},{"n":"T天空","v":"天空风景4K"},{"n":"X西安","v":"西安风景4K"},{"n":"X西湖","v":"西湖风景4K"},{"n":"X西藏","v":"西藏风景4K"},{"n":"X新疆","v":"新疆风景4K"},{"n":"X香港","v":"香港风景4K"},{"n":"Y云南","v":"云南风景4K"},{"n":"Z浙江","v":"浙江风景4K"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "食谱":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"食谱"},{"n":"川菜食谱","v":"川菜食谱"},{"n":"豫菜食谱","v":"豫菜食谱"},{"n":"淮扬菜食谱","v":"淮扬菜食谱"},{"n":"湘菜食谱","v":"湘菜食谱"},{"n":"鲁菜食谱","v":"鲁菜食谱"},{"n":"粤菜食谱","v":"粤菜食谱"},{"n":"浙菜食谱","v":"浙菜食谱"},{"n":"徽菜食谱","v":"徽菜食谱"},{"n":"闽菜食谱","v":"闽菜食谱"},{"n":"苏菜食谱","v":"苏菜食谱"},{"n":"健康食谱","v":"健康食谱"},{"n":"面食","v":"面食"},{"n":"米饭","v":"米饭"},{"n":"粥","v":"粥的做法"},{"n":"酿酒","v":"自酿酒"},{"n":"小吃","v":"小吃制作"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}],
        "美食超清":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"美食超清"},{"n":"舌尖上的中国","v":"舌尖上的中国超清"},{"n":"老字号","v":"老字号美食超清"},{"n":"家常菜","v":"家常菜美食超清"},{"n":"香港美食探店","v":"香港美食探店超清"},{"n":"澳门美食探店","v":"澳门美食探店超清"},{"n":"上海美食探店","v":"上海美食探店超清"},{"n":"北京美食探店","v":"北京美食探店超清"},{"n":"重庆美食探店","v":"重庆美食探店超清"},{"n":"南京美食探店","v":"南京美食探店超清"},{"n":"广州美食探店","v":"广州美食探店超清"},{"n":"杭州美食探店","v":"杭州美食探店超清"},{"n":"成都美食探店","v":"成都美食探店超清"},{"n":"苏州美食探店","v":"苏州美食探店超清"},{"n":"武汉美食探店","v":"武汉美食探店超清"},{"n":"台湾美食探店","v":"台湾美食探店超清"},{"n":"川菜","v":"川菜美食超清"},{"n":"豫菜","v":"豫菜美食超清"},{"n":"淮扬菜","v":"淮扬菜美食超清"},{"n":"湘菜","v":"湘菜美食超清"},{"n":"鲁菜","v":"鲁菜美食超清"},{"n":"粤菜","v":"粤菜美食超清"},{"n":"潮菜","v":"潮菜美食超清"},{"n":"浙菜","v":"浙菜美食超清"},{"n":"徽菜","v":"徽菜美食超清"},{"n":"闽菜","v":"闽菜美食超清"},{"n":"东北菜","v":"东北菜美食超清"},{"n":"客家菜","v":"客家菜美食超清"},{"n":"苏菜","v":"苏菜美食超清"},{"n":"火锅","v":"火锅"},{"n":"面食","v":"面食"},{"n":"炒菜","v":"炒菜"},{"n":"点心","v":"点心"},{"n":"日料","v":"日料"},{"n":"小吃","v":"小吃"},{"n":"素食","v":"素食"},{"n":"蒸菜","v":"蒸菜"},{"n":"凉菜","v":"凉菜"},{"n":"早餐","v":"早餐"},{"n":"披萨","v":"披萨"},{"n":"烤鱼","v":"烤鱼"},{"n":"海鲜","v":"海鲜美食超清"},{"n":"汉堡","v":"汉堡"},{"n":"韩国菜","v":"韩国菜"},{"n":"泰国菜","v":"泰国菜"},{"n":"穆斯林菜","v":"穆斯林菜"},{"n":"法国菜","v":"法国菜"},{"n":"意大利菜","v":"意大利菜"},{"n":"西班牙菜","v":"西班牙菜"},{"n":"土耳其菜","v":"土耳其菜系"},{"n":"阿拉伯菜","v":"阿拉伯菜"},{"n":"德国菜","v":"德国菜"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}]

    },

    detailUrl:'/x/web-interface/view/detail?aid=fyid',
    searchUrl:'/x/web-interface/search/type?search_type=video&keyword=**&page=fypage',
    searchable:2,
    quickSearch:0,

    // 保持原有的headers，但修复Cookie获取问题
    headers:{
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.bilibili.com",
        // "Cookie":"http://127.0.0.1:25181/jx/cookiehe.txt"

        // "Cookie": await (await fetch('http://127.0.0.1:25181/jx/cookiehe.txt')).text()
    },
 // =========== Cookie管理器 ===========
    cookieManager: {
        // Cookie文件路径
        cookieFile: 'http://127.0.0.1:25181/jx/cookiehe.json',
        // 备用硬编码Cookie
        fallbackCookie: "",
        // 缓存时间（毫秒）
        cacheTime: 30 * 60 * 1000, // 30分钟
        // 最后更新时间
        lastUpdate: 0,
        // 缓存的Cookie
        cachedCookie: null,

        // 获取Cookie（带缓存）
        getCookie: async function() {
            const now = Date.now();

            // 如果缓存有效，直接返回
            if (this.cachedCookie && now - this.lastUpdate < this.cacheTime) {
                console.log("使用缓存的Cookie");
                return this.cachedCookie;
            }

            try {
                console.log("从文件获取Cookie...");

                // 方法1：使用request获取JSON文件
                let response = await request(this.cookieFile, {
                    headers: {"User-Agent": "TVBox"}
                });

                let cookiesData = JSON.parse(response);

                if (cookiesData && cookiesData.bilibili) {
                    this.cachedCookie = cookiesData.bilibili;
                    this.lastUpdate = now;
                    console.log("Cookie获取成功，已缓存");
                    return this.cachedCookie;
                }
            } catch (e) {
                console.log("从文件获取Cookie失败:", e.message);
            }

            // 使用备用Cookie
            console.log("使用备用Cookie");
            return this.fallbackCookie;
        },

        // 强制刷新Cookie
        refreshCookie: async function() {
            this.lastUpdate = 0;
            this.cachedCookie = null;
            return await this.getCookie();
        }
    },

    // =========== 初始化函数 ===========
    init: async function() {
        console.log("初始化HE影综合规则");

        try {
            // 获取Cookie
            let cookie = await this.cookieManager.getCookie();
            this.headers.Cookie = cookie;
            console.log("Cookie设置完成");
        } catch (e) {
            console.log("初始化失败:", e.message);
            this.headers.Cookie = this.cookieManager.fallbackCookie;
        }

        return true;
    },

    // =========== 每个函数开始处确保Cookie已设置 ===========
    ensureCookie: async function() {
        if (!this.headers.Cookie) {
            await this.init();
        }
    },
    timeout:5000,
    limit:8,
    play_parse:true,


     // =========== lazy函数改为异步 ===========
    lazy: async function (flag, id, flags) {
        await this.ensureCookie();
        console.log("lazy函数调用，id:", id);

        if (!id || id.indexOf('_') === -1) {
            return {
                parse: 0,
                url: id,
                jx: 0
            };
        }

        let ids = id.split('_');
        if (ids.length < 2) {
            return {
                parse: 0,
                url: id,
                jx: 0
            };
        }

        let aid = ids[0];
        let cid = ids[1];

        try {
            // 弹幕地址
            let dan = 'https://api.bilibili.com/x/v1/dm/list.so?oid=' + cid;

            // 播放地址
            let iurl = 'https://api.bilibili.com/x/player/playurl?avid=' + aid + '&cid=' + cid + '&qn=116';
            console.log("请求播放URL:", iurl);

            let html = await request(iurl, {headers: this.headers});
            let jRoot = JSON.parse(html);

            if (jRoot.code !== 0) {
                console.log("播放地址获取失败:", jRoot.message);
                return {
                    parse: 0,
                    url: '',
                    jx: 0
                };
            }

            let jo = jRoot.data;
            if (!jo || !jo.durl || jo.durl.length === 0) {
                console.log("没有找到可用的播放地址");
                return {
                    parse: 0,
                    url: '',
                    jx: 0
                };
            }

            let ja = jo.durl;
            let maxSize = -1;
            let position = -1;

            ja.forEach(function(tmpJo, i) {
                if (maxSize < Number(tmpJo.size)) {
                    maxSize = Number(tmpJo.size);
                    position = i;
                }
            });

            let purl = '';
            if (ja.length > 0) {
                if (position === -1) {
                    position = 0;
                }
                purl = ja[position].url;
            }

            console.log("找到播放地址，大小:", maxSize, "位置:", position);

            // 解码URL（如果有编码）
            try {
                if (purl.includes('%')) {
                    purl = decodeURIComponent(purl);
                }
            } catch (e) {
                console.log("URL解码失败:", e.message);
            }

            let result = {
                parse: 0,
                playUrl: '',
                url: purl,
                header: {
                    'Referer': 'https://www.bilibili.com',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
                    'Origin': 'https://www.bilibili.com'
                },
                danmaku: dan
            };

            // 根据文件类型设置contentType
            if (/\.flv/.test(purl)) {
                result.contentType = 'video/x-flv';
            } else if (/\.m3u8/.test(purl)) {
                result.contentType = 'application/x-mpegURL';
            }

            console.log("返回播放结果:", {
                urlLength: purl.length,
                hasDanmaku: !!dan,
                contentType: result.contentType
            });

            return result;

        } catch (e) {
            console.log("lazy函数异常:", e.message);
            console.log("堆栈:", e.stack);

            // 备用方案
            return {
                parse: 0,
                url: `tvbox-xg:${id}`,
                jx: 0
            };
        }
    },

    double:false,


    // =========== 推荐 ===========
推荐: async function () {
    await this.ensureCookie();

    let {input} = this;
    console.log("推荐函数调用，input:", input);

    try {
        let html = await request(input, {headers: this.headers});
        console.log("推荐API响应长度:", html.length);

        // 检查是否是HTML响应
        if (html.includes('<!DOCTYPE') || html.includes('<html')) {
            console.log("推荐API返回HTML，可能是Cookie无效");
            return [];
        }

        let data = JSON.parse(html);
        console.log("推荐API状态码:", data.code);

        // 验证数据格式 - 支持多种可能的数据结构
        if (!data) {
            console.log("推荐数据为空");
            return [];
        }

        if (data.code !== 0) {
            console.log("推荐API错误:", data.message || '未知错误');
            return [];
        }

        // 尝试不同的数据结构
        let vodList = [];

        if (data.data && data.data.list) {
            // 结构1: data.data.list
            vodList = data.data.list;
            console.log("使用数据结构1，数量:", vodList.length);
        } else if (data.data && data.data.item) {
            // 结构2: data.data.item
            vodList = data.data.item;
            console.log("使用数据结构2，数量:", vodList.length);
        } else if (data.data && Array.isArray(data.data)) {
            // 结构3: data.data直接是数组
            vodList = data.data;
            console.log("使用数据结构3，数量:", vodList.length);
        } else if (data.list) {
            // 结构4: data.list
            vodList = data.list;
            console.log("使用数据结构4，数量:", vodList.length);
        } else {
            console.log("未知的数据结构:", Object.keys(data));
            return [];
        }

        let videos = [];

        vodList.forEach(function(vod, index) {
            // 安全获取数据
            let aid = vod.aid || vod.id || `vid_${index}`;
            let title = vod.title || '无标题';
            title = stripHtmlTag(title);

            let img = vod.pic || vod.cover || '';
            if (img && img.startsWith('//')) {
                img = 'https:' + img;
            } else if (img && !img.startsWith('http')) {
                img = 'https:' + img;
            }

            // 处理时长
            let duration = vod.duration || 0;
            let durationText = turnDHM(duration);

            // 处理播放量
            let playCount = 0;
            if (vod.stat) {
                playCount = vod.stat.view || vod.stat.play || 0;
            } else if (vod.play !== undefined) {
                playCount = vod.play;
            }

            let playText = ConvertNum(playCount);

            // 处理UP主信息
            let upName = '未知UP主';
            if (vod.owner && vod.owner.name) {
                upName = vod.owner.name;
            } else if (vod.author && vod.author.name) {
                upName = vod.author.name;
            }

            let remark = durationText + ' ▶' + playText + ' 🆙' + upName;

            videos.push({
                vod_id: aid,
                vod_name: title,
                vod_pic: img,
                vod_remarks: remark
            });
        });

        console.log("推荐函数返回视频数量:", videos.length);
        return videos;

    } catch (e) {
        console.log("推荐异常:", e.message);
        return [];
    }
},
    // =========== 一级：改为异步 ===========
    一级: async function (tid, pg, filter, extend) {
        await this.ensureCookie();
        let {MY_PAGE, MY_CATE} = this;

        try {
            let input = this.host;
            if (MY_CATE === '推荐') {
                input += '/x/web-interface/index/top/rcmd?ps=14&fresh_idx=' + MY_PAGE + '&fresh_idx_1h=' + MY_PAGE;
            } else if (MY_CATE === '历史记录') {
                input += '/x/v2/history?pn=' + MY_PAGE;
            } else {
                let keyword = MY_CATE;
                if (keyword.endsWith('_clicklink')) {
                    keyword = keyword.split('_')[0];
                }
                input += '/x/web-interface/search/type?search_type=video&keyword=' + encodeURIComponent(keyword) + '&page=' + MY_PAGE;

                // 添加过滤条件
                if (extend) {
                    if (extend.duration && extend.duration !== '0') {
                        input += '&duration=' + extend.duration;
                    }
                    if (extend.order && extend.order !== '0') {
                        input += '&order=' + extend.order;
                    }
                }
            }

            let html = await request(input, {headers: this.headers});
            let data = JSON.parse(html);

            let videos = [];
            let vodList = [];

            if (MY_CATE === '推荐') {
                vodList = data.data.item || [];
            } else if (MY_CATE === '历史记录') {
                vodList = data.data || [];
            } else {
                vodList = data.data.result || [];
            }

            vodList.forEach(function(vod) {
                let aid = vod.aid || vod.id;
                if (!aid) return;

                let title = stripHtmlTag(vod.title);
                let img = vod.pic;
                if (img && img.startsWith('//')) {
                    img = 'https:' + img;
                }

                let play = '';
                let danmaku = '';
                if (MY_CATE === '推荐') {
                    play = ConvertNum(vod.stat.view);
                    danmaku = vod.stat.danmaku;
                } else if (MY_CATE === '历史记录') {
                    play = ConvertNum(vod.stat.view);
                    danmaku = vod.stat.danmaku;
                } else {
                    play = ConvertNum(vod.play);
                    danmaku = vod.video_review;
                }

                let remark = turnDHM(vod.duration) + ' ▶' + play + ' 💬' + danmaku;
                videos.push({
                    vod_id: aid,
                    vod_name: title,
                    vod_pic: img,
                    vod_remarks: remark
                });
            });

            return videos;
        } catch (e) {
            console.log("一级异常:", e);
            return [];
        }
    },

    // =========== 二级：改为异步 ===========
    二级: async function (vid) {
        await this.ensureCookie();
        let {input} = this;

        try {
            let html = await request(input, {headers: this.headers});
            let data = JSON.parse(html);
            let jo = data.data.View;

            if (!jo) {
                return {};
            }

            // 历史记录上报（如果Cookie有效）
            try {
                let cookies = this.headers.Cookie.split(';');
                let bili_jct = '';
                cookies.forEach(cookie => {
                    if (cookie.includes('bili_jct')) {
                        bili_jct = cookie.split('=')[1];
                    }
                });
                if (bili_jct !== '') {
                    let historyReport = 'https://api.bilibili.com/x/v2/history/report';
                    let dataPost = {
                        aid: jo.aid,
                        cid: jo.cid,
                        csrf: bili_jct,
                    };
                    // 注意：在TVBox环境中可能不支持post函数
                }
            } catch (e) {
                // 忽略Cookie处理错误
            }

            let stat = jo.stat;
            let up_info = data.data.Card;
            let relation = up_info.following ? '已关注' : '未关注';
            let aid = jo.aid;
            let title = stripHtmlTag(jo.title);
            let pic = jo.pic;
            let desc = jo.desc;

            let date = new Date(jo.pubdate * 1000);
            let yy = date.getFullYear().toString();
            let mm = date.getMonth()+1;
            mm = mm < 10 ? ('0' + mm) : mm;
            let dd = date.getDate();
            dd = dd < 10 ? ('0' + dd) : dd;

            let up_name = jo.owner.name;
            let typeName = jo.tname;

            let vod = {
                vod_id: aid,
                vod_name: title,
                vod_pic: pic,
                type_name: typeName,
                vod_year: yy+mm+dd,
                vod_area: 'bilidanmu',
                vod_tags: 'mv',
                vod_director: '🆙 ' + up_name + '　👥 ' + up_info.follower + '　' + relation,
                vod_actor: '▶' + stat.view + '　' + '💬' + stat.danmaku + '　' + '👍' + stat.like + '　' + '💰' + stat.coin + '　' + '⭐' + stat.favorite,
                vod_content: desc
            };

            let ja = jo.pages;
            let treeMap = {};
            let playurls = [];

            if (ja && ja.length > 0) {
                ja.forEach(function(tmpJo) {
                    let cid = tmpJo.cid;
                    let part = tmpJo.part.replaceAll('#', '﹟').replaceAll('$', '﹩');
                    playurls.push(part + '$' + aid + '_' + cid);
                });
                treeMap['HE影'] = playurls.join('#');
            }

            let relatedData = data.data.Related;
            playurls = [];
            if (relatedData && relatedData.length > 0) {
                relatedData.forEach(function(rd) {
                    let ccid = rd.cid;
                    let title = rd.title.replaceAll('#', '﹟').replaceAll('$', '﹩');
                    let aaid = rd.aid;
                    playurls.push(title + '$' + aaid + '_' + ccid);
                });
                treeMap['hlh'] = playurls.join('#');
            }

            vod.vod_play_from = Object.keys(treeMap).join("$$$");
            vod.vod_play_url = Object.values(treeMap).join("$$$");

            return vod;
        } catch (e) {
            console.log("二级异常:", e);
            return {};
        }
    },

    // =========== 搜索：改为异步 ===========
    搜索: async function (key, quick) {
        await this.ensureCookie();
        let {input} = this;

        try {
            let html = await request(input, {headers: this.headers});
            let data = JSON.parse(html);
            let videos = [];
            let vodList = data.data.result || [];

            vodList.forEach(function(vod) {
                let aid = vod.aid;
                let title = stripHtmlTag(vod.title);
                let img = vod.pic;
                if (img.startsWith('//')) {
                    img = 'https:' + img;
                }
                let remark = turnDHM(vod.duration);
                videos.push({
                    vod_id: aid,
                    vod_name: title,
                    vod_pic: img,
                    vod_remarks: remark
                });
            });

            return videos;
        } catch (e) {
            console.log("搜索异常:", e);
            return [];
        }
    }
};

// =========== 辅助函数（保持不变） ===========
function stripHtmlTag(src) {
    return src.replace(/<\/?[^>]+(>|$)/g, '').replace(/&.{1,5};/g, '').replace(/\s{2,}/g, ' ');
}

function turnDHM(duration) {
    let min = '';
    let sec = '';
    try {
        min = duration.split(':')[0];
        sec = duration.split(':')[1];
    } catch (e) {
        min = Math.floor(duration / 60);
        sec = duration % 60;
    }
    if (isNaN(parseInt(duration))) {
        return '无效输入';
    }
    if (min == 0) {
        return sec + '秒'
    } else if (0 < min && min < 60) {
        return min + '分'
    } else if (60 <= min && min < 1440) {
        if (min % 60 == 0) {
            let h = min / 60;
            return h + '小时'
        } else {
            let h = min / 60;
            h = (h + '').split('.')[0];
            let m = min % 60;
            return h + '小时' + m + '分';
        }
    } else if (min >= 1440) {
        let d = min / 60 / 24;
        d = (d + '').split('.')[0];
        let h = min / 60 % 24;
        h = (h + '').split('.')[0];
        let m = min % 60;
        let dhm = '';
        if (d > 0) {
            dhm = d + '天'
        }
        if (h >= 1) {
            dhm = dhm + h + '小时'
        }
        if (m > 0) {
            dhm = dhm + m + '分'
        }
        return dhm
    }
    return null
}

function ConvertNum(num) {
    let _ws = Math.pow(10, 1);
    let _b = 1e4;
    if (num < _b) {
        return num.toString();
    }
    let _r = '';
    let _strArg = ['', '万', '亿', '万亿'];
    let _i = Math.floor(Math.log(num) / Math.log(_b));
    if (_i > 3) {
        _i = 3;
    }
    _r = Math.floor(num / Math.pow(_b, _i) * _ws) / _ws + _strArg[_i];
    return _r;
}