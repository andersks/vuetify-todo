<template>
	<v-app id="inspire">
		<v-navigation-drawer
			v-model="drawer"
			app
			:mobile-breakpoint="768"
		>
			<v-img
				class="pa-4 pt-7"
				src="mountains.jpg"
				height="170"
				gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
			>
				<v-avatar size="70" class="mb-2">
					<img
						src="https://cdn.vuetifyjs.com/images/john.jpg"
						alt="Kevin Anderson"
					>
				</v-avatar>
				<div class="white--text text-subtitle-1 font-weight-bold">Kevin Anderson</div>
				<div class="white--text text-subtitle-2">kevin.anderson</div>
			</v-img>

			<v-list
				dense
				nav
			>
				<v-list-item
					v-for="item in items"
					:key="item.title"
					:to="item.to"
					link
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			app
			color="primary"
			dark
			src="mountains.jpg"
			prominent
			:height="$route.path === '/' ? 230 : 170"
		>
			<template v-slot:img="{ props }">
				<v-img
					v-bind="props"
					gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
				></v-img>
			</template>

			<v-container class="header-container pa-0">
				<v-row>
					<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
					<v-spacer></v-spacer>
					<search />
				</v-row>
				<v-row>
					<v-toolbar-title class="ml-4 text-h4">
						{{ $store.state.appTitle }}
					</v-toolbar-title>
				</v-row>
				<v-row>
					<live-date-time />
				</v-row>
				<v-row v-if="$route.path === '/'">
					<field-add-task />
				</v-row>
			</v-container>

		</v-app-bar>

		<v-main>
			<router-view></router-view>
			<snackbar />
		</v-main>
	</v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: null,
		items: [
			{ title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
			{ title: 'About', icon: 'mdi-help-box', to: '/about' },
		],
	}),
	components: {
		'field-add-task': require('@/components/Todo/FieldAddTask').default,
		'search': require('@/components/Tools/Search').default,
		'live-date-time': require('@/components/Tools/LiveDateTime').default,
		'snackbar': require('@/components/Shared/Snackbar').default
	},
	mounted() {
		console.log(this.$route)
		this.$store.dispatch('getTasks')
	}
};
</script>

<style lang="sass">
.header-container
	max-width: none !important
</style>
