using BookService.Application.Commands;
using BookService.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BooksController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _mediator.Send(new GetBooks());
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(Guid id)
        {
            var book = await _mediator.Send(new GetBook { Id = id });
            if (book == null) return NotFound("Book couldn't be found!");
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook(CreateBook command)
        {
            var bookId = await _mediator.Send(command);
            return Ok(new { message = "Book added successfully!", response = bookId });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Guid id, UpdateBook command)
        {
            command.Id = id;
            var book = await _mediator.Send(command);
            return Ok(new { message = "Book updated successfully!", response = book });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            var book = await _mediator.Send(new DeleteBook { Id = id });
            return Ok(new { message = "Book deleted successfully!", response = book });
        }
    }
}
