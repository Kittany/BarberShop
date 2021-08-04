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
    public class CustomerController : ApiController
    {

        // GET api/customer/getall
        [HttpPost]
        [Route("api/customer/get")]
        public IHttpActionResult GetCustomer(Customer customer)
        {
            var res = DataAccess.GetCustomer(customer.PhoneNumber);

            if (res != null)
                return Ok(res);


            return BadRequest("Error getting customer");
        }


        // GET api/customer/getall
        [HttpGet]
        [Route("api/customer/getall")]
        public IHttpActionResult GetAllCustomers()
        {
            var res = DataAccess.GetAllCustomers();

            if (res != null)
                return Ok(res);



            return BadRequest("Error getting customers");
        }

        // GET api/customer/validate
        [HttpPost]
        [Route("api/customer/validate")]
        public IHttpActionResult ValidateCustomer([FromBody] Customer customer)
        {
            var res = DataAccess.ValidateCustomer(customer.PhoneNumber, customer.Password);

            if (res != null)
                return Ok(res);  

            return BadRequest("Error validating customer");
        }


        // GET api/customer/isadmin
        [HttpPost]
        [Route("api/customer/isadmin")]
        public IHttpActionResult IsAdmin([FromBody] Customer customer)
        {
            if (DataAccess.IsAdmin(customer.PhoneNumber))
                return Ok(true);

            return BadRequest("Error occurred during validation");
        }


        // GET api/customer/checkifnumberexist
        [HttpPost]
        [Route("api/customer/checkifnumberexist")]
        public IHttpActionResult CheckIfPhoneNumberExists([FromBody] Customer customer)
        {
            if (DataAccess.CheckIfPhoneNumberExists(customer.PhoneNumber))
                return Ok("True");

            return BadRequest("False");
        }

        // POST api/customer/add
        [HttpPost]
        [Route("api/customer/add")]
        public IHttpActionResult AddCustomer([FromBody] Customer customer)
        {
            if (DataAccess.AddCustomer(customer.PhoneNumber,customer.FirstName,customer.LastName,customer.Password))
                return Ok("Customer was successfully added");

            return BadRequest("Error adding customer");
        }

        // PUT api/customer/changepassword
        [HttpPut]
        [Route("api/customer/changepassword")]
        public IHttpActionResult ChangePassword([FromBody] Customer customer)
        {
            if (DataAccess.ChangePassword(customer.PhoneNumber, customer.Password))
                return Ok("Password was successfully changed");

            return BadRequest("Error changing password");
        }

        // PUT api/customer/punish
        [HttpPut]
        [Route("api/customer/punish")]
        public IHttpActionResult IncreamentCustomerNeglectionPoints([FromBody] Customer customer)
        {
            if (DataAccess.IncreamentCustomerNeglectionPoints(customer.PhoneNumber))
                return Ok("One neglection point was successfully added to the customer");

            return BadRequest("The customer was not given a neglection point due to an error");
        }

        // PUT api/customer/forgive
        [HttpPut]
        [Route("api/customer/forgive")]
        public IHttpActionResult ResetCustomerNeglectionPoints([FromBody] Customer customer)
        {
            if (DataAccess.ResetCustomerNeglectionPoints(customer.PhoneNumber))
                return Ok("Customer's neglection points has been successfully reset");

            return BadRequest("Coudln't reset customer's neglection points due to an error");
        }


    }
}
