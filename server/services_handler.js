const Intra = require("./services/intra");
const Rss = require("./services/rss");
const Weather = require("./services/weather");
const Time = require("./services/time");

const User = require("./models/User");
const Widget = require("./models/Widget");

const INTERVAL = 1000 * 20;

let widgets = Array();

/*
let users = [
    {
        id: 1,
        mail: "noreply.area.selosse@gmail.com",
        widgets: [
            {
                scope: "intra",
                type: "module",
                autologin: "auth-07b066c9abc14659a2518bc9f784e42c8869a698",
                mail: "theo.selosse@epitech.eu"
            },
            {
                scope: "rss",
                type: null,
                url: "https://www.reddit.com/.rss"
            },
            {
                scope: "weather",
                type: null,
                city: "Paris",
                api_key: "b02c1c9dee58bb985814d03ed0f55255"
            }
        ]
    },
    {
        id: 2,
        widgets: [
        ]
    }
];
*/

function deleteInWidgets(id) {
    for (let i = 0; i < widgets.length; i++) {
        let widget = widgets[i];
        if (widget.id == id) {
            widgets.splice(i, 1);
            return;
        }
    }
}

function updateInWidgets(id, parameter) {
    for (let i = 0; i < widgets.length; i++) {
        let widget = widgets[i];
        if (widget.id == id) {
            widget.setParameter(parameter);
            return;
        }
    }
}

function noop() {}

async function bzero() {
    bzero = noop;
    let db_widgets = await getAllWidgets();
    db_widgets.forEach(widget => {
        widget.exists = false;
        widget.save();
    });
}

async function getAllWidgets() {
    let widgets = await Widget.find({});
    return widgets;
}

async function getUserById(id) {
    let user = await User.findById(id);
    return user;
}

async function create() {
    let db_widgets = await getAllWidgets();
    for (const [key, widget] of Object.entries(db_widgets)) {
        let user = await getUserById(widget.userId);
        if (!widget.exists) {
            switch (widget.type) {
                case "Intra":
                    let intra = new Intra(widget._id, widget.parameter, user.email);
                    await Widget.findByIdAndUpdate(widget._id, {exists: true});
                    widgets.push(intra);
                    break;
                case "Rss":
                    let rss = new Rss(widget._id, widget.parameter, user.email);
                    await Widget.findByIdAndUpdate(widget._id, {exists: true});
                    widgets.push(rss);
                    break;
                case "Weather":
                    let weather = new Weather(widget._id, widget.parameter, user.email);
                    await Widget.findByIdAndUpdate(widget._id, {exists: true});
                    widgets.push(weather);
                    break;
                case "Time":
                    let time = new Time(widget._id, widget.parameter, user.email);
                    await Widget.findByIdAndUpdate(widget._id, {exists: true});
                    widgets.push(time);
                    break;
                default:
                    break;
            }
        }
    }
}

async function update() {
    for (let i = 0; i < widgets.length; i++) {
        let widget = widgets[i];
        if (widget instanceof Intra) {
            widget.getSubscribedModules(INTERVAL);
        }
        if (widget instanceof Rss) {
            widget.getRssFeed(INTERVAL);
        }
        if (widget instanceof Weather) {
            widget.getWeather(INTERVAL);
        }
        if (widget instanceof Time) {
            widget.getTime(INTERVAL);
        }
    }
}

bzero();
create();
update();

setInterval(async function() {
    await create();
    await update();
}, INTERVAL);

module.exports = {
    deleteInWidgets: deleteInWidgets,
    updateInWidgets: updateInWidgets
}