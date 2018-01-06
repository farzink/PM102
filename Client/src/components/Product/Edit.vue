<template>
  <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 60rem;">
  <div class="card-body">
    <h4 class="card-title">Edit Product</h4>
    <h6 class="card-subtitle mb-4 text-muted ">edit your product details</h6>
    



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
      <select class="col-4 col-md-3 form-control" style="height: 48px; font-weight:bold; font-size: 14px" v-model="selectedCategory">
                  <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">{{category.name}}</option>
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
      <vue-dropzone  ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-removed-file='removeImage'/>  
  </div>
  </div>
  
  <div class="form-group row">
      <div class="col-sm-12 col-md-3">      
      <button class="btn btn-danger"  style="width: 8rem" @click="remove">Delete</button>
    </div>         
    <div class="col-sm-12 offset-md-6 col-md-3">
      <router-link class="btn btn-danger m-3shop" v-if="!addressStatus" style="position:absolute; top:10px; right: 10px; color: white" :to="'/profile'">You need to add your address to add product</router-link>      
      <button class="btn btn-primary"  style="width: 8rem" v-if="addressStatus"  @click="update" v-bind:class="{disabled: $v.$invalid}">update</button>
    </div>         
  </div>
    <!-- <div class="col-sm-12 col-md-6">
      <router-link class="nav-link" :to="'/register'">need an account?</router-link>      
    </div> -->  
    
  <router-link class="btn btn-danger btn-round fa fa-close" style="position:absolute; top:10px; right: 10px; color: white" :to="'/manage/products/index'"></router-link>      
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
        id: -1,
        name: '',
        condition: '',
        category: '',
        description: '',
        price: 0,
        isNew: true,
        isUsed: false,
        categories: [],
        selectedCategory: -1,
        dropzoneOptions: {
          url: 'http://localhost:2000/resources/upload',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: this.$auth.AH(),
          maxFiles: 5,
          dictDefaultMessage: "drop your item`s images here",
          addRemoveLinks: true,
          acceptedFiles: "image/*"
      },
      ex:'',
      addressStatus: true
    }    
  },
  validations :{
    
    name: {
      required,
      maxLength: maxLength(40)
    },
    description: {
      required,
      maxLength: maxLength(1000)
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
    getAddressStatus: function(){
      let that = this;
      this.axios.defaults.headers.common['Authorization'] = this.$auth.FAH();
        this.axios.get(this.$gc.getBaseUrl("profiles/address/status"))
          .then(function(data){
            that.addressStatus = data.data.status;
          })
          .catch(function(error, data){              
          })
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
    update: function() { 
      this.ex = "busted";
      let that = this;
      if(!this.$v.invalid){
        this.axios.defaults.headers.common['Authorization'] = this.$auth.FAH();
        this.axios.put(this.$gc.getBaseUrl("products"), {
            product_id: this.id,
            name: this.name,
            price: this.price,
            condition: this.isNew,
            category_id: this.selectedCategory,
            description: this.description
          })
          .then(function(data){
            
            if(data.status == 200) {                          
              
              that.$toasted.show('product successfully updated.');              
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
    },
    removeImage: function(e){
        console.log(e)
        this.axios.defaults.headers.common['Authorization'] = this.$auth.FAH();
        this.axios.delete(this.$gc.getBaseUrl("resources/products/images/" + this.id + "/" + e.name), {
           
          })
          .then(function(data){           
           
          })
          .catch(function(error, data){              
              
            
          })
    },
    remove: function(){
        let that = this;
        var path =this.$gc.getBaseUrl("products/" + this.id)
        this.axios.delete(path, { headers: this.$auth.AH() })
          .then(function(data){              
              if(data.data.success === true){
                  that.$toasted.show('item successfully deleted.');              
                  that.$router.push("/manage/products/index");
              }               
          })
          .catch(function(error){
            
          })
    }
  },
  beforeMount: function() {    
         
    let those=this;        
          // this.axios.get(this.$gc.getBaseUrl("resources/clear"), { headers: this.$auth.AH() })
          // .then(function(data){
          
          // })
          // .catch(function(error, data){                         
            
          // })

  
    
      
    // those.categories = those.$gc.getItemByKey("categories");
    //         those.selectedCategory = those.categories.find(e=> e.name == "All").id;
          this.axios.get(this.$gc.getBaseUrl("categories"), { headers: this.$auth.AH() })
          .then(function(data){
            those.$gc.saveItemByKey("categories", JSON.stringify(data.data.categories));
            those.categories = data.data.categories;
            those.selectedCategory = those.categories.find(e=> e.name == "All").id;
          })
          .catch(function(error){
            those.categories = those.$gc.getItemByKey("categories");
            those.selectedCategory = those.categories.find(e=> e.name == "All").id;
          })


        var path =this.$gc.getBaseUrl("products/full/" + this.$route.params.id)
        
          this.axios.get(path, { headers: this.$auth.AH() })
          .then(function(data){
              
            those.selectedCategory = data.data.product.categoryId;
            those.name = data.data.product.name;
            those.description = data.data.product.description;
            those.isNew = data.data.product.condition;
            those.isUsed = !data.data.product.condition;
            those.price = data.data.product.price;
            those.id = data.data.product.id;
            
            
            var dz = those.$refs.myVueDropzone.dropzone;
            
            var baseImagePath = those.$gc.getBaseUrl("resources/images/" + data.data.product.id + "/");
            console.log(baseImagePath)
            var images = data.data.product.images;
            for(var i = 0; i < images.length; i++)
            {
                var file = {
                name: data.data.product.images[i].name,
                url: baseImagePath + images[i].name
            }
                console.log(baseImagePath + images[i].name)
                dz.emit("addedfile", file)
                dz.emit("thumbnail", file, file.url)
                dz.emit("complete", file)
            }
            // dz.emit("addedfile", file);                                
            // dz.emit("thumbnail", file, file.url);
            // dz.emit("complete", file);
            
          
          })
          .catch(function(error){
            
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
