<template>
	<div class="date-input">
		<input
			:id="id"
			:value="displayValue"
			class="page-interview__input"
			type="text"
			readonly
			@click="toggleCalendar"
		>
		<div v-show="isOpen" class="calendar-wrapper">
			<VDatePicker
				v-model="internalDate"
				mode="date"
				@update:model-value="handleDateSelect"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'

	const props = defineProps({
		id: {
			type: String,
			required: true
		},
		modelValue: {
			type: [Date, null],
			default: null
		}
	})

	const emit = defineEmits(['update:modelValue'])

	const internalDate = ref<Date | null >(props.modelValue)
	const isOpen = ref(false)

	const displayValue = computed(() => {
		if (!internalDate.value) return ''
		if (!(internalDate.value instanceof Date)) {
			return ''
		}
		return internalDate.value.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).replace(/\//g, '.')
	})

	const toggleCalendar = () => {
		isOpen.value = !isOpen.value
	}

	const handleDateSelect = (date: Date) => {
		internalDate.value = date
		emit('update:modelValue', date)
		isOpen.value = false
	}
</script>

<style scoped>
.date-input {
	position: relative;
	inline-size: 100%;
}

.calendar-wrapper {
	position: absolute;
	z-index: 1000;
	margin-block-start: 5px;
	background: white;
	border-radius: 10px;
  border: 1px solid #0f6c9d;
}

:deep(.vc-base-icon) {
  stroke: #0f6c9d;
}

:deep(.vc-title-wrapper span){
  color: #2f637f;
  font-weight: 700;
}
:deep(.vc-weekday) {
  color: #9370DB;
  font-weight: 700;
}
:deep(.vc-week) {
  color: #0f6c9d;
}
:deep(.vc-highlight) {
  border: 1px solid #0f6c9d;
  background-color: white;

}
:deep(.vc-highlight-content-solid) {
  color: #0f6c9d;
}

:deep(.vc-day.is-today) {
  background-color: #9370DB;
  border-radius: 50%;
  width: 30px;
  height: 28px;
  color: white;
}

</style>
