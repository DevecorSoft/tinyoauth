const { execSync } = require("child_process");
const { server } = require("../dev_server");


let container_hash;

module.exports.mochaHooks = {
  afterAll() {
    server.close()
  },
  beforeEach() {
    const res = execSync("docker run -d -p 3330:8000 amazon/dynamodb-local");
    container_hash = String.fromCharCode(...res);
    console.log(container_hash);
    let print_flag = true;
    while (true) {
      try {
        JSON.parse(
          String.fromCharCode(...execSync(`curl -s ${process.env.HOST_NAME}:3330`))
        );
        break;
      } catch (err) {
        if (print_flag) {
          console.log("waiting container fully up...");
          print_flag = false;
        }
      }
    }
  },
  afterEach() {
    const res = execSync(
      `docker stop ${container_hash} \\\ndocker rm ${container_hash}`
    );
    console.log(String.fromCharCode(...res));
  },
};
