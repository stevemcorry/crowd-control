$(document).ready(function(){
// Hides the header
  $(window).scroll(function() {
    if($(window).scrollTop() < 15){
      $('header').removeClass('smallHeader');
      $('.topTitle').removeClass('smallLogo');
      $('button').removeClass('smallButton');
    } else {
      $('header').addClass('smallHeader');
      $('.topTitle').addClass('smallLogo');
      $('button').addClass('smallButton');
    }
   });

//Widens the Left and right columns

  $('.leftBar, .rightBar').hover(function() {
    $(this).toggleClass("widen");
  });


//Module open and close
var modal = $('.aptForm');
var btn = $('.addApt');
var close = $('.close');
var submit =$('.submitApt');
//close modal by clicking X
close.on('click',function() {
  modal.css('display','none');
});
//closes modal after submitting
submit.on('click',function() {
  if($('.submitName').val()&&$('.submitPerRoom').val()&&$('.submitComplex').val()){
  modal.css('display','none');
}
});
//close modal by clicking anywhere else
 // $($('.aptForm')).on('click',function() {
 //   modal.css('display','none');
 // });
 //open modal
 btn.on('click',function() {
   modal.css('display','flex');
 });

// adds an apt box

// var boxAptCount = 0;
// $('.addApt').on('click', function() {
//     $('.meat').append("<div class='boxApt'>");
//     boxAptCount++;
//
// });

});
