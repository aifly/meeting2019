<template>
	<transition name='loading'>
		<section v-if='show' class="lt-full zmiti-loading1" :style="{background:'url('+imgs.loading+') no-repeat center bottom',backgroundSize:'cover'}">
			<div class="zmiti-time">
				<img :src="imgs.time" alt="">
			</div>
			<div class='zmiti-loading-ui' v-if='!loaded'>
				<div class='zmiti-loading-C'>
					<div class='zmiti-loading-bar '  :style="{webkitTransform:'scale('+(width)+',1)'}">  </div>
				</div>
				<div class='zmiti-progress'>
					{{width*100}}%
				</div>
			</div>
			<transition name='news'>
				<div v-if='loaded' class='zmiti-news' v-tap='[entryIndex]'>
					<div class='zmiti-news-title'>
						<div>
							<img :src="imgs.logo" alt="">
							<span>新华社</span>
						</div>
						<div>
							现在
						</div>
					</div>
					<div class="zmiti-news-content zmiti-text-overflow">
						新华社送你一架“飞机”，进入页面点赞入页面点赞入页面点赞
					</div>
				</div>
			</transition>
			<div class="zmiti-logo">
				<img :src="imgs.logo" alt="">
			</div>
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				loaded:false,
			}
		},
		components:{
		},
		
		methods:{

			imgStart(e){
				e.preventDefault(); 
			},
			entryIndex(){
				this.show = false;
				this.obserable.trigger({
					type:'showIndexTitle'
				})
			}
		},
		mounted(){

			this.obserable.on('hideloading',()=>{
				this.loaded = true;
				this.obserable.trigger({
					type:"playVoice",
					data:'alert'
				})
			});



		}
	}
</script>