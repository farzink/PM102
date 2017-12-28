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
                <select class="col-4 col-md-3 form-control" style="height: 48px;font-size: 18px" v-model="selectedCategory">
                  <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">{{category.name}}</option>
                </select>
                <div class="col-7 col-md-8 mb-2 mb-md-0">
                  <input type="text" class="form-control form-control-lg" placeholder="Enter your item name here...">
                </div>
                <div class="col-xs-10 col-sm-10 col-1 col-md-1">
                  <button type="button" class="btn btn-block btn-lg btn-dark text-light fa fa-search" style="padding: 0.5rem;"></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>


    
    


</div>
    


  



</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        categories: [],
        selectedCategory: 0
    }
  },
  methods: {
    test: function(){
      this.$toasted.show('rocket science');
    }
  },
  mounted: function() {          
    
    let those=this;        
    those.categories = those.$gc.getItemByKey("categories");
            those.selectedCategory = those.categories.find(e=> e.name == "All").id;
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
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif; }

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700; }

header.masthead {
  position: relative;
  background-color: #343a40;
  background: url("/static/img/map.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding-top: 8rem;
  padding-bottom: 8rem; }
  header.masthead .overlay {
    position: absolute;
    background-color: #212529;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0.3; }
  header.masthead h1 {
    font-size: 2rem; }
  @media (min-width: 768px) {
    header.masthead {
      padding-top: 12rem;
      padding-bottom: 12rem; }
      header.masthead h1 {
        font-size: 3rem; } }

.showcase .showcase-text {
  padding: 3rem; }

.showcase .showcase-img {
  min-height: 30rem;
  background-size: cover; }

@media (min-width: 768px) {
  .showcase .showcase-text {
    padding: 7rem; } }

.features-icons {
  padding-top: 7rem;
  padding-bottom: 7rem; }
  .features-icons .features-icons-item {
    max-width: 20rem; }
    .features-icons .features-icons-item .features-icons-icon {
      height: 7rem; }
      .features-icons .features-icons-item .features-icons-icon i {
        font-size: 4.5rem; }
    .features-icons .features-icons-item:hover .features-icons-icon i {
      font-size: 5rem; }

.testimonials {
  padding-top: 7rem;
  padding-bottom: 7rem; }
  .testimonials .testimonial-item {
    max-width: 18rem; }
    .testimonials .testimonial-item img {
      max-width: 12rem;
      box-shadow: 0px 5px 5px 0px #adb5bd; }

.call-to-action {
  position: relative;
  background-color: #343a40;
  background: url("/static/img/map.jpg") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding-top: 7rem;
  padding-bottom: 7rem; }
  .call-to-action .overlay {
    position: absolute;
    background-color: #212529;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0.3; }

footer.footer {
  padding-top: 4rem;
  padding-bottom: 4rem; }

</style>
