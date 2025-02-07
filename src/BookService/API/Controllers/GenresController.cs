using BookService.Application.Commands;
using BookService.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly IMediator _mediator;

        public GenresController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenre(int id)
        {
            var genre = await _mediator.Send(new GetGenre { Id = id});
            if (genre == null) return NotFound("Genre does not exist!");
            return Ok(genre);
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _mediator.Send(new GetGenres());
            return Ok(genres);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGenre (CreateGenre command)
        {
            var genre = await _mediator.Send(command);
            return Ok(new { message = "Genre added successfully!", Response = genre });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var genre = await _mediator.Send(new DeleteGenre { Id = id });
            return Ok(new { message = "Genre deleted successfully!", Response = genre });
        }
    }
}
