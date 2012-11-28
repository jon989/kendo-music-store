using System.Web.Http;
using System.Web;
using MvcMusicStore.Models;
using WebMatrix.WebData;

namespace MvcMusicStore.Controllers.Api
{
    public class AccountApiController : ApiController
    {
        // POST api/accountapi
        public object Post(LoginModel model)
        {
            if (model != null && ModelState.IsValid && WebSecurity.Login(model.UserName, model.Password))
            {
                return new
                {
                    userName = model.UserName,
                    isAuthenticated = true,
                    authToken = HttpContext.Current.Response.Cookies[".ASPXAUTH"].Value
                };
            }
            
            WebSecurity.Logout();
            return new 
            {
                userName = string.Empty,
                isAuthenticated = false,
                authToken = string.Empty
            };
        }

        public object Put(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
                WebSecurity.Login(model.UserName, model.Password);
                return new
                {
                    userName = model.UserName,
                    isAuthenticated = true,
                    authToken = HttpContext.Current.Response.Cookies[".ASPXAUTH"].Value
                };
            }
            return null;
        }
    }
}
