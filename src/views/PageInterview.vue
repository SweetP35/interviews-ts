<template>
	<LoaderOnPage v-if="isLoading"/>
	<div v-else-if="interview?.id && !isLoading" class="container">
		<form class="page-interview">
			<h1 class="page-interview__title">
				Собеседование в компанию {{ interview.company }}
			</h1>
			<div class="page-interview__wrapper">
				<div class="page-interview__form-group">
					<label class="page-interview__label" for="company">Компания</label>
					<input
						id="company"
						v-model="interview.company"
						class="page-interview__input"
						type="text"
					>
				</div>
				<div class="page-interview__form-group">
					<label class="page-interview__label" for="vacancy-description">Описание вакансии (ссылка)</label>
					<input
						id="vacancy-description"
						v-model="interview.vacancyLink"
						class="page-interview__input"
						type="text"
					>
				</div>
				<div class="page-interview__form-group">
					<label class="page-interview__label" for="name-HR">Контакт (имя)</label>
					<input
						id="name-HR"
						v-model="interview.hrName"
						class="page-interview__input"
						type="text"
					>
				</div>
				<div class="page-interview__form-group">
					<label class="page-interview__label" for="telegram">Telegram HR</label>
					<input
						id="telegram"
						v-model="interview.contactTelegram"
						class="page-interview__input"
						type="text"
					>
				</div>
				<div class="page-interview__form-group">
					<label class="page-interview__label" for="whatsApp">WhatsApp HR</label>
					<input
						id="whatsApp"
						v-model="interview.contactWhatsApp"
						class="page-interview__input"
						type="text"
					>
				</div>
				<div class="page-interview__form-group">
					<label class="page-interview__label" for="whatsApp">Телефон HR</label>
					<input
						id="whatsApp"
						v-model="interview.contactPhone"
						class="page-interview__input"
						type="text"
					>
				</div>
				<div class="page-interview__salary-fork">
					<input
						v-model="formattedSalaryFrom"
						placeholder="Зарплатная вилка от"
						type="text"
						@input="formatInput('from', $event)"
					>
					<input
						v-model="formattedSalaryTo"
						placeholder="Зарплатная вилка до"
						type="text"
						@input="formatInput('to', $event)"
					>
				</div>
				<div class="page-interview__btn add" @click="addStage">
					<img src="../assets/styles/icons/plus.svg" alt="" style="filter: brightness(0) invert(1);">
					<p>Добавить этап</p>
				</div>
			</div>
			<template v-if="interview.stages">
				<div v-for="(stage,index) in interview.stages" :key="index" class="page-interview__stage-wrapper">
					<div class="page-interview__form-group">
						<label class="page-interview__label" :for="`name-stage-${index}`">Название этапа</label>
						<input
							:id="`name-stage-${index}`"
							v-model="stage.name"
							class="page-interview__input"
							type="text"
						>
					</div>
					<div class="page-interview__form-group">
						<label class="page-interview__label" :for="`data-stage-${index}`">Дата прохождения этапа</label>
						<DateInput
							:id="`data-stage-${index}`"
							v-model="stage.date"
						/>
					</div>
					<div class="page-interview__form-group">
						<label class="page-interview__label" :for="`data-description-${index}`">Комментарий</label>
						<textarea
							:id="`data-description-${index}`"
							v-model="stage.description"
							class="page-interview__textarea"
							rows="5"
							:maxlength="250"
						/>
						<div class="page-interview__btn delete" @click="removeStage(index)">
							Удалить этап
						</div>
					</div>
				</div>
			</template>
			<div class="radio-group">
				<label class="radio-option">
					<input
						v-model="interview.result"
						type="radio"
						value="reject"
						class="radio-option__input"
						@click="toggleResult('reject')"
					>
					<span class="radio-option__custom" :class="{'__active': interview.result === 'reject'}"/>
					<span class="radio-option__label">Отказ</span>
				</label>
				<label class="radio-option">
					<input
						v-model="interview.result"
						type="radio"
						value="offer"
						class="radio-option__input"
						@click="toggleResult('offer')"
					>
					<span class="radio-option__custom" :class="{'__active': interview.result === 'offer'}"/>
					<span class="radio-option__label">Оффер</span>
				</label>
			</div>
			<div class="page-interview__btn save" @click="saveInterview">
				<img src="../assets/styles/icons/save.svg" alt="">
				<p>Сохранить</p>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { getFirestore, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'
	import { useUserStore } from '@/stores/user'
	import type { IInterview, IStage } from '@/interfaces'
	import LoaderOnPage from '@/components/LoaderOnPage.vue'
	import DateInput from '@/components/DateInput.vue'

	const db = getFirestore()
	const userStore = useUserStore()
	const route = useRoute()
	const isLoading = ref<boolean>(true)
	const interview = ref<IInterview>()
	const docref = doc(db, `users/${userStore.userId}/interviews`, route.params.id as string)

	const formatNumber = (value: string | number): string => {
		const str = value.toString().replace(/\s+/g, '')
		return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	const formattedSalaryFrom = computed({
		get: () => interview.value?.salaryFrom ? formatNumber(interview.value.salaryFrom) : '',
		set: (val) => {
			if (interview.value) {
				interview.value.salaryFrom = val ? parseInt(val.replace(/\s+/g, ''), 10) : null
			}
		}
	})

	const formattedSalaryTo = computed({
		get: () => interview.value?.salaryTo ? formatNumber(interview.value.salaryTo) : '',
		set: (val) => {
			if (interview.value) {
				interview.value.salaryTo = val ? parseInt(val.replace(/\s+/g, ''), 10) : null
			}
		}
	})

	const formatInput = (type: 'from' | 'to', event: Event): void => {
		const target = event.target as HTMLInputElement
		const value = target.value.replace(/\D/g, '')
		const formatted = formatNumber(value)
		if (type === 'from') {
			formattedSalaryFrom.value = formatted
		} else {
			formattedSalaryTo.value = formatted
		}
	}

	const toggleResult = (value:  'reject' | 'offer') => {
		if (interview.value) {
			interview.value.result = interview.value.result === value ? '' : value
		}
	}

	const addStage = () => {
		if (!interview.value) return
		const newStage: IStage = {
			name: '',
			date: null,
			description: ''
		}
		if (!interview.value.stages){
			interview.value.stages = []
		}
		interview.value.stages.push(newStage)
	}

	const removeStage = (index:number):void => {
		if (interview.value){
			if (interview.value.stages){
				interview.value.stages.splice(index, 1)
			}
		}
	}

	const saveInterview = async () : Promise<void> => {
		isLoading.value = true
		await updateDoc(docref, { ...interview.value })
		await getData()
		isLoading.value = false
	}

	const getData = async (): Promise<void> => {
		isLoading.value = true
		const docSnap = await getDoc(docref)
		if (docSnap.exists()){
			const data = docSnap.data() as IInterview
			if (data.stages && data.stages.length){
				data.stages = data.stages.map((stage: IStage) => {
					if (stage.date && stage.date instanceof Timestamp) {
						return {
							...stage,
							date: stage.date.toDate()
						}
					}
					return stage
				})
			}
			interview.value = data
		}
		isLoading.value = false
	}

	onMounted(async () => {
		await getData()
		console.log(interview.value)
	})
</script>
