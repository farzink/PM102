<template>
 <div>

    
    
    
    
    
    <header class="masthead text-white text-center">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-xl-12 mx-auto">
            <h1 class="mb-5">Find the nearest items to you</h1>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div class="form-row">
                <select class="col-4 col-md-3 form-control" style="height: 48px; font-weight:bolder; font-size: 18px" v-model="selectedCategory">
                  <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">{{category.name}}</option>
                </select>
                <div class="col-7 col-md-8 mb-2 mb-md-0 form-group text-left">
                  <input type="text" class="form-control form-control-lg" v-bind:class="{ 'is-invalid': !$v.term.required && $v.term.$dirty}" placeholder="Enter your item name here..." v-on:keyup.enter="search()" v-model="term" @input="$v.term.$touch()" required>
                  <span class="text-light" v-if="!$v.term.required && $v.term.$dirty">search term can not be empty</span>
                </div>
                <div class="col-xs-10 col-sm-10 col-1 col-md-1">
                  <button type="button" class="btn btn-block btn-lg btn-dark text-light fa fa-search" style="padding: 0.5rem;" @click="search()"></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>

<section class="showcase">
      <div class="p-2">
        <div class="row no-gutters">
          <div class="col-lg-4 order-lg-2 text-white showcase-img hidemeImg rounded"  style="background-image: url('/static/img/Asset_Map_1.jpg');"></div>
          <div class="col-lg-8 order-lg-1 my-auto showcase-text text-center hidemeTxt">
            <h2>Shopping from the Neighbourhood</h2>
            <p class="lead mb-0">Save money and time if your neighbor have your product to sell!</p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-lg-4 text-white showcase-img hidemeImg" style="background-image: url('/static/img/sell.jpg');"></div>
          <div class="col-lg-8 my-auto showcase-text text-center hidemeTxt">
            <h2>Selling your product(s)</h2>
            <p class="lead mb-0">look at the Neighbors wish lists from other users, maybe you have a product and you can sell it to them.</p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-lg-4 order-lg-2 text-white showcase-img hidemeImg" style="background-image: url('/static/img/chat.jpg');"></div>
          <div class="col-lg-8 order-lg-1 my-auto showcase-text text-center hidemeTxt">
            <h2>Chat live!</h2>
            <p class="lead mb-0">Don't need to give your phone number or any other social network account. We provide the communication interface here.</p>
          </div>
        </div>
      </div>
    </section>
    
    
    


</div>
    


  



</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Home',
  data () {
    return {
        categories: [],
        selectedCategory: -1,
        term: ""
    }
  },
  validations : {
    term: {
      required   
    }
  },
  methods: {
    search: function(){
      let those=this;
      if(!this.$v.$invalid){
        let categoryId = -1;
        if(this.selectedCategory != those.categories.find(e=> e.name == "All").id)
          categoryId = this.selectedCategory;
        this.$router.push(`/search?key=${this.term}&cid=${categoryId}&size=${9}&start=${0}`);

        this.$toasted.show('searching...');
      }
    }
  },
  mounted: function() {          
    
    let those=this;        
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
  } 
}
import "../assets/js/script";
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;

}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  
}

header.masthead {
  position: relative;
  background-color: #ffffff;
  background: url("/static/img/map.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding-top: 8rem;
  padding-bottom: 8rem;
  opacity: 1;
  
}
header.masthead .overlay {
  position: absolute;
  background-color: #212529;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.3;
}
header.masthead h1 {
  font-size: 2rem;
}
@media (min-width: 768px) {
  header.masthead {
    padding-top: 12rem;
    padding-bottom: 12rem;
  }
  header.masthead h1 {
    font-size: 3rem;
  }
}

.lead {
  color: #6473ad;
}
.showcase {
  background-color: #fff;
  opacity: 1;
}

.showcase .showcase-text {
  padding: 3rem;
  color: #0e1b57;
}

.showcase .showcase-img {
  min-height: 15rem;
  background-size: cover;
}


@media (min-width: 768px) {
  .showcase .showcase-text {
    padding: 7rem;
  }
}

.features-icons {
  padding-top: 7rem;
  padding-bottom: 7rem;
}
.features-icons .features-icons-item {
  max-width: 20rem;
}
.features-icons .features-icons-item .features-icons-icon {
  height: 7rem;
}
.features-icons .features-icons-item .features-icons-icon i {
  font-size: 4.5rem;
}
.features-icons .features-icons-item:hover .features-icons-icon i {
  font-size: 5rem;
}

.testimonials {
  padding-top: 7rem;
  padding-bottom: 7rem;
}
.testimonials .testimonial-item {
  max-width: 18rem;
}
.testimonials .testimonial-item img {
  max-width: 12rem;
  box-shadow: 0px 5px 5px 0px #adb5bd;
}

.call-to-action {
  position: relative;
  background-color: #343a40;
  background: url("/static/img/map.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding-top: 7rem;
  padding-bottom: 7rem;
}
.call-to-action .overlay {
  position: absolute;
  background-color: #212529;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.3;
}


.hidemeTxt
{
    opacity:0;
}

.hidemeImg
{
    opacity:0;
}

</style>
