using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers
{
    [Authorize]
    public class CheckoutController : Controller
    {
        MusicStoreEntities storeDB = new MusicStoreEntities();
        private static Regex albumQueryStringMatcher = new Regex(@"^\d+$");

        //
        // GET: /Checkout/
        public ActionResult AddressAndPayment()
        {
            return View();
        }

        //
        // POST: /Checkout/AddressAndPayment
        [HttpPost]
        public ActionResult AddressAndPayment(FormCollection values)
        {
            var order = new Order();
            TryUpdateModel(order);

            try
            {
                order.Username = User.Identity.Name;
                order.OrderDate = DateTime.Now;

                //Add the Order
                storeDB.Orders.Add(order);

                //Process the order
                var cart = ShoppingCart.GetCart(storeDB, this.HttpContext);
                var cartItems = BuildCartItems(values);
                cart.CreateOrder(order, cartItems);

                // Save all changes
                storeDB.SaveChanges();

                return RedirectToAction("Complete",
                    new { id = order.OrderId });
            }
            catch
            {
                //Invalid - redisplay with errors
                return View(order);
            }
        }

        //
        // GET: /Checkout/Complete
        public ActionResult Complete(int id)
        {
            // Validate customer owns this order
            bool isValid = storeDB.Orders.Any(
                o => o.OrderId == id &&
                o.Username == User.Identity.Name);

            if (isValid)
            {
                return View(id);
            }
            else
            {
                return View("Error");
            }
        }

        private List<Cart> BuildCartItems(FormCollection formCollection)
        {
            var cartItems = new List<Cart>();
            foreach(var key in formCollection.AllKeys)
            {
                if(albumQueryStringMatcher.IsMatch(key))
                {
                    var albumId = Int32.Parse(key);
                    foreach(var qty in formCollection.GetValues(key))
                    {
                        var quantity = Int32.Parse(qty);
                        cartItems.Add(new Cart {
                            AlbumId = albumId,
                            Count = quantity
                        });
                    }
                }
            }
            return cartItems;
        }
    }
}
