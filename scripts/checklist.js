(function (window) {
  'use strict';
var App = window.App || {};
var $ =window.jQuery;
function CheckList(selector)  {
  if (!selector){
    throw  new Error('no selector was found')
  }
   this.$element = $(selector);
   if (this.$element.length===0){
     throw new Error('Could not find element with selector: ' + selector)
   }
}
function jestflaver(coffeeOrder,$div) {
  var description = ' '+coffeeOrder.size + ' ';
  if (coffeeOrder.flavor) {
  description += coffeeOrder.flavor + ' ';
  switch(coffeeOrder.flavor) {
    case 'caramel':
      $($div).attr("class","bg-primary p-4");
      break;
    case 'almond':
     $($div).attr("class","bg-info p-4");
      break;
    case 'mocha':
        $($div).attr("class","bg-warning p-4");
        break;
    default:$($div).attr("class","bg-white p-4");

  }

  }
  description += coffeeOrder.coffee + ', ';
  description += ' (' + coffeeOrder.emailAddress + ')';
  description += ' [' + coffeeOrder.strength + 'x]';
  console.log(description);
  return description
}
CheckList.prototype.addRow = function (coffeeOrder) {
  this.removeRow(coffeeOrder.emailAddress);
   // Create a new instance of a row, using the coffee order info
  var rowElement = new Row(coffeeOrder);
// Add the new row instance's $element property to the checklist
 this.$element.append(rowElement.$element);
};
CheckList.prototype.addClickHandler = function (fn,get,cr) {
  let timer
 this.$element.on('click', 'input', function (event)
 {  if (event.originalEvent.detail === 1) {
    timer = setTimeout(function () {
       var email = event.target.value;;
       console.log(email);
            this.removeRow(email);
             fn(email);
    }.bind(this), 2000)

}
//
   }.bind(this));
this.$element.on('dblclick', 'input', function (event){
  clearTimeout(timer);
  var email =event.target.value;
var  obj=get(email)
console.log(obj);
for (var variable in obj) {
 $('[name="'+variable+'"]').val(obj[variable]);
}
 $(".badge").text(obj["strength"])
var data={}
var $btn1=$('<button></button>',{ type:"reset" ,'class':"btn btn-primary",text:'EDIT'}).on('click',function () {
var objectt=  $('form').serializeArray()
$.each(objectt,function(i,item) {
  data[item.name]=item.value
})
if (data["emailAddress"]!=email) {
  fn(email);
  cr(data);
    $('label[value="'+email+'"]').find('span').text(jestflaver(data,$('[data-coffee-order="checkbox"]')));
} else {
  cr(data);
  console.log(email);
  $('label[value="'+email+'"]').find('span').text(jestflaver(data,$('[data-coffee-order="checkbox"]')));
}
this.remove();
$('form')[0].reset();
$('form')[0].elements[0].focus();
$(".badge").text("30")
})
$('form').append($btn1)
});
};
CheckList.prototype.removeRow = function (email) {
  this.$element.find('[value="' + email + '"]') .closest('[data-coffee-order="checkbox"]') .remove();
};
function Row(coffeeOrder) {

 var $div=$('<div></div>',{
  'data-coffee-order' :'checkbox',
  'class': 'form-check'
});
var $label=$('<label></label>',{value:coffeeOrder.emailAddress})
var $checkbox=$('<input></input>',{type:'checkbox',value:coffeeOrder.emailAddress});
var description = jestflaver(coffeeOrder,$div);
var $par=$("<span><span>");
$par.append(description)
$label.append($checkbox);
$label.append($par);
$div.append($label);
this.$element = $div;

}


App.CheckList = CheckList;
window.App = App;
}(window));
