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

  // Waslidemenu | Мобильное меню
  // $('.mobile-menu__nav').waSlideMenu({
  //   backOnTop: true,
  //   backLinkContent: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <path d="M46.625 22.4999H7.50862L16.5081 13.5004L14.3869 11.3791L1.76596 24L14.3869 36.6209L16.5081 34.4996L7.50843 25.4999H46.625V22.4999V22.4999Z" fill="#999"/>
  //   </svg>`,
  //   slideSpeed: 300,
  //   autoHeightMenu: true,
  // });

  // $('.mobile-menu__contact').waSlideMenu({
  //   backOnTop: true,
  //   backLinkContent: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <path d="M46.625 22.4999H7.50862L16.5081 13.5004L14.3869 11.3791L1.76596 24L14.3869 36.6209L16.5081 34.4996L7.50843 25.4999H46.625V22.4999V22.4999Z" fill="#999"/>
  //   </svg>`,
  //   slideSpeed: 300,
  //   autoHeightMenu: true,
  // });

  const slinky = $('.mobile-menu__nav').slinky();
  const slinky2 = $('#mobileMenuTel').slinky();

}