<template>
<div>
  <div class='header-list'>
    <h1 class="container">Master IE course ID: PM102 Advanced Application Programming</h1>
  </div>
    <div class="container">
      <div class="project-title">
        <h1>Project Title</h1>
        <h2>Shopping Zone</h2>
      </div>
     
    <div class="member">
       <h2 class="member-header">Team Memebers</h2>
        <ul class="list-group">
          <li class="list-group-item">Mohammadreza Taleghani Esfahani</li>
          <li class="list-group-item">Farzin Khoshneyat (Team Lead)</li>
          <li class="list-group-item">A B M Shamsuzzaman Sadi</li>
          <li class="list-group-item">Farjana Islam</li>
          <li class="list-group-item">Sadam Hussain</li>
          <li class="list-group-item">Mehrdad Saraee</li>
        </ul>
    </div>
     
    </div>
  </div>

</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
       
    }
  },
  methods: {
     
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.header-list {
  background: rgba(177, 197, 177, 0.2);
  height: auto;
  padding: 1.4rem;
  color: rgb(92, 25, 25);
  text-align: center;
}
.project-title {
  background: rgb(199, 231, 223);
  height: auto;
  text-align: center;
  padding: 1.7rem;
  transition: background .60s ease;
}
.member ul li {
  font-weight: 700;
  text-align: center;
  font-size: 1.4rem;
}
.member-header {
  background: #232;
  color: #fff;
  padding: 1.4rem;
  text-align: center;
}
.member ul li:hover {
  background: #f7f7f7;
}
</style>