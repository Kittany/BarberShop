USE BarberShop
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 7/14/2021 1:56:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Customer](
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[IsAdmin] [bit] NOT NULL,
	[NumberOfNeglectedAppointements] int NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[PhoneNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO




/****** Object:  Table [dbo].[Product]    Script Date: 7/14/2021 2:00:45 PM ******/

CREATE TABLE [dbo].[Product](
	[Title] [nvarchar](50) NOT NULL PRIMARY KEY,
	[Descreption] [nvarchar](300) NULL,
	[Price] [int] NOT NULL,
	[IsAvailable] [bit] NOT NULL,
	--[Image] [varbinary] (MAX) NOT NULL,
	[Image] [nvarchar](MAX) NOT NULL
	)



/****** Object:  Table [dbo].[Appointments]    Script Date: 7/14/2021 2:13:00 PM ******/

CREATE TABLE [dbo].[Appointments] (
    [Appointment] [datetime] NOT NULL PRIMARY KEY,
    [PhoneNumber] [nvarchar](10) NOT NULL FOREIGN KEY REFERENCES Customer(PhoneNumber),
	[FullName] [nvarchar](100) NOT NULL, 
	[Successfull] bit NOT NULL
);

GO

CREATE TABLE [dbo].[ShopDetail](
	[FullName] [nvarchar](50) NOT NULL,
	[ShopName] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[WorkingHours] [nvarchar](max) NOT NULL,
	[LocationLatitude] [nvarchar](100) NOT NULL,
	[LocationLongitude] [nvarchar](100) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** PROCEDURES ******/

/****** GET ******/
CREATE PROCEDURE dbo.ValidateCustomer @PhoneNumber nvarchar(10), @Password nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from Customer where PhoneNumber = @PhoneNumber and Password = @Password
	 
END
GO

CREATE PROCEDURE dbo.IsAdmin @PhoneNumber nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from Customer where PhoneNumber = @PhoneNumber and IsAdmin = 1
	 
END
GO

CREATE PROCEDURE dbo.GetCustomer @PhoneNumber nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * from Customer where PhoneNumber = @PhoneNumber
	 
END
GO



CREATE PROCEDURE dbo.GetAllCustomers
AS
BEGIN
	SET NOCOUNT ON;
			SELECT *  FROM [dbo].Customer
END
GO



CREATE PROCEDURE dbo.GetAllAppointments
AS
BEGIN
	SET NOCOUNT ON;
			SELECT *  FROM [dbo].Appointments

END
GO

CREATE PROCEDURE dbo.GetAllProducts
AS
BEGIN
	SET NOCOUNT ON;
	       --SELECT Title,Descreption,Price,IsAvailable,cast(Image as nvarchar(max)) as Image  FROM [dbo].Product 
			SELECT *  FROM [dbo].Product
END
GO


CREATE PROCEDURE dbo.CheckIfPhoneNumberExists @PhoneNumber nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
			SELECT PhoneNumber  FROM [dbo].Customer where PhoneNumber = @PhoneNumber
END
GO

CREATE PROCEDURE dbo.GetShopDetails
AS
BEGIN
	SET NOCOUNT ON;
			SELECT * FROM ShopDetail
END
GO


CREATE PROCEDURE dbo.GetCustomerAppointments @phoneNumber nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
			SELECT * FROM Appointments Where PhoneNumber = @phoneNumber
END
GO


/****** POST ******/
CREATE PROCEDURE dbo.AddCustomer @PhoneNumber nvarchar(10), @FirstName nvarchar(50),@LastName nvarchar(50), @Password nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
			INSERT INTO [dbo].Customer(PhoneNumber,FirstName,LastName,IsAdmin,Password,NumberOfNeglectedAppointements) VALUES (@PhoneNumber,@FirstName,@LastName,0,@Password,0)
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO



CREATE PROCEDURE dbo.AddProduct @Title nvarchar(50), @Descreption nvarchar(300), @Price int, @IsAvailable bit, @Image varbinary(MAX)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
			INSERT INTO [dbo].Product(Title,Descreption,Price,IsAvailable,Image) VALUES (@Title,@Descreption,@Price,@IsAvailable,@Image)
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO

CREATE PROCEDURE dbo.BookAnAppointment @Appointment datetime, @PhoneNumber nvarchar(10), @FullName nvarchar(100)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
			INSERT INTO [dbo].Appointments(Appointment,PhoneNumber,FullName,Successfull) VALUES (@Appointment,@PhoneNumber,@FullName,1) --By Default is true, if a customer neglects an appointments the owner has an option to set it to false (which rarely happens)
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO

/****** UPDATE ******/


CREATE PROCEDURE dbo.ChangePassword @PhoneNumber nvarchar(10), @NewPassword nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
	 
	        UPDATE dbo.Customer
			SET 
			Password = @NewPassword
			WHERE PhoneNumber = @PhoneNumber;
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO

CREATE PROCEDURE dbo.UpdateProduct @Title nvarchar(50), @Descreption nvarchar(300), @Price int, @IsAvailable bit, @Image nvarchar(max)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
	 
	        UPDATE dbo.Product
			SET Descreption = @Descreption,
			Price = @Price,
			IsAvailable = @IsAvailable,
			Image = @Image
			WHERE Title = @Title;
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO


CREATE PROCEDURE dbo.IncreamentCustomerNeglectionPoints @PhoneNumber nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
	 
	        UPDATE dbo.Customer
			SET NumberOfNeglectedAppointements = NumberOfNeglectedAppointements + 1
			WHERE PhoneNumber = @PhoneNumber;
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO


CREATE PROCEDURE dbo.ResetCustomerNeglectionPoints @PhoneNumber nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
	 
	        UPDATE dbo.Customer
			SET NumberOfNeglectedAppointements = 0
			WHERE PhoneNumber = @PhoneNumber;
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO


CREATE PROCEDURE dbo.UpdateShopDetails @FullName nvarchar(50), @ShopName nvarchar(50), @PhoneNumber nvarchar(10), @WorkingHours nvarchar(MAX), @LocationLatitude nvarchar(100), @LocationLongitude nvarchar(100) 
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
	 
	        UPDATE dbo.ShopDetail
			SET FullName = @FullName,
			PhoneNumber = @PhoneNumber,
			WorkingHours = @WorkingHours,
			LocationLatitude = @LocationLatitude,
			LocationLongitude = @LocationLongitude
			WHERE ShopName = @ShopName;
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO

/****** DELETE ******/

CREATE PROCEDURE dbo.DeleteProduct @Title nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
	 
	        DELETE FROM [dbo].Product WHERE Title = @Title;
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO


CREATE PROCEDURE dbo.CancelAnAppointment @Appointment datetime
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY  
			DELETE FROM [dbo].Appointments WHERE Appointment = @Appointment;
			SELECT 1;
	END TRY  

	BEGIN CATCH  
			SELECT 0
	END CATCH;   
END
GO






