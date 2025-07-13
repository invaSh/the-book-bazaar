namespace TheBookBazaar.Domain
{
    public class Marketplace
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}
