<template>

<div>
  <form class="form-horizontal" action="/contactus/contact" method="post">


    <h1>
      <!-- Form Name -->
     Contact US
    </h1>

    <br/>

    <!-- Multiple Radios button to select the gender -->
    <div class="form-group">
      <div class="col-md-2 col-md-offset-6">
        <label class="control-label" for="radios">Gender</label>
      </div>
      <div class="col-md-4">
        <div class="radio col-md-2">
          <label for="radios-0">
            <input type="radio" name="radios" id="male" value="1" checked="checked"> Male
          </label>
        </div>
        <div class="radio col-md-2">
          <label for="radios-0">
            <input type="radio" name="radios" id="female" value="1" checked="checked"> Female
          </label>
        </div>
      </div>
    </div>


      <!-- Text input for name-->
    <div class="form-group">
      <div class="col-md-12">
        <div class="col-md-2">
          <label class=" control-label" for="textsurname">Family Name</label>
        </div>
        <div class="col-md-4">
          <input id="textsurname" name="textsurname" type="text" placeholder="Family Name" class="form-control input-md" required="">
        </div>
        <div class="col-md-2">
          <label class=" control-label" for="textfirstname">First Name</label>
        </div>
        <div class="col-md-4">
          <input id="textfirstname" name="textfirstname" type="text" placeholder="First Name" class="form-control input-md" required="">
        </div>
      </div>
    </div>
    <br/>

    <!-- Text input for address-->
    <div class="form-group">
      <div class="col-md-12">
        <div class="col-md-2">
          <label class=" control-label" for="textstreet">Street/House No</label>
        </div>
        <div class="col-md-4">
          <input id="textstreet" name="textstreet" type="text" placeholder="House No" class="form-control input-md">
        </div>
        <div class="col-md-2">
          <label class=" control-label" for="textpostal">Postal Code/CIty</label>
        </div>
        <div class="col-md-4">
          <input id="textpostal" name="textpostal" type="text" placeholder="postalcode / city" class="form-control input-md" required="">
        </div>
      </div>
    </div>
    <br/>


    <!-- Text input for contact details-->
    <div class="form-group">
      <div class="col-md-12">
        <div class="col-md-2">
          <label class="control-label" for="textphone">Phone</label>
        </div>
        <div class="col-md-4">
          <input id="textphone" name="textphone" type="text" placeholder="0123 4567890" class="form-control input-md" required="">
        </div>
        <div class="col-md-2">
          <label class="control-label" for="textemail">E-mail</label>
        </div>
        <div class="col-md-4">
          <input id="textemail" name="textemail" type="text" placeholder="email@domain.com" class="form-control input-md" required="">
        </div>
      </div>
    </div>

    <br/>
    <!-- Textarea for messaging options -->
    <div class="form-group">
      <label class="col-md-2 col-md-offset-2 control-label" for="textmessage">Message</label>
      <div class="col-md-6">
        <textarea class="form-control" id="textmessage" name="textmessage" style="resize: none; height: 100px;"></textarea>
      </div>
    </div>

    <!-- Button to send the details-->
    <div class="form-group">
      <div class="col-md-2 col-md-offset-6 col-">
        <button id="submit" name="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>


  </form>
</div>
</template>


<script>
</script>


<style scoped>
  div{
    font-weight:bold;
    padding: 5px;
    padding-left: 15px;
  }
  h1{
    padding:20px;
  }
</style>