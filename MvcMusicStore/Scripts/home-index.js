$(document).ready(function () {
    var featuredArtist = "Metallica";

    var viewModel = kendo.observable({
        featuredArtistName: featuredArtist,
        
        featuredArtistAlbums: new kendo.data.DataSource({
            type: "odata",
            serverFiltering: true,
            serverPaging: true,
            pageSize: 5,
            filter: {
                field: "Artist/Name",
                operator: "eq",
                value: featuredArtist
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

        topSellingAlbums: new kendo.data.DataSource({
            transport: {
                read: "/Api/Albums?popular=5"
            }
        }),

        bannerImages: [
            "/Content/Images/Feature1.png",
            "/Content/Images/Feature2.png",
            "/Content/Images/Feature3.png"
        ]
    });

    kendo.bind("#body", viewModel);
});