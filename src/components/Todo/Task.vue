<template>
	<div>
		<v-list-item
			@click="$store.dispatch('doneTask', task.id)"
			:class="{ 'blue lighten-5' : task.done }"
			class="white"
			:ripple="false"
		>
			<template v-slot:default>
				<v-list-item-action>
					<v-checkbox
						:input-value="task.done"
						color="primary"
					></v-checkbox>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title
						:class="{ 'text-decoration-line-through' : task.done }"
					>
						{{ task.title }}
					</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action v-if="task.dueDate">
					<v-list-item-action-text>
						<v-icon small>mdi-calendar</v-icon>
						{{ task.dueDate | niceDate }}
					</v-list-item-action-text>
				</v-list-item-action>

				<v-list-item-action>
					<task-menu :task="task" />
				</v-list-item-action>

				<v-list-item-action
					v-if="$store.state.sorting"
				>
					<v-btn
						class="handle"
						color="primary"
						icon
					>
						<v-icon>mdi-drag-horizontal-variant</v-icon>
					</v-btn>
				</v-list-item-action>
			</template>

		</v-list-item>
		<v-divider></v-divider>

	</div>
</template>

<script>
import moment from 'moment'

export default {
	name: 'Task',
	props: ['task'],
	data() {
		return {
			dialogs: {
				delete: false
			}
		}
	},
	filters: {
		niceDate(value) {
			return moment(value).format('MMM D')
		}
	},
	components: {
		'task-menu': require('@/components/Todo/TaskMenu').default
	}
};
</script>

<style lang="sass">
.sortable-ghost
	opacity: 0
.sortable-drag
	box-shadow: 0 0 10px rgba(0,0,0,0.3)
</style>
