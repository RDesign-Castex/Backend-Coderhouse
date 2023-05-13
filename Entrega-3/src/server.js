const app = require("./app");

const port = process.env.PORT || 3000;

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.log("Error starting server: ", err.message);
  });
