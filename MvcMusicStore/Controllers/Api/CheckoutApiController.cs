using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MvcMusicStore.Models;
using WebMatrix.WebData;

namespace MvcMusicStore.Controllers.Api
{
    public class CheckoutApiController : ApiController
    {
        readonly MusicStoreEntities storeDB = new MusicStoreEntities();

        public object Post(ApiOrderSubmit orderSubmit)
        {
            try
            {
                if (!(orderSubmit.Login != null && WebSecurity.Login(orderSubmit.Login.UserName, orderSubmit.Login.Password)))
                    throw new Exception("You are not logged in.");

                var cartItems = BuildCartItems(orderSubmit.Items);

                var order = orderSubmit.Order;
                order.Username = orderSubmit.Login.UserName;
                order.OrderDate = DateTime.Now;

                storeDB.Orders.Add(order);
                
                CreateOrder(order, cartItems);
                storeDB.SaveChanges();

                return new
                {
                    error = ""
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    error = "There was an error submitting your order. " + ex.Message
                };
            }
        }

        private List<Cart> BuildCartItems(ApiOrderItem[] orderItems)
        {
            return orderItems.Select(x => new Cart { AlbumId = x.albumId, Count = x.quantity }).ToList();
        }

        private void CreateOrder(Order order, List<Cart> cartItems)
        {
            decimal orderTotal = 0;

            foreach (var item in cartItems)
            {
                var album = storeDB.Albums.Find(item.AlbumId);

                var orderDetail = new OrderDetail
                {
                    AlbumId = item.AlbumId,
                    OrderId = order.OrderId,
                    UnitPrice = album.Price,
                    Quantity = item.Count,
                };

                orderTotal += (item.Count * album.Price);

                storeDB.OrderDetails.Add(orderDetail);
            }

            order.Total = orderTotal;
        }
    }
}
