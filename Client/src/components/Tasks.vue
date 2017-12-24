<template>
  <div class='hello'>
    <h1>{{message}}</h1>
     <button @click="getTasks()">get tasks</button>
     <div v-for="task in tasks">
         {{task.title}}
     </div>
  </div>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        message: "this is tasks",
        tasks: []
    }
  },
  methods: {
      getTasks: function(){
          let me=this;
          this.axios.get('http://localhost:2000/tasks')
          .then(function(data){
              me.tasks = data.data.tasks;
          })
          .catch(function(error){
              console.log(error);
          })
      }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
