var express=require('express'),
app = express(),
port = process.env.PORT || 1337;
var mysql = require('mysql');
var credentials = require('./credentials.json');
credentials.host="ids";
var connection = mysql.createConnection(credentials);

var buttons = [];
var index = 0;

//sql = "SELECT buttonID,concat('{buttonID:'`buttonID`, ',left:'`left`,'}') as list FROM till_buttons GROUP BY buttonID;"
//sql = "SELECT buttonID,concat('{buttonID:',`buttonID`, ',left:',`left`,',top:',`top`,',width:',`width`,',label:',`label`,',invID:',`invID`,'}') as list FROM institutional_casey.till_buttons GROUP BY buttonID;"
//sql = "SELECT concat('{','"'buttonID'"':,`buttonID`,'"'left'"':,`left`,'"'top'"':,`top`,'"'width'"':,`width`) as list FROM institutional_casey.till_buttons;"
sql = "select * from institutional_casey.till_buttons;"
console.log(sql);

function process_buttons(rows){
	while(index < rows.length){
		var button = rows[index];
		buttons.push(button);
		console.log(index);
		index++;
	}
	console.log(buttons[1]);
}


console.log(buttons);
//var buttons=[{"buttonID":1,"left":10,"top":70,"width":100,"label":"hotdogs","invID":1},{"buttonID":2,"left":110,"top":70,"width":100,"label":"hambugers","invID":2},{"buttonID":3,"left":210,"top":70,"width":100,"label":"bannanas","invID":3},{"buttonID":4,"left":10,"top":120,"width":100,"label":"milkduds","invID":4}]; //static buttons

app.use(express.static(__dirname + '/public')); //Serves the web pages
app.get("/buttons",function(req,res){ // handles the /buttons API
	var sql = "select * from institutional_casey.till_buttons;"
	connection.query(sql,(function(res){ return function(err,rows,fields){
        //connection.connect() is run automatically for a query
        if(err){
                console.log('Error looking up databases');
                connection.end();
                console.log(sql);
        //      console.log(err);
        } else {
		res.send(rows);
//		console.log(rows);
//                process_buttons(rows);
        }
}})(res));
//	res.send(buttons);
});

app.listen(port);
