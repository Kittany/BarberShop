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
    public class AppointmentController : ApiController
    {
        // GET api/appointment/getall
        [HttpGet]
        [Route("api/appointment/getall")]
        public IHttpActionResult GetAllAppointments()
        {
            var res = DataAccess.GetAllAppointments();

            if (res != null)
                return Ok(res);

            return BadRequest("Error getting the appointments");
        }



        // Get api/appointment/getcustomerappointments
        [HttpGet]
        [Route("api/appointment/getcustomerappointments")]
        public IHttpActionResult GetCustomerAppointments([FromBody] Customer customer)
        {
            var res = DataAccess.GetCustomerAppointments(customer.PhoneNumber);

            if (res != null)
                return Ok(res);

            return BadRequest("Error getting customer appointments");
        }

        // POST api/appointment/book
        [HttpPost]
        [Route("api/appointment/book")]
        public IHttpActionResult BookAnAppointment([FromBody] Appointment appointment)
        {
            if (DataAccess.BookAnAppointment(appointment.Year, appointment.Month, appointment.Day, appointment.Hour, appointment.Minutes, appointment.PhoneNumber,appointment.FullName))
                return Ok("Appointment was successfully booked");

            return BadRequest("Error booking an appointment");
        }


        // POST api/appointment/cancel
        [HttpPost]
        [Route("api/appointment/cancel")]
        public IHttpActionResult CancelAnAppointment([FromBody] Appointment appointment)
        {
            if (DataAccess.CancelAnAppointment(appointment.Year, appointment.Month, appointment.Day, appointment.Hour, appointment.Minutes))
                return Ok("Appointment has been successfully canceled");

            return BadRequest("Error canceling the appointment");
        }



    }
}
