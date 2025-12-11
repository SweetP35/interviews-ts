<template>
	<ErrorAlert :message="errorMessage" @clear="errorMessage=''"/>
	<div class="container">
		<form class="auth" @submit.prevent="submitForm">
			<div class="auth__content">
				<h1 class="auth__title">
					Приветствую!
				</h1>
				<p class="auth_subtitle">
					{{ subtitle }}
					<a @click="toggleAuth">{{ linkAccountText }}</a>
				</p>
			</div>
			<div class="auth__fields">
				<div class="auth__field">
					<p>Email</p>
					<input v-model="email" type="email" class="auth__input">
				</div>
				<div class="auth__field">
					<p>Пароль</p>
					<input v-model="password" type="password" class="auth__input">
				</div>
			</div>
			<button type="submit" class="auth__btn">
				<svg
					v-if="!isLoading"
					fill="#cdb4db"
					width="800px"
					height="800px"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"/>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
					<g id="SVGRepo_iconCarrier">
						<path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/>
					</g>
				</svg>
				<LouderBtn v-if="isLoading"/>
				<p>{{ submitButtonText }}</p>
			</button>
		</form>
	</div>
</template>



<script lang="ts" setup>
	import { computed, ref } from 'vue'
	import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
	import { useRouter } from 'vue-router'
	import LouderBtn from '@/components/LouderBtn.vue'
	import ErrorAlert from '@/components/ErrorAlert.vue'
	const router = useRouter()
	const isLogin = ref<boolean>(true)
	const email = ref<string>('')
	const password = ref<string>('')
	const isLoading = ref<boolean>(false)
	const errorMessage = ref<string>('')
	const toggleAuth = () => {
		isLogin.value = !isLogin.value
	}
	const subtitle = computed<string>(() => {
		return isLogin.value ? 'Аккаунта еще нет?' : 'Уже есть аккаунт?'
	})
	const linkAccountText = computed<string>(() => {
		return isLogin.value ? 'Создайте прямо сейчас' : 'Войдите в него'
	})

	const submitButtonText = computed<string>(() => {
		return isLogin.value ? 'Войти' : 'Регистрация'
	})

	const signUp = async ():Promise<void> => {
		isLoading.value = true
		try {
			await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
			router.push('/')
		} catch (error:unknown){
			if (error instanceof Error){
				console.log(error.message)
				errorMessage.value = error.message
			}
		} finally {
			isLoading.value = false
			email.value = ''
			password.value = ''
		}
	}

	const signIn = async ():Promise<void> => {
		isLoading.value = true
		try {
			await signInWithEmailAndPassword(getAuth(), email.value, password.value)
			router.push('/')
		} catch (error:unknown){
			if (error instanceof Error){
				console.log(error.message)
				errorMessage.value = error.message
			}
		} finally {
			isLoading.value = false
			email.value = ''
			password.value = ''
		}
	}

	const submitForm = (): void => {
		if (isLogin.value){
			signIn()
		} else {
			signUp()
		}
	}
</script>
