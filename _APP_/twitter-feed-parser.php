<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<!--
/* @license
 * MyFonts Webfont Build ID 2662269, 2013-10-10T06:20:34-0400
 * 
 * The fonts listed in this notice are subject to the End User License
 * Agreement(s) entered into by the website owner. All other parties are 
 * explicitly restricted from using the Licensed ../webfonts(s).
 * 
 * You may obtain a valid license at the URLs below.
 * 
 * Webfont: Helvetica 55 Roman by Linotype
 * URL: http://www.myfonts.com/fonts/linotype/neue-helvetica/helvetica-55-roman/
 * Copyright: Part of the digitally encoded machine readable outline data for producing the Typefaces provided is copyrighted (c) 1988, 1990, 1993, 1996, 2003 Linotype Library GmbH, www.linotype.com. All rights reserved. This software is the property of Linotype Librar
 * 
 * Webfont: Helvetica 75 Bold by Linotype
 * URL: http://www.myfonts.com/fonts/linotype/neue-helvetica/helvetica-75-bold/
 * Copyright: Copyright (c) 1988, 1990, 1993, 1996, 2003 Linotype Library GmbH, www.linotype.com. All rights reserved. This software may not be reproduced, used, displayed, modified, disclosed or transferred without the express written approval of Linotype Library GmbH
 * 
 * 
 * License: http://www.myfonts.com/viewlicense?type=web&buildid=2662269
 * Licensed pageviews: 250,000
 * 
 * © 2013 MyFonts Inc
*/

-->

<title>SiS tweets app.</title>
<style type="text/css">

@charset "UTF-8";@font-face{font-family:'HelveticaNeueLT-Bold';src:url('../webfonts/290E30_0_0.eot');src:url('../webfonts/290E30_0_0.eot?#iefix') format('embedded-opentype'),url('../webfonts/290E30_0_0.woff') format('woff'),url('../webfonts/290E30_0_0.ttf') format('truetype')}
@font-face{font-family:'HelveticaNeueLT-Roman';src:url('../webfonts/290E30_1_0.eot');src:url('../webfonts/290E30_1_0.eot?#iefix') format('embedded-opentype'),url('../webfonts/290E30_1_0.woff') format('woff'),url('../webfonts/290E30_1_0.ttf') format('truetype')}

body{
	margin:0;
}

#container{
	background-color: #48C4D9;
	height:150px;
	width:410px;
	font-family: HelveticaNeueLT-Roman;
}
#inner{
	left:29px;
	top:14px;
	width:352px;
	position:relative;
}
.tweet, .tweeter{
	text-transform:uppercase;
}
.tweeter{
	font-size:20px;
}
.tweet{
	font-size:20px;
	padding-top:10px;
	line-height:20px;
	font-family: HelveticaNeueLT-Bold;
}
.tweeter a, .follow-us a{
	color:#A9E9F3;
}
.tweet a, .tweet{
	color:#0C6C7C;
}
.follow-us{
	right: 0;
	position: absolute;
	width:180px;
	height:40px;
	text-align: right;
	font-size:14px;
}
.twitter_date{
	text-transform:uppercase;
	font-size: 11px;
	color: #A9E9F3;
	top: 100px;
	right: 0px;
	position: absolute;
}
.button{
	top: 100px;
	left: 0px;
	position: absolute;
}
a img{
	border:0;
}
.follow-us span, .follow-us img{
	vertical-align: middle;
}
a {
	text-decoration:none;
}
</style>
</head>

<body>

<?php

/**
 * Twitter Feed Parser
 * 
 * @version  	1.1.2
 * @author	Dario Zadro
 * @link	http://zadroweb.com/your-twitter-feed-is-broken/
 * 
 * Notes:
 * Caching is used - Twitter only allows 180 queries for every 15 minutes
 * See: https://dev.twitter.com/docs/rate-limiting/1.1
 * Super simple debug mode will output returned API variable
 * --
 * Twitter time is displayed (ex. "about 1 hour ago")
 * 
 * Credits:
 * Twitter API: https://github.com/J7mbo/twitter-api-php
 * Hashtag/Username Parsing: http://snipplr.com/view/16221/get-twitter-tweets/
 * Time Ago (modified) Function: http://css-tricks.com/snippets/php/time-ago-function/
 */
 
// Your Twitter App Settings
// https://dev.twitter.com/apps
$access_token			= '18896412-vgQETqzDvGXuje6d0pE8MqW3JFKoPkOvaxFhWsdEM';
$access_token_secret		= '6t53sVbeRixGWUmYrqRUn4KMGeA8a6EQ33Y7vba8';
$consumer_key			= 'H7xHW3GSdCLHrnmnEFrfWA';
$consumer_secret		= 'YJ7mF73o8L8ZhRI9HdxkZv6DKxHkLujjDYg71RFEg';

