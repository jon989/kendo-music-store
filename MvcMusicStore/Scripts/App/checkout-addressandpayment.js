(function ($, kendo, store) {
    var viewModel = kendo.observable({
        cartItems: store.cart.getCart().view(),

        doValidation: function (e) {
            var validator = $(".checkout-info").data("kendoValidator");
            return validator.validate();
        }
    });

    //$('.checkout-info input').attr('validationMessage', ' ');
    //$('.checkout-info input').attr('required', '');

    kendo.bind($("#body"), viewModel);
})(jQuery, kendo, store);