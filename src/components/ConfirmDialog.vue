<template>
	<div class="confirm-dialog">
		<div class="confirm-dialog__wrapper">
			<div class="confirm-dialog__info">
				<img src="../assets/styles/icons/warning.svg" alt="">
				<p>Вы хотите удалить собеседование?</p>
			</div>
			<div class="confirm-dialog__buttons">
				<div class="confirm-dialog__button cancel" @click="$emit('cancel')">
					Отмена
				</div>
				<div class="confirm-dialog__button delete" @click="$emit('delete')">
					Удалить
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineEmits<{
		cancel: () => void
		delete: () => void
	}>()
</script>
