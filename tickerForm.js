var http = require ("http"); 
var adr = require ("url");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var qobj = adr.parse(req.url, true).query;
  var selVal = qobj.selOp;
  var inputValue = qobj.inputVal;
  var value = "";
  if (inputValue) {
    value += inputValue.toString();
  }
  var query;
  res.write(selVal + ": ");
  res.write(value + "<br>");
  if(selVal == "companyName") {
      query = { name: value };
  }
  else if (selVal == "stockTicker") {
    query = { ticker: value };
  }

  const MongoClient = require('mongodb').MongoClient;
  const url = "mongodb+srv://smoon03:temtu0823@cluster0.zabrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";  // connection string goes here


client = new MongoClient(url,{ useUnifiedTopology: true });

async function findResult() {
  try {
    await client.connect();
    var dbo = client.db("tickerDB");
	var coll = dbo.collection('companies');
    const options = {
       projection: { _id: 0, name: 1, ticker: 1 },
    };
    const curs = coll.find(query,options);
    console.log(curs);

    if ((await curs.count()) === 0) {
        res.write("<br> Please put valid input <br>");
    }

    await curs.forEach(function(item){
        res.write("<br>" + item.name + ": ");
        res.write(item.ticker + "<br>");
	  });
  } 
  catch(err) {
	  console.log("Database error: " + err);
}
  finally {
    client.close();
  }
}  
findResult();  
}).listen(8080);
