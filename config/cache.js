const redis = require('redis')
const client = redis.createClient(6380, '127.0.0.1')

client.on("error", function(err){
    console.log("Error " + err);
})
client.set("products", "nice values");
client.get("products", (err, data)=>{
    if(err){
      throw err;
    }
  });
module.exports = client