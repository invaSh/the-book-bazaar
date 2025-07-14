using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheBookBazaar.Application.Marketplace;
using TheBookBazaar.DTOs;

namespace TheBookBazaar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketplaceController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MarketplaceController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost]
        public async Task<ActionResult<MarketplaceDto>> Create(Create.Command command)
        {
            command.UserPrincipal = User;
            return await _mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<List<MarketplaceDto>>> GetAll([FromQuery] GetAll.Query query)
        {
            query.UserPrincipal = User;
            return await _mediator.Send(query);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MarketplaceDto>> GetByID([FromRoute] string id)
        {
            return await _mediator.Send(new GetByID.Query { Id = Guid.Parse(id) });
        }

    }
}
