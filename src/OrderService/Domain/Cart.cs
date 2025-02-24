namespace OrderService.Domain
{
    public class Cart
    {
        public Guid Id { get; set; }
        public Guid UserId { get; init; }
        public List<Item> Items { get; init; }
    }
}
