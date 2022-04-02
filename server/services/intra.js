const axios = require('axios');
const nodemailer = require('nodemailer');
const BASE_URL="https://intra.epitech.eu/";
const ENDPOINTS = {
    "MISSED" : {endpoint: "/user/notification/missed", logged: false},
    "USER" : {endpoint: "/", logged: false},
    "PLANNING_SCHEDULE" : {endpoint: "/planning/my-schedules", logged: false},
    "NOTES" : {endpoint: "/notes", logged: true},
    "PRINT" : {endpoint: "/print", logged: true},
}

class Intra {
    constructor(_id, _autologin, _mail) {
        this.id = _id;
        this.autologin = _autologin;
        this.mail = _mail;
        this.email = _mail;
        this.globalModule = [];
    }

    generateUrl(route) {
        let routes = ENDPOINTS;
        let email = null;

        if (!(route in routes))
            return (null);
        if (routes[route].logged === true)
            email = "/user/" + this.email;
        return (BASE_URL + this.autologin + email + routes[route].endpoint + "?format=json");
    }

    getSubscribedModules(interval) {
        let url = this.generateUrl("PRINT") ;

        axios({
            method: "get",
            url: url
        }).then(res => {
            let modules = res.data.modules;
            let currentModule = [];
            let newModule = [];

            for (const [key, m] of Object.entries(modules)) {
                currentModule = currentModule.concat(m.title);
            }
            if (this.globalModule.length != 0) {
                for (let i = 0; i < this.globalModule.length; i++) {
                    newModule = newModule.concat(this.globalModule[i]);
                }
                if (currentModule.length > newModule.length) {
                    this.reaction("Intra: New subscription", currentModule[currentModule.length - 1], this.mail);
                } else if (currentModule.length < newModule.length) {
                    this.reaction("Intra: Subscription canceled", newModule[newModule.length - 1], this.mail);
                } else {
                    this.globalModule = currentModule;
                    return;
                }
            }
            this.globalModule = currentModule;
        }).catch(err => {
            console.error(err);
        });
    }

    reaction(title, link, mail) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply.area.selosse',
                pass: 'selosse2022!'
            }
        });
        var mailOptions = {
            from: 'noreply.area.selosse@gmail.com',
            to: mail,
            subject: title,
            text: link
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    getId() {
        return (this.id);
    }

    setParameter(autologin) {
        this.autologin = autologin;
    }
}

module.exports = Intra;
