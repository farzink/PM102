<template>
  <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 60rem;">
  <div class="card-body">
    <h4 class="card-title">Manage Profile</h4>
    <h6 class="card-subtitle mb-4 text-muted ">you can add/edit your profile</h6>
    







      <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">First Name</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="First Name" v-model="firstname" @input="$v.firstname.$touch()">            
      <span class="text-danger" v-if="!$v.firstname.maxLength">first name can not be more than 40 characters</span>
          </div>    
  </div>

  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Last Name</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="Last Name" v-model="lastname" @input="$v.lastname.$touch()">            
      <span class="text-danger" v-if="!$v.lastname.maxLength">last name can not be more than 40 characters</span>
          </div>    
  </div>




  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" v-model="email">                  
          </div>    
  </div>


  



  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Street</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="Street" v-model="street" @input="$v.street.$touch()">            
      <span class="text-danger" v-if="!$v.street.maxLength">street can not be more than 100 characters</span>
          </div>    
  </div>


  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">House No.</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="House No." v-model="houseno" @input="$v.houseno.$touch()">            
      <span class="text-danger" v-if="!$v.houseno.maxLength">house no. can not be more than 10 characters</span>
          </div>    
  </div>



  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">State</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="State" v-model="state" @input="$v.state.$touch()">            
      <span class="text-danger" v-if="!$v.state.maxLength">state can not be more than 20 characters</span>
          </div>    
  </div>



  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">City</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="City" v-model="city" @input="$v.city.$touch()">            
      <span class="text-danger" v-if="!$v.city.maxLength">city can not be more than 20 characters</span>
          </div>    
  </div>



  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Postal Code</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="Postal Code" v-model="postalCode" @input="$v.postalcode.$touch()">            
      <span class="text-danger" v-if="!$v.postalcode.maxLength">postal code can not be more than 20 characters</span>
          </div>    
  </div>




  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-3 col-form-label">Phone</label>
    <div class="col-sm-8">
      <input class="form-control" id="inputEmail3" placeholder="Phone" v-model="phone" @input="$v.phone.$touch()">            
      <span class="text-danger" v-if="!$v.phone.maxLength">phone can not be more than 20 characters</span>
          </div>    
  </div>



<div class="form-group row">
    <div class="col-sm-12 offset-md-3 col-md-6">
      <button class="btn btn-primary" style="width: 10rem" v-bind:class="{disabled :$v.$invalid}" @click="update">Update</button>
    </div>   
  </div>
   








  <router-link class="btn btn-danger btn-round fa fa-close" style="position:absolute; top:10px; right: 10px; color: white" :to="'/'"></router-link>      
</div>
		</div>
    </div>
</template>

<script>
import { maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'Profile',
  data () {
    return {        
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        houseno: '',
        state: '',
        city: '',
        postalCode: '',
        phone: ''
    }
  },
  validations :{
    
    firstname: {      
      maxLength: maxLength(40)
    },
    lastname: {      
      maxLength: maxLength(40)
    },    
    street: {      
      maxLength: maxLength(100)
    },
    houseno: {      
      maxLength: maxLength(10)
    },
    state: {      
      maxLength: maxLength(20)
    },
    city: {      
      maxLength: maxLength(20)
    },
    postalcode: {      
      maxLength: maxLength(20)
    },
    phone: {      
      maxLength: maxLength(20)
    }
  },
  methods: {    
    update: function() {     
      if(!this.$v.$invalid){
        let that = this;
        this.axios.defaults.headers.common['Authorization'] = this.$auth.FAH();
        this.axios.put(this.$gc.getBaseUrl("profiles"), {
            firstname: this.firstname,
            lastname: this.lastname,
            street: this.street,
            houseno: this.houseno,
            state: this.state,
            city: this.city,
            postalcode: this.postalCode,
            phone: this.phone
          })
          .then(function(data){
            
            if(data.status == 200) {                                        
              that.$toasted.show('profile successfully updated.');              
              that.$router.push("/");
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
    let zoo=this;        
          this.axios.get(this.$gc.getBaseUrl("profiles"), { headers: this.$auth.AH() })
          .then(function(data){
              console.log(data);
            zoo.firstname = data.data.profile.firstname;
            zoo.lastname = data.data.profile.lastname;
            zoo.email = data.data.profile.email;
        zoo.street = data.data.profile.street;
        zoo.houseno = data.data.profile.houseno;
        zoo.state = data.data.profile.state;
        zoo.city = data.data.profile.city;
        zoo.postalCode = data.data.profile.postalcode;
        zoo.phone = data.data.profile.phone;
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
