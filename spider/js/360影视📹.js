/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '360影视[官]',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: '360影视[官]',
    host: 'https://www.360kan.com',
    homeUrl: 'https://api.web.360kan.com/v1/rank?cat=2&size=9',
    detailUrl: 'https://api.web.360kan.com/v1/detail?cat=fyclass&id=fyid',
    searchUrl: 'https://api.so.360kan.com/index?force_v=1&kw=**&from=&pageno=fypage&v_ap=1&tab=all',
    url: 'https://api.web.360kan.com/v1/fyfilter&size=35&pageno=fypage&callback=',
    filterable: 1,
    // filter_url: 'filter/list?catid=fyclass&rank={{fl.排序}}&cat={{fl.类型}}&year={{fl.年代}}&area={{fl.地区}}',
    // filter: "H4sIAAAAAAAAA+2YS08jRxCA/4vPHGbMvrK3/IJcor1Eq4gDUqIlbLQhkVYrJINt1jYPA8vLa2MgYJtlMdhAiD1e4z8z3TP+Fxm7Xu0oGs2BQBRx81fVXV3V3VNV7XcxO/b8u3exV5NvY89jXrOjyouxsdj0xE+TJv82MfXr5HDgdCBW6eN+8nggDiA2O4bSrZLK1lCKQDov09TJNOoQeF7u2O2WaB4A6fTcqk5soQ6BbdbWVLtDNgHYZrYm6yHwvNy51z2heQA8r/JebCKwL5kd18mSLwCsmz/1ttZIB2DE5210JL4B8Lyt937WoXkA7Kdzorqb5CcA6dwv+/5ZA3UIbLO+5GfKZBOAfckf+Ye8LwCsW1lQ+QvSAbDNZE7PfySbAOJL1VtdYF+GwDbT126Hzg9h9uVACxdOlRpqyZELxxzpwi2kg/Fk/KjWL8jCbquuit1+taBb5zgCYXSEyjd0+4Y3ZAgc9GUjGEFBA/Dh3KyIDoF0/b1PokNgm9sVXTolmwCy3qa53qY5z19sig6B9+HmT9EhsG65oZwq6QAiH077yu0cGodDHOVw4lb8EcqGPw35uMjHTXlc5HFTbovcNuWWyC1Dbn/F8uCnIX8m8mem/KnIn5ryJyJ/Ysofi/yxKZd4bTNeW+K1zXhtidc247UlLtuMy5K4LDMuS+KyzLgsicuSuHTxSm9/Qs3UzPdvJyfejJy6XllXTl5OnXn01HUp4ffWvGRd7+yjtTcT069+eD0jSw2HuK3c6JCpiZnJX0ZGqfy2qnT985Qx6ufXP07PDBx7ORaL31aJ8o8TUhYQopSM0BQXUvbCykI/2VWtecoSAGxz7lol82QTIFIKXyi6ziLpADj2elUtUdlDiJL6Va6pettcvobAWbBS9s93KQsC8HqN5aBI0noAHPvuut6pUOxDMLdNnV0rp05LDmFEHdYwJNO6QBkfQQpj1b2hm4gQqZm4uyIGcFdFLKwYhRWxsOIXVqj0VkPl9tXuATc8xA9l56Hs/OfKzvitlZ1UU+UPvVqCPgtm/qJKe67jyAhh9ne17J1yKQHgbzWRlakIkrw+q2VuAAHYr7Oe38iQUwBmIk3tGYk0APZ2Y09fcbIE4HmFj+4XfikASE65dNurnFOGwL7MLakSvYQQjHzTPyRfECSHXasGrwfAulZLZ6iMIvC+NNZUqkf7AsBZtfvBn6dyiGC+ys7odYVgFBG9WZAiMgD5AC6Mlx5AlBebf/W716EYEHhes+t36WwRWLde1zkqsQj/j1dZ2AvqtBZcD9IB3EuSGeaPR7eVPwJP/ANODQBRGpdBaQ5uduXSKNXA/EXWN2Q2As/u5FW6RVMBojSFYV+WWljvF6gMIETJcHrlWBpwBNbNLXqZJukAWHfR0SnKcAjsS7ujk7Q1CDxv/0AVqQNFMNpPL8sxAMi1cKTpReCr7VyoOmU/BLaZ6gXfPdkE4AzQWw1WoQwAEOWBoRMn4icC60L+y/KKOV2gTIUQ0rjLvM8V4zEAILqyzvENBojSzntHN1JNEOQhtGg82AD+Vk+zdPTCUsP+UN2mMYKZRnzz4mtRI5Du2xeigt9Gj+ttnoz85zcikjfOktf5MPrfoCm6k3wclkv/scl/aNPvvU2XeG0z3n+3fQ9A4rXMeC2J1zLjtSReS+IdeQYg3FeBnv0LfL9z7fwYAAA=",
    // filter_def: {},
     filter_url: 'filter/list?catid=fyclass&rank={{fl.排序}}&cat={{fl.类型}}&year={{fl.年代}}&area={{fl.地区}}',
    filter: {
"1":[
  {"key":"class","name":"剧情","value":[
  {"n":"全部","v":""},
  {"n":"喜剧","v":"喜剧"},
  {"n":"爱情","v":"爱情"},
  {"n":"动作","v":"动作"},
  {"n":"恐怖","v":"恐怖"},
  {"n":"科幻","v":"科幻"},
  {"n":"剧情","v":"剧情"},
  {"n":"犯罪","v":"犯罪"},
  {"n":"奇幻","v":"奇幻"},
  {"n":"战争","v":"战争"},
  {"n":"悬疑","v":"悬疑"},
  {"n":"动画","v":"动画"},
  {"n":"文艺","v":"文艺"},
  {"n":"纪录","v":"纪录"},
  {"n":"传记","v":"传记"},
  {"n":"歌舞","v":"歌舞"},
  {"n":"古装","v":"古装"},
  {"n":"历史","v":"历史"},
  {"n":"惊悚","v":"惊悚"},
  {"n":"伦理","v":"伦理"},
  {"n":"其他","v":"其他"}]},

  {"key":"area","name":"地区","value":[
  {"n":"全部","v":""},
  {"n":"内地","v":"大陆"},
  {"n":"中国香港","v":"香港"},
  {"n":"中国台湾","v":"台湾"},
  {"n":"泰国","v":"泰国"},
  {"n":"美国","v":"美国"},
  {"n":"韩国","v":"韩国"},
  {"n":"日本","v":"日本"},
  {"n":"法国","v":"法国"},
  {"n":"英国","v":"英国"},
  {"n":"德国","v":"德国"},
  {"n":"印度","v":"印度"},
  {"n":"其他","v":"其他"}]},

  {"key":"act","name":"明星","value":[
  {"n":"全部","v":""},
  {"n":"成龙","v":"成龙"},
  {"n":"周星驰","v":"周星驰"},
  {"n":"李连杰","v":"李连杰"},
  {"n":"林正英","v":"林正英"},
  {"n":"吴京","v":"吴京"},
  {"n":"徐峥","v":"徐峥"},
  {"n":"黄渤","v":"黄渤"},
  {"n":"王宝强","v":"王宝强"},
  {"n":"李小龙","v":"李小龙"},
  {"n":"张国荣","v":"张国荣"},
  {"n":"洪金宝","v":"洪金宝"},
  {"n":"姜文","v":"姜文"},
  {"n":"沈腾","v":"沈腾"},
  {"n":"邓超","v":"邓超"},
  {"n":"巩俐","v":"巩俐"},
  {"n":"马丽","v":"马丽"},
  {"n":"闫妮","v":"闫妮"},
  {"n":"周冬雨","v":"周冬雨"},
  {"n":"刘昊然","v":"刘昊然"},
  {"n":"汤唯","v":"汤唯"},
  {"n":"舒淇","v":"舒淇"},
  {"n":"白百何","v":"白百何"}]},

  {"key":"year","name":"年份","value":[
  {"n":"全部","v":""},
  {"n":"2026","v":"2026"},
  {"n":"2025","v":"2025"},
  {"n":"2024","v":"2024"},
  {"n":"2023","v":"2023"},
  {"n":"2022","v":"2022"},
  {"n":"2021","v":"2021"},
  {"n":"2020","v":"2020"},
  {"n":"2019","v":"2019"},
  {"n":"2018","v":"2018"},
  {"n":"2017","v":"2017"},
  {"n":"2016","v":"2016"},
  {"n":"2015","v":"2015"},
  {"n":"2014","v":"2014"},
  {"n":"2013","v":"2013"},
  {"n":"2012","v":"2012"},
  {"n":"2010","v":"2010"},
  {"n":"2009","v":"2009"},
  {"n":"2008","v":"2008"},
  {"n":"2007","v":"2007"},
  {"n":"更早","v":"lt_year"}]},

  {"key":"by","name":"排序","value":[
  {"n":"全部","v":""},
  {"n":"最近热映","v":"rankhot"},
  {"n":"最近上映","v":"ranklatest"},
  {"n":"最受好评","v":"rankpoint"}]}],

"2":[
  {"key":"class","name":"剧情","value":[
  {"n":"全部","v":""},
  {"n":"言情","v":"言情"},
  {"n":"剧情","v":"剧情"},
  {"n":"伦理","v":"伦理"},
  {"n":"喜剧","v":"喜剧"},
  {"n":"悬疑","v":"悬疑"},
  {"n":"都市","v":"都市"},
  {"n":"偶像","v":"偶像"},
  {"n":"古装","v":"古装"},
  {"n":"军事","v":"军事"},
  {"n":"警匪","v":"警匪"},
  {"n":"历史","v":"历史"},
  {"n":"励志","v":"励志"},
  {"n":"神话","v":"神话"},
  {"n":"谍战","v":"谍战"},
  {"n":"青春","v":"青春剧"},
  {"n":"家庭","v":"家庭剧"},
  {"n":"动作","v":"动作"},
  {"n":"情景","v":"情景"},
  {"n":"武侠","v":"武侠"},
  {"n":"科幻","v":"科幻"},
  {"n":"其他","v":"其他"}]},

  {"key":"area","name":"地区","value":[
  {"n":"全部","v":""},
  {"n":"内地","v":"内地"},
  {"n":"中国香港","v":"香港"},
  {"n":"中国台湾","v":"台湾"},
  {"n":"泰国","v":"泰国"},
  {"n":"日本","v":"日本"},
  {"n":"韩国","v":"韩国"},
  {"n":"美国","v":"美国"},
  {"n":"英国","v":"英国"},
  {"n":"新加坡","v":"新加坡"}]},

  {"key":"act","name":"明星","value":[
  {"n":"全部","v":""},
  {"n":"杨幂","v":"杨幂"},
  {"n":"热巴","v":"迪丽热巴"},
  {"n":"张嘉译","v":"张嘉译"},
  {"n":"赵丽颖","v":"赵丽颖"},
  {"n":"赵又廷","v":"赵又廷"},
  {"n":"胡歌","v":"胡歌"},
  {"n":"孙俪","v":"孙俪"},
  {"n":"韩东君","v":"韩东君"},
  {"n":"周迅","v":"周迅"},
  {"n":"张一山","v":"张一山"},
  {"n":"李小璐","v":"李小璐"},
  {"n":"李沁","v":"李沁"},
  {"n":"陈坤","v":"陈坤"},
  {"n":"刘亦菲","v":"刘亦菲"},
  {"n":"唐嫣","v":"唐嫣"},
  {"n":"李小冉","v":"李小冉"},
  {"n":"周冬雨","v":"周冬雨"},
  {"n":"于和伟","v":"于和伟"},
  {"n":"李易峰","v":"李易峰"},
  {"n":"雷佳音","v":"雷佳音"},
  {"n":"何冰","v":"何冰"},
  {"n":"阮经天","v":"阮经天"},
  {"n":"梅婷","v":"梅婷"},
  {"n":"徐峥","v":"徐峥"},
  {"n":"祖峰","v":"祖峰"},
  {"n":"秦海璐","v":"秦海璐"},
  {"n":"杨紫","v":"杨紫"},
  {"n":"任嘉伦","v":"任嘉伦"},
  {"n":"贾乃亮","v":"贾乃亮"},
  {"n":"罗晋","v":"罗晋"}]},

  {"key":"year","name":"年份","value":[
  {"n":"全部","v":""},
  {"n":"2026","v":"2026"},
  {"n":"2025","v":"2025"},
  {"n":"2024","v":"2024"},
  {"n":"2023","v":"2023"},
  {"n":"2022","v":"2022"},
  {"n":"2021","v":"2021"},
  {"n":"2020","v":"2020"},
  {"n":"2019","v":"2019"},
  {"n":"2018","v":"2018"},
  {"n":"2017","v":"2017"},
  {"n":"2016","v":"2016"},
  {"n":"2015","v":"2015"},
  {"n":"2014","v":"2014"},
  {"n":"2013","v":"2013"},
  {"n":"2012","v":"2012"},
  {"n":"2010","v":"2010"},
  {"n":"2009","v":"2009"},
  {"n":"2008","v":"2008"},
  {"n":"2007","v":"2007"},
  {"n":"更早","v":"lt_year"}]},

  {"key":"by","name":"排序","value":[
  {"n":"全部","v":""},
  {"n":"最近热映","v":"rankhot"},
  {"n":"最近上映","v":"ranklatest"},
  {"n":"最受好评","v":"rankpoint"}]}],

"3":[
  {"key":"class","name":"剧情","value":[
  {"n":"全部","v":""},
  {"n":"脱口秀","v":"脱口秀"},
  {"n":"真人秀","v":"真人秀"},
  {"n":"搞笑","v":"搞笑"},
  {"n":"选秀","v":"选秀"},
  {"n":"八卦","v":"八卦"},
  {"n":"访谈","v":"访谈"},
  {"n":"情感","v":"情感"},
  {"n":"生活","v":"生活"},
  {"n":"晚会","v":"晚会"},
  {"n":"音乐","v":"音乐"},
  {"n":"职场","v":"职场"},
  {"n":"美食","v":"美食"},
  {"n":"时尚","v":"时尚"},
  {"n":"游戏","v":"游戏"},
  {"n":"少儿","v":"少儿"},
  {"n":"体育","v":"体育"},
  {"n":"纪实","v":"纪实"},
  {"n":"科教","v":"科教"},
  {"n":"曲艺","v":"曲艺"},
  {"n":"歌舞","v":"歌舞"},
  {"n":"财经","v":"财经"},
  {"n":"汽车","v":"汽车"},
  {"n":"播报","v":"播报"},
  {"n":"其他","v":"其他"}]},

  {"key":"area","name":"地区","value":[
  {"n":"全部","v":""},
  {"n":"内地","v":"大陆"},
  {"n":"中国香港","v":"香港"},
  {"n":"中国台湾","v":"台湾"},
  {"n":"日本","v":"日本"},
  {"n":"欧美","v":"欧美"}]},

  {"key":"act","name":"明星","value":[
  {"n":"全部","v":""},
  {"n":"邓超","v":"邓超"},
  {"n":"陈赫","v":"陈赫"},
  {"n":"何炅","v":"何炅"},
  {"n":"汪涵","v":"汪涵"},
  {"n":"王俊凯","v":"王俊凯"},
  {"n":"黄磊","v":"黄磊"},
  {"n":"谢娜","v":"谢娜"},
  {"n":"黄渤","v":"黄渤"},
  {"n":"周杰伦","v":"周杰伦"},
  {"n":"薛之谦","v":"薛之谦"},
  {"n":"Angelababy","v":"Angelababy"},
  {"n":"易烊千玺","v":"易烊千玺"},
  {"n":"岳云鹏","v":"岳云鹏"},
  {"n":"王嘉尔","v":"王嘉尔"},
  {"n":"鹿晗","v":"鹿晗"},
  {"n":"杨幂","v":"杨幂"},
  {"n":"沈腾","v":"沈腾"},
  {"n":"张艺兴","v":"张艺兴"},
  {"n":"潘玮柏","v":"潘玮柏"},
  {"n":"华晨宇","v":"华晨宇"},
  {"n":"李维嘉","v":"李维嘉"},
  {"n":"宋小宝","v":"宋小宝"},
  {"n":"贾玲","v":"贾玲"},
  {"n":"沙溢","v":"沙溢"},
  {"n":"撒贝宁","v":"撒贝宁"},
  {"n":"涂磊","v":"涂磊"}]},

  {"key":"by","name":"排序","value":[
  {"n":"全部","v":""},
  {"n":"最近热映","v":"rankhot"},
  {"n":"最近上映","v":"ranklatest"}]}],

"4":[
  {"key":"class","name":"剧情","value":[
  {"n":"全部","v":""},
  {"n":"热血","v":"热血"},
  {"n":"科幻","v":"科幻"},
  {"n":"美少女","v":"美少女"},
  {"n":"魔幻","v":"魔幻"},
  {"n":"经典","v":"经典"},
  {"n":"励志","v":"励志"},
  {"n":"少儿","v":"少儿"},
  {"n":"冒险","v":"冒险"},
  {"n":"搞笑","v":"搞笑"},
  {"n":"推理","v":"推理"},
  {"n":"恋爱","v":"恋爱"},
  {"n":"治愈","v":"治愈"},
  {"n":"幻想","v":"幻想"},
  {"n":"校园","v":"校园"},
  {"n":"动物","v":"动物"},
  {"n":"机战","v":"机战"},
  {"n":"亲子","v":"亲子"},
  {"n":"儿歌","v":"儿歌"},
  {"n":"运动","v":"运动"},
  {"n":"悬疑","v":"悬疑"},
  {"n":"怪物","v":"怪物"},
  {"n":"战争","v":"战争"},
  {"n":"益智","v":"益智"},
  {"n":"青春","v":"青春"},
  {"n":"童话","v":"童话"},
  {"n":"竞技","v":"竞技"},
  {"n":"动作","v":"动作"},
  {"n":"社会","v":"社会"},
  {"n":"友情","v":"友情"},
  {"n":"真人版","v":"真人版"},
  {"n":"电影版","v":"电影版"},
  {"n":"OVA版","v":"OVA版"}]},

  {"key":"area","name":"地区","value":[
  {"n":"全部","v":""},
  {"n":"内地","v":"大陆"},
  {"n":"日本","v":"日本"},
  {"n":"美国","v":"美国"}]},

  {"key":"year","name":"年份","value":[
  {"n":"全部","v":""},
  {"n":"2026","v":"2026"},
  {"n":"2025","v":"2025"},
  {"n":"2024","v":"2024"},
  {"n":"2023","v":"2023"},
  {"n":"2022","v":"2022"},
  {"n":"2021","v":"2021"},
  {"n":"2020","v":"2020"},
  {"n":"2019","v":"2019"},
  {"n":"2018","v":"2018"},
  {"n":"2017","v":"2017"},
  {"n":"2016","v":"2016"},
  {"n":"2015","v":"2015"},
  {"n":"2014","v":"2014"},
  {"n":"2013","v":"2013"},
  {"n":"2012","v":"2012"},
  {"n":"2011","v":"2011"},
  {"n":"2010","v":"2010"},
  {"n":"2009","v":"2009"},
  {"n":"2008","v":"2008"},
  {"n":"2007","v":"2007"},
  {"n":"2006","v":"2006"},
  {"n":"2005","v":"2005"},
  {"n":"2004","v":"2004"},
  {"n":"更早","v":"更早"}]},

  {"key":"by","name":"排序","value":[
  {"n":"全部","v":""},
  {"n":"最近热映","v":"rankhot"},
  {"n":"最近上映","v":"ranklatest"}]}]},
   // filter: "H4sIAAAAAAAAA+2YS08jRxCA/4vPHGbMvrK3/IJcor1Eq4gDUqIlbLQhkVYrJINt1jYPA8vLa2MgYJtlMdhAiD1e4z8z3TP+Fxm7Xu0oGs2BQBRx81fVXV3V3VNV7XcxO/b8u3exV5NvY89jXrOjyouxsdj0xE+TJv82MfXr5HDgdCBW6eN+8nggDiA2O4bSrZLK1lCKQDov09TJNOoQeF7u2O2WaB4A6fTcqk5soQ6BbdbWVLtDNgHYZrYm6yHwvNy51z2heQA8r/JebCKwL5kd18mSLwCsmz/1ttZIB2DE5210JL4B8Lyt937WoXkA7Kdzorqb5CcA6dwv+/5ZA3UIbLO+5GfKZBOAfckf+Ye8LwCsW1lQ+QvSAbDNZE7PfySbAOJL1VtdYF+GwDbT126Hzg9h9uVACxdOlRpqyZELxxzpwi2kg/Fk/KjWL8jCbquuit1+taBb5zgCYXSEyjd0+4Y3ZAgc9GUjGEFBA/Dh3KyIDoF0/b1PokNgm9sVXTolmwCy3qa53qY5z19sig6B9+HmT9EhsG65oZwq6QAiH077yu0cGodDHOVw4lb8EcqGPw35uMjHTXlc5HFTbovcNuWWyC1Dbn/F8uCnIX8m8mem/KnIn5ryJyJ/Ysofi/yxKZd4bTNeW+K1zXhtidc247UlLtuMy5K4LDMuS+KyzLgsicuSuHTxSm9/Qs3UzPdvJyfejJy6XllXTl5OnXn01HUp4ffWvGRd7+yjtTcT069+eD0jSw2HuK3c6JCpiZnJX0ZGqfy2qnT985Qx6ufXP07PDBx7ORaL31aJ8o8TUhYQopSM0BQXUvbCykI/2VWtecoSAGxz7lol82QTIFIKXyi6ziLpADj2elUtUdlDiJL6Va6pettcvobAWbBS9s93KQsC8HqN5aBI0noAHPvuut6pUOxDMLdNnV0rp05LDmFEHdYwJNO6QBkfQQpj1b2hm4gQqZm4uyIGcFdFLKwYhRWxsOIXVqj0VkPl9tXuATc8xA9l56Hs/OfKzvitlZ1UU+UPvVqCPgtm/qJKe67jyAhh9ne17J1yKQHgbzWRlakIkrw+q2VuAAHYr7Oe38iQUwBmIk3tGYk0APZ2Y09fcbIE4HmFj+4XfikASE65dNurnFOGwL7MLakSvYQQjHzTPyRfECSHXasGrwfAulZLZ6iMIvC+NNZUqkf7AsBZtfvBn6dyiGC+ys7odYVgFBG9WZAiMgD5AC6Mlx5AlBebf/W716EYEHhes+t36WwRWLde1zkqsQj/j1dZ2AvqtBZcD9IB3EuSGeaPR7eVPwJP/ANODQBRGpdBaQ5uduXSKNXA/EXWN2Q2As/u5FW6RVMBojSFYV+WWljvF6gMIETJcHrlWBpwBNbNLXqZJukAWHfR0SnKcAjsS7ujk7Q1CDxv/0AVqQNFMNpPL8sxAMi1cKTpReCr7VyoOmU/BLaZ6gXfPdkE4AzQWw1WoQwAEOWBoRMn4icC60L+y/KKOV2gTIUQ0rjLvM8V4zEAILqyzvENBojSzntHN1JNEOQhtGg82AD+Vk+zdPTCUsP+UN2mMYKZRnzz4mtRI5Du2xeigt9Gj+ttnoz85zcikjfOktf5MPrfoCm6k3wclkv/scl/aNPvvU2XeG0z3n+3fQ9A4rXMeC2J1zLjtSReS+IdeQYg3FeBnv0LfL9z7fwYAAA=",
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    timeout: 5000,
    class_name: '电视剧&电影&综艺&动漫',
    class_url: '2&1&3&4',
    limit: 5,
    multi: 1,
    searchable: 2,
    play_parse: true,
    lazy: async function () {
        let {input} = this;
        if (input.includes('?') && !input.includes('video?vid=')) {
            input = input.split("?")[0];
        }
        return input
    },
    推荐: 'json:data;title;cover;comment;cat+ent_id;description',
    一级: 'json:data.movies;title;cover;pubdate;id;description',
    二级: async function () {
        let {input, fetch_params} = this;
        let html = JSON.parse(await request(input, fetch_params));
        let data = html.data;
        let title = data.title;
        let img = data.cdncover;
        let vod_type = data.moviecategory.join(",");
        let area = data.area.join(",");
        let director = data.director.join(",");
        let actor = data.actor.join(",");
        let content = data.description;
        let base_vod = {
            vod_id: input,
            vod_name: title,
            type_name: vod_type,
            vod_actor: actor,
            vod_director: director,
            vod_content: content,
            vod_remarks: area,
            vod_pic: urljoin(input, img)
        };
        let delta = 50;
        let vod_play = {};
        let sites = data.playlink_sites;
        for (const site of sites) {
            let playList = "";
            let vodItems = [];
            // print(data)
            if (data.allupinfo) {
                let total = parseInt(data.allupinfo[site]);
                // print(total)
                for (let j = 1; j < total; j += delta) {
                    let end = Math.min(total, j + delta - 1);
                    // print(end)
                    let url2 = buildUrl(input, {start: j, end: end, site: site});
                    let vod_data = JSON.parse(await request(url2), fetch_params).data;
                    if (vod_data != null) {
                        if (vod_data.allepidetail) {
                            vod_data = vod_data.allepidetail[site];
                            vod_data.forEach(function (item, index) {
                                vodItems.push((item.playlink_num || "") + "$" + urlDeal(item.url || ""))
                            })
                        } else {
                            vod_data = vod_data.defaultepisode;
                            vod_data.forEach(function (item, index) {
                                vodItems.push((item.period || "") + (item.name || "") + "$" + urlDeal(item.url) || "")
                            })
                        }
                    }
                }
            } else {
                let item = data.playlinksdetail[site];
                vodItems.push((item.sort || "") + "$" + urlDeal(item.default_url || ""))
            }
            if (vodItems.length > 0) {
                playList = vodItems.join("#")
            }
            if (playList.length < 1) {
                continue;
            }
            vod_play[site] = playList
        }
        let tabs = Object.keys(vod_play);
        let playUrls = [];
        for (let id in tabs) {
            // print("id:" + id);
            playUrls.push(vod_play[tabs[id]])
        }
        if (tabs.length > 0) {
            let vod_play_from = tabs.join("$$$");
            let vod_play_url = playUrls.join("$$$");
            base_vod.vod_play_from = vod_play_from;
            base_vod.vod_play_url = vod_play_url
        }
        return base_vod;
    },
    搜索: 'json:data.longData.rows;titleTxt||titlealias;cover;cat_name;cat_id+en_id;description',
}