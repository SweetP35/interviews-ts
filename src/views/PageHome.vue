<template>
	<div class="container">
		<div class="interview">
			<h1 class="interview__title">
				Новое собеседование
			</h1>
			<div class="interview__wrapper">
				<div class="interview__item">
					<input
						v-model="fields.company.value"
						type="text"
						placeholder="Компания"
						class="interview__title-input"
					>
					<span v-if="fields.company.error" class="interview__error">{{ fields.company.error }}</span>
				</div>
				<div class="interview__item">
					<input
						v-model="fields.vacancyLink.value"
						type="text"
						placeholder="Описание вакансии (ссылка)"
						class="interview__title-input"
					>
					<span v-if="fields.vacancyLink.error" class="interview__error">{{ fields.vacancyLink.error }}</span>
				</div>
				<div class="interview__item">
					<input
						v-model="fields.hrName.value"
						type="text"
						placeholder="Контант (имя)"
						class="interview__title-input"
					>
					<span v-if="fields.hrName.error" class="interview__error">{{ fields.hrName.error }}</span>
				</div>
				<div class="interview__item">
					<input
						v-model="fields.contactTelegram.value"
						type="text"
						placeholder="Telegram HR"
						class="interview__title-input"
					>
					<span v-if="fields.contactTelegram?.error" class="interview__error">{{ fields.contactTelegram.error }}</span>
				</div>
				<div class="interview__item">
					<input
						v-model="fields.contactWhatsApp.value"
						v-phone
						type="text"
						placeholder="WhatsApp HR"
						class="interview__title-input"
					>
					<span v-if="fields.contactWhatsApp?.error" class="interview__error">{{ fields.contactWhatsApp.error }}</span>
				</div>
				<div class="interview__item">
					<input
						v-model="fields.contactPhone.value"
						v-phone
						type="text"
						placeholder="Телефон HR"
						class="interview__title-input"
					>
					<span v-if="fields.contactPhone?.error" class="interview__error">{{ fields.contactPhone.error }}</span>
				</div>
			</div>
			<button
				class="interview__btn"
				:class="{ '__active': isFormComplete }"
				type="submit"
				@click="addNewInterview"
			>
				<LouderBtn v-if="loading"/>
				<p>Создать собеседование</p>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, reactive, ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { v4 as uuidv4 } from 'uuid'
	import { getFirestore, setDoc, doc } from 'firebase/firestore'
	import type { IInterview, IInterviewForm } from '@/interfaces'
	import LouderBtn from '@/components/LouderBtn.vue'
	import { useUserStore } from '@/stores/user'
	import { formatPhone } from '../directives/phone'
	const userStore = useUserStore()
	const router = useRouter()
	const db = getFirestore()
	const loading = ref<boolean>(false)
	const fields = reactive<IInterviewForm>({
		company: { error: '', value: '' },
		vacancyLink: { error: '', value: '' },
		hrName: { error: '', value: '' },
		contactTelegram: { error: '', value: '' },
		contactWhatsApp: { error: '', value: '' },
		contactPhone: { error: '', value: '' }
	})


	const validationRules = {
		company: (value: string) => {
			if (!value) return 'Укажите название компании'
			if (value.length < 2) return 'Название компании должно быть не менее 2 символов'
			return ''
		},
		vacancyLink: (value: string) => {
			if (!value) return 'Укажите ссылку на вакансию'
			try {
				new URL(value)
				return ''
			} catch {
				return 'Укажите корректную ссылку(начинается с http:// или https://)'
			}
		},
		hrName: (value: string) => {
			if (!value) return 'Укажите имя HR'
			return ''
		},
		contactTelegram: (value: string) => {
			if (value && !/^@?[a-zA-Z0-9_]{5,32}$/.test(value)) {
				return 'Некорректный Telegram (5-32 символа, можно с @)'
			}
			return ''
		},
		contactWhatsApp: (value: string) => {
			if (value && !/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/.test(value)) {
				return 'Введите номер в формате: +7 (XXX) XXX-XX-XX'
			}
			return ''
		},
		contactPhone: (value: string) => {
			if (value && !/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/.test(value)) {
				return 'Введите номер в формате: +7 (XXX) XXX-XX-XX'
			}
			return ''
		}
	}

	const validationForm = (fields:IInterviewForm):boolean => {
		let isValid = true
		for (const field in fields){
			const fieldName = field as keyof IInterviewForm
			const fieldData = fields[fieldName]
			if (!fieldData) continue
			const fieldValue = fields[fieldName]?.value || ''
			const error = validationRules[fieldName as keyof typeof validationRules](fieldValue)
			if (error) isValid = false
			if (fields[fieldName]) {
				fields[fieldName].error = error
			}
		}
		return isValid
	}

	const isFormComplete = computed<boolean>(() => {
		return !!(fields.company.value && fields.vacancyLink.value && fields.hrName.value)
	})

	const addNewInterview = async (): Promise<void> => {
		if (!validationForm(fields)) return
		loading.value = true
		const payload: IInterview = {
			id: uuidv4(),
			company: fields.company.value.trim(),
			vacancyLink: fields.vacancyLink.value.trim(),
			hrName: fields.hrName.value.trim(),
			contactTelegram: fields.contactTelegram?.value.trim(),
			contactWhatsApp: formatPhone(fields.contactWhatsApp?.value),
			contactPhone: formatPhone(fields.contactPhone?.value),
			createdAt: new Date()
		}
		try {
			if (userStore.userId) {
				await setDoc(doc(db, `users/${userStore.userId}/interviews`, payload.id), payload)
				router.push('/list')
			}
		} catch (error) {
			console.error('Ошибка при сохранении:', error)
		} finally {
			loading.value = false
		}
	}
</script>

