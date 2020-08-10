using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AmazingCo.Model
{
    public class Promotion
    {
        public int ExperienceId { get; set; }
        public string EventName { get; set; }
        public int Condition { get; set; }
        public double Modifier { get; set; }
        public string Description { get; set; }
    }
}