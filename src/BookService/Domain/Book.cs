namespace BookService.Domain
{
    public class Book
    {
        public Guid ID { get; set; }
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int PublicationYear { get; set; }
        public Genre Genre { get; set; }
        public string  Format { get; set; }
        public int PageNumber { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public BookCondition Condition { get; set; }
    }


    [Flags]
    public enum Genre
    {
        None = 0,
        Fiction = 1 << 0,
        NonFiction = 1 << 1,
        Mystery = 1 << 2,
        Thriller = 1 << 3,
        Horror = 1 << 4,
        Fantasy = 1 << 5,
        ScienceFiction = 1 << 6,
        HistoricalFiction = 1 << 7,
        Romance = 1 << 8,
        Adventure = 1 << 9,
        Dystopian = 1 << 10,
        Contemporary = 1 << 11,
        Biography = 1 << 12,
        Autobiography = 1 << 13,
        Memoir = 1 << 14,
        SelfHelp = 1 << 15,
        Psychology = 1 << 16,
        Philosophy = 1 << 17,
        Business = 1 << 18,
        Economics = 1 << 19,
        Science = 1 << 20,
        Technology = 1 << 21,
        Health = 1 << 22,
        History = 1 << 23,
        Poetry = 1 << 24,
        Drama = 1 << 25,
        Classic = 1 << 26,
        YoungAdult = 1 << 27,
        Childrens = 1 << 28,
        GraphicNovel = 1 << 29,
        Comic = 1 << 30
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
                                                             