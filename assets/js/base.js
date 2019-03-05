﻿window.imgs = {
  logo: "./assets/images/logo.png",
  point: "./assets/images/point.png",
  play: "./assets/images/play.png",
  arrow: "./assets/images/arrow.png",
  play1:'./assets/images/play1.png',
  time:'./assets/images/time.png',
  title:'./assets/images/title.png',
  waiting:'./assets/images/waiting.png',
  entry:'./assets/images/entry.png',
  zipcode:'./assets/images/zipcode.png',
  index:'./assets/images/index.jpg',
  loading:'./assets/images/loading.jpg',
  main:'./assets/images/main-bg.jpg',
  
  wangjiaqi:'./assets/images/wangjiaqi.jpg',
  hejianhua:'./assets/images/hejianhua.jpg',
  hukeyi:'./assets/images/hukeyi.jpg',
  wangjianyu:'./assets/images/wangjianyu.jpg',
  wuguanghui:'./assets/images/wuguanghui.jpg',

  _wangjiaqi:'./assets/images/_wangjiaqi.jpg',
  _hejianhua:'./assets/images/_hejianhua.jpg',
  _hukeyi:'./assets/images/_hukeyi.jpg',
  _wangjianyu:'./assets/images/_wangjianyu.jpg',
  _wuguanghui:'./assets/images/_wuguanghui.jpg',
  xinmeiti:'./assets/images/xinmeiti.jpg',

};


 
 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
   indexvideo: './assets/video/index3.mp4',
   indexvideo1: './assets/video/index3.mp4',
   baseUrl: "https://xlive.xinhuaapp.com",
   host:"https://xlive.xinhuaapp.com", //正式域名：https://testxlive.xinhuaapp.com
   secretKey: "e9469538b0623783f38c585821459454",
   questionList:[
      {
        name:"新华社新媒体中心 ",
        position:'国家通讯社实时发布国内外重大新闻平台',
        img:imgs.xinmeiti,
        headimgurl:imgs.logo,
        qTitle:"最近特别流行的一部科幻电影是什么？",
        answers:['《流浪地球》','《流浪月球》','《流浪太阳》'],
        rAnswer:0,
        remark:'你以为我们的题目这么简单吗？那只是测试！现在正式开始！本测试只有5关！' 
      },
      {
        name:"何建华",
        position:'全国政协委员、中科院上海高等研究院研究员、国家重大科技基础设施上海光源二期工程总工程师',
        img:imgs._hejianhua,
        headimgurl:imgs.hejianhua,
        qTitle:"照亮原子分子的世界，需要用什么光？",
        answers:['可见光','红外激光','X光'],
        rAnswer:2,
        remark:'由于原子分子的大小在纳米尺度，能看清原子分子结构的光波长需要小于1纳米，这是X光才能达到的波长。'
      },
      {
        name:"王建宇",
        position:'全国人大代表、“墨子号”量子科学实验卫星工程常务副总设计师，中科院上海分院院长',
        img:imgs._wangjianyu ,
        headimgurl:imgs.wangjianyu ,
        qTitle:"在地球上看月球背面，多久能看到一次？",
        answers:['每月能看到一次','每天能看到一次','永远也看不到'],
        rAnswer:2,
        remark:'由于月球绕地球公转和月球自转的周期一致，所以从地球上永远看不到月球背面。'
      },
      {
        name:"吴光辉",
        position:'全国人大代表、国产大型客机C919总设计师',
        img:imgs._wuguanghui,
        headimgurl:imgs.wuguanghui,
        qTitle:"国产大型客机C919的零部件数是什么量级？",
        answers:['百万 ','千万','十万'],
        rAnswer:0,
        remark:'我国国产大型客机C919有数百万个零部件。'
      },
      {
        name:"胡可一",
        position:'全国政协委员、中船集团江南造船总工程师',
        img:imgs._hukeyi,
        headimgurl:imgs.hukeyi,
        qTitle:"以下以哪种动物命名的船舶能够破冰？",
        answers:['雪龙','雪豹','雪蛤'],
        rAnswer:0,
        remark:'“雪龙2”号是我国首艘自主建造的极地科学考察破冰船，已于2018年下水。'
      },{
        name:"王家骐",
        position:'全国人大代表、中科院长春光机所研究员、中科院院士',
        img:imgs._wangjiaqi,
        headimgurl:imgs.wangjiaqi,
        qTitle:"高分六号卫星可实现大幅宽观测，一次拍下的图片最大宽度能超过多少公里？",
        answers:['30公里','100公里','800公里'],
        rAnswer:2,
        remark:'高分六号卫星一次可观测地面最大宽度超过800公里。'
      }
   ]
 };
 
  
var musics = {
	music: {
		src: './assets/music/bg1.mp3',
		autoplay: true,
		name: 'bg2',
		loop: true
	},
  alert: {
    src: './assets/music/alert.mp3',
    autoplay: true,
    name: 'alert',
  },
  error: {
    src: './assets/music/error.mp3',
    autoplay: true,
    name: 'error',
  },
  right: {
    src: './assets/music/right.mp3',
    autoplay: true,
    name: 'right',
  }
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();