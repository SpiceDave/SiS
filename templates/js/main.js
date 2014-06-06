/************************************************
*
* Main Javascript for SiS ecommerce templates
*
* Created by Spicerack Media Ltd
*
************************************************/ 
//path to uk page
var ukUrl = "10.1.1-home-flags-UK.html";
//path to flag images
var flagImagePath = '../img/flags/';
//countries data
var countries = [  
		['UK', 'United Kingdom', 	'UK.png', '#'], 
		['IN', 'India', 			'IN.png', '#'], 
		['RU', 'Russia', 			'RU.png', '#'], 
		['NZ', 'New Zealand', 		'NZ.png', '#'], 
		['ID', 'Indonesia', 		'ID.png', '#'], 
		['WS', 'Samoa', 			'WS.png', '#'],
		['AU', 'Australia', 		'AU.png', '#'],  
		['JP', 'Japan', 			'JP.png', '#'], 
		['SG', 'Singapore', 		'SG.png', '#'], 
		['BD', 'Bangladesh', 		'BD.png', '#'], 
		['KR', 'Korea', 			'KR.png', '#'], 
		['TH', 'Thailand', 			'TH.png', '#'],
		['MY', 'Borneo', 			'MY.png', '#'],
		['MY', 'Malaysia', 			'MY.png', '#'], 
		['TO', 'Tonga', 			'TO.png', '#'], 
		['CN', 'China', 			'CN.png', '#'],
		['KP', 'North Korea', 		'KP.png', '#'],
		['AF', 'Africa', 			'AF.png', '#'],
		['CK', 'Cook Islands', 		'CK.png', '#'],
		['PK', 'Pakistan', 			'PK.png', '#'],
		['EU', 'Europe', 			'EU.png', '#'],
		['FJ', 'Fiji', 				'FJ.png', '#'],
		['PG', 'Papua New Guinea', 	'PG.png', '#'],
		['NA', 'North America', 	'NA.png', '#'],
		['HK', 'Hong Kong', 		'HK.png', '#'],
		['PH', 'Philippines', 		'PH.png', '#'],
		['SA', 'South America', 	'SA.png', '#'],
		  
];
var defaultCurrency = '$USD';

