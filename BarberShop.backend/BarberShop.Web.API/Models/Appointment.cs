using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Web.API.Models
{
    public class Appointment
    {
        public DateTime AppointmentDate { get; set; } //YMD FORMAT
        public string PhoneNumber { get; set; }

        public bool Successful { get; set; }
    }
}
