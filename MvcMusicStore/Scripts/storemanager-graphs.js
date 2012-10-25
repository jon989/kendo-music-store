(function ($) {
    var createChart = function () {
        $("#revenue-chart").kendoChart({
            theme: $(document).data("kendoSkin") || "default",
            dataSource: {
                serverFiltering: "true",
                transport: {
                    read: {
                        url: "/Api/StoreSalesRevenue?start=10%2f23%2f2012&end=10%2f26%2f2012",
                        dataType: "json"
                    }
                },
                sort: {
                    field: "Day",
                    dir: "asc"
                }
            },
            title: {
                text: "Overall Sales"
            },
            legend: {
                position: "top"
            },
            series: [
                {
                    type: "column",
                    name: "Revenue",
                    field: "Revenue",
                    color: "#cc6e38",
                    tooltip: {
                        visible: true,
                        format: "{0:c}"
                    }
                },
                {
                    type: "line",
                    name: "Orders",
                    field: "Orders",
                    color: "#ec5e0a",
                    axis: "orders",
                    tooltip: {
                        visible: true,
                        format: "{0} Orders"
                    }
                }
            ],
            valueAxis: [
                {
                    title: { text: "Revenue" },
                    min: 0,
                    max: 100,
                    labels: {
                        format: "c"
                    }
                },
                {
                    name: "orders",
                    title: { text: "Number of Orders" },
                    color: "#ec5e0a"
                }
            ],
            categoryAxis: {
                field: "Day",
                format: "d",
                type: "date",
                axisCrossingValue: [0, 10]
            },
            tooltip: {
                visible: true
            }
        });
    };

    setTimeout(function () {
        // Initialize the chart with a delay to make sure
        // the initial animation is visible
        createChart();
    }, 400);

    var dateRanges = [{
        name: "Day",
        start: Date.today().toString("M/d/yyyy"),
        end: Date.today().add(1).days().toString("M/d/yyyy")
    },
    {
        name: "Week",
        start: Date.today().add(-7).days().toString("M/d/yyyy"),
        end: Date.today().add(1).days().toString("M/d/yyyy")
    }];

    var dateRangeChanged = function (e) {
        var data = this.dataSource.view();
        //var selected = $.map(this.select(), function (item) {
        //    return data[$(item).index()];
        //});
        var selected = data[$(this.select()[0]).index()];
        alert(selected.start + " - " + selected.end);
    };

    $("#date-range").kendoListView({
        dataSource: dateRanges,
        template: "<li>#= name #</li>",
        selectable: "single",
        change: dateRangeChanged
    });
})(jQuery);