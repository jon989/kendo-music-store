(function ($, kendo) {
    $("#mobile-device-selection").kendoDropDownList({
        change: function (e) {
            var value = this.value();
            //var value = $("#mobile-device-selection").val();
            $(".get-mobile-panel").fadeOut(400, function () {
                $("#get-mobile-" + value).fadeIn();
            });
        }
    });
})(jQuery, kendo);