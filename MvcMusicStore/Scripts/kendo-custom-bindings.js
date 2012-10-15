kendo.data.binders.rotateImages = kendo.data.Binder.extend({
    init: function (element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var binding = this.bindings["rotateImages"];
        var target = $(element);
        binding.rotateDelay = target.data("rotate-delay");
        binding.imageIndex = 0;
        binding.setRotationTimeout = function () {
            var imageArray = binding.get();
            target.attr("src", imageArray[binding.imageIndex]);
            binding.imageIndex = binding.imageIndex + 1;
            if (binding.imageIndex >= imageArray.length) {
                binding.imageIndex = 0;
            }
            setTimeout(binding.setRotationTimeout, binding.rotateDelay);
        };
        binding.setRotationTimeout();
    },
    refresh: function () {
        var binding = this.bindings["rotateImages"];
        binding.imageIndex = 0;
    },
});