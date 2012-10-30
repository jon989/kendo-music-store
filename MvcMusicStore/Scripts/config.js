function Config() {
    // URLs to WebAPI Controllers
    this.albumsUrl = "/Api/Albums";
    this.artistsUrl = "/Api/Artists";
    this.genresUrl = "/Api/Genres";
    this.imagesUrl = "/Api/Images";
    this.salesByGenreUrl = "/Api/StoreSalesGenre";
    this.salesAndRevenueUrl = "/Api/StoreSalesRevenue";
    
    // General Settings
    this.albumDetailsWindowWidth = "400px";
    this.featuredArtist = "Metallica";
    this.bannerImages = [
        "/Content/Images/Feature1.png",
        "/Content/Images/Feature2.png",
        "/Content/Images/Feature3.png"
    ];
    this.browseGenrePageSize = 20;
    this.manageAlbumsGridPageSize = 50;
    this.searchMaxResults = 20;
    
    // Default values for new Albums added through management screen
    this.newAlbumDefaultGenre = 1;
    this.newAlbumDefaultArtist = 1;
    this.newAlbumDefaultPrice = 9.99;
}