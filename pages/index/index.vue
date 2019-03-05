<template>
	
	<div  class="lt-full zmiti-index-main-ui " :style="{background:'url('+imgs.index+') no-repeat center bottom',backgroundSize:'cover'}">
		<transition name='title'>
			
			<div v-if='showTitle' class='zmiti-index-title' >
				<img :src="imgs.title" alt="">
			</div>
		</transition>
		 
		 <div class='zmiti-entry-main flash' :class="{'active':showTitle}">
		 	<img :src="imgs.entry" alt="">
		 </div>
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
			

		 	 
			entryRemark(){
				this.hiddenLogo = true;
				this.scaleTiele = true;
				setTimeout(()=>{
					///this.showRemarkPage = true;
					setTimeout(()=>{
						this.showRemark = true;
					},10)

					this.obserable.trigger({
						type:'toggleMain',
						data:{
							show:true
						}
					});
				},400)
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