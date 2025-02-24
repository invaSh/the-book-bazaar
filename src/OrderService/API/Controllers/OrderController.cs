using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderService.Application.Commands;

namespace OrderService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("cart")]
        public async Task<IActionResult> AddItemToCart(AddCartItem request)
        {
            var res = await _mediator.Send(request);
            return Ok("Item added to cart successfully!");
        }
        
        [HttpPost]
        public async Task<IActionResult> PlaceOrder(PlaceOrder request)
        {
            var res = await _mediator.Send(request);
            if(res.Type.Equals("error")) return BadRequest(res);
            return Ok(res);
        }


    }
}
