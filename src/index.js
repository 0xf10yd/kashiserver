const app = require("./app");
const { PORT } = require("./config");
const { mongoDb } = require("./common/mongoProvider");
const { transporter, mailOptions } = require("./services/mailService");
var cron = require("node-cron");

console.log(`Connected to [${mongoDb.databaseName}] successfully`);

let onStart = () =>
  console.log(`Server is now running on http://localhost:${PORT}.`);

let onError = () => console.error(`Kashier service stopped`);

cron.schedule("30 11 * * *", () => {
  // Send e-mail daily at 11:30
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.listen(PORT, onStart).on("Error: ", onError);
