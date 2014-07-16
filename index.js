var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);
var events = new(require('events').EventEmitter)();

var ips = ["127.0.0.1", "192.168.1", "192.168.100", "8.8.8.8"];

app.use(express.static(__dirname));

events.on("packet", function (data) {
	console.log("packet", data);
	io.emit("packet", data);
});

setInterval(function () {
	events.emit("packet", {
		ip: r_f_a(ips),
		to: "localhost"
	});
}, 1000);

function r_f_a(a) {
	return a[Math.floor(Math.random() * a.length)];
}

server.listen(80);
