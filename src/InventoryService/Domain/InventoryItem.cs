namespace InventoryService.Domain
{
    public class InventoryItem
    {
        public Guid Id { get; set; } 
        public Guid BookId { get; set; } 
        public int QuantityAvailable { get; set; }
        public int QuantityReserved { get; set; }
        public bool IsInStock => QuantityAvailable > 0;
        public DateTime LastRestocked { get; set; } 
    }
}
