using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers.Api
{
    public class StoreSalesRevenueController : ApiController
    {
        MusicStoreEntities storeDB = new MusicStoreEntities();

        // GET api/storesalesrevenue
        [Queryable]
        public IQueryable<SalesRevenue> Get(string start, string end)
        {
            storeDB.Configuration.ProxyCreationEnabled = false;
            var startDate = DateTime.Parse(start);
            var endDate = DateTime.Parse(end);

            var data = (from o in storeDB.Orders
                       where o.OrderDate >= startDate && o.OrderDate <= endDate
                       group o by new { o.OrderDate.Year, o.OrderDate.Month, o.OrderDate.Day } into og
                       select new
                       {
                           Day = og.Key,
                           Orders = og.Count(),
                           Revenue = og.Sum(x => x.Total)
                       }).ToArray();

            return data.Select(x => new SalesRevenue
            {
                Day = new DateTime(x.Day.Year, x.Day.Month, x.Day.Day),
                Orders = x.Orders,
                Revenue = x.Revenue
            }).AsQueryable();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            storeDB.Dispose();
        }
    }
}
