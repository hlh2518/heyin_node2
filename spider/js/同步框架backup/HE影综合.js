var rule = {
    title:'HE影综合',
    host:'https://api.bilibili.com',
    // homeUrl:'/x/web-interface/search/type?search_type=video&keyword=小姐姐4K&page=1',
    homeUrl:'/x/web-interface/ranking/v2?rid=0&type=origin', // 排行 > 排行榜 > 原创
    url:'/x/web-interface/search/type?search_type=videofyfilter',

  class_name:'齐秦&徐子尧&徒步&刀郎&埙&白玛次仁&阿桑&张国荣&张学友&蒙面唱将&花样滑冰&轮滑&民族舞&古典舞&广场舞&中医&白族舞蹈&洞经音乐&书法&诗词&围棋&象棋&古筝&洞箫&笛子&尺八&吉他&戏曲&罗小罗&爱唱歌的罗小罗&郭涛&许巍&赵雷&旅游&风景4k&食谱&历史',
    class_url:'齐秦&徐子尧&徒步&刀郎&埙&白玛次仁&阿桑&张国荣&张学友&蒙面唱将&花样滑冰&轮滑&民族舞&古典舞&广场舞&中医&白族舞蹈&洞经音乐&书法&诗词&围棋&象棋&古筝&洞箫&笛子&尺八&吉他&戏曲&罗小罗&爱唱歌的罗小罗&郭涛&许巍&赵雷&旅游&风景4k&食谱&历史',
    filterable: 1,
    filter_url: '&keyword={{fl.tid}}&page=fypage&duration={{fl.duration}}&order={{fl.order}}',
    filter_def:{
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
    // detailUrl:'/x/web-interface/view?aid=fyid',//二级详情拼接链接(json格式用)
    detailUrl:'/x/web-interface/view/detail?aid=fyid',//二级详情拼接链接(json格式用)
    searchUrl:'/x/web-interface/search/type?search_type=video&keyword=**&page=fypage',
    searchable:2,
    quickSearch:0,
    headers:{
        "User-Agent":"PC_UA",
        "Referer": "https://www.bilibili.com",
        // "Cookie":"$bili_cookie"
         //"Cookie":"https://ghproxy.net/https://github.com/FongMi/CatVodSpider/raw/main/txt/cookie.txt"
        //"Cookie":"https://ghproxy.net/https://raw.githubusercontent.com/FongMi/CatVodSpider/main/txt/cookie.txt"
                "Cookie":"http://192.168.1.108:7129/files/txt/cookiehe.txt"
    },
    timeout:5000,
    limit:8,
    play_parse:true,
    /*
        lazy:`js:
        if (/^http/.test(input)) {
            input = {
                jx: 1,
                url: input,
                parse: 0,
                header: JSON.stringify({
                    "user-agent": "Mozilla/5.0"
                })
            }
        } else {
            let ids = input.split("_");
            let dan = 'https://api.bilibili.com/x/v1/dm/list.so?oid=' + ids[1];
            let result = {};
            let url = "https://api.bilibili.com/pgc/player/web/playurl?qn=116&ep_id=" + ids[0] + "&cid=" + ids[1];
            let html = request(url);
            let jRoot = JSON.parse(html);
            if (jRoot["message"] !== "success") {
                print("需要大会员权限才能观看");
                input = ""
            } else {
                let jo = jRoot["result"];
                let ja = jo["durl"];
                let maxSize = -1;
                let position = -1;
                ja.forEach(function(tmpJo, i) {
                    if (maxSize < Number(tmpJo["size"])) {
                        maxSize = Number(tmpJo["size"]);
                        position = i
                    }
                });
                let url = "";
                if (ja.length > 0) {
                    if (position === -1) {
                        position = 0
                    }
                    url = ja[position]["url"]
                }
                result["parse"] = 0;
                result["playUrl"] = "";
                result["url"] = url;
                result["header"] = {
                    Referer: "https://www.bilibili.com",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
                };
                result["contentType"] = "video/x-flv";
                result["danmaku"] = dan;
                input = result
            }
        }
    `,*/
    lazy:`js:
        let ids = input.split('_');
        let dan = 'https://api.bilibili.com/x/v1/dm/list.so?oid=' + ids[1];
        let result = {};
        let iurl = 'https://api.bilibili.com:443/x/player/playurl?avid=' + ids[0] + '&cid=' + ids[1] + '&qn=116';
        let html = request(iurl);
        let jRoot = JSON.parse(html);
        let jo = jRoot.data;
        let ja = jo.durl;
        let maxSize = -1;
        let position = -1;
        ja.forEach(function(tmpJo, i) {
            if (maxSize < Number(tmpJo.size)) {
                maxSize = Number(tmpJo.size);
                position = i
            }
        });
        let purl = '';
        if (ja.length > 0) {
            if (position === -1) {
                position = 0
            }
            purl = ja[position].url
        }
        result.parse = 0;
        result.playUrl = '';
        result.url = unescape(purl);
        result.header = {
            'Referer': 'https://live.bilibili.com',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
        };
        if (/\\.flv/.test(purl)) {
            result.contentType = 'video/x-flv';
        } else {
            result.contentType = '';
        }
        result.danmaku = dan;
        input = result
    `,
    double:false,
    // 推荐:'*',
    推荐:`js:
        function stripHtmlTag(src) {
            return src.replace(/<\\/?[^>]+(>|$)/g, '').replace(/&.{1,5};/g, '').replace(/\\s{2,}/g, ' ');
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
        let html = request(input);
        let vodList = JSON.parse(html).data.list;
        let videos = [];
        vodList.forEach(function(vod) {
            let aid = vod.aid;
            let title = stripHtmlTag(vod.title);
            let img = vod.pic;
            if (img.startsWith('//')) {
                img = 'https:' + img;
            }
            let remark = turnDHM(vod.duration) + ' ▶' + ConvertNum(vod.stat.view) + ' 🆙' + vod.owner.name;
            videos.push({
                vod_id: aid,
                vod_name: title,
                vod_pic: img,
                vod_remarks: remark
            })
        });
        VODS = videos
    `,
    // 一级:'js:let html=request(input);let msg=JSON.parse(html).message;function title_rep(title){if(/keyword/.test(title)){title=title.replace(\'<em class="keyword">\',"").replace("</em>","").replace("&quot;","\'");log("名称替换👉"+title)};return title}if(msg!=="0"){VODS=[{vod_name:KEY+"➢"+msg,vod_id:"no_data",vod_remarks:"别点,缺少bili_cookie",vod_pic:"https://ghproxy.net/https://raw.githubusercontent.com/hjdhnx/dr_py/main/404.jpg"}]}else{let videos=[];let vodList=JSON.parse(html).data.result;vodList.forEach(function(vod){let aid=vod["aid"];let title=vod["title"].trim();title=title_rep(title);title=title_rep(title);title=title_rep(title);title=title_rep(title);let img="https:"+vod["pic"];let remark=vod["duration"];videos.push({vod_id:aid,vod_name:title,vod_pic:img,vod_remarks:remark})});VODS=videos}',
    一级:`js:
        if (cateObj.tid.endsWith('_clicklink')) {
            cateObj.tid = cateObj.tid.split('_')[0];
            input = HOST + '/x/web-interface/search/type?search_type=video&keyword=' + cateObj.tid + '&page=' + MY_PAGE;
        }
        function stripHtmlTag(src) {
            return src.replace(/<\\/?[^>]+(>|$)/g, '').replace(/&.{1,5};/g, '').replace(/\\s{2,}/g, ' ');
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
        let data = [];
        let vodList = [];
        if (MY_CATE === '推荐') {
            input = HOST + '/x/web-interface/index/top/rcmd?ps=14&fresh_idx=' + MY_PAGE + '&fresh_idx_1h=' + MY_PAGE;
            data = JSON.parse(request(input)).data;
            vodList = data.item;
        } else if (MY_CATE === '历史记录') {
            input = HOST + '/x/v2/history?pn=' + MY_PAGE;
            data = JSON.parse(request(input)).data;
            vodList = data;
        } else {
            data = JSON.parse(request(input)).data;
            vodList = data.result;
        }
        let videos = [];
        vodList.forEach(function(vod) {
            let aid = vod.aid?vod.aid:vod.id;
            let title = stripHtmlTag(vod.title);
            let img = vod.pic;
            if (img.startsWith('//')) {
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
            })
        });
        VODS = videos
    `,
    二级:{
        is_json:true,
        title:".result.title;.result.share_sub_title",
        img:".result.cover",
        desc:".result.new_ep.desc;.result.publish.pub_time;.result.subtitle",
        content:".result.evaluate",
        tabs:"js:pdfa=jsp.pdfa;TABS=['HE影']",
        lists:".result.episodes",
        list_text:'title',
        list_url:'cid',
    },
    二级:'',  
    二级:`js:
        function stripHtmlTag(src) {
            return src.replace(/<\\/?[^>]+(>|$)/g, '').replace(/&.{1,5};/g, '').replace(/\\s{2,}/g, ' ');
        }
        let html = request(input);
        let jo = JSON.parse(html).data.View;
        // 历史记录
        let cookies = rule_fetch_params.headers.Cookie.split(';');
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
            post(historyReport, dataPost, 'form');
        }

        let stat = jo.stat;
        let up_info = JSON.parse(html).data.Card;
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
        // let remark = jo.duration;
        let vod = {
            vod_id: aid,
            vod_name: title,
            vod_pic: pic,
            type_name: typeName,
            vod_year: yy+mm+dd,
            vod_area: 'bilidanmu',
            // vod_remarks: remark,
            vod_tags: 'mv',
            // vod_director: '🆙 ' + up_name + '　👥 ' + up_info.follower + '　' + relation,
            vod_director: '🆙 ' + '[a=cr:' + JSON.stringify({'id':up_name + '_clicklink','name':up_name}) + '/]' + up_name + '[/a]' + '　👥 ' + up_info.follower + '　' + relation,
            vod_actor: '▶' + stat.view + '　' + '💬' + stat.danmaku + '　' + '👍' + stat.like + '　' + '💰' + stat.coin + '　' + '⭐' + stat.favorite,
            vod_content: desc
        };
        let ja = jo.pages;
        let treeMap = {};
        let playurls = [];
        ja.forEach(function(tmpJo) {
            let cid = tmpJo.cid;
            let part = tmpJo.part.replaceAll('#', '﹟').replaceAll('$', '﹩');
            playurls.push(
                part + '$' + aid + '_' + cid
            )
        });
        treeMap['HE影'] = playurls.join('#');
        let relatedData = JSON.parse(html).data.Related;
        playurls = [];
        relatedData.forEach(function(rd) {
            let ccid = rd.cid;
            let title = rd.title.replaceAll('#', '﹟').replaceAll('$', '﹩');
            let aaid = rd.aid;
            playurls.push(
                title + '$' + aaid + '_' + ccid
            )
        });
        treeMap['hlh'] = playurls.join('#');
        vod.vod_play_from = Object.keys(treeMap).join("$$$");
        vod.vod_play_url = Object.values(treeMap).join("$$$");
        VOD = vod;
    `,
    // 搜索:'*',
    搜索:`js:
        let html = request(input);
        function stripHtmlTag(src) {
            return src.replace(/<\\/?[^>]+(>|$)/g, '').replace(/&.{1,5};/g, '').replace(/\\s{2,}/g, ' ');
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
        let videos = [];
        let vodList = JSON.parse(html).data.result;
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
            })
        });
        VODS = videos
    `,
    // 预处理:'if(rule_fetch_params.headers.Cookie.startsWith("http")){rule_fetch_params.headers.Cookie=fetch(rule_fetch_params.headers.Cookie);setItem(RULE_CK,cookie)};log(rule_fetch_params.headers.Cookie)',
}