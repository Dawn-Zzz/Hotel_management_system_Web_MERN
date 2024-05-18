const authRoute = require("./authRoute");
const staffRoute = require("./staffRoute");
const guestRoute = require("./guestRoute");
const serviceRoute = require("./serviceRoute");
// const postRoute = require("./postRoute");
// const documentRoute = require("./documentRoute");
// const commentRoute = require("./commentRoute");
// const userRoute = require("./userRoute");
// const chatRoute = require("./chatRoute");
// const messageRoutes = require("./messageRoute");
// const notificationRoute = require("./notificationRoute");

let initRoutes = (app) => {
  // app.use("/api/user", userRoute);
  app.use("/api/auth", authRoute);
  // app.use("/api/post", postRoute);
  // app.use("/api/document", documentRoute);
  // app.use("/api/comment", commentRoute);
  // app.use("/api/chat", chatRoute);
  // app.use("/api/message", messageRoutes);
  // app.use("/api/notification", notificationRoute);

  // Staff
  app.use("/api/staff", staffRoute);
  //Guest
  app.use("/api/guest", guestRoute);
  app.use("/api/service", serviceRoute);

  return app;
};

module.exports = initRoutes;
