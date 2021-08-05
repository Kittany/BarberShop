using BarberShop.Web.API.Data;
using BarberShop.Web.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BarberShop.Web.API.Controllers
{
    public class ProductController : ApiController
    {
        // GET api/product/getall
        [HttpGet]
        [Route("api/product/getall")]
        public IHttpActionResult GetAllProducts()
        {
            var res = DataAccess.GetAllProducts();

            if (res != null)
                return Ok(res);

            return BadRequest("Error getting products");
        }

        // POST api/product/add
        [HttpPost]
        [Route("api/product/add")]
        public IHttpActionResult AddProduct([FromBody] Product product)
        {
            if (DataAccess.AddProduct(product.Title, product.Descreption, product.Price, product.IsAvailable, product.Image))
                return Ok("Product was successfully added");

            return BadRequest("Error adding product");
        }

        // POST api/product/update
        [HttpPost]
        [Route("api/product/update")]
        public IHttpActionResult UpdateProduct([FromBody] Product product)
        {
            if (DataAccess.UpdateProduct(product.Title, product.Descreption, product.Price, product.IsAvailable, product.Image))
                return Ok("Product was successfully updated");

            return BadRequest("Error updating product");
        }

        // POST api/product/delete
        [HttpPost]
        [Route("api/product/delete")]
        public IHttpActionResult DeleteProduct([FromBody] Product product)
        {
            if (DataAccess.DeleteProduct(product.Title))
                return Ok("Product was successfully deleted");

            return BadRequest("Error deleting product");
        }

    }
}
