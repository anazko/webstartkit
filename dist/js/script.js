$(document).ready(function() {

    //toggle menu
    $(".menu-toggle").on("click", function() {
        $(".menu-wrp").toggleClass("visible");
        $(".content").toggleClass("menu-visible");
    })

    //scroll to anchor
    $(".main-menu").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 600);
        if (($(window).width() < 1680 ) && ($(".menu-wrp").hasClass("visible"))) {
            $(".menu-toggle").click();
        }
    });
    
    //highlight active link on scroll
    jQuery(window).scroll(function() {
        var $sections = $('section');
        $sections.each(function(i, el) {
            var top = $(el).offset().top - 100;
            var bottom = top + $(el).height();
            var scroll = $(window).scrollTop();
            var id = $(el).attr('id');
            if (scroll > top && scroll < bottom) {
                $('.main-menu a.active').removeClass('active');
                $('.main-menu a[href="#' + id + '"]').addClass('active');
            }
        })
    });

    //smooth scrolling
    SmoothScroll({ keyboardSupport: false });
        
});

$(window).bind('load', function() {

    //preloader
    $('#preload').find('i').fadeOut().end().delay(300).fadeOut(300);
    
    //wowjs
    new WOW().init();
    
});
