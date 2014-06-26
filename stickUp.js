jQuery(
    function($) {
        "use strict";

        var contentTop = [],
            content = [],
            lastScrollTop = 0,
            scrollDir = '',
            itemClass = '',
            itemHover = '',
            menuSize = null,
            stickyHeight = 0,
            stickyMarginB = 0,
            currentMarginT = 0,
            topMargin = 0,
            vartop = 0,
            $menu, $this, $content, $itemClass, varscroll, contentView, testView;


        $(window).scroll(function(event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                scrollDir = 'down';
            } else {
                scrollDir = 'up';
            }
            lastScrollTop = st;
        });
        $.fn.stickUp = function(options) {
            $this = $(this);
            // adding a class to users div
            $this.addClass('stuckMenu');

            $menu = $('.stuckMenu');
            //getting options
            var objn = 0;
            if (options != null) {
                for (var o in options.parts) {
                    if (options.parts.hasOwnProperty(o)) {
                        content[objn] = options.parts[objn];
                        objn++;
                    }
                }
                if (objn == 0) {
                    console.warn('error:needs arguments');
                }

                itemClass = options.itemClass;
                itemHover = options.itemHover;

                if (options.topMargin != null) {
                    if (options.topMargin == 'auto') {
                        topMargin = parseInt($menu.css('margin-top'));
                    } else {
                        if (isNaN(options.topMargin) && options.topMargin.search("px") > 0) {
                            topMargin = parseInt(options.topMargin.replace("px", ""));
                        } else if (!isNaN(parseInt(options.topMargin))) {
                            topMargin = parseInt(options.topMargin);
                        } else {
                            console.log("incorrect argument, ignored.");
                            topMargin = 0;
                        }
                    }
                } else {
                    topMargin = 0;
                }
                menuSize = $('.' + itemClass).size();
            }
            stickyHeight = parseInt($this.height());
            stickyMarginB = parseInt($this.css('margin-bottom'));
            currentMarginT = parseInt($this.next().closest('div').css('margin-top'));
            vartop = parseInt($this.offset().top);

            return $this;
        }
        $(document).on('scroll', function() {
            varscroll = parseInt($(document).scrollTop());

            $menu = $('.stuckMenu');
            if (menuSize != null) {
                for (var i = 0; i < menuSize; i++) {
                    $content = $('#' + content[i]);
                    $itemClass = $('.' + itemClass);
                    contentTop[i] = $content.offset().top;

                    if (scrollDir == 'down' && varscroll > contentTop[i] - 50 && varscroll < contentTop[i] + 50) {
                        $itemClass.removeClass(itemHover);
                        $itemClass.filter(':eq(' + i + ')').addClass(itemHover);
                    }
                    if (scrollDir == 'up') {

                        contentView = $content.height() * 0.4;
                        testView = contentTop[i] - contentView;

                        if (varscroll > testView) {
                            $itemClass.removeClass(itemHover);
                            $itemClass.filter(':eq(' + i + ')').addClass(itemHover);
                        } else if (varscroll < 50) {
                            $itemClass.removeClass(itemHover);
                            $itemClass.filter(':eq(0)').addClass(itemHover);
                        }
                    }
                }
            }



            if (vartop < varscroll + topMargin) {
                $menu.addClass('isStuck');
                $menu.next().closest('div').css({
                    'margin-top': stickyHeight + stickyMarginB + currentMarginT + 'px'
                }, 10);
                $menu.css("position", "fixed");
                $('.isStuck').css({
                    top: '0px'
                }, 10, function() {

                });
            };

            if (varscroll + topMargin < vartop) {
                $menu.removeClass('isStuck');
                $menu.next().closest('div').css({
                    'margin-top': currentMarginT + 'px'
                }, 10);
                $menu.css("position", "relative");
            };

        });

    });
