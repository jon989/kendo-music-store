$(document).ready(function () {
    var store = new Store();
    var viewModel = kendo.observable({
        cartItems: store.getCart().view()
    });
    kendo.bind($("#body"), viewModel);
});