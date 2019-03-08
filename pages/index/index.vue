<template>
	
	<div  class="lt-full zmiti-index-main-ui " :style="{background:'url('+imgs.main+') no-repeat center bottom',backgroundSize:'cover'}">
		<div class="zmiti-zipcode">
	 		<img :src="imgs.zipcode" alt="">
	 	</div>
		<transition name='title'>
			<div v-if='showTitle' class='zmiti-index-title' >
				<img :src="imgs.title" alt="">
				 <div v-tap='[entryMain]' class='zmiti-entry-main flash' :class="{'active':showTitle}">
				 	<img :src="imgs.begin" alt="">
				 </div>
			</div>
		</transition>
		 
	</div>

</template>


<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	export default {
		props:['obserable'],
		name:"zmiti-index-page",
		data(){
			return{
				showTitle:false,
				hiddenLogo:false,
				showRemark:false,
				showRemarkPage:false,
				imgs:window.imgs,
				secretKey: "e9469538b0623783f38c585821459454",
                host: window.config.host,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
			}
		},
		components:{
		},
		
		methods:{
			
			entryMain(){
				this.obserable.trigger({
					type:'toggleMain',
					data:{
						show:true
					}
				});
			},
			updatePv(){
				var s = this;
				axios.post(s.host + '/xhs-security-activity/activity/num/updateNum', {
						"secretKey": s.secretKey, // 请求秘钥
						"nm": "meeting2019" // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
					}).then(function (data) {
						var dt = data.data;
						if (typeof dt === 'string') {
							dt = JSON.parse(dt);
						}
						console.log(dt);

					});
			}
		},
		mounted(){
			
 			this.updatePv();

 			this.obserable.on('showIndexTitle',()=>{
 				this.showTitle = true;
 			})
		}
	}

</script>