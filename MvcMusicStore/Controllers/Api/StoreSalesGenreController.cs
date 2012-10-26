using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers.Api
{
    public class StoreSalesGenreController : ApiController
    {
        MusicStoreEntities storeDB = new MusicStoreEntities();

        // GET api/storesalesrevenue
        [Queryable]
        public IQueryable<SalesByGenre> Get(string start, string end)
        {
            var random = new Random();
            return storeDB.Genres.Select(x => x.Name).ToList().Select(x => new SalesByGenre { Genre = x, Count = random.Next(5,30) }).AsQueryable();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            storeDB.Dispose();
        }
    }
}
