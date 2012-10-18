$(document).ready(function () {
    var getUrlParams = function () {
        // this function was borrowed from StackOverflow:
        // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
        var urlParams = {};
        var match,
            pl     = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);

        return urlParams;
    };

    var urlParams = getUrlParams();
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
            $.ajax({
                url: "/Api/Albums/" + 7,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    openWindow("album-details-template", data);
                }
            });
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