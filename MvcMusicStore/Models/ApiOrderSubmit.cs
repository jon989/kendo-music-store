
namespace MvcMusicStore.Models
{
    public class ApiOrderItem
    {
        public int albumId { get; set; }
        public int quantity { get; set; }
    }

    public class ApiOrderSubmit
    {
        public Order Order { get; set; }
        public ApiOrderItem[] Items { get; set; }
        public LoginModel Login { get; set; }
    }
}