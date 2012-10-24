$(document).ready(function () {
    var store = new Store();
    var cartDataSource = store.getCart();

    var viewModel = kendo.observable({
        cartItems: cartDataSource,
        updateQty: function (e) {
            e.data.set("Quantity", e.sender.value());
        },
        remove: function (e) {
            this.cartItems.remove(e.data);
        },
        total: 0
    });

    var calcTotal = function(e) {
        var totalPrice = 0.0;
        var albums = viewModel.cartItems.view();
        for (var i = 0; i < albums.length; i++) {
            totalPrice += albums[i].get("Album.Price") * albums[i].get("Quantity");
        }
        viewModel.set("total", totalPrice);
    };

    cartDataSource.bind("change", calcTotal);
    kendo.bind($("#body"), viewModel);
});