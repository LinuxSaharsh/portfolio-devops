const AWS = require("aws-sdk");

const ses = new AWS.SES({ region: "us-east-1" });

exports.handler = async (event) => {

  const body = JSON.parse(event.body);

  const name = body.name;
  const email = body.email;
  const subject = body.subject;
  const message = body.message;

  const params = {
    Destination: {
      ToAddresses: ["saharshjoshi065@gmail.com"]
    },
    Message: {
      Body: {
        Text: {
          Data: `
Name: ${name}
Email: ${email}

Message:
${message}
          `
        }
      },
      Subject: {
        Data: subject || "Portfolio Contact Form"
      }
    },
    Source: "saharshjoshi065@gmail.com"
  };

  try {
    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ message: "Email sent successfully" })
    };

  } catch (error) {

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: error.message })
    };

  }
};