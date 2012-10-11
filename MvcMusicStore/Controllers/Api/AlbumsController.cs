using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers.Api
{
    public class AlbumsController : ApiController
    {
        MusicStoreEntities storeDB = new MusicStoreEntities();

        // GET api/albums
        public IEnumerable<Album> Get()
        {
            storeDB.Configuration.ProxyCreationEnabled = false;
            return storeDB.Albums;
        }

        // GET api/albums/5
        public Album Get(int id)
        {
            storeDB.Configuration.ProxyCreationEnabled = false;
            return storeDB.Albums.Single(x => x.AlbumId == id);
        }

        // POST api/albums
        public void Post([FromBody]Album value)
        {
            storeDB.Albums.Add(value);
            storeDB.SaveChanges();
        }

        // PUT api/albums/5
        public void Put(int id, [FromBody]Album value)
        {
            var albumToUpdate = storeDB.Albums.Single(x => x.AlbumId == id);
            albumToUpdate.AlbumArtUrl = value.AlbumArtUrl;
            albumToUpdate.ArtistId = value.ArtistId;
            albumToUpdate.GenreId = value.GenreId;
            albumToUpdate.Price = value.Price;
            albumToUpdate.Title = value.Title;
            storeDB.SaveChanges();
        }

        // DELETE api/albums/5
        public void Delete(int id)
        {
            var albumToRemove = storeDB.Albums.Single(x => x.AlbumId == id);
            storeDB.Albums.Remove(albumToRemove);
            storeDB.SaveChanges();
        }
    }
}
