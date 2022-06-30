const redis = require('redis')
const client = redis.createClient(6380, '127.0.0.1')

//console.log(client)

client.on("error", function(err){
    console.log("Error " + err);
})
client.set("products", "nice values");
client.get("products", (err, data)=>{
    if(err){
      throw err;
    }
    console.log(data);
  });
module.exports = client