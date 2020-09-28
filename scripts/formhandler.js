(function (window) { 'use strict';
var App = window.App || {};
var $ =window.jQuery;
function FormHandler(selector) {
if(!selector){
  throw new Error('no selector found');
}
this.$formElement = $(selector);
if (this.$formElement.length === 0) {
throw new Error('Could not find element with selector: ' + selector); }
}
FormHandler.prototype.addSubmitHandler = function (fn) {
   console.log('Setting submit handler for form');
   this.$formElement.on('submit', function (event) {
     event.preventDefault();
     var data = {};
    var obj= $(this).serializeArray();
    $.each(obj,function(i,item) {
      data[item.name]=item.value
    })
     console.log(data);
     fn(data);
     this.reset();
     $(".badge").text(30)
     this.elements[0].focus();
});
 this.$formElement.on('input', function (event){
  var cofstr=$(strengthLevel).val()
  $(".badge").text(cofstr)
});
};

App.FormHandler = FormHandler;
window.App = App;
}(window));
