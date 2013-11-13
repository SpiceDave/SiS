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
		/* load inner page -REMOVE--BEFORE--DELIVERY- *****/
		var query = (window.location.href).split('?');
		var filename = query[1];
		jQuery( "#content" ).load(filename);
		/**************************************************/
		
		
		
		
		
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
			jQuery('#ajax-menu-container').load('mini-basket-component.html', function(){
				jQuery('#ajax-menu-container').clearQueue().slideToggle(500);
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
			alert('Quick buy overlay to build'); 
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
	var title = jQuery('.video-item').eq(id).find('h3').text();
    var subtitle = jQuery('.video-item').eq(id).find('h4').text();
    var linksrc = jQuery('.video-item').eq(id).find('h5').text();
    jQuery('#yt-overlay').fadeIn();
    jQuery('#yt-overlay h2').text(title);
    jQuery('#yt-overlay h3').text(subtitle);
    jQuery('#yt-overlay iframe').attr('src',linksrc);
    
}
/*close video overlay*/
function ytclose(){
	 jQuery('#yt-overlay').fadeOut();
}






