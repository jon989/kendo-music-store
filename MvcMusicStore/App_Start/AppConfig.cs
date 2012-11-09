using System.Configuration;
using System.Web.Security;
using MvcMusicStore.Filters;
using WebMatrix.WebData;

namespace MvcMusicStore
{
    public static class AppConfig
    {
        public static void Configure()
        {
            //System.Data.Entity.Database.SetInitializer(new MvcMusicStore.Models.SampleData());

            CreateAdminUser();
        }

        private static void CreateAdminUser()
        {
            string _username = "Owner";
            string _password = ConfigurationManager.AppSettings["adminPwd"] ?? "p@ssword123";
            string _role = "Administrator";

            new InitializeSimpleMembershipAttribute().OnActionExecuting(null);

            if (!WebSecurity.UserExists(_username))
                WebSecurity.CreateUserAndAccount(_username, _password);

            if (!Roles.RoleExists(_role))
                Roles.CreateRole(_role);

            if (!Roles.IsUserInRole(_username, _role))
                Roles.AddUserToRole(_username, _role);
        }
    }
}