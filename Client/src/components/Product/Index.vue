import { src } from 'semver';
<template>

 <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 60rem;">
  <div class="card-body">
    <h4 class="card-title">Manage Products</h4>
    <h6 class="card-subtitle mb-4 text-muted "></h6>


    <div class="row"> 
<div v-for="product in products" class="card p-4 m-3" v-bind:key="product.id" style="width: 25rem;">
  <img class="card-img-top" :src="getImageAddress(product.image)"  alt="Card image cap" style="min-height: 250px; max-height: 250px">
  <div class="card-block">
    <h4 class="card-title">{{product.name}}</h4>
    <p class="card-text">{{product.description}}</p>
    <router-link class="btn btn btn-secondary rounded text-light float-right" :to="'/manage/products/edit/' + product.id">Edit</router-link>                
    <!-- <a href="#" class="btn btn-primary text-light">Edit</a> -->
  </div>
  
</div>

</div>
<router-link class="btn btn-danger btn-round fa fa-close" style="position:absolute; top:10px; right: 10px; color: white" :to="'/manage/products'"></router-link>      
  </div>
			</div>
 </div>

</template>

<script>
export default {
  name: 'Index',  
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
