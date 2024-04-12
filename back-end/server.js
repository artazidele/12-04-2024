const server = require('./index');

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`App running on: ${PORT}`);
});

module.exports = server;