<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElButton, ElInput } from 'element-plus'
const username = ref('')
const password = ref('')
function login() {
	axios.post('/login', {
		username: username,
		password: password
	}).then((res) => {
		console.log(res)
	})
}
</script>

<template>
	<el-input v-model="username" placeholder="username" clearable />
	<el-input v-model="password" placeholder="password" type="password" show-password clearable />
	<el-button type="primary" @click="login">Login</el-button>
</template>
