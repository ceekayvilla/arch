/* -------------------------------------------

Name: 		Moork
Version:    1.0
Author:	bslthemes
Portfolio:  https://themeforest.net/user/bslthemes/

------------------------------------------- */

$(function () {

    "use strict";
    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
    /***************************

    smooth scroll

    **************************
    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
    });*/
    //ScrollTrigger.normalizeScroll(true);

    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".mil-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 60,
            scale: .96,
            ease: 'sine',
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".mil-scale-img");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    counters

    ***************************/
    const number = $(".mil-counter");
    number.each(function (index, element) {
        var count = $(this),
            zero = {
                val: 0
            },
            num = count.data("number"),
            split = (num + "").split("."), // to cover for instances of decimals
            decimals = split.length > 1 ? split[1].length : 0;

        gsap.to(zero, {
            val: num,
            duration: 1.8,
            scrollTrigger: {
                trigger: element,
                toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
                count.text(zero.val.toFixed(decimals));
            }
        });
    });
    /***************************

    back to top

    ***************************/
    var btn = $('#mil-btt');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('mil-show');
        } else {
            btn.removeClass('mil-show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '300');
    });
    /***************************

    menu

    ***************************/
    ScrollTrigger.create({
        start: 'top -30',
        end: 99999,
        toggleClass: {
            className: 'mil-scroll',
            targets: '.mil-top-panel-frame , .mil-navigation'
        }
    });

    $('.mil-menu-btn').on('click', function () {
        $('.mil-menu-btn , .mil-navigation , .mil-content').toggleClass('mil-active');
    });

    /***************************

    sliders

    ***************************/
    var swiper = new Swiper('.mil-iconbox', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
        },
        speed: 800,
        breakpoints: {
            992: {
                slidesPerView: 2,
            },

            1200: {
                slidesPerView: 3,
            },
        },
    });

    var swiper = new Swiper('.mil-projects-1', {
        parallax: true,
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        navigation: {
            prevEl: '.mil-slider-nav .mil-prev',
            nextEl: '.mil-slider-nav .mil-next',
        },
    });

    var swiper = new Swiper('.mil-projects-2', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
        },
        speed: 800,
        initialSlide: 1,
    });

    var swiper = new Swiper('.mil-projects-3', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
    });

    var swiper = new Swiper('.mil-projects-4', {
        parallax: true,
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        navigation: {
            prevEl: '.mil-slider-nav .mil-prev',
            nextEl: '.mil-slider-nav .mil-next',
        },
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".mil-accordion-menu");
        let box = element.querySelector(".mil-accordion-content");
        let boxText = element.querySelector(".mil-accordion-content p");
        let bg = element.querySelector(".mil-accordion-icon");
        let icon = element.querySelector(".mil-accordion-icon i");

        gsap.set(box, {
            height: "auto",
            ease: "sine"
        });

        gsap.set(boxText, {
            opacity: 1,
            ease: "sine"
        });

        gsap.set(icon, {
            rotate: 180,
        });


        let animation = gsap
            .timeline()
            .from(box, {
                onStart: function () {
                    $(bg).addClass("mil-active");
                },
                height: 0,
            })

            .from(boxText, {
                opacity: 0,
            }, '-=.2')

            .from(icon, {
                rotate: 90,
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
                $(bg).removeClass("mil-active");

            } else {
                animation.reverse();
                $(bg).removeClass("mil-active");
            }
        };
    }

    /*
        Video popup
    */
    $('.has-popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        iframe: {
            patterns: {
                youtube_short: {
                index: 'youtu.be/',
                id: 'youtu.be/',
                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        mainClass: 'mfp-fade',
        callbacks: {
            markupParse: function(template, values, item) {
                template.find('iframe').attr('allow', 'autoplay');
            }
        }
    });

});
