
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    $wikiElem.text("");
    $nytElem.text("");

	var streetStr = $('#street').val();
	var cityStr = $('#city').val();
	var adress = streetStr + ', ' + cityStr;
	
	$greeting.text('So, you want to live at ' + adress + '?');
	
	var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + adress + '&key=AIzaSyBIx6s77HW-vw3DMawVqLu6yQNHhEtJ6gA ';
	$body.append('<img class="bgimg" src="' + streetviewUrl + '">');
	var nyTimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=11db0a78e2e841408a013a4687d47474'
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
	
	
	var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch=' + cityStr + '&format=json&callback=wikiCallback';
	
	$.ajax({
		method: "GET",
		
	})

	$wikiElem = $("#wikipedia-links");
	$.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=15&generator=search&origin=*&gsrsearch=" + cityStr, function(data){
		var pages = data.query.pages;
		for(var pageId in pages) {
			var page = pages[pageId];
			
			var pageTitle = page.title;
			$wikiElem.append('<li><a href="https://en.wikipedia.org/?curid=' + pageId + '">' + pageTitle + '</a></li>');
		}
	});
    return false;
}


$('#form-container').submit(loadData);
