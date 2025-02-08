using System.ComponentModel.DataAnnotations;

namespace BookService.Domain
{
    public class Book
    {
        public Guid Id { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int PublicationYear { get; set; }
        public string  Format { get; set; }
        public int PageNumber { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public BookCondition Condition { get; set; }
        public ICollection<Genre> Genres { get; set; }
    }


    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Book> Books { get; set; }
    }

    public enum BookCondition
    {
        New,
        LikeNew,
        VeryGood,
        Good,
        Acceptable,
        Poor
    }
}
                                                             