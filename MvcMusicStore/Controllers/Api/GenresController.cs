using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers.Api
{
    public class GenresController : ApiController
    {
        MusicStoreEntities storeDB = new MusicStoreEntities();

        // GET api/genres
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse<IEnumerable<Genre>>(HttpStatusCode.OK, storeDB.Genres);
        }

        // GET api/genres/5
        public HttpResponseMessage Get(int id)
        {
            return Request.CreateResponse<Genre>(HttpStatusCode.OK, storeDB.Genres.Single(x => x.GenreId == id));
        }

        // POST api/genres
        public void Post([FromBody]Genre value)
        {
            storeDB.Genres.Add(value);
            storeDB.SaveChanges();
        }

        // PUT api/genres/5
        public void Put(int id, [FromBody]Genre value)
        {
            var toUpdate = storeDB.Genres.Single(x => x.GenreId == id);
            toUpdate.Name = value.Name;
            toUpdate.Description = value.Description;
            storeDB.SaveChanges();
        }

        // DELETE api/genres/5
        public void Delete(int id)
        {
            var toDelete = storeDB.Genres.Single(x => x.GenreId == id);
            storeDB.Genres.Remove(toDelete);
            storeDB.SaveChanges();
        }
    }
}
