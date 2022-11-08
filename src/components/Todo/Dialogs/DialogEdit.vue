<template>
	<v-dialog
		:value="true"
		persistent
		max-width="290"
	>
		<v-card>
			<v-card-title class="text-h5">
				Edit task
			</v-card-title>
			<v-card-text>
				Edit the title of this task:
				<v-text-field v-model="taskTitle" autofocus @keyup.enter="saveTask" />
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					@click="$emit('close')"
					color="secondary"
				>
					Cancel
				</v-btn>
				<v-btn
					@click="saveTask"
					:disabled="taskTitleInvalid"
					color="primary"
				>
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'DialogEdit',
	props: ['task'],
	data() {
		return {
			taskTitle: null
		}
	},
	computed: {
		taskTitleInvalid() {
			return !this.taskTitle || this.taskTitle === this.task.title
		}
	},
	methods: {
		saveTask() {
			if (!this.taskTitleInvalid) {
				const payload = {
					id: this.task.id,
					title: this.taskTitle
				}
				this.$store.dispatch('updateTaskTitle', payload)
				this.$emit('close')
				this.$vuetify.goTo(0, {duration: 0})
			}
		}
	},
	mounted() {
		this.taskTitle = this.task.title
	}
};
</script>

<style scoped>

</style>
