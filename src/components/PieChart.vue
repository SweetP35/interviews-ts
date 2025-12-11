<template>
	<div class="chart-container">
		<canvas ref="chart"/>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, watch } from 'vue'
	import Chart, { type ChartData } from 'chart.js/auto'
	import type { IPieChartData } from '@/interfaces'
	import type { ChartOptions } from 'chart.js'

	const props = defineProps<{
		chartData: IPieChartData
	}>()
	const chart = ref<HTMLCanvasElement | null>(null)
	let chartInstance: Chart | null = null

	const initChart = () => {
		if (!chart.value) return

		if (chartInstance) {
			chartInstance.destroy()
		}

		const chartData: ChartData = {
			labels: props.chartData.labels,
			datasets: [{
				data: props.chartData.data,
				backgroundColor: props.chartData.colors || [
					'#FF6384', '#36A2EB', '#FFCE56',
					'#4BC0C0', '#9966FF', '#FF9F40'
				]
			}]
		}
		const options: ChartOptions = {
			plugins: {
				legend: {
					position: 'bottom',
					labels: {
						color: '#0f6c9d',
						font: {
							family: 'Arial',
							size: 19,
							weight: 600
						},
						padding: 30,
						boxWidth: 20,
						usePointStyle: true
					}
				}
			}
		}

		chartInstance = new Chart(chart.value, {
			type: 'pie',
			data: chartData,
			options: options
		})
	}
	onMounted(initChart)
	watch(() => props.chartData, () => {
		initChart()
	}, { deep: true })
</script>

<style scoped>
.chart-container {
  width: 450px;
  height: 450px;
  margin: 0 auto;
  position: relative;
}
</style>
