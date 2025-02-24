namespace OrderService.Domain
{
    public enum Status
    {
        Processing,
        Confirmed,
        Shipped,
        Delivered,
        Cancelled,
        Refunded,
        PaymentFailed
    }
}
