using System.Collections.Generic;
using AmazingCo.Model;
using Microsoft.AspNetCore.Mvc;

namespace AmazingCo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PromotionController : ControllerBase
    {
        // replicating a db call for this example
        private static readonly List<Promotion> promotions = new List<Promotion>
        {
            new Promotion
            {
                ExperienceId = -1,
                EventName = "Any",
                Condition = 5,
                Modifier = .8,
                Description = "Buy 5, Get 20% off the 5th experience"
            },
            new Promotion
            {
                ExperienceId = 1,
                EventName = "Wine Tours",
                Condition = 4,
                Modifier = -1,
                Description = "Buy 4, ONLY Pay for 3"
            },
            new Promotion
            {
                ExperienceId = 2,
                EventName = "Team Buildings",
                Condition = 2,
                Modifier = .875,
                Description = "Buy 2 for $1500"
            },
            new Promotion
            {
                ExperienceId = 3,
                EventName = "Picnics",
                Condition = 2,
                Modifier = 1,
                Description = "Buy 2, get 1 free"
            },
        };

        [HttpGet]
        public IEnumerable<Promotion> GetPromotions()
        {
            return promotions.ToArray();
        }
    }
}