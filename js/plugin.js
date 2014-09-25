/*!
 * jPushMenu.js
 * 1.1.1
 * @author: takien
 * http://takien.com
 * Original version (pure JS) is created by Mary Lou http://tympanus.net/
 */

(function($) {
		
	$.fn.jPushMenu = function(customOptions) {
		var o = $.extend({}, $.fn.jPushMenu.defaultOptions, customOptions);
		
		/* add class to the body.*/
		
		$('body').addClass(o.bodyClass);
		$(this).addClass('jPushMenuBtn');
		$(this).click(function() {
			var target         = '',
			push_direction     = '';
			
		
			if($(this).is('.'+o.showLeftClass)) {
				target         = '.cbp-spmenu-left';
				push_direction = 'toright';
			}
			else if($(this).is('.'+o.showRightClass)) {
				target         = '.cbp-spmenu-right';
				push_direction = 'toleft';
			}
			else if($(this).is('.'+o.showTopClass)) {
				target         = '.cbp-spmenu-top';
			}
			else if($(this).is('.'+o.showBottomClass)) {
				target         = '.cbp-spmenu-bottom';
			}
			

			$(this).toggleClass(o.activeClass);
			$(target).toggleClass(o.menuOpenClass);
			
			if($(this).is('.'+o.pushBodyClass)) {
				$('body').toggleClass( 'cbp-spmenu-push-'+push_direction );
			}
			
			/* disable all other button*/
			$('.jPushMenuBtn').not($(this)).toggleClass('disabled');
			
			return false;
		});
		var jPushMenu = {
			close: function (o) {
				$('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled active cbp-spmenu-open cbp-spmenu-push-toleft cbp-spmenu-push-toright');
			}
		}

	    if(o.closeOnClickInside) {
	       $(document).click(function() {
	          jPushMenu.close();
	        });

	       $('.cbp-spmenu,.toggle-menu').click(function(e){
	         e.stopPropagation();
	       });
	    }
		
		if(o.closeOnClickOutside) {
			 $(document).click(function() { 
				jPushMenu.close();
			 }); 

			 $('.cbp-spmenu,.toggle-menu').click(function(e){ 
				 e.stopPropagation(); 
			 });
		 }

        // On Click Link
        if(o.closeOnClickLink) {
            $('.cbp-spmenu a').on('click',function(){
                jPushMenu.close();
            });
        }
	};
 
   /* in case you want to customize class name,
   *  do not directly edit here, use function parameter when call jPushMenu.
   */
	$.fn.jPushMenu.defaultOptions = {
		bodyClass       : 'cbp-spmenu-push',
		activeClass     : 'menu-active',
		showLeftClass   : 'menu-left',
		showRightClass  : 'menu-right',
		showTopClass    : 'menu-top',
		showBottomClass : 'menu-bottom',
		menuOpenClass   : 'cbp-spmenu-open',
		pushBodyClass   : 'push-body',
		closeOnClickOutside: true,
		closeOnClickInside: true,
		closeOnClickLink: true
	};
})(jQuery);

/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);

/*
Plugin: jQuery HideHead
Version 0.1.1
Author: Akbar Khrisna
Twitter: @akhrisna

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/
(function($){
	$.fn.hideHead = function(customSettings) {

		// settings
        var settings = $.extend({
            leReplace: 'header',
            leSpeed: 100             
        }, customSettings || {});
        
        // var
        var $this = this,
        	top = $this.css('top'),
        	leReplaceHeight = $(settings.leReplace).height();

        // scroll
	    $(window).scroll(function() {

	    	// when leReplace is out of the viewing window, show the secondary navigation
	        if($(this).scrollTop() > leReplaceHeight) {
	            $this.stop().animate({'top' : '0px'}, settings.leSpeed);
	        } else {
	            $this.stop().animate({'top' : top}, settings.leSpeed);
	        }
	    });
    };
})(jQuery);

/*
Plugin: jQuery HideHead
Version 0.1.1
Author: Akbar Khrisna
Twitter: @akhrisna

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/
(function($){
	$.fn.ingestHead = function(customSettings) {

		// settings
        var settings = $.extend({
            className: 'header',
            top : 100            
        }, customSettings || {});
        
        // var
        var $this = this;

        // scroll
	    $(window).scroll(function() {

	    	// when leReplace is out of the viewing window, show the secondary navigation
	        if($(this).scrollTop() > settings.top) {
	            $this.stop().addClass(settings.className);
	        } else {
	            $this.stop().removeClass(settings.className);
	        }
	    });
    };
})(jQuery);