(function ($, kendo, store) {
    var viewModel = kendo.observable({
        featuredArtistName: store.config.featuredArtist,
        
        featuredArtistAlbums: new kendo.data.DataSource({
            type: "odata",
            serverFiltering: true,
            serverPaging: true,
            pageSize: 5,
            filter: {
                field: "Artist/Name",
                operator: "eq",
                value: store.config.featuredArtist
            },
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
        }),

        topSellingAlbums: new kendo.data.DataSource({
            transport: {
                read: store.config.albumsUrl + "?popular=5"
            }
        }),

        bannerImages: store.config.bannerImages,

        viewAlbumDetails: function (e) {
            store.viewAlbumDetails(e.data.AlbumId);
        }
    });

    kendo.bind("#body", viewModel);
})(jQuery, kendo, store);