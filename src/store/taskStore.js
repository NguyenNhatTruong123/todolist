import { defineStore } from "pinia";

import http from "../helper/http-common";

export const tasksStore = defineStore("tasksStore", {
  id: "tasks",
  state: () => {
    return {
      tasks: []
    };
  },
  actions: {
    async getTasks() {
      if (this.tasks.length == 0){
      await http
        .get("tasks")
        .then((res) => {
          res.data.forEach((e) => {
            this.tasks.push({
              task: e.task,
              completed: e.completed === 0 ? false : true
            })
          });
        })
        .catch((err) => {
          console.log("Lỗi " + err);
        });
      }
    },
  },
});
