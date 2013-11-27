/************************************************
*
* Main Javascript for SiS ecommerce templates
*
* Created by Spicerack Media Ltd
*
************************************************/ 

//to execute when the DOM is ready...
jQuery(
	function(){
        
        var doc = document.documentElement;
        doc.setAttribute('data-useragent', navigator.userAgent);
	
       
	   /* sticky footer doesn't really work visually with this design
	    stickFooter(); 
		setTimeout(stickFooter, 1000);
		jQuery(window).resize(function() { stickFooter()});
		*/ 
		
		//hide the menu
		jQuery('#mega-dropdown, .ul-0, #css-menu').hide();
		
		//copy top level menu items to header
		var topLevelMenu = '';
		jQuery('.li-0').each(function(index){
			//add class identifier to what will become top level menu item
			jQuery(this).find('.top-level').addClass('menu-item-'+index);
			//add class identifier to what will become list for above menu item, using a class as there will be often more than one submenu item
			jQuery(this).find('.li-1').addClass('menu-list-'+index);
			//add the top level menu item to the 'stack'
			topLevelMenu += jQuery(this).find('span').html();
			
		});
		//create the top level menu items
		jQuery('#main-menu').append(topLevelMenu);
		
		//remove the existing top level items
		jQuery('.li-0').find('.cat-title').hide();
	
		
		//bind newly created menu buttons
		jQuery('.top-level').hover(function(){
			//get the name(s) of the selected class(es)
			var menuItemNo = String(jQuery(this).attr('class'));
			//get the length of the string containing the class names
			var count = menuItemNo.length;
			// the final character contains the reference to the selected class, so grab it.
			var menuId = menuItemNo.charAt(count-1);
			menu(menuId);
		});
		
		/* add to basket component*/
		/*jQuery('add-button').click(function(){
			jQuery.get("9.7-add-to-basket-component.html", function (data) {
				jQuery("#main").append(data);
			});
		});*/
		
		jQuery(document).on( 'submit', '#add-2-basket, #add-to-basket', function(event) {
			jQuery.get("9.7-add-to-basket-component.html", function (data) {
				jQuery("#main").append(data);
			});
			
			
            //check for IE7
            if(navigator.appVersion.indexOf("MSIE 7.")!=-1) {
              var windowWidth = jQuery(window).width();
              var windowHeight = jQuery(window).height();
              var top =  (jQuery(window).height() - jQuery('#ab-outer-frame').height())/2;
              var left = (jQuery(window).width() - jQuery('#ab-outer-frame').width())/2;
              jQuery('#ab-outer-frame').css({'top':top, 'left':left});
            } 
			event.preventDefault();
            
        });
		/*****************/
		
		//bind mini basket and search components
		//load
		jQuery('.basket-over').on('mouseenter', function(e){
			loadMiniBasket();
		});
				
		//unload
		jQuery(document).on( 'click', '.xclose', function(e) {
			jQuery('#ajax-menu-container').clearQueue().slideToggle(500, function(){
				jQuery(this).html('');
				//rebind
				jQuery('.basket-over').on('mouseenter', function(e){
					loadMiniBasket()
				});
			});
        });
		
		function loadMiniBasket(){
			//unbind
			jQuery('.basket-over').off();
			jQuery('#ajax-menu-container').load('9.3-mini-basket-component.html', function(){
				jQuery('#ajax-menu-container').clearQueue().slideToggle(500);
			});
		}
		
		//bind mini search functions
		var active = false; 
		/*clear text field on focus*/
		jQuery('#search-box input').focus(function(){
			jQuery(this).val('');
		});

		/*show search*/
		jQuery('#search-box input').keyup(function(){
			var tfVal = jQuery(this).val();
			if(!active)
			{
				loadMiniSearch();
				active = true;
			}
			if(tfVal.length > 0)
			{
				//do the dynamic loading stuff
			}
			else
			{
				hideMiniSearch();
			}
		});
		

		function loadMiniSearch(){
			jQuery('#ajax-search-container').load('9.2-mini-search-component.html', function(){
				jQuery('#ajax-search-container').clearQueue().slideDown(500);
			});
		}
		
		function hideMiniSearch(){
			active = false;
			jQuery('#ajax-search-container').clearQueue().slideUp(500, function(){
				jQuery(this).html('');
			});
		}
		
		
		//clear floats so next row vertically aligns left and top properly (every fourth sub-menu cat.)
		jQuery('.ul-1').each(function(){
			//for each subcat
			jQuery(this).find('.li-1').each(function(index){
				//on 5th, 9th, 13th etc. 
				if(index %4 == 0)
				{
					//clear floats.
					jQuery(this).css('clear','both');
				}
			});
		});
		
		jQuery('#main-menu').mouseenter(function(){
			//show the menu with appropriate categories already loaded
			jQuery('#mega-dropdown').slideDown(100, function(){});
		})
		jQuery('#mega-dropdown').mouseleave(function(){
			//show the menu with appropriate categories already loaded
			jQuery('#mega-dropdown').slideUp(100, function(){});
		})
		
		//buy button overlay
		jQuery(document).on( 'submit', '#products-form, #products-search-form', function(event) {
			jQuery('#qb-overlay').fadeIn();
            //check for IE7
            if(navigator.appVersion.indexOf("MSIE 7.")!=-1) {
              var windowWidth = jQuery(window).width();
              var windowHeight = jQuery(window).height();
              var top =  (jQuery(window).height() - jQuery('#qb-outer-frame').height())/2;
              var left = (jQuery(window).width() - jQuery('#qb-outer-frame').width())/2;
              jQuery('#qb-outer-frame').css({'top':top, 'left':left});
            } 
			event.preventDefault();
            
        });
		
	}		
);

