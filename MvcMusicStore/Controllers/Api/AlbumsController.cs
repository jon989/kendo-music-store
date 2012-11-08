using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers.Api
{
    public class AlbumsController : ApiController
    {
        readonly MusicStoreEntities storeDB = new MusicStoreEntities();

        // GET api/albums
        [Queryable]
        public IQueryable<Album> Get()
        {
            storeDB.Configuration.ProxyCreationEnabled = false;

            var query = storeDB.Albums.AsQueryable();
            if (!Request.GetQueryNameValuePairs().Any(x => x.Key == "noartist"))
            {
                query = storeDB.Albums.Include("Artist").AsQueryable();
            }
            var showPopular = Request.GetQueryNameValuePairs().Where(x => x.Key == "popular").Select(x => x.Value).FirstOrDefault();
            if (showPopular != null)
                query = query.OrderByDescending(a => a.OrderDetails.Count())
                    .Take(Int32.Parse(showPopular));
            return query;
        }

        // GET api/albums/5
        public Album Get(int id)
        {
            storeDB.Configuration.ProxyCreationEnabled = false;
            return storeDB.Albums.Include("Artist").Single(x => x.AlbumId == id);
        }

        // POST api/albums
        [Authorize(Roles = "Administrator")]
        public HttpResponseMessage Post([FromBody]Album value)
        {
            var message = new HttpResponseMessage();
            if (ConfigurationManager.AppSettings["enableEdits"] == "false")
            {
                message.StatusCode = HttpStatusCode.NoContent;
                return message;
            }

            if (ModelState.IsValid)
            {
                storeDB.Albums.Add(value);
                storeDB.SaveChanges();
                message.StatusCode = HttpStatusCode.NoContent;
            }
            else
            {
                message.StatusCode = HttpStatusCode.BadRequest;
            }

            return message;
        }

        // PUT api/albums/5
        [Authorize(Roles = "Administrator")]
        public HttpResponseMessage Put(Album value)
        {
            var message = new HttpResponseMessage();
            if (ConfigurationManager.AppSettings["enableEdits"] == "false")
            {
                message.StatusCode = HttpStatusCode.NoContent;
                return message;
            }

            if (ModelState.IsValid)
            {
                var albumToUpdate = storeDB.Albums.Single(x => x.AlbumId == value.AlbumId);
                albumToUpdate.AlbumArtUrl = value.AlbumArtUrl;
                albumToUpdate.ArtistId = value.ArtistId;
                albumToUpdate.GenreId = value.GenreId;
                albumToUpdate.Price = value.Price;
                albumToUpdate.Title = value.Title;
                storeDB.SaveChanges();
                message.StatusCode = HttpStatusCode.NoContent;
            }
            else
            {
                message.StatusCode = HttpStatusCode.BadRequest;
            }

            return message;
        }

        // DELETE api/albums/5
        [Authorize(Roles = "Administrator")]
        public void Delete(int id)
        {
            if (ConfigurationManager.AppSettings["enableEdits"] == "false")
                return;

            var albumToRemove = storeDB.Albums.Single(x => x.AlbumId == id);
            storeDB.Albums.Remove(albumToRemove);
            storeDB.SaveChanges();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            storeDB.Dispose();
        }
    }
}
