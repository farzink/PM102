<template>
  <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 60rem;">
  <div class="card-body">
    <h4 class="card-title">Manage Products</h4>
    <h6 class="card-subtitle mb-4 text-muted "></h6>
    





<div class="justify-content-center">
			<div class="card m-5 p-2">
  <div class="card-body">
    <h4 class="card-title">Manage</h4>
    <h6 class="card-subtitle mb-4 text-muted ">you can add/edit your product(s)</h6>

      <div class="row">
    <div class="col-sm-12 col-md-3">      
      <router-link class="btn btn-secondary text-white" :to="'/manage/products/add'">Add new product</router-link>            
    </div>         
    <div class="col-sm-12 col-md-3">      
      <router-link class="btn btn-secondary text-white" :to="'/manage/products/index'">Edit existing product</router-link>                  
    </div>         
  </div>

</div>
		</div>
    </div>


    <div class="justify-content-center">
			<div class="card m-5 p-2">
  <div class="card-body">
    <h4 class="card-title">Statistics</h4>
    <h6 class="card-subtitle mb-4 text-muted ">you can review your product(s) statistics</h6>


<div class="row">
    <div class="col-sm-12 col-md-3">      
      <button class="btn btn-secondary"  @click="login">Review</button>
    </div>         
    
  </div>



</div>
		</div>
    </div>









  <router-link class="btn btn-danger btn-round fa fa-close" style="position:absolute; top:10px; right: 10px; color: white" :to="'/'"></router-link>      
</div>
		</div>
    </div>
</template>

<script>
import { required, minLength, maxLength, between, email } from 'vuelidate/lib/validators'
export default {
  name: 'Products',
  data () {
    return {        
        
    }
  },
  methods: {
    test: function(){
      this.$toasted.show('rocket science');
    },
    conditioner: function(condition){
      if(condition === 'new'){
        this.isNew = true;
        this.isUsed = false;
      }else{
        this.isNew = false;
        this.isUsed = true;
      }
    },
    login: function() {     
      if(!this.$v.$invalid){
        let gooz=this;        
          this.axios.post(this.$gc.getBaseUrl("authentication/token"), {
            email: gooz.email,
            password: gooz.password
          })
          .then(function(data){
            
            if(data.data.isSuccessfull == true) {                          
              gooz.$auth.createToken(data.data.token);
              gooz.$toasted.show('successful login');              
              gooz.$router.push("/");
            }
            else{              
              gooz.$toasted.show('wrong credential, please try again!');              
            }            
          })
          .catch(function(error, data){              
              gooz.$toasted.show('plase try again later');              
            
          })
      }
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
