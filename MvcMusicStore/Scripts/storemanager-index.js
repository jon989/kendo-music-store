$(document).ready(function () {
    var genresData = new kendo.data.DataSource({
        transport: {
            read: "/Api/Genres"
        }
    });
    genresData.read();

    var genres = [];
    for (var i = 0; i < genresData.view().length; i++) {
        genres.push({
            value: genresData.view()[i].GenreID,
            text: genresData.view()[i].Name
        });
    }

    //var genres = [{
    //    "value": 1,
    //    "text": "Beverages"
    //}, {
    //    "value": 2,
    //    "text": "Condiments"
    //}, {
    //    "value": 3,
    //    "text": "Confections"
    //}, {
    //    "value": 4,
    //    "text": "Dairy Products"
    //}, {
    //    "value": 5,
    //    "text": "Grains/Cereals"
    //}, {
    //    "value": 6,
    //    "text": "Meat/Poultry"
    //}, {
    //    "value": 7,
    //    "text": "Produce"
    //}, {
    //    "value": 8,
    //    "text": "Seafood"
    //}];

    var artists = new kendo.data.DataSource({
        transport: {
            read: "/Api/Artists"
        }
    });

    //var genreEditor = function (container, options) {
    //    $('<input data-text-field="Name" data-value-field="GenreId" data-bind="value:' + options.field + '"/>')
    //        .appendTo(container)
    //        .kendoDropDownList({
    //            autoBind: false,
    //            dataSource: genres
    //        });
    //}

    var artistEditor = function (container, options) {
        $('<input data-text-field="Name" data-value-field="ArtistId" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: false,
                dataSource: artists
            });
    }

    $("#albumsGrid").kendoGrid({
        sortable: "true",
        groupable: "true",
        filterable: "true",
        editable: "inline",
        toolbar: ["create"],

        dataSource: {
            transport: {
                read: {
                    url: "/Api/Albums?noartist=true"
                }
            }
        },

        columns: [
            { title: "Genre", field: "GenreId", values: genres },
            { title: "Artist", field: "ArtistId", editor: artistEditor },
            { field: "Title" },
            { field: "Price", template: "#= kendo.toString(Price, 'c') #" },
            { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }
        ]
    });
});