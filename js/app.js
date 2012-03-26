var Fridge = Em.Application.create();

Fridge.Image = Em.Object.extend({
  src: null,
  link: null
});

Fridge.imagesController = Em.ArrayProxy.create({
  content: [],
  images: {},

  // add this image to the display
  addImage: function(src, link) {
    var image = Fridge.Image.create({ src: src, link: link });
    this.unshiftObject(image);
    this.get('images')[src] = true;
  },

  // is this image being displayed?
  hasImage: function(src) {
    return(typeof(Fridge.imagesController.get('images')[src]) != "undefined");
  },

  // inits the Masonry image display
  initDisplay: function() {
    setTimeout(function() {
      var $container = $('#images');
      $container.imagesLoaded(function() {
        $container.masonry({
          itemSelector : '.image-item',
          columnWidth : 0,
          isAnimated: true
        });
      });
    }, 100);
  },

  // updates the Masonry layout to fit the newly prepended images
  updateDisplay: function() {
    setTimeout(function() {
      var $container = $('#images');
      $container.imagesLoaded(function() {
        $('#images').masonry('reload');
      });
    }, 100);
  },

  // load images from ffffound.com via YQL
  updateImages: function(init) {
    yql = "http://query.yahooapis.com/v1/public/yql?q=select%20title%2C%20link%2C%20description%2C%20author%2C%20pubDate%2C%20media%3Acontent%2C%20media%3Athumbnail%2C%20ffffound%3Asavedby%20from%20rss%20where%20url%3D%22http%3A%2F%2Ffeeds.feedburner.com%2Fffffound%2Feveryone%22&format=json&callback=?";
    $.getJSON(yql, function(data) {
      data.query.results.item.reverse().forEach(function(item) {
        // add each image, unless it's already been added
        if(!Fridge.imagesController.hasImage(item.content.url)) {
          Fridge.imagesController.addImage(item.content.url, item.link);
        }
      });

      init ? Fridge.imagesController.initDisplay() : Fridge.imagesController.updateDisplay();
    });
  }
});

Fridge.imagesController.updateImages(true);

// check for new images every 3 minutes
setInterval(function() {
  Fridge.imagesController.updateImages();
}, 180000);
