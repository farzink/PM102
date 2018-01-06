import { src } from 'semver';
<template>

<div class="container p-4">
 <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 60rem;">
  <div class="card-body">
    <h4 class="card-title">Product Statistics</h4>
    <h6 class="card-subtitle mb-4 text-muted ">review your products statistics</h6>

<ul class="list-group" v-for="product in products" :key="product.id">
  <li class="list-group-item d-flex justify-content-between align-items-center h6 list-group-item-secondary m-2">
    {{product.name}}
    <span class="badge badge-primary badge-pill">{{product.nov}}</span>
  </li>
  
</ul>


<router-link class="btn btn-danger btn-round fa fa-close" style="position:absolute; top:10px; right: 10px; color: white" :to="'/manage/products'"></router-link>          
</div> 
			</div>
 </div>
</div>



  
</template>

<script>
export default {
  name: 'Statistics',  
  data () {
    return { 
        products: []    
    }    
  },  
  methods: {
    getImageAddress: function(path){
      
      return this.$gc.getBaseUrl(path)
    }
  },
  beforeMount: function() {    
    let that=this;        
          this.axios.get(this.$gc.getBaseUrl("products/profile/repo/items"), { headers: this.$auth.AH() })
          .then(function(data){              
              that.products = data.data.products;          
          })
          .catch(function(error){                         
            console.log(error);
          })    
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
