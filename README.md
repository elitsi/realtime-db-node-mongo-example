# realtime-db-node-mongo-example
Node.js, Typescript, Express &amp; MongoDB - reflecting real time changes.

Before starting the server, make sure you are running mongo with replica set instead of stand alone.

```bash
mongod --port 27017 --replSet rs0 --dbpath <YOUR_DATA_PATH>
```

And in different shell,

```bash
mongo
rs.initiate() 
```

To start the server run:

```bash
npm install
npm start
```
