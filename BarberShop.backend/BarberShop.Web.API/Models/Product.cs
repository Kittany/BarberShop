using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Web.API.Models
{
    public class Product
    {
        public string Title { get; set; }
        public string Descreption { get; set; }
        public int Price { get; set; }
        public bool IsAvailable { get; set; }
        public string Image { get; set; }
    }
}
