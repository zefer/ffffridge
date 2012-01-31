var Fmber = Em.Application.create();

Fmber.MyView = Em.View.extend({
  mouseDown: function() {
    window.alert("hello world!");
  }
});
