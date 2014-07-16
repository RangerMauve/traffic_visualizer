var socket = io();
var senders = {};
var packets = [];

var hub = new Path.Circle({
	radius: 20,
	strokeColor: "black"
});

socket.on("packet", function (data) {
	console.log("Packet:", data);
	var ip = data.ip;
	if (!senders[ip])
		senders[ip] = {
			ip: ip,
			shape: new Path.Circle({
				radius: 10,
				strokeColor: "black"
			})
		}
	make_packet(ip);
});

function make_packet(ip) {
	var origin = senders[ip].shape.position;
	var destination = hub.position;
	var packet = {
		shape: new Path.Circle({
			radius: 5,
			fillColor: "red"
		}),
		velocity: (destination - origin).normalize()
	};
	packet.shape.position = new Point(origin);
	packets.push(packet);
}

function onResize(event) {
	var pos = view.center + new Point(0, view.size.height / -6);
	hub.position = pos;
}

function onFrame() {
	console.log(senders)
	var width = view.size.width;
	var senders_a = Object.keys(senders).map(function (key) {
		return senders[key]
	});
	senders_a.forEach(function (sender, index) {
		var pos = sender.shape.position;
		console.log(pos);
		pos.x = (width / senders_a.length) * index;
		pos.y = view.size.height;
	});

	packets.forEach(function (packet, index) {
		packet.shape.position += packet.velocity;
		if (packet.shape.position.y < (view.size.height / -6)) {
			packet.shape.remove();
			packets.splice(index, 1);
		}
	});
}
