$(document).ready(function () {
    var genres = [];
    var artists = [];

    var loadGenres = function() {
        new kendo.data.DataSource({
            transport: {
                read: "/Api/Genres"
            }
        })
        .fetch(function (data) {
            translateGenres(data);
            loadArtists();
        });
    };

    var translateGenres = function(data) {
        for (var i = 0; i < data.items.length; i++) {
            genres.push({
                value: data.items[i].GenreId,
                text: data.items[i].Name
            });
        }
    };

    var loadArtists = function() {
        new kendo.data.DataSource({
            transport: {
                read: "/Api/Artists"
            }
        })
        .fetch(function (data) {
            translateArtists(data);
            initGrid();
        });
    };

    var translateArtists = function (data) {
        for (var i = 0; i < data.items.length; i++) {
            artists.push({
                value: data.items[i].ArtistId,
                text: data.items[i].Name
            });
        }
    };     

    var artistEditor = function (container, options) {
        $('<input data-text-field="text" data-value-field="value" data-bind="value:' + options.field + '" />')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: artists
            });
    };

    var initGrid = function() {
        $("#albumsGrid").kendoGrid({
            sortable: "true",
            groupable: "true",
            filterable: "true",
            editable: "inline",
            toolbar: ["create"],

            dataSource: {
                transport: {
                    read: {
                        url: "/Api/Albums?noartist=true",
                        type: "GET"
                    },
                    update: {
                        //url: function (data) {
                        //    return "/Api/Albums/" + data.AlbumId;
                        //},
                        url: "/Api/Albums",
                        type: "PUT",
                        //data: function (data) {
                        //},
                        //contentType: "application/json",
                        //dataType: "json"
                    },
                    destroy: {
                        url: function (data) {
                            return "/Api/Albums/" + data.AlbumId;
                        },
                        type: "DELETE"
                    },
                    create: {
                        url: "/Api/Albums",
                        type: "POST"
                    }
                },
                schema: {
                    model:{
                        id: "AlbumId",
                        fields: {
                            AlbumId: {},
                            GenreId: {},
                            ArtistId: {},
                            Title: {},
                            Price: { type: "number" },
                            AlbumArtUrl: {}
                        }
                    }
                }
            },

            columns: [
  
                  { title: "Genre", field: "GenreId", values: genres },
                { title: "Artist", field: "ArtistId", values: artists, editor: artistEditor },
                { field: "Title" },
                { field: "Price", format:"{0:c}" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }
            ]
        });
    };

    loadGenres();
});