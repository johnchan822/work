$(document).ready(function() {
   $('.burger_menu').on('click',  function(e){
      e.preventDefault();
      $('body').toggleClass('show_menu');
  });
});