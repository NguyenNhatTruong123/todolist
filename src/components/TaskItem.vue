<template id="task-item">
    <li class="tasks__item">
      <div class="checkbox-wrapper-19" style="margin-right: 10px">
        <input type="checkbox" v-model="task.completed"/>
        <label for="cbtest-19" class="check-box" @click="clickCheckBox"/>
      </div> 

      <button :class="className"
          @click.self="$emit('complete')"
          style="margin-right: 10px"
      >
        {{ task.task }}
      </button>
      
      <button class="button-62" @click="$emit('remove')">
        <i class="fa fa-times"></i>
      </button>
    </li>
</template>

<script>
export default {
  props: ['task'],

  computed: {
    className() {
      let classes = ['button-55'];
      if (this.task.completed) {
        classes.push('button-55--completed');
      }
      return classes.join(' ');
    },
    
  },
  methods: {
    clickCheckBox() {
      console.log("Click method")
      this.task.completed = !this.task.completed
    }
  }
}
</script>
