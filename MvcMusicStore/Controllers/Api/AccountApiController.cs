using System.Web.Http;
using System.Web;
using MvcMusicStore.Models;
using WebMatrix.WebData;

namespace MvcMusicStore.Controllers.Api
{
    public class AccountApiController : ApiController
    {
        public bool Post(LoginModel model)
        {
            var validCredentials = model != null && ModelState.IsValid && WebSecurity.Login(model.UserName, model.Password);
            HttpContext.Current.Response.Cookies.Remove(".ASPXAUTH");
            return validCredentials;
        }

        public bool Put(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                WebSecurity.CreateUserAndAccount(model.UserName, model.Password);
                return Post(model);
            }
            return false;
        }
    }
}
