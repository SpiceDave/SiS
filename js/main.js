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
		//hide the menu
		//jQuery('#mega-dropdown, .ul-1, .ul-2').hide();
		
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
		jQuery('.li-0').find('span').hide();
		
		
		//bind newly created menu buttons
		jQuery('.top-level').click(function(){console.log(jQuery(this).attr('class'))});
	}
	
	
);