function menu(id){
	//hide the other categories - grab the root ul
	jQuery('.li-1').parents('.ul-0').hide();
	//show the correct submenu categories, again by the root ul
	jQuery('.menu-list-'+ id).parents('.ul-0').show();
}

/*Youtube video overlay*/
function ytoverlay(id){
	// get the values to be shown in the  lightbox overlay 
	var title = jQuery('.video-item').eq(id).find('h3').text();
    var subtitle = jQuery('.video-item').eq(id).find('h4').text();
    var linksrc = jQuery('.video-item').eq(id).find('h5').text();
	//fade in the overlay and set values
    jQuery('#yt-overlay').fadeIn();
    jQuery('#yt-overlay h2').text(title);
    jQuery('#yt-overlay h3').text(subtitle);
    jQuery('#yt-overlay iframe').attr('src',linksrc);
    
   //check for IE7
    if(navigator.appVersion.indexOf("MSIE 7.")!=-1) {
      var windowWidth = jQuery(window).width();
      var windowHeight = jQuery(window).height();
      var top =  (jQuery(window).height() - jQuery('#yt-outer-frame').height())/2;
      var left = (jQuery(window).width() - jQuery('#yt-outer-frame').width())/2;
      jQuery('#yt-outer-frame').css({'top':top, 'left':left});
    } 
    
}
/*close video overlay*/
function ytclose(){
	 jQuery('#yt-overlay').fadeOut();
}

/*close quick buy overlay*/
function qbclose(){
	 jQuery('#qb-overlay').fadeOut();
}

/*sticky footer - expands the content area to meet the css sticky footer */
/*
function stickFooter(){
	//get content height
	var contentHeight = jQuery('#content').height();
	//get window height
	var windowHeight = jQuery(window).height();
	//get combined height of header and footer
	var remainder = jQuery('#header').height() + jQuery('#sticky-footer').height();
	
	//if content is short enough to need lengthening..
	if( windowHeight >= (contentHeight + remainder))
	{
		jQuery('#content').css('height', windowHeight - remainder);
	}
}*/
		





