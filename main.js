$(document).ready(function(){
    $("#loginImg").css('display', 'none');
      $('#menu').click(function(){
          $(this).toggleClass('fa-times');
          $('.navbar').toggleClass('nav-toggle');
      });
      $('#login').click(function(){
          $('.login-form').addClass('popup');
      });
      $('.login-form form .fa-times').click(function(){
          $('.login-form').removeClass('popup');
      });
      $('.login-form ul .signup').click(function(){
        $('.sign-up-form').addClass('popup');
     });
     $('.sign-up-form form .fa-times').click(function(){
        $('.sign-up-form').removeClass('popup');
     });
     $('.login-form form .btn').click(function(event){
      event.preventDefault();
      login() 
     });
      $('.login-form .sign-in-with-google p').click(function(event){
          event.preventDefault();
          signin() 
      });
      $(window).on('load scroll',function(){
              $('#menu').removeClass('fa-times');
              $('.navbar').removeClass('nav-toggle');
              $('.login-form').removeClass('popup'); 
              $('section').each(function(){
                  let top =$(window).scrollTop();
                  let height=$(this).height();
                  let id=$(this).attr('id');
                  let offset=$(this).offset().top - 200;
                  
                  if(top > offset && top < offset + height){
                      $('.navbar ul li a').removeClass('active');
                      $('.navbar').find(`[href="#${id}"]`).addClass('active');
                  }
              });
      });
  });
  