$(window).scroll(function(){
  $(".masthead").css("opacity", 1 - $(window).scrollTop() / 500);
});


$(document).ready(function() {
  $(window).scroll( function(){
    
    $('.hidemeTxt').each( function(i){
        
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object ){    
          $(this).animate({'opacity':'1'},1000);
      }
      
    }); 
     $('.hidemeImg').each( function(i){
        
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object ){    
          $(this).animate({'opacity':'1'},1500);
      }
      
    }); 
  
  });
    
});