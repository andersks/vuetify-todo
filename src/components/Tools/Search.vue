<template>
	<v-text-field
		:value="$store.state.search"
		@input="$store.commit('setSearch', $event)"
		class="expanding-search mt-1"
		:class="{'closed': searchClosed && !$store.state.search}"
		:disabled="$store.state.sorting"
		@focus="searchClosed = false"
		@blur="searchClosed = true"
		clearable
		dense
		filled
		placeholder="Search"
		prepend-inner-icon="mdi-magnify"
	></v-text-field>
</template>

<script>
export default {
	data() {
		return {
			searchClosed: true,
			search: ''
		}
	}
};
</script>

<style lang="sass">
.expanding-search
	transition: max-width 0.3s
	.v-input__slot
		cursor: pointer !important
		&:before, &:after
			border-color: transparent !important
	&.closed
		max-width: 45px
		.v-input__slot
			background: transparent !important
</style>
