using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Web.API.Models
{
    public class Appointment
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int Hour { get; set; }
        public int Minutes { get; set; }
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }

        public bool Successful { get; set; }
    }
}
