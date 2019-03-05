<template>
	<transition name='main'>
		<div class='zmiti-main-ui lt-full' ref='scene' :class="{'show':show}" :style="{background:'url('+imgs.main+') no-repeat center top',backgroundSize:'cover',height:viewH+'px'}" >
			 <div v-if='showQuestionUI'>
			 	<div class="zmiti-zipcode">
			 		<img :src="imgs.zipcode" alt="">
			 	</div>
			 </div>

			<Toast :errorMsg='errorMsg'></Toast>
		</div>

	</transition>
</template>

<script>
	import './index.css';
	
	import zmitiUtil from '../lib/util';
	import IScroll from 'iscroll';
	import Toast from '../toast/toast';
	import '../lib/html2canvas';
	export default {
		props: ['obserable', 'pv', 'randomPv', 'nickname', 'headimgurl'],
	
		name: 'zmitiindex',
	
		data() {
			return {
				errorMsg:'',
				showQuestionUI:true,
				isAndroid :navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
				createImg:'',
				imgs:window.imgs,
				secretKey: "e9469538b0623783f38c585821459454",
                host:window.config.host, 
                show:true,
				viewW:Math.min( window.innerWidth,750),
				viewH: window.innerHeight,
				currentIndex:0,
				mobile:'',
				questionList:window.config.questionList
			}
		},
	
		components: {
			Toast
		},
		watch:{

		},
		methods: {

			
			swipeLeft(){
				var s = this;
				this.isLeftFirst = true;
				this.iNow = (s.currentIndex + 1) % s.hotWords.length;
				this.initLeft();
			},
			swipeRight(){
				var s = this;
				this.iNow = s.currentIndex-1;
				if(this.iNow<0){
					this.iNow = this.hotWords.length - 1;
				}
				this.isRightFirst=  true;
				this.initRight();
			},
			initLeft: function(flag) {
				var s = this;

				this.person = flag ? this.imgs.person : this.imgs.personL;
				
				s.currentIndex = (s.currentIndex + 1) % s.hotWords.length;
				
				//s.loadMusic(s.hotWords[s.currentIndex].audio);
				//this.iNow = s.currentIndex;
				var classList = [
					'left1 transition',
					'left transition',
					'active transition',
					'right ',
					'right1 '
				]
				var hotWords = s.hotWords,
					currentIndex = s.currentIndex;


				hotWords.forEach(function(list, i) {

					if (currentIndex > i) {
						hotWords[i].className = classList[0]
					} else if (currentIndex < i) {
						hotWords[i].className = classList[4]
					}
					(hotWords[currentIndex + 1] || hotWords[0])['className'] = classList[3];
					(hotWords[currentIndex + 2] || hotWords[1])['className'] = classList[4];
					(hotWords[currentIndex - 1] || hotWords[hotWords.length - 1])['className'] = classList[1];
					//(hotWords[currentIndex - 2] || hotWords[hotWords.length - 2])['className'] = classList[0];
				});

				hotWords[currentIndex].className = classList[2];
				s.hotWords = hotWords.concat([]);
			},
			initRight: function() {
				this.person = this.imgs.personR;
				var s = this;
				s.currentIndex = s.currentIndex - 1;

				if (s.currentIndex < 0) {
					s.currentIndex = s.hotWords.length - 1;
				}
				//this.iNow = s.currentIndex;
				
				var hotWords = s.hotWords,
					currentIndex = s.currentIndex;


				//console.log(s.currentIndex)

				s.currentIndex = s.currentIndex % hotWords.length;

				var classList = [
					'left1 ',
					'left ',
					'active transition',
					'right transition',
					'right1 transition'
				]

				hotWords.forEach(function(list, i) {

					if (currentIndex > i) {
						hotWords[i].className = classList[0]
					} else if (currentIndex < i) {
						hotWords[i].className = classList[4]
					}

					(hotWords[currentIndex + 1] || hotWords[0])['className'] = classList[3];
					(hotWords[currentIndex + 2] || hotWords[1])['className'] = classList[4];
					(hotWords[currentIndex - 1] || hotWords[hotWords.length - 1])['className'] = classList[1];
					//(hotWords[currentIndex - 2] || hotWords[hotWords.length - 2])['className'] = classList[0];
				})



				hotWords[currentIndex].className = classList[2];
				s.hotWords = hotWords.concat([]);
			},

			

			submit(){
				var  s = this;
				

				if(this.isAndroid){
					this.$refs['input'].blur();
					this.$refs['mobile'].blur();
				}


				if(this.msg.length<=0){
					this.errorMsg = '留言不能为空';
					setTimeout(() => {
						this.errorMsg = '';
					}, 1200);
					return;
				}

				if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
					this.errorMsg = '手机号格式不正确';
					setTimeout(() => {
						this.errorMsg = '';
					}, 1200);
					return;
				}
				
				var D = new Date();
				var year = D.getFullYear();
				var month = D.getMonth()+1;
				var date = D.getDate();
				var hours = D.getHours();
				var mins = D.getMinutes();
				var seconds = D.getSeconds();

				axios.post(this.host+'/xhs-security-activity/activity/user/saveUser',{
					"secretKey": s.secretKey, // 请求秘钥
					"nm": "hotwords", // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
					uname:s.nickname||"新华社网友",
					unickName:s.nickname||"新华社网友",
					uphone:s.mobile
				}).then((data)=>{
					
					if(typeof data.data === 'string'){
						data = JSON.parse(data.data);
					}
					else {
						data = data.data;
					}
					s.successMsg = '提交成功';
					s.mobile = '';
					if(data.rc === 0){

					}else{
						///s.errorMsg =  data.msg;
					}
					setTimeout(() => {
						s.successMsg = '';
						s.errorMsg = '';
						s.showPrize = false;
					}, 2000);
 
				})

				axios.post(this.host+"/xhs-security-activity/activity/comment/saveComment",{
					"secretKey": s.secretKey, // 请求秘钥
					"nm": "xhs-hotwords2019-"+(s.currentIndex+1), // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
					comment:s.msg,
					submit:[year,month,date].join('-')+ ' ' + [hours,mins,seconds].join(':'),
				}).then(data=>{
					var dt = data.data;
					if(typeof dt === 'string'){
						dt = JSON.parse(dt);
					}
					console.log(dt);
					if(dt.rc === 0){
						s.isSuccess = true;
						//s.hotWords[s.currentIndex].talkList = dt.data.lst;
						//console.log(s.hotWords[s.currentIndex].talkList)
					}
				})
			},
			
			photo(){
				this.showSharePage = true;
				this.html2img();
			},
			blur(e){
				this.$refs['scene'].style.position = 'fixed';
				this.$refs['scene'].style.top = 0;
				document.body.style.position = 'relative';

				


			},
			blur1(e){
				this.$refs['scene'].style.position = 'fixed';
				this.$refs['scene'].style.top = 0;
				document.body.style.position = 'relative';
				if(!this.isAndroid){
					this.$refs['button'].focus();
				}
			},

			focus1(){
				if(!this.isAndroid){
					setTimeout(()=>{
						this.$refs['button'].blur();
					},100)
				}
			},


			focus(e){
				this.$refs['scene'].style.position = 'relative';
				document.body.style.position = 'fixed';
				

			},
			
			
		},
	
		mounted() {
			
			var {obserable } = this;
			obserable.on('toggleMain',(data)=>{
				this.show = data.show;
				
			});
			var  s = this;
			//new VConsole();a
			//this.initRankScroll();
			
		}
	
	}
</script>
