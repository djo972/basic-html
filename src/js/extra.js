 $(window).scroll(function() {
     const
         a = $(this).scrollTop(),
         b = 500,
         t = window.pageYOffset;

     $(".parallax").css('transform', 'translate(-' + a / 1.6 + 'px, -' + 1 - a / b + 'px)');

     $(".one").css('bottom', -(t * 0.783) + 'px');
     $(".two").css('bottom', -(t * 0.4) + 'px');
     $(".three").css('bottom', -(t * 0.5) + 'px');
     $(".four").css('bottom', -(t * 0.6) + 'px');
     $(".five").css('bottom',-(t * 0.726) + 'px');
 });

alert('afee');