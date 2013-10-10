using System.Web.Optimization;

namespace MvcMusicStore
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/App/kendo-custom-bindings.js",
                "~/Scripts/App/kendo-cart-menu-widget.js",
                "~/Scripts/App/config.js",
                "~/Scripts/App/cart.js",
                "~/Scripts/App/store.js",
                "~/Scripts/App/shared-layout.js"));

            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                "~/Scripts/date.js"));
        }
    }
}