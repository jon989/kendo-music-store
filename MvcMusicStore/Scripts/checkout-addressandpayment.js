(function ($, kendo, store) {
    var viewModel = kendo.observable({
        cartItems: store.cart.getCart().view()
    });
    kendo.bind($("#body"), viewModel);
})(jQuery, kendo, store);