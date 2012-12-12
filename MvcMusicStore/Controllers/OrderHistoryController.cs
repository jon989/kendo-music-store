using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using MvcMusicStore.Models;
using WebMatrix.WebData;

namespace MvcMusicStore.Controllers
{
    public class OrderHistoryController : Controller
    {
        private readonly MusicStoreEntities storeDB = new MusicStoreEntities();

        [HttpPost]
        public ActionResult Index([DataSourceRequest]DataSourceRequest request)
        {
            storeDB.Configuration.ProxyCreationEnabled = false;
            try
            {
                if (!WebSecurity.Login(this.Request.Params["username"], this.Request.Params["password"]))
                    return new HttpStatusCodeResult(HttpStatusCode.Unauthorized);

                var orderIds = (from o in storeDB.Orders
                                where o.Username == this.HttpContext.User.Identity.Name
                                orderby o.OrderDate descending
                                select o.OrderId)
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize);

                var query = from od in storeDB.OrderDetails
                            join o in storeDB.Orders on od.OrderId equals o.OrderId
                            where orderIds.Contains(o.OrderId)
                            orderby od.OrderId descending, od.Album.Title
                            select new
                            {
                                o.OrderId,
                                o.OrderDate,
                                od.Quantity,
                                od.UnitPrice,
                                od.Album.Title
                            };

                request.Page = 0;
                request.PageSize = 0;
                return Json(query.ToDataSourceResult(request));
            }
            catch
            {
                return new HttpStatusCodeResult(HttpStatusCode.Unauthorized);
            }
        }
    }
}
