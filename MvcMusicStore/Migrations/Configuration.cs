namespace MvcMusicStore.Migrations
{
    using System.Data.Entity.Migrations;

    internal class Configuration : DbMigrationsConfiguration<MvcMusicStore.Models.MusicStoreEntities>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }
    }
}