const server = require("./Middleware/handleMessage");
const config = require("./config");

server.listen(config.PORT, config.IP, ()=>console.log(`Server Start at Port ${config.PORT}`));
