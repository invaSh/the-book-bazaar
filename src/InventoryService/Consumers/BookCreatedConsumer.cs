using AutoMapper;
using Contracts.Books;
using InventoryService.Domain;
using InventoryService.Infrastructure;
using MassTransit;

namespace InventoryService.Consumers
{
    public class BookCreatedConsumer : IConsumer<BookCreated>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BookCreatedConsumer(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task Consume(ConsumeContext<BookCreated> context)
        {
            Console.WriteLine("====> Consuming book");
            var book = _mapper.Map<Book>(context.Message);
            _context.Books.Add(book);
            var inventoryItem = new InventoryItem
            {
                BookId = book.Id,
                LastRestocked = DateTime.UtcNow,
            };
            _context.InventoryItems.Add(inventoryItem);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) throw new Exception("Problem saving items!");
        }
    }
}
