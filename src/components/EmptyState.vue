<template>
	<div class="container">
		<div class="emptyState">
			<h1>{{ title }}</h1>
			<img src="../assets/styles/icons/cat.svg" alt="">
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{ title: string }>()
</script>
