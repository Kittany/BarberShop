using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BarberShop.Web.API.Models
{
    public class Shop
    {
        public string FullName { get; set; }
        public string ShopName { get; set; }
        public string PhoneNumber { get; set; }
        public string WorkingHours { get; set; }
        public string LocationLatitude { get; set; }
        public string LocationLongitude { get; set; }


    }
}