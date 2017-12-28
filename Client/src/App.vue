<template>
  <div>
    <CustomHeader />
    <!-- <router-link :to="'items'">items</router-link>
     <router-link :to="'tasks'">tasks</router-link>
     <router-link :to="'storage'">storage</router-link> -->
     
       
         <Navigationbar />

    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    
  </div>
</template>

<script>
import CustomHeader from '@/components/CustomHeader'
import Sidebar from '@/components/Sidebar'
import Navigationbar from '@/components/Navigationbar'
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.css'

export default {
  name: 'app',
  components: {
    CustomHeader,
    Sidebar,
    Navigationbar
    
  },
  data() {
    return {   
    }
  }  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