// Some variables
$twitter_username 		= 'ScienceinSport';
$number_tweets			= 1; // How many tweets to display? max 20
$ignore_replies 		= true; // Should we ignore replies?
$twitter_caching		= true; // You can change to false for some reason
$twitter_cache_time 		= 1*60; // 1 minute
$twitter_cache_file 		= 'tweets.txt'; // Check your permissions
$twitter_debug			= false; // Set to "true" to see all returned values

require_once('TwitterAPIExchange.php');
		
// Settings for TwitterAPIExchange.php
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name='.$twitter_username;
$requestMethod = 'GET';
$settings = array(
	'oauth_access_token' => $access_token,
	'oauth_access_token_secret' => $access_token_secret,
	'consumer_key' => $consumer_key,
	'consumer_secret' => $consumer_secret
);

// Flag for twitter error
$tweet_flag = 0;

if (!$twitter_debug) {
	
	// Time the cache was last created
	$cache_created_on = ((@file_exists($twitter_cache_file))) ? @filemtime($twitter_cache_file) : 0;
	
	// Output the cache file if valid time
	if ( (time() - $twitter_cache_time < $cache_created_on) && $twitter_caching) {
		
		// Tweets should be in cache file, all good
		$tweet_flag = 1;
		
		// Get tweets from cache
		@readfile($twitter_cache_file);	
	
	} else {
		
		// Let's run the API then JSON decode and store in variable
		$twitter = new TwitterAPIExchange($settings);
		$twitter_stream = json_decode($twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest());
		
		// Check if at least 1 tweet returned from API
		if (isset($twitter_stream[0]->text)) {
	
			ob_start(); // Start buffer
			
			$tweets = '<div id="container"><div id="inner"><div class="follow-us"><a href="http://twitter.com/'.$tweet->user->screen_name.'" target="_blank"><span>Follow us on </span><img src="../bird.gif" alt="twitter" width="30" height="30" /></a></div>'; // Start display element
			$tweet_count = 0; // Initialize tweet start count
				
			foreach ($twitter_stream as $tweet){
				
				$tweet_text = htmlspecialchars($tweet->text, null, null, false);
				$tweet_start_char = substr($tweet_text, 0, 1);
				
				if ($tweet_start_char != '@' || $ignore_replies == false) {
				
					// Let's create links from hashtags, mentions, urls
					$tweet_text = preg_replace('/(https?:\/\/[^\s"<>]+)/','<a target="_blank" href="$1">$1</a>', $tweet_text);
					$tweet_text = preg_replace('/(^|[\n\s])@([^\s"\t\n\r<:]*)/is', '$1<a target="_blank" href="http://twitter.com/$2">@$2</a>', $tweet_text);
					$tweet_text = preg_replace('/(^|[\n\s])#([^\s"\t\n\r<:]*)/is', '$1<a target="_blank" href="http://twitter.com/search?q=%23$2">#$2</a>', $tweet_text);
					
					// Building tweets display element
					$tweets .= '<div class="tweeter"><a href="http://twitter.com/'.$tweet->user->screen_name.'" target="_blank">@'.$tweet->user->screen_name.':</a></div>';
					$tweets .= '<div class="tweet" style="font-size:'.tweetSize(mb_strlen($tweet->text)).'; line-heignt:'.tweetSize(mb_strlen($tweet->text)).'">'.$tweet_text.'</div>'."\n";
					$tweets .= '<div class="twitter_date">'.tweetDate($tweet->created_at).'</div>';
					$tweets .= "<div class='button'><a href='https://twitter.com/ScienceinSport' class='twitter-follow-button' data-show-count='true' data-show-screen-name='false'>Follow @ScienceinSport</a></div>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>";
					
					// Count tweets and quit if necessary
					$tweet_count++; if ($tweet_count >= $number_tweets) break;
					
				}
				
			}
			
			echo $tweets.'</div></div>'; // End display element
			
			// Write new cache file in the same directory
			$file = @fopen(dirname(__FILE__).'/'.$twitter_cache_file, 'w');
		
			// Save contents and flush buffer
			@fwrite($file, ob_get_contents()); 
			@fclose($file); 
			ob_end_flush();
			
			// Tweets present, all good
			$tweet_flag = 1;
		
		}
	
	}

} else {
	
	// Let's run the API then JSON decode and store in variable
	$twitter = new TwitterAPIExchange($settings);
	$twitter_stream = json_decode($twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest());

	// Debug mode, just output twitter stream variable
	echo '<pre>';
	print_r($twitter_stream);
	echo '</pre>';
	
}

// If API didn't work for some reason, output some text
if (!$tweet_flag) {
	echo $tweets = '<ul class="twitter_stream twitter_error"><li>Oops, something went wrong with our twitter feed - <a href="http://twitter.com/'.$twitter_username.'/">Follow us on Twitter!</a></li></ul>';
}

function tweetDate($twitterTime){
	$timestamp = strtotime($twitterTime);
	return date('l j F o', $timestamp);
}

function tweetSize($length){
	//my algoritm to calculate font size for a given number of characters
	$fontSize = (1/sqrt($length))*120;
	return ceil($fontSize).'px';
}

?>
</body>
</html>