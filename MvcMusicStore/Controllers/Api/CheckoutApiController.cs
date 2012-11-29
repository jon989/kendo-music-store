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
    public class CheckoutApiController : ApiController
    {
        readonly MusicStoreEntities storeDB = new MusicStoreEntities();

        public object Post(ApiOrderSubmit orderSubmit)
        {
            try
            {
                var order = orderSubmit.Order;
                order.Username = User.Identity.Name;
                order.OrderDate = DateTime.Now;

                //Add the Order
                storeDB.Orders.Add(order);

                //Process the order
                var cart = ShoppingCart.GetCart(storeDB, HttpContext.Current);
                var cartItems = BuildCartItems(orderSubmit.Items);
                cart.CreateOrder(order, cartItems);

                // Save all changes
                storeDB.SaveChanges();

                return new
                {
                    error = ""
                };
            }
            catch
            {
                return new
                {
                    error = "There was an error submitting your order."
                };
            }
        }

        private List<Cart> BuildCartItems(ApiOrderItem[] orderItems)
        {
            return orderItems.Select(x => new Cart { AlbumId = x.albumId, Count = x.quantity }).ToList();
        }
    }
}
