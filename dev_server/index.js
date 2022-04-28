const { app } = require("../app");

console.log("somejjjjjj")
app.get("/shutdown", (req, res) => {
    console.log("bye...\n")
    // require("process").exit(0)
    process.exit(1)
})
app.listen(3333);
