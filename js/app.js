var Fmber = Em.Application.create();

Fmber.Image = Em.Object.extend({
  src: null
});

Fmber.imagesController = Em.ArrayProxy.create({
  content: [],

  addImage: function(src) {
    var image = Fmber.Image.create({ src: src });
    this.pushObject(image);
  },

  display: function() {
  	setTimeout(function(){
	  	var $container = $('#images');
			$container.imagesLoaded( function(){
			  $container.masonry({
			    itemSelector : '.image-item',
			    columnWidth : 0,
					isAnimated: true
			  });
			});
		}, 500);
  }
});

// load images from ffffound.com via YQL
yql = "http://query.yahooapis.com/v1/public/yql?q=select%20title%2C%20link%2C%20description%2C%20author%2C%20pubDate%2C%20media%3Acontent%2C%20media%3Athumbnail%2C%20ffffound%3Asavedby%20from%20rss%20where%20url%3D%22http%3A%2F%2Ffeeds.feedburner.com%2Fffffound%2Feveryone%22&format=json&callback=?";
$.getJSON(yql, function(data) {
	data.query.results.item.forEach(function(item) {
	  Fmber.imagesController.addImage(item.content.url);
	});

	Fmber.imagesController.display();
});
