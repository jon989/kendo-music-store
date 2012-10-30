(function ($, kendo, store) {
    $("#menu").kendoMenu();
    
    $("#cart-menu").kendoCartMenu({
        dataSource: store.cart.getCart()
    });
    
    $("#main-search").kendoAutoComplete({
        filter: 'contains',
        minLength: 3,
        dataTextField: "Title",
        placeholder: "Search music...",
        height: 300,
        template: '<div class="album-wide" data-album-id="${data.AlbumId}"><img src="${data.AlbumArtUrl}" /><div><span>${data.Title}</span><span>${data.Artist.Name}</span></div></div>',

        dataSource: {
            type: "odata",
            serverFiltering: true,
            serverPaging: true,
            pageSize: 20,
            transport: {
                read: {
                    url: store.config.albumsUrl,
                    dataType: "json"
                },
                parameterMap: function (options, type) {
                    var paramMap = kendo.data.transports.odata.parameterMap(options);
                    delete paramMap.$inlinecount;
                    delete paramMap.$format;
                    return paramMap;
                }
            },
            schema: {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                }
            }
        },

        select: function (e) {
            e.preventDefault(); // Stop the selected item text from moving up to the AutoComplete.
            e.sender.value(""); // clear the user entered search term.
            var albumId = e.item.children("div").data("album-id");
            store.viewAlbumDetails(albumId);
        }
    });
})(jQuery, kendo, store);