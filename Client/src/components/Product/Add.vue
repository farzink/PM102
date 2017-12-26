<template>
  <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 60rem;">
  <div class="card-body">
    <h4 class="card-title">Add New Product</h4>
    <h6 class="card-subtitle mb-4 text-muted ">please enter your product details below</h6>
    



<form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Name</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="Name" v-model="name" @input="$v.name.$touch()">      
      <span class="text-danger" v-if="!$v.name.required && $v.name.$dirty">name is required</span>
      <span class="text-danger" v-if="!$v.name.maxLength">name can not be longer than 40 characters</span>
          </div>    
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-3 col-form-label">Condition</label>
    <div class="col-sm-8">
      <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn" v-bind:class="[ isNew ? 'btn-success' : 'btn-secondary'  ]"  @click="conditioner('new')">New</button>
  <button type="button" class="btn" v-bind:class="[ isUsed ? 'btn-success' : 'btn-secondary' ]" @click="conditioner('used')">Used</button>  
</div>
    </div>
  </div> 

  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Category</label>
    <div class="col-sm-8">
      <select name="" id="" class="form-control">
        <option value="">some value</option>
        <option value="">some value</option>
        <option value="">some value</option>
        <option value="">some value</option>
        <option value="">some value</option>
        <option value="">some value</option>
        <option value="">some value</option>
      </select>
          </div>    
  </div>


  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Description</label>
    <div class="col-sm-8">
      <textarea class="form-control" cols=10 rows=10 id="inputEmail3" placeholder="Description" v-model="description" @input="$v.description.$touch()"></textarea>      
      <span class="text-danger" v-if="!$v.description.required && $v.description.$dirty">description is required</span>
      <span class="text-danger" v-if="!$v.description.maxLength">description can not be longer than 500 characters</span>
          </div>    
  </div>
  
  
  
  <div class="form-group row">
    <div class="col-sm-12">
      <vue-dropzone  ref="myV ueDropzone" id="dropzone" :options="dropzoneOptions"/>  
  </div>
  </div>
  
  <div class="form-group row">
    <div class="col-sm-12 offset-md-9 col-md-3">
      <!-- <button class="btn btn-primary" style="width: 10rem" v-if="!$v.$invalid" @click="login">Sign up</button> -->
      <button class="btn btn-primary" style="width: 8rem"  @click="login">Add</button>
    </div>         
  </div>
    <!-- <div class="col-sm-12 col-md-6">
      <router-link class="nav-link" :to="'/register'">need an account?</router-link>      
    </div> -->  
    
  <router-link class="btn btn-danger btn-round fa fa-close" style="position:absolute; top:10px; right: 10px; color: white" :to="'/manage/products'"></router-link>      
</form>







  
</div>
		</div>
    </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import { required, minLength, maxLength, between, email } from 'vuelidate/lib/validators'
export default {
  name: 'Add',
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {        
        name: '',
        condition: '',
        category: '',
        description: '',
        isNew: true,
        isUsed: false,
        dropzoneOptions: {
          url: 'https://kosekhar.com',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
      }
    }    
  },
  validations :{
    
    name: {
      required,
      maxLength: maxLength(40)
    },
    description: {
      required,
      maxLength: maxLength(500)
    },

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
