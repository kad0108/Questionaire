<template>
	<div class="modal" v-if="ifShowModal">
		<div class="mask" @click="hide"></div>
		<div class="dialog">
			<div class="headline">提示</div>
			<div class="body">{{hint | hintContent}}</div>
			<div class="footline">
				<button @click="confirm" class="btn">确定</button>
				<button v-if="hint === 'publish' || hint === 'delete' || hint === 'fill'" @click="cancel" class="btn">取消</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		hint: String,
		ifShowModal: Boolean
	},
	data () {
		return {
		}
	},
	methods: {
		hide () {
			this.$emit('hideModal', this.hint);
		},
		confirm () {
			this.hide();
		},
		cancel () {
			this.$emit('hideModal', 'cancel');
			return 'cancel';
		}
	},
	filters: {
		hintContent (hint) {
			switch(hint) {
				case 'success': 
					return '问卷已保存';
					break;
				case 'error':
					return '请合理填写问卷';
					break;
				case 'publish':
					return '是否发布问卷？发布后不可修改';
					break;
				case 'delete':
					return '确认删除问卷？';
					break;
				case 'fill':
					return '确认提交问卷？';
					break;
			}
		},
	},
}
</script>
<style>
.modal {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	right: 0;
	left: 0;
	right: 0;
}
.modal .mask{
	z-index: 1;
	background: rgba(0, 0, 0, .4);
	width: 100%;
	height: 100%;
}
.modal .dialog{
	width: 23rem;
	height: 16rem;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	overflow: hidden;
	border: 1px solid #888;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
	background-color: #fff;
	border-radius: 4px;
}
.modal .headline{
	position: relative;
	width: 100%;
	height: 3.5rem;
	line-height: 3.5rem;
	background-color: #ee7419;
	color: #fff;
	text-align: left;
	padding-left: 2rem;
	cursor: default;
	font-size: 1.1rem;
}
.modal .body{
	position: relative;
	padding: 2rem 2rem;
	font-size: 1.2rem;
}
.modal .footline{
	position: absolute;
	bottom: 8%;
	right: 5%;
}
</style>