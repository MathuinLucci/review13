"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Matt Parisano
   Date:   Shamefully Late
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 


window.addEventListener("load", function() {
   var cartForm = document.forms.cart;
   
   //calculate the cost of the order
   calcCart();

   //event handlers for the web form
   cartForm.elements.modelQty.onchange = calcCart;

   var shippingOptions  = document.querySelectorAll('input[name="shipping"]');
   for (var i = 0; i < shippingOptions.length; i++) {
      shippingOptions[i].onclick = calcCart;
   }

});


function calcCart() {
   var cartForm = document.forms.cart;

   //Calculate the initial cost of the order
   var mCost = cartForm.elements.modelCost.value;
   var qIndex = cartForm.elements.modelQty.selectedIndex;
   var quantity = cartForm.elements.modelQty[qIndex].value;

   //initial cost = model x quantity
   var orderCost = mCost*quantity;
   cartForm.elements.orderCost.value = formatUSCurrency(orderCost);

   //retreive the cost of shipping
   var shipCost = document.querySelector('input[name="shipping"]:checked').value*quantity;
   cartForm.elements.shippingCost.value = formatNumber(shipCost, 2);

   //calculate the order subtotal
   cartForm.elements.subTotal.value = formatNumber(orderCost + shipCost, 2);

   //calculate the sales tax
   var salesTax = 0.05*(orderCost+shipCost);
   cartForm.elements.salesTax.value = formatNumber(salesTax, 2);
   
   //calculate the cost of the total order
   var cartTotal = orderCost + shipCost + salesTax;
   cartForm.elements.cartTotal.value = formatNumber(cartTotal);

   //store the order details
   cartForm.elements.shippingType.value = 
      document.querySelector('input[name="shipping"]:checked').nextSibling.nodeValue; 
}

function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
