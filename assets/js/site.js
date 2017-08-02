$(document).ready(function() {
  $('#purchase-anchor').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate(
      { scrollTop: $('section.purchase-cards').offset().top },
      500
    );
  });

  // Mobile Reservations Form Display Mobile Height Fix
  $('.btn-primary.reservations').click(function(e) {
    var splashHeight = $('#modal-reservations').height() + 200;
    $('.splash').css({ 'min-height': splashHeight });
  });

  $('#modal-reservations button.close').click(function() {
    $('.splash').css({ 'min-height': '0' });
  });

  $('#reservationsdatepicker').datepicker({
    format: 'mm-dd-yyyy'
  });

  // Mobile Menu Effects
  $('#nav-icon3').click(function() {
    $(this).toggleClass('open');
    $('.logo').toggle();
    $('.navbar-header').toggleClass('background');

    // Make the mobile navigation dropdown cover the entire screen for no reason
    var docHeight = $('body').height();

    if ($('#main-nav').hasClass('active')) {
      $('#main-nav').css({ height: '100%' });
      $('#main-nav').toggleClass('active');
    } else {
      $('#main-nav').css({ height: docHeight });
      $('#main-nav').toggleClass('active');
    }
  });

  // Scroll Animations
  wow = new WOW({
    mobile: false,
    offset: 60
  });
  wow.init();

  // Smooth Scroll Anchor Links
  $('a[href*=#]').on('click', function(event) {
    if (!$(this).hasClass('question')) {
      event.preventDefault();
      var animobject = $(this.hash);

      setTimeout(function() {
        $('html,body').animate({ scrollTop: animobject.offset().top }, 500);
      }, 500);
    }
  });

  // Home Page
  // Set Splash section to full window height
  function splashHeight() {
    var windowHeight = window.innerHeight;
    $('section.splash').css({ height: windowHeight });
  }
  splashHeight();
  $(window).resize(function() {
    splashHeight();
  });

  // Menu Category Tabs + Deep Link
  $('.nav-tabs li a').click(function(e) {
    var href = $(this).attr('href');
    history.pushState(null, null, href);
    e.preventDefault();
    $(this).tab('show');
  });

  $(function() {
    if (location.hash) {
      var activeTab = $('[href=' + location.hash + ']');
      activeTab && activeTab.tab('show');
    }
  });

  // Style Select Dropdowns
  $('select').selectOrDie();

  // Init Date + Time Pickers
  $('#start-time').datetimepicker({
    pickDate: false,
    minuteStepping: 30
  });
  $('#end-time').datetimepicker({
    pickDate: false,
    minuteStepping: 30
  });
  $('#datepicker').datetimepicker({
    pickTime: false
  });

  $('#start-time-events').datetimepicker({
    pickDate: false,
    minuteStepping: 30
  });
  $('#end-time-events').datetimepicker({
    pickDate: false,
    minuteStepping: 30
  });
  $('#datepicker-events').datetimepicker({
    pickTime: false
  });

  // Mobile Jobs and Team Close Button

  $('.listing .btn-readmore').click(function() {
    $('.listing').removeClass('read-more');
    $(this).parents('.listing').toggleClass('read-more');
  });

  $('.listing .close').click(function() {
    $(this).parents('.listing').removeClass('read-more');
  });

  // Form Validation Post Forms
  // $(document).on("click", 'button.submit-post', function(event)  {
  //   event.preventDefault();
  //   var $form = $(this).parents('form');
  //   var error;

  //   function resetErrors() {
  //     error = false;
  //     $('.error-msg, .success-msg').hide();
  //     $form.find('input').parent().removeClass('error');
  //   }

  //   //Validations
  //   resetErrors();

  //   var required = ['email', 'firstName', 'lastName'];

  //   _.each(required, function (requiredId) {
  //     var $input = $form.find('#'+requiredId);
  //     if ($input.length > 0 && $input.val() === '') {
  //       $input.parent().addClass('error');
  //       error = true;
  //     }
  //   });

  //   if (error) {
  //     $form.find('.error-msg').show();
  //     return false;
  //   } else {
  //     var datastring = $form.serialize();

  //     $.ajax({
  //         type: 'POST',
  //         url: $(this).parents('form').attr('action'),
  //         data: datastring,
  //         success: function(data, textStatus) {
  //           resetErrors();
  //           $(event.target).hide();
  //           $form.find('.success-msg').show();
  //         },
  //         error: function(xhr, status, error){
  //           console.log(xhr, status, error);
  //         }
  //     });
  //   }
  // });

  // Form Validation Get Forms
  $(document).on('click', 'button.submit-get', function(event) {
    event.preventDefault();
    var $form = $(this).parents('form');
    var error;

    function resetErrors() {
      error = false;
      $('.error-msg, .success-msg').hide();
      $form.find('input').parent().removeClass('error');
    }

    //Validations
    resetErrors();

    var required = ['email', 'firstName', 'lastName'];

    _.each(required, function(requiredId) {
      var $input = $form.find('#' + requiredId);
      if ($input.length > 0 && $input.val() === '') {
        $input.parent().addClass('error');
        error = true;
      }
    });

    if (error) {
      $form.find('.error-msg').show();
      return false;
    } else {
      var url =
        $(this).parents('form').attr('action') + '?' + $form.serialize();
      window.open(url, '_blank');
    }
  });

  // jobs form
  $('.form-jobs').submit(function(e) {
    var $form = $(this);
    e.preventDefault();
    var error;

    // reset errors
    function resetErrors() {
      error = false;
      $form.find('.error-msg, .success-msg').hide();
      $form.find('input').parent().removeClass('error');
    }
    resetErrors();

    // check required
    var required = ['first_name', 'last_name', 'email'];
    _.each(required, function(requiredId) {
      var $input = $form.find('#' + requiredId);
      if ($input.length > 0 && $input.val() === '') {
        $input.parent().addClass('error');
        error = true;
      }
    });

    // check for errors
    if (error) {
      $form.find('.error-msg').show();
      return false;
    } else {
      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize(),
        success: function(data, textStatus) {
          resetErrors();
          $form.find('.btn-submit').hide();
          $form.find('.success-msg').show();
        },
        error: function(xhr, status, error) {
          $form.find('.error-msg').show();
          console.log(xhr, status, error);
        }
      });
    }
  });
});
