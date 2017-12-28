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
    <label for="inputEmail3" class="col-sm-3 col-form-label">Price</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="Name" v-model="price" @input="$v.price.$touch()">      
      <span class="text-danger" v-if="!$v.price.required && $v.price.$dirty">price is required</span>      
      <span class="text-danger" v-if="!$v.price.between">price should be between 0 and 99999999</span>     
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
      <button class="btn btn-primary"  style="width: 8rem"  @click="add" v-bind:class="{disabled: $v.$invalid}">Add</button>
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
        price: 0,
        isNew: true,
        isUsed: false,
        dropzoneOptions: {
          url: 'http://localhost:2000/resources/upload',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: this.$auth.AH(),
          maxFiles: 5,
          dictDefaultMessage: "drop your item`s images here",
          addRemoveLinks: true
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
    price: {
      required,
      between: between(0, 99999999)
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
    add: function() {     
      let that = this;
      if(!this.$v.invalid){
        this.axios.defaults.headers.common['Authorization'] = this.$auth.FAH();
        this.axios.post(this.$gc.getBaseUrl("products"), {
            name: this.name,
            price: this.price,
            condition: this.isNew,
            categoryId: 1,
            description: this.description
          })
          .then(function(data){
            
            if(data.status == 201) {                          
              
              that.$toasted.show('product successfully created.');              
              that.$router.push("/manage/products");
            }
            else{              
              that.$toasted.show('please try again!');              
            }            
          })
          .catch(function(error, data){              
              that.$toasted.show('plase try again later');              
            
          })
      }
    }
  },
  mounted: function() {    
    let gooz=this;        
          this.axios.get(this.$gc.getBaseUrl("resources/clear"), { headers: this.$auth.AH() })
          .then(function(data){
          
          })
          .catch(function(error, data){                         
            
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
