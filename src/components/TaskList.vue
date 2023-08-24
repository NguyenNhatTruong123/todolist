<script setup>
import TaskItem from './TaskItem.vue'
// import '../assets/main.css'

</script>

<template id="task-list">
    <section class="tasks">
        <h1>
            To-do List
            <transition name="fade">
                <small v-if="incomplete">({{ incomplete }})</small>
            </transition>
        
        </h1>
        <div class="tasks__new input-group" style="margin-bottom: 10px; display: flex">
            <input type="text"
                    class="input-group-field"
                    v-model="newTask"
                    @keyup.enter="addTask"
                    placeholder="New task"
            >
            <span class="input-group-button">
                <button @click="addTask" 
                        class="button-19"
                >
                <i class="fa fa-plus"></i> Add
                </button>
            </span>
        </div>

        <div class="tasks__clear">
        <button class="button-42"
                @click="clearCompleted"
        >
            <i class="fa fa-check"></i> Clear Completed
            </button>
            <button class="button-42"
                    @click="clearAll"
            >
                <i class="fa fa-trash"></i> Clear All
            </button>
        </div>
<br/>
<br/>
        <TaskItem v-for="(task, index) in allTasks"
                        @remove="removeTask(index)"
                        @complete="completeTask(index, task)"
                        :task="task"
                        :key="task"
            ></TaskItem>
            <!-- <div>{{allTasks}}</div> -->

    </section>
</template>

<script>
import {tasksStore} from "../store/taskStore"
import {storeToRefs} from "pinia";
import http from "../helper/http-common";

// var store = createPinia();
// console.log("Store " + store);

export default {
    // props: ['tasks'],
    data() {
        return {
            newTask: '',
            tasks: [],
        };
    },
    computed: {
        incomplete() {
            return this.tasks.filter(this.inProgress).length;
        },

        allTasks(){
            const store = tasksStore();

            store.getTasks();

            const { tasks } = storeToRefs(store);

            this.tasks = tasks;
            return this.tasks;
        }
    },
    methods: {
        async addTask() {
            if (this.newTask) {
                this.tasks.push({
                    task: this.newTask,
                    completed: false
                });

                http
                .post("tasks/addTask", {
                    task: this.newTask,
                    completed: 0
                })
                .then(function (res){
                    console.log(res);
                })
                .catch (function (er) {
                    console.log(er);
                })

                this.newTask = '';
            }
        },
        completeTask(index, task) {
            task.completed = !task.completed;
            console.log(index);
            console.log(task.completed);
            http
                .post("tasks/completedTask", {
                    id: index,
                    completed: task.completed
                })
                .then(function (res){
                    console.log(res);
                })
                .catch (function (er) {
                    console.log(er);
                })
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
        },
        clearCompleted() {
            this.tasks = this.tasks.filter(this.inProgress);
        },
        clearAll() {
            this.tasks = [];
        },
        
        inProgress(task) {
            return ! this.isCompleted(task);
        },
        isCompleted(task) {
            return task.completed;
        }
    }
}
</script>