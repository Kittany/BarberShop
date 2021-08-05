using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BarberShop.Web.API.Models;
using BarberShop.Web.API.Utilities;
using Dapper;

namespace BarberShop.Web.API.Data
{
    public abstract class DataAccess
    {


#if DEBUG
        static string connectionString = "Local";
#else
        static string connectionString = "Server";
#endif
        public static bool AddCustomer(string phoneNumber, string firstName, string lastName, string password)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.AddCustomer @PhoneNumber, @FirstName, @LastName, @Password", new { PhoneNumber = phoneNumber, FirstName = firstName, LastName = lastName, Password = password }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }

        public static bool ChangePassword(string phoneNumber, string password)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.ChangePassword @PhoneNumber, @NewPassword", new { PhoneNumber = phoneNumber, NewPassword = password }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }
        }

        public static Customer ValidateCustomer(string phoneNumber, string password)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {

                    return connection.Query<Customer>("dbo.ValidateCustomer @PhoneNumber, @Password", new { PhoneNumber = phoneNumber, Password = password }).FirstOrDefault();
                }

            }
            catch
            {
                return null;
            }
        }

        public static bool IsAdmin(string phoneNumber)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {

                    var res = connection.Query<Customer>("dbo.IsAdmin @PhoneNumber", new { PhoneNumber = phoneNumber }).FirstOrDefault();
                    return res != null;

                }

            }
            catch
            {
                return false;
            }
        }


        public static bool CheckIfPhoneNumberExists(string phoneNumber)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<string>("dbo.CheckIfPhoneNumberExists @PhoneNumber", new { PhoneNumber = phoneNumber }).FirstOrDefault() != null;
                }

            }
            catch
            {
                return false;
            }
        }

        public static Customer GetCustomer(string phoneNumber)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<Customer>("dbo.GetCustomer @PhoneNumber", new { PhoneNumber = phoneNumber }).FirstOrDefault();
                }

            }
            catch
            {
                return null;
            }
        }

        public static List<Customer> GetAllCustomers()
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<Customer>("dbo.GetAllCustomers").ToList();
                }

            }
            catch
            {
                return null;
            }
        }


        public static bool AddProduct(string title, string descreption, int price, bool isAvailable, string image)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.AddProduct @Title, @Descreption, @Price, @IsAvailable, @Image", new { Title = title, Descreption = descreption, Price = price, IsAvailable = isAvailable, Image = image }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }


        public static List<Product> GetAllProducts()
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<Product>("dbo.GetAllProducts").ToList();
                }

            }
            catch
            {
                return null;
            }
        }



        public static bool BookAnAppointment(DateTime appointment, string phoneNumber)
        {
            //The new format insures we are not dealing with seconds
            DateTime appointmentDateFormat = new DateTime(appointment.Year, appointment.Month, appointment.Day, appointment.Hour, appointment.Minute, 0);

            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.BookAnAppointment @Appointment, @PhoneNumber", new { Appointment = appointmentDateFormat, PhoneNumber = phoneNumber }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }

        public static bool UpdateProduct(string title, string descreption, int price, bool isAvailable, string image)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.UpdateProduct @Title, @Descreption, @Price, @IsAvailable, @Image", new { Title = title, Descreption = descreption, Price = price, IsAvailable = isAvailable, Image = image }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }

        public static bool DeleteProduct(string title)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.DeleteProduct @Title", new { Title = title }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }

        public static bool CancelAnAppointment(DateTime appointment)
        {
            //The new format insures we are not dealing with seconds
            DateTime appointmentDateFormat = new DateTime(appointment.Year, appointment.Month, appointment.Day, appointment.Hour, appointment.Minute, 0);

            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.CancelAnAppointment @Appointment", new { Appointment = appointmentDateFormat }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }

        public static List<object> GetTodaysAppointments(DateTime appointment)
        {
            //The new format insures we are not dealing with seconds
            DateTime appointmentDateFormat = new DateTime(appointment.Year, appointment.Month, appointment.Day, appointment.Hour, appointment.Minute, 0);

            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {

                    return connection.Query<object>("dbo.GetTodaysAppointments").ToList();
                }

            }
            catch
            {
                return null;
            }

        }


        public static bool IncreamentCustomerNeglectionPoints(string phoneNumber)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.IncreamentCustomerNeglectionPoints @PhoneNumber", new { PhoneNumber = phoneNumber }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }

        public static bool ResetCustomerNeglectionPoints(string phoneNumber)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.ResetCustomerNeglectionPoints @PhoneNumber", new { PhoneNumber = phoneNumber }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }

        }


        public static Shop GetShopDetails()
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<Shop>("dbo.GetProductDetails").FirstOrDefault();
                }

            }
            catch
            {
                return null;
            }
        }

        public static bool UpdateShopDetails(Shop shop)
        {
            try
            {
                using (IDbConnection connection = new System.Data.SqlClient.SqlConnection(Helper.GetServerConnectionString(connectionString)))
                {
                    return connection.Query<int>("dbo.UpdateShopDetails @FullName, @ShopName, @PhoneNumber, @WorkingHours, @LocationLatitude, @LocationLongitude", new { shop.FullName, shop.ShopName, shop.PhoneNumber, shop.WorkingHours, shop.LocationLatitude, shop.LocationLongitude }).FirstOrDefault() > 0;
                }

            }
            catch
            {
                return false;
            }
        }



    }
}
