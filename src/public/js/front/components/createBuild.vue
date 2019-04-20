<template lang="pug">
	.create-build
		fieldset
			legend Базавые данные {{id}}
			label
				b Название
				input(type="text",v-model="title")
			label
				b Продать
				input(type="radio" value="sale" v-model="sale" name="type" checked)
			label
				b Сдать
				input(type="radio"	value="rent" v-model="sale" name="type")
			label
				b Количество комнат
				input(type="number" v-model="countroom")
			label
				b Улица
				input(type="text",v-model="address")
			label
				b price
				input(type="text",v-model="price")
				
			label
				b Кордината 1
				input(type="text",v-model="cord1")
			label
				b Кордината 2
				input(type="text",v-model="cord2")
			label
				b Описание
				textarea(v-model="desc")
			label
				b Метро
				select(v-model="metro")
					option(value="no") Метро нет
					option(v-for="item in metroList" :value="item.name") {{item.name}}
			button(v-if="id==undefined" v-on:click="baseCreate") Создать
			button(v-else v-on:click="baseEdit") Редактировать
		fieldset(v-if="id!==undefined")
			legend Изображения
			template(v-for="item in photo")
				img(:src="item.url", width="100px")
			input(type="file",v-on:change="fileChange")
			button(v-on:click="addImage") Загрузить
</template>
<script>
import axios from 'axios';
export default {
	props:['id'],
	data(){
		return {
			metroList:[
				{	
					id:1,
					name:"Уруручье",
					val:false,
				},
				{
					id:2,
					name:'Московкая',
					val:false,
				}
			],

			created:false,
			title:'',
			address:'',
			cord1:0,
			cord2:0,
			price:0,
			desc:'',
			photo:[],
			sale:"sale",
			countroom:0,
			metro:'no',
			file:undefined,
		}
	},
	created(){
		var self=this;
		if(this.id!=undefined){
			axios({
				url:self.$store.state.server + "/api/building/"+this.id,
				method:'get',
			
			}).then(function({data}){
				var {address,chords,desc,photo} = data;
				self.address=address;
				self.desc=desc;
				self.price=price;
				if(chords!=undefined){
					self.cord1=chords[0];
					self.cord2=chords[1];
				}
				self.photo=photo;
			})
		}
	},

	methods:{
		fileChange(e){
			this.file=e.target.files || e.dataTransfer.files;
		},
		baseCreate(){
			let self=this;
			let data={
					title:this.title,
					address:this.address,
					desc:this.desc,
					cord1:this.cord1,
					cord2:this.cord2,
					price:this.price,
					countroom:this.countroom,
					type:this.sale,
					metro:this.metro
				}
				console.log(data)
		/*	axios({
				url: this.$store.state.server + "/api/building/create",
				method:'post',
				data:data
			})
			.then(({data})=>{
				if(data.id!==undefined){
					this.id=data._id;
				}
			})*/
		},
		baseEdit(){

		},
		addImage(){
			let self=this;
			let formData =new FormData();
			formData.append('image', this.file[0]);
			formData.append('id', this.id);

			axios.post(self.$store.state.server + "/api/building/upload-image",
			formData,
			{
				headers:{
					'Content-Type': 'multipart/form-data'
				},
				
			}).then(function({data}){
				self.photo.push(data);
			})
		}
	}
}
</script>
<style lang="scss" >
	label{
		display: flex;
		margin-bottom: 10px;
		b{
			flex:0 0 250px;
			font-size:14px;
			margin-right: 20px;
		}
	}
	input,textarea{
		background: white;;
		color:black;
		width: 100%;
		min-height: 40px;
		padding: 10px ;
	}
</style>
