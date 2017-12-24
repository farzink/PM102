<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="'/'">Home <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>    
      <router-link v-show="signupVisibility" class="btn btn-outline-primary my-2 my-sm-0 m-2" :to="'register'">Sign up</router-link>
      <router-link v-show="signinVisibility" class="btn btn-outline-success my-2 my-sm-0 m-2" :to="'login'">Sign in</router-link>                
      </div>
</nav>
</template>



<script>
export default {
  name: 'Navigationbar',
  data () {
    return {
        message: "this is home",
        signupVisibility: true,
        signinVisibility: true
    }
  },
  methods: {
    test: function(){
      this.$toasted.show('rocket science');
    },
    test1: function(){
        this.$authInspector.tokenExist();
    },
    testen: function() {
        
    }  
  },
  mounted: function() {   
     if(this.$router.history.current.path == "/login")
        this.signinVisibility = false;
    else
    this.signinVisibility = true;
    if(this.$router.history.current.path == "/register")
        this.signupVisibility = false;
    else
    this.signupVisibilitys = true;
  },
  watch: {
        '$route': function(value) {
          console.log(value.path);
            if(value.path == "/login")
                this.signinVisibility = false;
            else
                this.signinVisibility = true;

            if(value.path == "/register")
                this.signupVisibility = false;
            else
                this.signupVisibility = true;
        }
    }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
