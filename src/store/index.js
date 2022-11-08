import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

const db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: null,
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [
      // {
      //   id: 1,
      //   title: 'Wake up',
      //   done: false,
      //   dueDate: '2020-10-16'
      // },
      // {
      //   id: 2,
      //   title: 'Get bananas',
      //   done: false,
      //   dueDate: '2020-10-17'
      // },
      // {
      //   id: 3,
      //   title: 'Eat bananas',
      //   done: false,
      //   dueDate: null
      // }
    ],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTask) {
      state.tasks.push(newTask)
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    updateTask(state, newTask) {
      let task = state.tasks.filter(task => task.id === newTask.id)[0]
      task = { ...newTask }
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    updateTaskTitle(state, payload) {
      const task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      const task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },

    /**
     * Updates the task list with reordered task list
     * @param state
     * @param tasks
     */
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout)
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    }
  },
  actions: {
    /**
     * Retrieve all tasks from DB and load into state
     * @param commit
     */
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    },

    /**
     * Add new task to the DB setting the title
     * @param commit
     * @param newTaskTitle
     */
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'New task added!')
      })
    },

    /**
     * Toggle the task done property
     * @param state
     * @param commit
     * @param id
     */
    doneTask({ state, commit }, id) {
      const task = state.tasks.filter(task => task.id === id)[0]
      if (task) {
        db.collection('tasks').doc({ id: id }).update({
          done: !task.done
        }).then(() => {
          commit('doneTask', id)
        })
      }
    },

    /**
     * Update the task title
     * @param commit
     * @param payload
     */
    updateTaskTitle({ commit }, payload) {
      const task = db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Task title updated')
      })
    },

    /**
     * Update a tasks due date
     * @param commit
     * @param payload
     */
    updateTaskDueDate({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Task due date updated')
      })
    },

    /**
     * Sets order of task
     * @param commit
     * @param tasks
     */
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    },

    /**
     * Delete a task
     * @param commit
     * @param id
     */
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar','Task deleted!')
      })
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  }
})
