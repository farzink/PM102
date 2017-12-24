<template>
  <div class="row justify-content-center">
			<div class="card m-5 p-2" style="width: 30rem;">
  <div class="card-body">
    <h4 class="card-title">Zign In Bitte</h4>
    <h6 class="card-subtitle mb-4 text-muted ">please enter your credentials below</h6>
    



<form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-4 col-form-label">Email</label>
    <div class="col-sm-8">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Password</label>
    <div class="col-sm-8">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>
 
  <div class="form-group row">
    <div class="col-sm-12 col-md-6">
      <button type="submit" class="btn btn-primary" style="width: 10rem" >Sign in</button>
    </div>
    <div class="col-sm-12 col-md-6">
      <a href="#" class="card-link">need an account?</a>
    </div>
  </div>
</form>




  </div>
</div>
		</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        message: "this is home"
    }
  },
  methods: {
    test: function(){
      this.$toasted.show('rocket science');
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
