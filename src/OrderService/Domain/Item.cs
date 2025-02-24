namespace OrderService.Domain
{
    public class Item
    {
        public Guid Id { get; set; } 
        public Guid OrderId { get; set; } 
        public Guid BookId { get; set; } 
        public string Title { get; set; } 
        public string Author { get; set; } 
        public decimal Price { get; set; }
        public int Quantity { get; set; } 
        public decimal TotalPrice => Price * Quantity; 
    }
}
