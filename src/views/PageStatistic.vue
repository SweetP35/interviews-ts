<template>
	<div class="container">
		<div class="page-statistic">
			<h1 class="page-statistic__title">
				Статистика
			</h1>
			<PieChart :chart-data="chartData"/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue'
	import { onMounted, ref } from 'vue'
	import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore'
	import { useUserStore } from '@/stores/user'
	import type { IInterview, IPieChartData } from '@/interfaces'
	import PieChart from '@/components/PieChart.vue'
	const userStore = useUserStore()
	const db = getFirestore()
	const interviews = ref<IInterview[]>([])
	const chartData: Ref<IPieChartData> = ref({
		labels: ['Оффер', 'Отказ', 'В процессе'],
		data: [0, 0, 0],
		colors: ['#0f6c9d', '#df5656', '#9370DB']
	})

	const getAllInterviews = async<T extends IInterview>(): Promise<T[]> => {
		let getData = query(
			collection(db, `users/${userStore.userId}/interviews`),
			orderBy('createdAt', 'desc')
		)
		const listDocs = await getDocs(getData)
		return listDocs.docs.map((doc) => doc.data() as T)
	}

	const setChartData = (): void => {
		if (!interviews.value?.length) return
		chartData.value.data = [0, 0, 0]
		interviews.value.forEach((interview:IInterview) => {
			if (interview.result === 'offer') {
				chartData.value.data[0] += 1
			} else if (interview.result === 'reject'){
				chartData.value.data[1] += 1
			} else {
				chartData.value.data[2] += 1
			}
		})
	}

	onMounted(async () => {
		interviews.value = await getAllInterviews()
		setChartData()
	})
</script>
