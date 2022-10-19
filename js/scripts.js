window.onload = function () {

  // Ленивая загрузка видео
  function lazyVideo() {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (video) {
          if (video.isIntersecting) {
            for (var source in video.target.children) {
              var videoSource = video.target.children[source];
              if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                videoSource.src = videoSource.dataset.src;
              }
            }
            video.target.load();
            video.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      },
        {
          threshold: 1,
        }
      );
      lazyVideos.forEach(function (lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  }
  lazyVideo();

  // Выпадайки при клике по кнопке
	// Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
	// Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
	function dropBlock(btn, lock = false) {
		let $this = undefined,
				drop = undefined,
				close = $('.js-drop-close'),
        body = $('body'),
        header = $('.header-eiv');
		btn.on('click', function () {
			$this = $(this);
			drop = $('#' + $this.data('drop'));
      let scrollWidth = (window.innerWidth - $(window).width());
      if (!$this.hasClass('is-active')) {
        $this.addClass('is-active');
        drop.addClass('open');
        if (lock) {
          body.toggleClass('lock');
          body.css('padding-right', scrollWidth);
          header.css('padding-right', scrollWidth);
        }
      } else {
        $this.removeClass('is-active');
        drop.removeClass('open');
        body.removeClass('lock');
        body.css('padding-right', 0);
        header.css('padding-right', 0);
      }
			$(document).mouseup(function (e) {
				if (!$this.is(e.target)
					&& $this.has(e.target).length === 0
					&& !drop.is(e.target)
					&& drop.has(e.target).length === 0) {
					$this.removeClass('is-active');
					drop.removeClass('open');
          body.removeClass('lock');
          body.css('padding-right', 0);
          header.css('padding-right', 0);
				}
			});
		})
		close.on('click', function () {
			$('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
			$('#' + $(this).data('drop')).removeClass('open');
      body.removeClass('lock');
      body.css('padding-right', 0);
		})
	}
  dropBlock($('.js-drop-btn'));
  dropBlock($('.js-drop-menu'), true);

  // slinky | Мобильное меню
  const slinky = $('.mobile-menu__nav').slinky();
  const slinky2 = $('#mobileMenuTel').slinky();

  // Sticky Sidebar | Прилипающий сайдбар
  if ($('#sidebar').length) {
    const sidebar = new StickySidebar('#sidebar', { 
      topSpacing: 100,
      bottomSpacing: 20,
     });
  }

  // Swiper | Слайдер
  if ($('#welcomeSlider').length) {
    const welcomeSlider = new Swiper('#welcomeSlider', {
      slidesPerView: 1,
    });
  }

}