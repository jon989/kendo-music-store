var openWindow = (function ($) {
    return function (template, viewModel) {
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
            title: viewModel.Title,
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
})(jQuery);