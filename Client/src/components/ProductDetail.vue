<template>
  <div class="container p-2">
			
  
<!-- <div id="lightgallery" class="demo-gallery">
            <ul id="lightgallery" class="list-unstyled row" v-for="(image, index) in images" v-bind:key="index">
                <li class="col-xs-6 col-sm-4 col-md-3" data-responsive="img/1-375.jpg 375, img/1-480.jpg 480, img/1.jpg 800" data-src="img/1-1600.jpg" data-sub-html="<h4>Fading Light</h4><p>Classic view from Rigwood Jetty on Coniston Water an old archive shot similar to an old post but a little later on.</p>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1">
                    <a v-bind:href="getImageAddress(image.name)">
                        <img class="img-responsive" v-bind:src="getImageAddress(image.name)" alt="Thumb-1">
                    </a>
                </li>               
            </ul>
        </div> -->
        <div class="row">
            <h2 class="m-4 text-info display-3">{{name}}</h2>
        </div>

<lightbox ref="lightbox" :images="images" :showThumbs="true" :showLightBox="false"></lightbox>
  <div class="row">
<img class="m-2 col-8"
            v-lazy="image.src" 
            style="height: 500px; width:600px" 
            @click="openGallery(0)"
          >
          <div class="col-3">
              <br>
              
              <h4 class="text-muted">Price</h4>
              <h5 class="">{{price}}</h5>

              <br>
              <br>
              <h4 class="text-muted">Condition</h4>
              <h5 class="">{{condition ? "New" : "Used"}}</h5>

              <br>
              <br>
              <h4 class="text-muted">Added on</h4>
              <h6 class="text-info">{{updated.split("T")[0].slice(0, 10)}}</h6>
              <h6 class="text-info">{{updated.split("T")[1].slice(0, 8)}}</h6>


              <br>
              <br>
              <div v-if="isSignedIn()">
              <h4 class="text-muted">Contact Owner</h4>
              <h6 class="btn btn-light text-success btn-lg fa fa-comments-o fa-3x" @click="chatOn()"></h6>              
              </div>
              <div v-if="!isSignedIn()">
            <span class="text-danger fa fa-info-circle fa-2x"></span>
              <h4 class="text-muted">Contact Owner</h4>
              <router-link  style="position: relative; top: -2px;" :to="'/login'"><span class="text-danger h6">signin to contact</span></router-link>                
              
              </div>
          </div>



          <div ref="chatBox" class="bg-secondary text-light outline-primary rounded" :class="{'chat-show': showChatClass, 'chat-hide': hideChatClass}" >
              <span class="text-light fa fa-close fa-2x" style="position: absolute; right: 4px; top:4px" @click="chatOff()"></span>
              <div class="p-2">
              <h6 class="m-1 text-light">Message To Owner</h6>
              <textarea name="" id="" cols="31" rows="9"></textarea>
              <input type="text" name="" id="" v-model="messageToSend">
              <button class="btn btn-success" style="height: 40px" @click="send">send</button>
                </div>
          </div>
</div>

<div class="row">
            <p class="m-2 text-secondary">{{description}}</p>
        </div>
  <!-- <router-link class="btn btn-danger btn-round fa fa-close" style="position:absolute; top:10px; right: 10px; color: white" :to="'/'"></router-link>       -->

		</div>
    
</template>

<script>

import Lightbox from 'vue-image-lightbox'
import { maxLength } from 'vuelidate/lib/validators'
import { diff } from 'semver';
require('vue-image-lightbox/dist/vue-image-lightbox.min.css')
export default {
    components: {            
        Lightbox
    },
  name: 'ProductDetail',
  data () {
    return {        
        id: -1,
        name: "",
        description: "",
        price: 0,
        images: [],
        condition: false,
        image: "",
        updated: "",
        showChat: false,
        showChatClass: false,
        hideChatClass: true,
        messageToSend: ""
    }
  },
  methods: {
      isSignedIn: function(){
      return this.$auth.isSignedIn();
    },
      getImageAddress : function(image) {
          return this.$gc.getBaseUrl("resources/images/" + this.id + "/" + image)
      },
      openGallery(index) {
      this.$refs.lightbox.showImage(index)
    },
    chatOn: function(){
        
        this.hideChatClass = !this.hideChatClass;
        this.showChatClass = !this.showChatClass;
    },
    chatOff: function(){
        
        this.hideChatClass = true;
        this.showChatClass = false;
    },
    send: function(){

    }
  },
  mounted: function() {    
     
      let those = this;
      var path = this.$gc.getBaseUrl("products/full/" + this.$route.params.id);
     this.axios.get(path, { headers: this.$auth.AH() })
          .then(function(data){
              
            those.id = data.data.product.id;
            those.name = data.data.product.name;
            those.price = data.data.product.price;
            those.description = data.data.product.description;
            those.updated = data.data.product.updated;
            those.images = data.data.product.images.map(image => {
                return {
                    thumb: those.getImageAddress(image.name),
                    src: those.getImageAddress(image.name),
                    caption: those.getImageAddress(image.name)
                }
            });
            those.image = those.images[0];            
            those.condition = data.data.product.condition;
          })
          .catch(function(error){
            
          })
  
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.chat-hide {
    
    position: fixed;
    bottom: -300px;
    right: -280px;
}
.chat-show {            
    position: fixed;
    bottom: 0px;
    right: 0px;
    height: 300px;
    width: 280px;
}
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
