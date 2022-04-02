var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
var content = {};

    //client
    var key = "client";
    var data = {
        "host": req.connection.remoteAddress
    };
    content[key] = data;

    //server
    key = "server";
    var date = new Date();
    var current_hour = date.getTime();

    let services = [
		{
			"name": "intra",
			"actions": [
				{
					"name": "intra_subscribe",
					"description": "You subscribe to a module"
				}],
			"reactions": [
				{
					"name": "intra_subscribe",
					"description": "Receive an email when a module is updated"
				}]
		}, {
            "name": "RSS",
			"action": [
				{
					"name": "RSS",
					"description": "RSS flow is updated"
				}],
			"reaction": [
				{
					"name": "RSS",
					"description": "Send newsletter to all people who subscribed to it through Gmail"
				}
			]
		}, {
			"name": "weather",
			"action": [
				{
					"name": "weather",
					"description": "Weather flow is updated"
				}],
				"reaction": [
					{
						"name": "weather",
						"description": "Send temperature change in a city through Gmail"
					}
				]
		}, {
			"name": "time",
			"action": [
				{
					"name": "time",
					"description": "A user defined date is getting closer"
				}],
			"reaction": [
				{
					"name": "time",
					"description": "Send an email to a user, each days about the remaining days until the date"
				}
			]
		}
	];

    data = {
        "current_time": current_hour,
        "services": services
    }
    content[key] = data;
    res.json(content);
});

module.exports = router;
