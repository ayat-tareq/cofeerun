(function(window) {
  'use strict';
  var App = window.App || {};
  function Truck(truckID,db) {
    this.truckID=truckID;
    this.db=db;

  }
   Truck.prototype.createOrder= function (order) {
  console.log('Adding order for ' + order.emailAddress);
  this.db.add(order.emailAddress, order);

  };
  Truck.prototype.deliverOrder = function (customerId) {
     console.log('Delivering order for ' + customerId);
     this.db.remove(customerId);
  };
  Truck.prototype.getOrder = function (d) {
     console.log('geting order for ' + d);
     return this.db.get(d);
  };
  Truck.prototype.printOrders = function () {
    var customerIdArray = Object.keys(this.db.getAll());
console.log('Truck #' + this.truckID + ' has pending orders:');
 customerIdArray.forEach(function (id) {
    console.log(this.db.get(id));
}.bind(this)); };

  App.Truck = Truck;
   window.App = App;

}(window));
