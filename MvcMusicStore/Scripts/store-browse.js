$(document).ready(function () {
    var store = new Store();
    var urlParams = store.getUrlParams();
    var genreId = parseInt(urlParams.Genre);

    var viewModel = kendo.observable({
        albums: new kendo.data.DataSource({
            type: "odata",
            pageSize: 20,
            serverFiltering: true,
            serverPaging: false,
            filter: {
                field: "GenreId",
                operator: "eq",
                value: genreId
            },
            transport: {
                read: {
                    url: "/Api/Albums",
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
        genre: null, // <-- this will hold our Genre object, once loaded.

        viewAlbumDetails: function (e) {
            store.viewAlbumDetails(e.data.AlbumId);
        }
    });

    // Load the Genre data from the server.
    $.ajax({
        url: "/Api/Genres/" + genreId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            viewModel.set("genre", data);
        }
    });

    kendo.bind("#body", viewModel);
});