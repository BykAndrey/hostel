<template lang="pug">
	.create-build
		fieldset
			legend Базавые данные {{id}}
			label
				b Улица
				input(type="text",v-model="address")
			label
				b Кордината 1
				input(type="text",v-model="cord1")
			label
				b Кордината 2
				input(type="text",v-model="cord2")
			label
				b Описание
				textarea(v-model="desc")
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
		
			created:false,
			address:'',
			cord1:0,
			cord2:0,
			desc:'',
			photo:[],
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
				console.log(address)
				self.address=address;
				self.desc=desc;
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
			console.log(this.file)
		},
		baseCreate(){
			let self=this;
			axios({
				url: self.$store.state.server + "/api/building/create",
				method:'post',
				data:{
					address:self.address,
					desc:self.desc,
					cord1:self.cord1,
					cord2:self.cord2,
				}
			})
			.then(function({data}){
				console.log(data);
				if(data.id!==undefined){
					self.id=data._id;
				}
			})
		},
		baseEdit(){

		},
		addImage(){
			let self=this;
			console.log(self.file);
			let formData =new FormData();
			formData.append('image', this.file[0]);
			formData.append('id', this.id);
			console.log(formData)
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
