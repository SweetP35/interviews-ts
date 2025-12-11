<template>
	<LoaderOnPage v-if="isloading"/>
	<AppHeader/>
	<router-view/>
</template>

<script setup lang="ts">
	import AppHeader from './components/AppHeader.vue'
	import { onMounted, ref  } from 'vue'
	import { getAuth, onAuthStateChanged } from 'firebase/auth'
	import { useUserStore } from './stores/user'
	import LoaderOnPage from './components/LoaderOnPage.vue'
	const userStore = useUserStore()
	const isloading = ref<boolean>(true)

	onMounted(() => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				console.log(user)
				userStore.userId = user.uid
			} else {
				userStore.userId = ''
			}
			isloading.value = false
		})
	})
</script>
