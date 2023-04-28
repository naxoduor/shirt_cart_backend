import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "",
      user: "",
      clientId: "",
      clientSecret: "",
      refreshToken: "",
    },
  });
  
export async function sendTokenByEmail() {
    transporter.sendMail(
        {
          from: '"Nax Oduor 👻" <naxoduor7@gmail.com>',
          to: "naxochieng86@gmail.com",
          subject: "Hello ✔",
          text: "Hello world?",
          html: `<h1>Please click the below link to reset password!</h1></br><p><a href="http://127.0.0.1/resetpassword/${token}">Click here to change password</a></p>`,
        },
        function (err, info) {
          if (err) {
            return err
            // res.status(404).json("email not in db");
          } else {
            return "recovery email sent";
          }
        }
      );
}

export async function sendOrderByMail(returneddetails) {
  transporter.sendMail(
    {
      from: '"Nax Oduor 👻" <naxoduor7@gmail.com>',
      to: "naxochieng86@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: `<h1>Order Details!</h1></br><p> The item details are ${JSON.stringify(
        returneddetails
      )}
           and the total amount is ${total + totalDelivery}</p>`,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("we have succesfully sent the email");
      }
    }
  );
}