var $body;
var $wikiElem;
var $nytHeaderElem;
var $nytElem;
var $greeting;
	
var main = function(){
	loadData();
	$('#form-container').submit(search);	
	
}
function loadData() {
    $body = $('body');
    $wikiElem = $('#wikipedia-links');
    $nytHeaderElem = $('#nytimes-header');
    $nytElem = $('#nytimes-articles');
    $greeting = $('#greeting');
}

function doWikiSearch(streetStr, cityStr) {
	$wikiElem.text("");
	var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch=' + cityStr + '&format=json&callback=wikiCallback';
	
	$.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=" + cityStr, function(data){
		var pages = data.query.pages;
		for(var pageId in pages) {
			var page = pages[pageId];
			
			var pageTitle = page.title;
			$wikiElem.append('<li><a href="https://en.wikipedia.org/?curid=' + pageId + '">' + pageTitle + '</a></li>');
		}
	});
	
}

function doNYTSearch(streetStr, cityStr) {
	$nytElem.text("");
	var nyTimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=11db0a78e2e841408a013a4687d47474';
	
	$.getJSON(nyTimesUrl, function(data){
		$nytHeaderElem.text('New York Times Articles About ' + cityStr);
		articles = data.response.docs;
		for(var i = 0; i < articles.length; i++) {
			var article = articles[i];
			$nytElem.append('<li class="article">'+ '<a href="'+ article.web_url+'">'+article.headline.main+'</a>'+ '<p>' + article.snippet + '</p>' + '</li>');
		};
	}).error(function(e){
		$nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
	});
}

function search() {
	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
	var adress = streetStr + ', ' + cityStr;
	var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + adress + '&key=AIzaSyBIx6s77HW-vw3DMawVqLu6yQNHhEtJ6gA ';
	
	
    
	$greeting.text('So, you want to live at ' + adress + '?');
	$body.append('<img class="bgimg" src="' + streetviewUrl + '">');
	
	
	doNYTSearch(streetStr, cityStr);
	doWikiSearch(streetStr, cityStr);
    return false;
}



$(document).ready(main);
