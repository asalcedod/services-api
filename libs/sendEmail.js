require("dotenv").config();
const logger = require("../config/logger");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const wellcomeEmail = (from, to, subject, fullname) => {
  const html = `
	<html lang="en-US">
	<head>
	  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	  <title>AddinUp: Welcome!</title>
	  <meta name="description" content="Reset Password Email Template." />
	  <style type="text/css">
		a:hover {
		  text-decoration: underline !important;
		}
	  </style>
	</head>

	<body
	  marginheight="0"
	  topmargin="0"
	  marginwidth="0"
	  style="margin: 0px; background-color: #f2f3f8"
	  leftmargin="0"
	>
	  <!--100% body table-->
	  <table
		cellspacing="0"
		border="0"
		cellpadding="0"
		width="100%"
		bgcolor="#f2f3f8"
		style="
		  @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
		  font-family: 'Open Sans', sans-serif;
		"
	  >
		<tr>
		  <td>
			<table
			  style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
			  width="100%"
			  border="0"
			  align="center"
			  cellpadding="0"
			  cellspacing="0"
			>
			  <tr>
				<td style="height: 80px">&nbsp;</td>
			  </tr>
			  <tr>
				<td>
				  <table
					width="95%"
					border="0"
					align="center"
					cellpadding="0"
					cellspacing="0"
					style="
					  max-width: 670px;
					  background: #fff;
					  border-radius: 3px;
					  text-align: center;
					  -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
					  -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
					  box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
					"
				  >
					<tr>
					  <td style="height: 40px">&nbsp;</td>
					</tr>
					<tr>
					  <td style="padding: 0 35px">
						<h1
						  style="
							color: #1e1e2d;
							font-weight: 500;
							margin: 0;
							font-size: 32px;
							font-family: 'Rubik', sans-serif;
						  "
						>
						Welcome to the AddingUp <br> ${fullname}.
						</h1>
						<span
						  style="
							display: inline-block;
							vertical-align: middle;
							margin: 29px 0 26px;
							border-bottom: 1px solid #cecece;
							width: 100px;
						  "
						></span>
						<p
						  style="
							color: #455056;
							font-size: 15px;
							line-height: 24px;
							margin: 0;
						  "
						>
						  To enter the platform, you must wait for an administrator to approve your registration.<br>
						  Please be listening to a confirmation email and you will be provided with a username and password.
						</p>

					  </td>
					</tr>
					<tr>
					  <td style="height: 40px">&nbsp;</td>
					</tr>
				  </table>
				</td>
			  </tr>

			  <tr>
				<td style="height: 20px">&nbsp;</td>
			  </tr>
			  <tr>
				<td style="height: 80px">&nbsp;</td>
			  </tr>
			</table>
		  </td>
		</tr>
	  </table>
	</body>
  </html>`;
  mailOptions = {
    from,
    to,
    subject,
    html,
  };
  transporterEmail(mailOptions);
};

const forgotPassword = (from, to, subject, temporalyPassword) => {
  const html = `
	<html lang="en-US">
	<head>
	  <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	  <title>AddinUp: Reset Password</title>
	  <meta name="description" content="Reset Password Email Template." />
	  <style type="text/css">
		a:hover {
		  text-decoration: underline !important;
		}
	  </style>
	</head>

	<body
	  marginheight="0"
	  topmargin="0"
	  marginwidth="0"
	  style="margin: 0px; background-color: #f2f3f8"
	  leftmargin="0"
	>
	  <!--100% body table-->
	  <table
		cellspacing="0"
		border="0"
		cellpadding="0"
		width="100%"
		bgcolor="#f2f3f8"
		style="
		  @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
		  font-family: 'Open Sans', sans-serif;
		"
	  >
		<tr>
		  <td>
			<table
			  style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
			  width="100%"
			  border="0"
			  align="center"
			  cellpadding="0"
			  cellspacing="0"
			>
			  <tr>
				<td style="height: 80px">&nbsp;</td>
			  </tr>
			  <tr>
				<td style="height: 20px">&nbsp;</td>
			  </tr>
			  <tr>
				<td>
				  <table
					width="95%"
					border="0"
					align="center"
					cellpadding="0"
					cellspacing="0"
					style="
					  max-width: 670px;
					  background: #fff;
					  border-radius: 3px;
					  text-align: center;
					  -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
					  -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
					  box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
					"
				  >
					<tr>
					  <td style="height: 40px">&nbsp;</td>
					</tr>
					<tr>
					  <td style="padding: 0 35px">
						<h1
						  style="
							color: #1e1e2d;
							font-weight: 500;
							margin: 0;
							font-size: 32px;
							font-family: 'Rubik', sans-serif;
						  "
						>
						  You have requested to reset your password
						</h1>
						<span
						  style="
							display: inline-block;
							vertical-align: middle;
							margin: 29px 0 26px;
							border-bottom: 1px solid #cecece;
							width: 100px;
						  "
						></span>
						<p
						  style="
							color: #455056;
							font-size: 15px;
							line-height: 24px;
							margin: 0;
						  "
						>
						  The temporal password is: ${temporalyPassword}<br>
						  Expire in 1 hour
						</p>

					  </td>
					</tr>
					<tr>
					  <td style="height: 40px">&nbsp;</td>
					</tr>
				  </table>
				</td>
			  </tr>

			  <tr>
				<td style="height: 20px">&nbsp;</td>
			  </tr>
			  <tr>
				<td style="height: 80px">&nbsp;</td>
			  </tr>
			</table>
		  </td>
		</tr>
	  </table>
	</body>
  </html>
  `;
  mailOptions = {
    from,
    to,
    subject,
    html,
  };
  transporterEmail(mailOptions);
};

transporterEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error(error.toString());
    } else {
      logger.info("Email sent: " + info.response);
    }
  });
};

module.exports = {
  wellcomeEmail,
  forgotPassword,
};
