(function (window) { 'use strict';
var App = window.App;
var FORM_SELECTOR = '[data-coffee-order="form"]';
var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
var Truck = App.Truck;
 var Validation = App.Validation;
 var DataStore = App.DataStore;
 var CheckList = App.CheckList
 var FormHandler = App.FormHandler;
 var myTruck=new Truck('HAL', new DataStore());
 // window.myTruck = myTruck;
 var checkList = new CheckList(CHECKLIST_SELECTOR);
 var formHandler = new FormHandler(FORM_SELECTOR);

formHandler.addSubmitHandler(function (data) {
  myTruck.createOrder.call(myTruck,data);
  checkList.addRow.call(checkList,data);
});
formHandler.addInputHandler(Validation.isCompanyEmail)
checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck), myTruck.getOrder.bind(myTruck),myTruck.createOrder.bind(myTruck))
}(window));
