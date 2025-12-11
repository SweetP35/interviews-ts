<template>
	<div class="container">
		<LoaderOnPage v-if="isLoading"/>
		<EmptyState v-else-if="!isLoading && !interviews.length" title="Нет добавленных собеседований"/>
		<div v-else class="page-list">
			<ConfirmDialog
				v-if="dialogVisible"
				@cancel="dialogVisible = false"
				@delete="confirmRemoveInterview"
			/>
			<h1 class="page-list__title">
				Список собеседований
			</h1>
			<div class="page-list__filters">
				<div class="radio-group">
					<label class="radio-option">
						<input
							v-model="selectedFilterResult"
							type="radio"
							value="reject"
							class="radio-option__input"
							@click="toggleResult('reject')"
						>
						<span class="radio-option__custom" :class="{'__active': selectedFilterResult === 'reject'}"/>
						<span class="radio-option__label">Отказ</span>
					</label>
					<label class="radio-option">
						<input
							v-model="selectedFilterResult"
							type="radio"
							value="offer"
							class="radio-option__input"
							@click="toggleResult('offer')"
						>
						<span class="radio-option__custom" :class="{'__active': selectedFilterResult === 'offer'}"/>
						<span class="radio-option__label">Оффер</span>
					</label>
				</div>
				<div class="page-list__filters-btns">
					<div
						class="page-list__filters-btn __apply"
						:class="{'__disabled':selectedFilterResult === ''}"
						@click="submitFilter"
					>
						Применить
					</div>
					<div
						class="page-list__filters-btn __reset"
						:class="{'__disabled':selectedFilterResult === ''}"
						@click="clearFilter"
					>
						Сбросить
					</div>
				</div>
			</div>
			<div class="page-list__table">
				<div class="page-list__header page-list__row">
					<div class="page-list__header-title">
						Компания
					</div>
					<div class="page-list__header-title">
						Имя HR
					</div>
					<div class="page-list__header-title">
						Вакансия
					</div>
					<div class="page-list__header-title">
						Контакты
					</div>
					<div class="page-list__header-title">
						Пройденные этапы
					</div>
					<div class="page-list__header-title">
						Заработная вилка
					</div>
					<div class="page-list__header-title">
						Результат
					</div>
				</div>
				<div class="page-list__body">
					<div
						v-for="interview in interviews"
						:key="interview.id"
						class="page-list__row"
					>
						<div class="page-list__cell text-truncate-multiline">
							{{ interview.company }}
						</div>
						<div class="page-list__cell text-truncate-multiline">
							{{ interview.hrName }}
						</div>
						<div class="page-list__cell text-truncate-multiline">
							<a :href="interview.vacancyLink">Ссылка</a>
						</div>
						<div class="page-list__cell">
							<div class="page-list__contacts">
								<a v-if="interview.contactTelegram" :href="`https://t.me/${interview.contactTelegram}`">
									<img src="../assets/styles/icons/telegram.svg" alt="">
								</a>
								<a v-if="interview.contactWhatsApp" :href="`https://wa.me/${interview.contactWhatsApp}`">
									<img src="../assets/styles/icons/whatsapp.svg" alt="">
								</a>
								<a v-if="interview.contactPhone" :href="`tel:${interview.contactPhone}`">
									<img src="../assets/styles/icons/telephone.svg" alt="">
								</a>
							</div>
						</div>
						<div class="page-list__cell">
							<div v-if="interview.stages" class="page-list__stage-wrapper">
								<div
									v-for="(stage, index) in interview.stages"
									:key="index"
									v-tooltip.bottom="stage.name"
									class="page-list__stage-item"
								>
									{{ index + 1 }}
								</div>
							</div>
							<div v-else>
								Не заполнено
							</div>
						</div>
						<div>
							<div v-if=" interview.salaryFrom || interview.salaryTo" class="page-list__cell text-truncate-multiline">
								{{ interview.salaryFrom ? interview.salaryFrom : '?' }} — {{ interview.salaryTo ? interview.salaryTo : '?' }}
							</div>
							<div v-else class="page-list__cell text-truncate-multiline">
								Не заполнено
							</div>
						</div>
						<div
							class="page-list__cell text-truncate-multiline"
							:class="{
								'__result': interview.result === 'offer' || interview.result === 'reject',
								'__offer': interview.result === 'offer',
								'__reject': interview.result === 'reject'
							}"
						>
							{{ interview.result == 'offer' ? 'Оффер' : interview.result == 'reject' ? 'Отказ' : 'Не выбрано' }}
						</div>
						<div>
							<div class="page-list__cell">
								<div class="page-list__actions">
									<router-link :to="`/interview/${interview.id}`">
										<div class="page-list__action-item">
											<img src="../assets/styles/icons/edit.svg" alt="">
										</div>
									</router-link>
									<div class="page-list__action-item" @click="openConfirmDialog(interview.id)">
										<img src="../assets/styles/icons/delete.svg" alt="">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue'
	import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc, where  } from 'firebase/firestore'
	import { useUserStore } from '@/stores/user'
	import type { IInterview } from '@/interfaces'
	import LoaderOnPage from '@/components/LoaderOnPage.vue'
	import ConfirmDialog from '@/components/ConfirmDialog.vue'
	import EmptyState from '@/components/EmptyState.vue'
	const selectedFilterResult = ref<string>('')
	const userStore = useUserStore()
	const db = getFirestore()
	const interviews = ref<IInterview[]>([])
	const isLoading = ref<boolean>(true)
	const dialogVisible = ref<boolean>(false)
	const idInterview = ref<string>('')

	const toggleResult = (value:  'reject' | 'offer') => {
		selectedFilterResult.value = selectedFilterResult.value === value ? '' : value
	}

	const getAllInterviews = async<T extends IInterview>(isFilter?: boolean): Promise<T[]> => {
		let getData
		if (isFilter) {
			getData = query(
				collection(db, `users/${userStore.userId}/interviews`),
				orderBy('createdAt', 'desc'),
				where('result', '==', selectedFilterResult.value)
			)
		} else {
			getData = query(
				collection(db, `users/${userStore.userId}/interviews`),
				orderBy('createdAt', 'desc')
			)
		}
		const listDocs = await getDocs(getData)
		return listDocs.docs.map((doc) => doc.data() as T)
	}

	const submitFilter = async (): Promise<void> => {
		isLoading.value = true
		const listInterviews: IInterview[] = await getAllInterviews(true)
		interviews.value = listInterviews
		isLoading.value = false
	}

	const clearFilter = async (): Promise<void> => {
		isLoading.value = true
		const listInterviews: IInterview[] = await getAllInterviews()
		interviews.value = listInterviews
		selectedFilterResult.value = ''
		isLoading.value = false
	}

	const openConfirmDialog = (id:string): void => {
		idInterview.value = id
		dialogVisible.value = true
	}

	const confirmRemoveInterview = async (): Promise<void> => {
		isLoading.value = true
		await deleteDoc(doc(db, `users/${userStore.userId}/interviews`,idInterview.value))
		const listInterviews: IInterview[] = await getAllInterviews()
		dialogVisible.value = false
		interviews.value = [...listInterviews]
		isLoading.value = false
	}

	onMounted(async () => {
		const listInterviews: IInterview[] = await getAllInterviews()
		interviews.value = listInterviews
		isLoading.value = false
	})
</script>
