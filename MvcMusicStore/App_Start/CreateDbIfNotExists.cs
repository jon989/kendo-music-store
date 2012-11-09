using System.Configuration;
using System.Data.Entity;

namespace MvcMusicStore
{
    public class CreateDbIfNotExists<T> : IDatabaseInitializer<T> where T : DbContext
    {
        public void InitializeDatabase(T context)
        {
            if (ConfigurationManager.AppSettings["createDb"] == "true")
                new DropCreateDatabaseIfModelChanges<T>().InitializeDatabase(context);
            else
                new Devtalk.EF.CodeFirst.DontDropDbJustCreateTablesIfModelChanged<T>().InitializeDatabase(context);

            Seed(context);
        }

        protected virtual void Seed(T context)
        {
        }
    }
}