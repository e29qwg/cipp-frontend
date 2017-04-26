$(document).ready(function() {
  $(".button-collapse").sideNav({
    closeOnClick: true,
    draggable: true
  });

  if ($('.table-header').length) {
    $('.table-header').pushpin({
      top: $('.table-header').offset().top
    });

    var lagTime = 5000; // 5s
    var duration = 120000; // 120s
    setTimeout(startScroll, lagTime, lagTime, duration);
  }
});

function startScroll(lagTime, duration) {
  autoScroll(duration);
  setInterval(autoScroll, (duration * 2) + lagTime, duration);
}

function autoScroll(speed) {
  $('html, body').animate({
    scrollTop: $(document).height() - $(window).height() }, speed, function() {
      $(this).animate({ scrollTop: 0 }, speed);
    }
  );
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
