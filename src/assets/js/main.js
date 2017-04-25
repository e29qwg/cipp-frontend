$(document).ready(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true,
    draggable: true
  });

  if ($('.toprow').length) {
    $('.toprow').pushpin({
      top: $('.toprow').offset().top
    });
  }
});

function scrollUpAndDown(speed) {
  $('html, body').animate({
    scrollTop: $(document).height() - $(window).height() }, speed, function() {
      $(this).animate({ scrollTop: 0 }, speed);
    }
  );
}

function autoScroll(speed) {
  scrollUpAndDown(speed);
  setInterval(function(){scrollUpAndDown(speed)}, speed * 2);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
}
