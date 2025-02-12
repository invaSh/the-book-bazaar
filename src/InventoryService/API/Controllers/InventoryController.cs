using InventoryService.Application.Commands;
using InventoryService.Application.Queries;
using InventoryService.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public InventoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetInventory()
        {
            var inventory = await _mediator.Send(new GetInventory());
            return Ok(inventory);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInventoryItem(Guid id)
        {
            var inventory = await _mediator.Send(new GetInventoryItem { Id = id });
            if(inventory == null) return NotFound("Inventory item does not exist!");
            return Ok(inventory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInventoryItem (Guid id, UpdateInventory command)
        {
            command.Id = id;
            var inventory = await _mediator.Send(command); 
            return Ok(new { message = "Inventory updated successfully!", response = inventory });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventoryItem(Guid id)
        {
            var result = await _mediator.Send(new DeleteInventoryItem { Id = id });
            if (result <= 0) return BadRequest("Problem deleting inventory item");
            return Ok("Inventory item deleted successfully!");
        }
    }
}
