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
        // GET api/appointment/today
        [HttpGet]
        [Route("api/appointment/today")]
        public IHttpActionResult GetTodaysAppointments([FromBody] Appointment appointment)
        {
            var res = DataAccess.GetTodaysAppointments(appointment.AppointmentDate);

            if (res != null)
                return Ok(res);

            return BadRequest("Error getting today's appointments");
        }

        // POST api/appointment/book
        [HttpPost]
        [Route("api/appointment/book")]
        public IHttpActionResult BookAnAppointment([FromBody] Appointment appointment)
        {
            if (DataAccess.BookAnAppointment(appointment.AppointmentDate, appointment.PhoneNumber))
                return Ok("Appointment was successfully booked");

            return BadRequest("Error booking an appointment");
        }


        // POST api/appointment/cancel
        [HttpPost]
        [Route("api/appointment/cancel")]
        public IHttpActionResult CancelAnAppointment([FromBody] Appointment appointment)
        {
            if (DataAccess.CancelAnAppointment(appointment.AppointmentDate))
                return Ok("Appointment has been successfully canceled");

            return BadRequest("Error canceling the appointment");
        }



    }
}
