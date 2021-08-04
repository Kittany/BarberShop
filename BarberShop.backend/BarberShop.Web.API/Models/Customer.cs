using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Web.API.Models
{
    public class Customer
    {
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }

        public string Password { get; set; }

        public int NumberOfNeglectedAppointements { get; set; }
    }
}
