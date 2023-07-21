window.app = {};

app.clone = {
    data: {
        attr: 'data-clone'
    },
    
    created() {
        $('[data-clone]').each(this.cloneAndAppend());
    },

    cloneAndAppend() {
        let _this = this;
        
        return function () {
            let element = $($(this).attr(_this.data.attr));

            if (!element.length) return;

            $(this).append(_this.cloneElement(element));

            $(this).removeAttr(_this.data.attr);
        }
    },
    
    cloneElement(element) {
        return element.clone(true, true).removeAttr('id').addClass('__cloned')
    }
}

app.header = {
    data: {},

    created() {
        $('.header_search').click(function (e) {
            e.preventDefault();
            
            $('.search-block').addClass('active')
        })
        $('.search-block_close').click(function (e) {
            e.preventDefault();
            
            $('.search-block').removeClass('active')
        });
        
        $(window).on('scroll', function () {
            if ($(document).scrollTop() >= $('.section-2').offset().top) {
                $('.clone-header').addClass('active')
            } else {
                $('.clone-header').removeClass('active')
            }
        })
    }
};

app.main = {
    data: {},

    created() {
        this.resize();
        
        $(window).on('scroll', () => {
            this.resize();
        })
    },
    resize() {
        if ($(document).scrollTop() > 0) {
            $('.section-1_text, .main_bg, .section-1_links, .section-1_image, .section-2, .main_video').addClass('active')
        } else {
            $('.section-1_text, .main_bg, .section-1_links, .section-1_image, .section-2, .main_video').removeClass('active')
        }
    }
};

app.searchBlock = {
    data: {},

    created() {
        $('.search-block_categories a').click(function (e) {
            e.preventDefault();

            $('.search-block_categories a, .search-block_block').removeClass('active')
            let block = $('[data-id="' + $(this).attr('href') + '"]');
            $(this).addClass('active')
            block.addClass('active')
        });
        
        $('.search-block_categories a').each(function () {
            let block = $('[data-id="' + $(this).attr('href') + '"]');
            $(this).after(block.clone(true, true).addClass('__clone'))
        })
    }
};

app.section2 = {
    data: {},

    created() {
        setTimeout(() => {
            this.showTitle();
        }, 5000)
    },
    
    showTitle() {
        $('.section-2_item-value').fadeOut(300, function () {
            $('.section-2_item-title').fadeIn(300);
        });

        setTimeout(() => {
            this.showValue();
        }, 5000)
    },
    
    showValue() {
        $('.section-2_item-title').fadeOut(300, function () {
            $('.section-2_item-value').fadeIn(300);
        });

        setTimeout(() => {
            this.showTitle();
        }, 5000)
    }
};

jQuery(function () {
    for (let module in app) {
        app[module].created();
    }
});


$(".multiple-items").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  });
  