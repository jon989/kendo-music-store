/* *** Cart Menu Widget ***
   Custom Widget to represent a shopping cart embedded in a menu.

   Features of this widget:
     * Works like a dropdown menu of cart items.
     * Indicates number of items in cart on main menu element.
     * Each album in cart has a "remove" button.
     * Shows album total price in dropdown.
     * Widget is bound to a DataSource.
     * Main button flashes orange for a moment when an item is added to the cart (when the DataSource is changed).
     * Provides a button to proceed to checkout screen.
*/
(function ($) {
    // shorten references to variables.
    var kendo = window.kendo,
		ui = kendo.ui,
		Widget = ui.Widget,
		CHANGE = "change";

    var CartMenu = Widget.extend({

        // composited widgets
        menu: {},
        listView: {},

        // method called when a new widget is created
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            // create default template
            // Note that the element with class="k-delete-button" will automatically be wired by Kendo to delete the corresponding item from the dataSource.
            that.template = kendo.template(that.options.template || '<li><span>#=Album.Title#</span><span class="k-icon k-i-close k-delete-button"></span></li>');

            // append menu elements
            that._menu = $(element);
            var subMenu = $("<li><span class='cm-count'></span><ul><li><div class='k-content'><ul></ul><div class='cm-checkout'><span class='cm-total'>Total: <span class='cm-amount'></span></span><a href='/ShoppingCart/' class='k-button'>Checkout</a></div></div></li></ul></li>");
            that._menu.append(subMenu);

            // initialize or create dataSource
            that._dataSource(that);

            // init composite widgets
            that._listView = that._menu.find(".k-content > ul");
            that._menu.kendoMenu();
            that._listView.kendoListView({
                dataSource: that.dataSource,
                template: that.template
            });
        },

        // options that are available to the user when initializing the widget
        options: {
            name: "CartMenu",
            autoBind: true,
            template: ""
        },

        refresh: function () {
            // re calculate total price
            var totalPrice = 0.0;
            var albums = this.dataSource.view();
            for (var i = 0; i < albums.length; i++) {
                totalPrice += albums[i].Album.Price * albums[i].Quantity;
            }
            var totalElement = $(this.element).find(".cm-amount");
            totalElement.text(kendo.toString(totalPrice, "c"));

            // set the menu item text to the number of cart items.
            $(this.element).find('.cm-count').text(albums.length);

            // flash the menu item if the cart has items.
            if (albums.length > 0) {
                //$(this.element).css('background-color', 'rgba(251, 176, 59, 1)');
                this._animate_bg($(this.element), 1, this._animate_bg);
            }
        },

        _animate_bg: function (ele, from, anim) {
            from -= .05;
            ele.css("background-color", "rgba(251, 176, 59, " + from + ")");
            if (from > 0) {
                setTimeout(function () { anim(ele, from, anim); }, 30);
            } else {
                ele.css("background-color", "transparent");
            }
        },

        _dataSource: function (that) {
            // returns the datasource OR creates one if using array or configuration
            that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

            // bind to the change event to refresh the widget
            that.dataSource.bind(CHANGE, function () {
                that.refresh();
            });

            // trigger a read on the dataSource if one hasn't happened yet
            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        }
    });

    ui.plugin(CartMenu);
})(jQuery);