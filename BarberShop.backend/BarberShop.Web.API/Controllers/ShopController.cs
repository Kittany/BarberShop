using BarberShop.Web.API.Data;
using BarberShop.Web.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BarberShop.Web.API.Controllers
{
    public class ShopController : ApiController
    {

        [HttpGet]
        [Route("api/Shop/getshopdetails")]
        public IHttpActionResult GetShopDetails()
        {
            var res = DataAccess.GetShopDetails();
            if (res != null)
                return Ok(res);

            return BadRequest("Something went wrong...");


        }

        [HttpPost]
        [Route("api/Shop/updateshopdetails")]
        public IHttpActionResult UpdateShopDetails(Shop shop)
        {


            if (DataAccess.UpdateShopDetails(shop))
                return Ok("ShopDetails has been updated");


            return BadRequest("Something went wrong...");

        }

    }
}
