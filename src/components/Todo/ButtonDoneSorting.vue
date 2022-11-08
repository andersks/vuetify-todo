<template>
	<v-btn
		class="btn-done-sorting mr-2"
		color="primary"
		@click="$store.commit('toggleSorting')"

	>
		Done Sorting
	</v-btn>
</template>

<script>
export default {
	name: 'ButtonDoneSorting'
};
</script>

<style lang="sass">
.btn-done-sorting
	position: fixed
	bottom: 20px
	left: 50%
	transform: translateX(-50%)
</style>
