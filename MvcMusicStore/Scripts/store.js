
var cartData = null;

var Store = function Store() {
    var that = this;
    var cartLocalStorageName = "KendoMusicStoreCart";

    this.viewAlbumDetails = function (albumId) {
        $.ajax({
            url: "/Api/Albums/" + albumId,
            type: "GET",
            dataType: "json",
            success: function (data) {
                that._openWindow("album-details-template", that._getAlbumDetailsViewModel(data));
            }
        });
    };

    this.getUrlParams = function () {
        // this function was borrowed from StackOverflow:
        // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
        var urlParams = {};
        var match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substring(1);

        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);

        return urlParams;
    };

    this.getCart = function () {
        if (!cartData) {
            cartData = new kendo.data.DataSource({
                data: that._getCartJson(),
                change: that._setCartJson
            });
        }
        return cartData;
    };

    this.addToCart = function (album, qty) {
        that.getCart().add({
            Album: album,
            Quantity: qty
        });
        that._setCartJson();
    };

    this.clearCart = function () {
        that.getCart().data([]);
        that._setCartJson();
    };

    this._getCartJson = function () {
        try {
            if(localStorage && localStorage[cartLocalStorageName] && localStorage[cartLocalStorageName].length > 0) {
                return JSON.parse(localStorage[cartLocalStorageName]);
            }
        } catch (e) {}
        return [];
    };

    this._setCartJson = function () {
        try {
            localStorage[cartLocalStorageName] = JSON.stringify(cartData.data());
        } catch (e) {
            alert("There was a problem saving your shopping cart to the browser local storage.");
        }
    };

    this._openWindow = function (template, viewModel) {
        // Create a placeholder element.
        var window = $(document.createElement('div'));

        // Apply template to the placeholder element, and bind the viewmodel.
        var templateHtml = $(document.getElementById(template)).html()
        window.html(kendo.template(templateHtml)(viewModel));
        kendo.bind(window, viewModel);

        // Add window placeholder to the body.
        $('body').append(window);

        // Turn placeholder into a Window widget.
        window.kendoWindow({
            width: "400px",
            title: viewModel.data.Title,
            resizable: false,
            close: function () {
                // When the window is closed, remove the element from the document.
                window.parents(".k-window").remove();
            }
        });

        // Center and show the Window.
        window.data("kendoWindow").center();
        window.data("kendoWindow").open();
    };

    this._getAlbumDetailsViewModel = function (data) {
        return kendo.observable({
            quantity: 1,
            data: data,
            total: function () {
                return this.get("data.Price") * this.get("quantity");
            },
            updateQty: function (e) {
                this.set("quantity", e.sender.value());
            },
            addToCart: function (e) {
                that.addToCart(this.data, this.quantity);
                var window = $(e.target).parents(".k-window-content").data("kendoWindow");
                if (window) {
                    window.close();
                }
            }
        });
    };
};