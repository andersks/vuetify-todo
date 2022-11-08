<template>
	<v-dialog
		ref="dialog"
		:value="true"
		:return-value.sync="date"
		persistent
		width="290px"
	>
		<v-date-picker
			v-model="date"
			scrollable
			elevation="15"
		>
			<v-spacer></v-spacer>
			<v-btn
				text
				color="primary"
				@click="$emit('close')"
			>
				Cancel
			</v-btn>
			<v-btn
				@click="saveTask"
				text
				color="primary"
			>
				OK
			</v-btn>
		</v-date-picker>
	</v-dialog>
</template>

<script>
export default {
	name: 'DialogDueDate',
	data() {
		return {
			date: null
		}
	},
	props: ['task'],
	methods: {
		saveTask() {
			const payload = {
				id: this.task.id,
				dueDate: this.date
			}
			this.$store.dispatch('updateTaskDueDate', payload)
			this.$emit('close')
		}
	},
	mounted() {
		if (this.task.dueDate) {
			this.date = this.task.dueDate
		}
	}
};
</script>
