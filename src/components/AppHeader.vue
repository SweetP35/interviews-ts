<template>
	<div class="header">
		<div class="container">
			<ul class="header__list">
				<router-link v-if="!authUser" to="/auth">
					<li class="header__item">
						<svg
							fill="#FFF"
							width="800px"
							height="800px"
							viewBox="0 0 32 32"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"/>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
							<g id="SVGRepo_iconCarrier">
								<path
									d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"
								/>
							</g>
						</svg>
						<span>Авторизация</span>
					</li>
				</router-link>
				<template v-else>
					<router-link to="/">
						<li class="header__item">
							<svg
								width="800px"
								height="800px"
								viewBox="0 0 24 24"
								fill="#FFF"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"/>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M4 12H20M12 4V20"
										stroke="#FFF"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</g>
							</svg>
							<span>Добавить</span>
						</li>
					</router-link>
					<router-link to="/list">
						<li class="header__item">
							<svg
								width="800px"
								height="800px"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"/>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M10 16H3"
										stroke="#FFF"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
									<path
										d="M9 11H3"
										stroke="#FFF"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
									<path
										d="M16.4901 16.3082L16.935 15.7045L16.935 15.7045L16.4901 16.3082ZM17.5 10.1062L16.9641 10.6309C17.1052 10.775 17.2983 10.8562 17.5 10.8562C17.7017 10.8562 17.8948 10.775 18.0359 10.6309L17.5 10.1062ZM18.5099 16.3083L18.9549 16.912L18.9549 16.912L18.5099 16.3083ZM17.5 16.8103L17.5 16.0603H17.5L17.5 16.8103ZM16.935 15.7045C16.2914 15.2302 15.4675 14.5568 14.8118 13.808C14.1328 13.0325 13.75 12.3064 13.75 11.7148H12.25C12.25 12.8758 12.9489 13.9574 13.6832 14.7961C14.4409 15.6614 15.3619 16.4085 16.0451 16.912L16.935 15.7045ZM13.75 11.7148C13.75 10.607 14.2445 10.0237 14.7533 9.83348C15.2705 9.6401 16.0951 9.74331 16.9641 10.6309L18.0359 9.58145C16.88 8.40091 15.4546 7.96984 14.228 8.42849C12.993 8.89028 12.25 10.1453 12.25 11.7148H13.75ZM18.9549 16.912C19.6381 16.4085 20.5591 15.6614 21.3168 14.7961C22.0511 13.9574 22.75 12.8758 22.75 11.7148H21.25C21.25 12.3064 20.8672 13.0326 20.1882 13.808C19.5325 14.5568 18.7086 15.2302 18.065 15.7045L18.9549 16.912ZM22.75 11.7148C22.75 10.1453 22.007 8.89027 20.772 8.42849C19.5454 7.96985 18.12 8.40091 16.9641 9.58145L18.0359 10.6309C18.9049 9.74331 19.7295 9.6401 20.2467 9.83348C20.7555 10.0237 21.25 10.607 21.25 11.7148H22.75ZM16.0451 16.912C16.4368 17.2007 16.8752 17.5603 17.5 17.5603L17.5 16.0603C17.4852 16.0603 17.4682 16.0626 17.399 16.0252C17.3008 15.972 17.178 15.8836 16.935 15.7045L16.0451 16.912ZM18.065 15.7045C17.822 15.8836 17.6992 15.972 17.601 16.0252C17.5318 16.0626 17.5148 16.0603 17.5 16.0603L17.5 17.5603C18.1248 17.5603 18.5632 17.2007 18.9549 16.912L18.065 15.7045Z"
										fill="#FFF"
									/>
									<path
										d="M20 6L9.5 6M3 6L5.25 6"
										stroke="#FFF"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
								</g>
							</svg>
							<span>Список собеседований</span>
						</li>
					</router-link>
					<router-link to="/statistic">
						<li class="header__item">
							<svg
								width="800px"
								height="800px"
								viewBox="0 0 1024 1024"
								fill="#FFF"
								class="icon"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"/>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
								<g id="SVGRepo_iconCarrier">
									<path
										d="M521.58 516.763v-472.816c250.725 22.642 450.175 222.092 472.817 472.817h-472.816zM918.229 593.091h-435.436c-21.963 0-39.769-17.805-39.769-39.769 0 0 0 0 0 0v-435.463c-222.914 20.121-397.682 207.273-397.682 435.436 0 241.605 195.898 437.452 437.451 437.451 228.163 0 415.339-174.715 435.436-397.657z"
									/>
								</g>
							</svg>
							<span>Статистика</span>
						</li>
					</router-link>
					<li class="header__item exit">
						<svg
							width="800px"
							height="800px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"/>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
							<g id="SVGRepo_iconCarrier">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M15.9908 7.82251C16.2897 7.5357 16.7644 7.54547 17.0512 7.84433L20.541 11.4807C20.8195 11.7709 20.8195 12.2291 20.541 12.5193L17.0512 16.1557C16.7644 16.4545 16.2897 16.4643 15.9908 16.1775C15.692 15.8907 15.6822 15.4159 15.969 15.1171L18.2404 12.7502L11.2727 12.7502C10.8585 12.7502 10.5227 12.4144 10.5227 12.0002C10.5227 11.586 10.8585 11.2502 11.2727 11.2502L18.2408 11.2502L15.969 8.88295C15.6822 8.58409 15.692 8.10932 15.9908 7.82251Z"
									fill="#FFF"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M3.25 4C3.25 3.58579 3.58579 3.25 4 3.25H13.4545C13.8688 3.25 14.2045 3.58579 14.2045 4V7C14.2045 7.41421 13.8688 7.75 13.4545 7.75C13.0403 7.75 12.7045 7.41421 12.7045 7V4.75H4.75V19.25H12.7045V17C12.7045 16.5858 13.0403 16.25 13.4545 16.25C13.8688 16.25 14.2045 16.5858 14.2045 17V20C14.2045 20.4142 13.8688 20.75 13.4545 20.75H4C3.58579 20.75 3.25 20.4142 3.25 20V4Z"
									fill="#FFF"
								/>
							</g>
						</svg>
						<span @click="signOutMethod">Выход</span>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useUserStore } from '../stores/user'
	import { getAuth, signOut } from 'firebase/auth'
	import { useRouter } from 'vue-router'
	const userStore = useUserStore()
	const authUser = computed(() => userStore.userId)
	const router = useRouter()
	const signOutMethod = async (): Promise<void> => {
		await signOut(getAuth())
		router.push('/auth')
	}
</script>
