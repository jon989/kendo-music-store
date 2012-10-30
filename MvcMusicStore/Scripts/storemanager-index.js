(function (window, $, kendo) {
    var getGenresAsync = function () {
        var deferred = $.Deferred(),

            translateGenres = function (data) {
                deferred.resolve($.map(data.items, function(item) {
                    return {
                        value: item.GenreId,
                        text: item.Name
                    };
                }));
            },

            loadGenres = function () {
                new kendo.data.DataSource({
                    transport: {
                        read: "/Api/Genres"
                    }
                }).fetch(function (data) {
                    translateGenres(data);
                });
            };

        window.setTimeout(loadGenres, 1);
        return deferred.promise();
    };

    var getArtistsAsync = function() {
        var deferred = $.Deferred(),
            
            translateArtists = function(data) {
                deferred.resolve($.map(data.items, function(item) {
                    return {
                        value: item.ArtistId,
                        text: item.Name
                    };
                }));
            },
            
            loadArtists = function() {
                new kendo.data.DataSource({
                    transport: {
                        read: "/Api/Artists"
                    }
                }).fetch(function(data) {
                    translateArtists(data);
                });
            };

        window.setTimeout(loadArtists, 1);
        return deferred.promise();
    };

    var initGrid = function (genres, artists, artistEditor, albumArtEditor) {
        $("#albumsGrid").kendoGrid({
            sortable: true,
            groupable: true,
            filterable: true,
            pageable: true,
            editable: "inline",
            toolbar: ["create"],

            dataSource: {
                pageSize: 50,
                serverPaging: false,
                transport: {
                    type: "odata",
                    read: {
                        url: "/Api/Albums?noartist=true",
                        type: "GET"
                    },
                    update: {
                        url: "/Api/Albums",
                        type: "PUT",
                        contentType: "application/json",
                    },
                    destroy: {
                        url: function (data) {
                            return "/Api/Albums/" + data.AlbumId;
                        },
                        type: "DELETE"
                    },
                    create: {
                        url: "/Api/Albums",
                        type: "POST",
                        contentType: "application/json"
                    },
                    parameterMap: function (options, type) {
                        if (type === "update" || type === "create") {
                            return kendo.stringify(options);
                        }
                        return options;
                    }
                },
                schema: {
                    model:{
                        id: "AlbumId",
                        fields: {
                            AlbumId: { type: "number", defaultValue: 0 },
                            GenreId: { type: "number", defaultValue: 1 },
                            ArtistId: { type: "number", defaultValue: 1 },
                            Title: {
                                validation: {
                                    required: true
                                }
                            },
                            Price: {
                                type: "number",
                                defaultValue: 9.99,
                                validation: {
                                    required: true,
                                    min: 0.01,
                                    max: 100.00
                                }
                            },
                            AlbumArtUrl: {
                                validation: {
                                    required: true
                                }
                            }
                        }
                    }
                }
            },

            columns: [
                { title: "Album Art", field: "AlbumArtUrl", template: '<img src="#= AlbumArtUrl #" />', width: "110px", editor: albumArtEditor, filterable: false, sortable: false, groupable: false },
                { title: "Genre", field: "GenreId", values: genres },
                { title: "Artist", field: "ArtistId", values: artists, editor: artistEditor },
                { field: "Title", groupable: false },
                { field: "Price", format:"{0:c}" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }
            ]
        });
    };

    // Wait for both the genres and artists lists to load.
    $.when(getGenresAsync(), getArtistsAsync())
        .done(function(genres, artists) {
            var artistEditor = function (container, options) {
                $('<input data-text-field="text" data-value-field="value" data-bind="value:' + options.field + '" />')
                    .appendTo(container)
                    .kendoComboBox({
                        autoBind: false,
                        dataSource: artists
                    });
            };
            
            var albumArtEditor = function (container, options) {
                if (options.model.AlbumArtUrl) {
                    $('<img src="' + options.model.AlbumArtUrl + '" />').appendTo(container);
                }

                $('<input name="files" type="file" />').appendTo(container).kendoUpload({
                    multiple: false,
                    showFileList: false,
                    async: {
                        saveUrl: "/Api/Images",
                        autoUpload: true
                    },
                    success: function (e) {
                        container.html('<img src="' + e.response + '" />');
                        options.model.set(options.field, e.response);
                    }
                });
            };

            initGrid(genres, artists, artistEditor, albumArtEditor);
        });
})(window, jQuery, kendo);