//to execute when the DOM is ready...
jQuery(
	function () {

	    //	    var $searchInput = jQuery("#searchterm"),
	    //	    	$searchDropdown = jQuery(".search-flyout");
	    //	        $sessionID = jQuery("#sessionid");
	    //	        $currentCategoryID = jQuery("#currentcategoryid");



	    //Clear input fields when clicked
	    jQuery('.clicktoclear').bind('click', function () {
	        jQuery(this).val('');
	    });

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
	    jQuery('.li-0').each(function (index) {
	        //add class identifier to what will become top level menu item
	        jQuery(this).find('.top-level').addClass('menu-item-' + index);
	        //add class identifier to what will become list for above menu item, using a class as there will be often more than one submenu item
	        jQuery(this).find('.li-1').addClass('menu-list-' + index);
	        //add the top level menu item to the 'stack'
	        topLevelMenu += jQuery(this).find('span').html();

	    });
	    //create the top level menu items
	    jQuery('#main-menu').append(topLevelMenu);

	    //remove the existing top level items
	    jQuery('.li-0').find('.cat-title').hide();


	    //bind newly created menu buttons
	    jQuery('.top-level').hover(function () {
	        //get the name(s) of the selected class(es)
	        var menuItemNo = String(jQuery(this).attr('class'));
	        //get the length of the string containing the class names
	        var count = menuItemNo.length;
	        // the final character contains the reference to the selected class, so grab it.
	        var menuId = menuItemNo.charAt(count - 1);
	        menu(menuId);
	    });


	    /*****************/

	    //bind mini basket and search components
	    //load
	    jQuery('.basket-over').on('mouseenter', function (e) {
	        loadMiniBasket();
	    });

	    //unload
	    jQuery(document).on('click', '.xclose', function (e) {
	        jQuery('#ajax-menu-container').clearQueue().slideToggle(500, function () {
	            //jQuery(this).html('');
	            //rebind
	            jQuery('.basket-over').on('mouseenter', function (e) {
	                loadMiniBasket()
	            });
	        });
	    });

	    function loadMiniBasket() {
	        //unbind
	        jQuery('.basket-over').off();
	        //jQuery('#ajax-menu-container').load('9.3-mini-basket-component.html', function(){
	        jQuery('#ajax-menu-container').clearQueue().slideToggle(500);
	        //});
	    }

	    //bind mini search functions
	    var active = false;
	    /*clear text field on focus*/
	    jQuery('#search-box input').focus(function () {
	        jQuery(this).val('');
	    });

//	    //		/*show search*/
//	    jQuery('#search-box input').keyup(function () {
//	        var tfVal = jQuery(this).val();
//	        active(tfVal);
//	        if (!active) {
//	            loadMiniSearch();
//	            active = true;
//	        }
//	        if (tfVal.length > 0) {
//	            //do the dynamic loading stuff
//	        }
//	        else {
//	            hideMiniSearch();
//	        }
//	    });
	    //		jQuery(document).click(function(e){
	    //			if(active){
	    //			    var menu = jQuery('#ajax-search-container');
	    //				var searchBox = jQuery('#search-box');
	    //				var searchBoxBg = jQuery('#search-box-bg');
	    //				if ((!menu.is(e.target) && menu.has(e.target).length === 0) && (!searchBox.is(e.target) && searchBox.has(e.target).length === 0) && (!searchBoxBg.is(e.target) &searchBoxBg.has(e.target).length === 0))
	    //				{
	    //					hideMiniSearch();
	    //				}
	    //			}
	    //		});
	    //		

	    //		function loadMiniSearch(){
	    //			jQuery('#ajax-search-container').load('9.2-mini-search-component.html', function(){
	    //				jQuery('#ajax-search-container').clearQueue().slideDown(500);
	    //			});
	    //		}
	    //		
	    //		function hideMiniSearch(){
	    //			active = false;
	    //			jQuery('#ajax-search-container').clearQueue().slideUp(500, function(){
	    //				jQuery(this).html('');
	    //			});
	    //		}


	    //clear floats so next row vertically aligns left and top properly (every fourth sub-menu cat.)
	    jQuery('.ul-1').each(function () {
	        //for each subcat
	        jQuery(this).find('.li-1').each(function (index) {
	            //on 5th, 9th, 13th etc. 
	            if (index % 4 == 0) {
	                //clear floats.
	                jQuery(this).css('clear', 'both');
	            }
	        });
	    });

	    jQuery('#main-menu').mouseenter(function () {
	        //show the menu with appropriate categories already loaded
	        jQuery('#mega-dropdown').slideDown(100, function () { });
	    })
	    jQuery('#mega-dropdown').mouseleave(function () {
	        //show the menu with appropriate categories already loaded
	        jQuery('#mega-dropdown').slideUp(100, function () { });
	    })

	    //buy button overlay
//	    jQuery(document).on('submit', '#products-form, #products-search-form', function (event) {
//	        jQuery('#qb-overlay').fadeIn();
//	        //check for IE7
//	        if (navigator.appVersion.indexOf("MSIE 7.") != -1) {
//	            var windowWidth = jQuery(window).width();
//	            var windowHeight = jQuery(window).height();
//	            var top = (jQuery(window).height() - jQuery('#qb-outer-frame').height()) / 2;
//	            var left = (jQuery(window).width() - jQuery('#qb-outer-frame').width()) / 2;
//	            jQuery('#qb-outer-frame').css({ 'top': top, 'left': left });
//	        }
//	        event.preventDefault();

//	    });


	    /* add to basket component*/

//	    jQuery(document).on('submit', '#add-2-basket, #add-to-basket', function (event) {
//	        jQuery('#qb-overlay').fadeOut();
//	        jQuery('#ab-overlay').fadeIn();

//	        //check for IE7
//	        if (navigator.appVersion.indexOf("MSIE 7.") != -1) {
//	            var windowWidth = jQuery(window).width();
//	            var windowHeight = jQuery(window).height();
//	            var top = (jQuery(window).height() - jQuery('#ab-outer-frame').height()) / 2;
//	            var left = (jQuery(window).width() - jQuery('#ab-outer-frame').width()) / 2;
//	            jQuery('#ab-outer-frame').css({ 'top': top, 'left': left });
//	        }
//	        event.preventDefault();
//	    });
//	    /* close */
	    //	    jQuery('.ab-buttons').click(function () { jQuery('#ab-overlay').fadeOut(); });

	    jQuery('.continue-shopping').click(function () { jQuery('#ab-overlay').fadeOut(); });
		
		
		/**************
		*
		* additional code for countries/currencies
		*
		***************/
		
		/*bind the flag and labels*/
		jQuery('span[id*="flag-label"]').click(function(e){
			id = e.target.id;
			id = id.replace('flag-label-', '');
			changeCountry(id);
		});
		
		jQuery('img[id*="flag-image"]').click(function(e){
			id = e.target.id;
			id = id.replace('flag-image-', '');
			changeCountry(id);
		});
		
		/*bind the currency labels*/
		jQuery('span[id*="currency"]').click(function(e){
			id = e.target.id;
			id = id.replace('currency-', '');
			id = id.toUpperCase();
			changeCurrency(id);
		});
		
		function changeCurrency(id){
			//set the value of the existing html form using jquery to that selected by the user	
			jQuery("select option").filter(function() {
				return $(this).val() == id;
			}).prop('selected', true);
			
			//change the displayed value of the currency and slide up the menu ******** this may be extraneous code depending on implimentation method (if form submits) **********
			jQuery('#currency-code').text('$'+id);
			jQuery('#js-currencies').slideUp(100, function () { });
			
			//submit the form
			jQuery('#uk-currency-sel').submit();
		}
		
		function changeCountry(id){
			
			//set the value of the existing html form using jquery to that selected by the user	
			jQuery("select option").filter(function() {
				return $(this).val() == countries[id][0];
			}).prop('selected', true);
			
			//change the displayed value of the country code and flag and slide up the menu ******** this may be extraneous code depending on implimentation method (if form submits) **********
			jQuery('#country-code').text(countries[id][0]);
			//change flag
			jQuery('#dyn-flag').attr('src', flagImagePath + countries[id][2]);
			jQuery('#js-currencies').slideUp(100, function () { });
			
			//IF UK is selected return to UK form
			if(countries[id][0] == 'UK')
			{
				jQuery('#uk-currency-sel').attr('action', ukUrl);
			}
			jQuery('#uk-currency-sel').submit();
			
			
		}
		
		//#countries-selector
		jQuery('#countries-selector').click(function () {
	        //show the countries table
	        jQuery('#js-countries').slideToggle(100, function () { });
	    })
	    jQuery('#js-countries').mouseleave(function () {
	        //hide
	        jQuery('#js-countries').slideUp(100, function () { });
	    })
		
		//#currencies-selector
		jQuery('#currency-selector').click(function () {
	        //show the currencies table
	        jQuery('#js-currencies').slideToggle(100, function () { });
	    })
	    jQuery('#js-currencies').mouseleave(function () {
	        //hide
	        jQuery('#js-currencies').slideUp(100, function () { });
	    })
		
		//get url vars on page load and set up form and javascripted alternative
		var selectedCountry = getUrlVars()["countries-opt"];
		var selectedCurrency = getUrlVars()["currency-opt"];//user value
		if(!(selectedCurrency))
		{
			//set a default currency
			selectedCurrency = defaultCurrency;
		}
		
		
		/**
		* set up countries to reflect url vars
		**/
		
		//change the *displayed* selected country text
		jQuery('#country-code').text(selectedCountry);
		
		//change flag - look for the entry that matches the given county code in the array
		for(i = 0; i < countries.length; i++)
		{
			if(selectedCountry == countries[i][0])
			{
				jQuery('#dyn-flag').attr('src', flagImagePath + countries[i][2]);
				//reset title text on images and text
				jQuery('#dyn-flag').attr('title', countries[i][1]);
				jQuery('#country-code').attr('title', countries[i][1]);
				//set the *form value* for selected country code (from the default)
				jQuery("select option").filter(function() {
					return $(this).val() == countries[i][0];
				}).prop('selected', true);
			}
		}
		
		/**
		* set up currencies to reflect url vars
		**/
		
		//change the *displayed* selected country text
		jQuery('#currency-code').text('$'+selectedCurrency);
		
		//set the value of the existing html form using jquery to that selected by the user	
		jQuery("select option").filter(function() {
			return $(this).val() == selectedCurrency;
		}).prop('selected', true);		
        
	}
);

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
    
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
    
    jQuery('#yt-overlay iframe').attr('src', '');
    jQuery('#yt-overlay h2').text('');
    jQuery('#yt-overlay h3').text('');
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






//jQuery(
//	function () {


//	    //		/*show search*/
//	    jQuery('#search-box input').keyup(function () {
//	        var tfVal = jQuery(this).val();
//	        alert (tfVal);
//	        if (!active) {
//	            loadMiniSearch();
//	            active = true;
//	        }
//	        if (tfVal.length > 0) {
//	            //do the dynamic loading stuff
//	        }
//	        else {
//	            hideMiniSearch();
//	        }
//	    });


//	});

/* additional code */ 

/*var items = [[1,2],[3,4],[5,6]];
alert(items[0][0]); // 1*/









