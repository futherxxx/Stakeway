using Microsoft.AspNetCore.Mvc;
using stakeway.Api.Models;
using stakeway.Api.Persistences;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace stakeway.Api.Controllers
{
    [Route("api/[controller]")]
    public class TypesController : Controller
    {
        private readonly StakewayDbContext _context;

        public TypesController(StakewayDbContext context)
        {
            _context = context;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Type> Get()
        {
            return _context.Types.ToList();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public async Task Post([FromBody]Type type)
        {
            await _context.Types.AddAsync(type);
            await _context.SaveChangesAsync();
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
