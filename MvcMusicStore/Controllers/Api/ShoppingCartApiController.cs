using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers.Api
{
    public class ShoppingCartApiController : ApiController
    {
        private MusicStoreEntities storeDB = new MusicStoreEntities();

        // GET api/shoppingcartapi
        public IEnumerable<Cart> Get()
        {
            return ShoppingCart.GetCart(storeDB, HttpContext.Current).GetCartItems();
        }

        // POST api/shoppingcartapi
        public void Post([FromBody]Cart cartItem)
        {
            ShoppingCart.GetCart(storeDB, HttpContext.Current).AddToCart(cartItem.Album, cartItem.Count);
        }

        // PUT api/shoppingcartapi/5
        public void Put(int id, [FromBody]Cart cartItem)
        {
        }

        // DELETE api/shoppingcartapi
        public void Delete()
        {
            ShoppingCart.GetCart(storeDB, HttpContext.Current).EmptyCart();
        }

        // DELETE api/shoppingcartapi/5
        public void Delete(int id)
        {
            ShoppingCart.GetCart(storeDB, HttpContext.Current).RemoveFromCart(id);
        }
    }
}
