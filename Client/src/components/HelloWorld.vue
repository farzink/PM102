<template>
  <div class='hello'>
    <h1></h1>
    
      <div v-for="item in items">
        {{item.name}}
        <button @click="addToCart(item)">Add to cart</button>
      </div> 
<hr />
      <div id="shopping_id">
        <div v-for="item in cart">
          {{item.name}}
        <button @click="remove(item)">remove</button>
        </div>
        </div>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      items: [
        { id: 1, name: 'notebook' },
        { id: 2, name: 'Mobile' },
        { id: 3, name: 'Laptop' },
        { id: 4, name: 'Desktop' },
        { id: 5, name: 'Keyboard' },
        { id: 6, name: 'Printer' },
        { id: 7, name: 'Mouse' },
        { id: 8, name: 'Alexa' }
      ],
    cart: []
    }
  },
  methods: {
      addToCart: function(item) {        
        this.cart.push(item);
      },
      remove: function(item) {
        let index=this.cart.indexOf(item);
        if(index !== -1)
          this.cart.splice(index, 1);
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
