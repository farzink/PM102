<template>
  <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 30rem;">
  <div class="card-body">
    <h4 class="card-title">Sign Up Bitte</h4>
    <h6 class="card-subtitle mb-4 text-muted ">please enter your desired email and password</h6>
    



<form>
  <!-- <div class="form-group row">
    <label for="inputEmail3" class="col-sm-4 col-form-label">Fisrtname</label>
    <div class="col-sm-8">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-4 col-form-label">Lastname</label>
    <div class="col-sm-8">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-4 col-form-label">Area Code</label>
    <div class="col-sm-8">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div> -->
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="Email" v-model="email" @input="$v.email.$touch()">      
      <span class="text-danger" v-if="!$v.email.required && $v.email.$dirty">email is required</span>
      <span class="text-danger" v-if="!$v.email.email">correct format e.g. some@some.som</span>
          </div>    
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-3 col-form-label">Password</label>
    <div class="col-sm-8">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="password" @input="$v.password.$touch()">
      <span class="text-danger" v-if="!$v.password.required && $v.password.$dirty">password is required</span>
      <span class="text-danger" v-if="!$v.password.minLength">password should be at least 8 characters</span>
    </div>
  </div> 
  <div class="form-group row">
    <div class="col-sm-12 offset-md-3 col-md-6">
      <button class="btn btn-primary" style="width: 10rem" v-if="!$v.$invalid" @click="register">Sign up</button>
    </div>   
  </div>
</form>









  </div>
</div>
		</div>
</template>

<script>
import { required, minLength, between, email } from 'vuelidate/lib/validators'
export default {
  name: 'Home',
  data () {
    return {
        email: '',
        password: ''
    }
  },
  validations :{
    
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    test: function(){
      this.$toasted.show('rocket science');
    },
    register: function() {     
      if(!this.$v.$invalid){
        let gooz=this;        
          this.axios.post(this.$gc.getBaseUrl("authentication/register"), {
            email: gooz.email,
            password: gooz.password
          })
          .then(function(data){
            if(data.status == 201)
              gooz.$toasted.show('successful registration');              
              gooz.$router.push("/login");
          })
          .catch(function(error){
              console.log(error);
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








    
