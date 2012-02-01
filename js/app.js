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
});

Fmber.imagesController.addImage("http://img.ffffound.com/static-data/assets/6/8d38d0bda049eddae66b0ab7d23e7198f68a4f2b_m.jpg");
Fmber.imagesController.addImage("http://img.ffffound.com/static-data/assets/6/8d38d0bda049eddae66b0ab7d23e7198f68a4f2b_m.jpg");
