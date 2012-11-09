using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Objects;

namespace MvcMusicStore
{
    public class CreateDbIfNotExists<T> : IDatabaseInitializer<T> where T : DbContext
    {
        public void InitializeDatabase(T context)
        {
            ObjectContext objectContext = ((IObjectContextAdapter)context).ObjectContext;

            if (!context.Database.Exists())
            {
                new CreateDatabaseIfNotExists<T>().InitializeDatabase(context);
            }
            else
            {
                if (context.Database.CompatibleWithModel(true))
                    return;
                CreateTables(objectContext);
            }
            Seed(context);
            context.SaveChanges();
        }

        protected virtual void Seed(T context)
        {
        }

        private void CreateTables(ObjectContext objectContext)
        {
            string dataBaseCreateScript = objectContext.CreateDatabaseScript();
            objectContext.ExecuteStoreCommand(dataBaseCreateScript);
        }
    }
}