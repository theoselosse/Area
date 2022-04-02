const axios = require('axios');
const nodemailer = require('nodemailer');

class Time {
    constructor(_id, _date, _mail) {
        this.id = _id;
        this.date = _date;
        this.mail = _mail;
        this.globalTime = null;
    }

    getTime(interval) {
        let currentDate = new Date();
        let finalDate = new Date(this.date);
        let timeDiff = finalDate.getTime() - currentDate.getTime();
        let daysDiff = timeDiff / (1000 * 3600 * 24);
        if (this.globalTime != null) {
            if (Math.floor(daysDiff) != this.globalTime)
                this.reaction('The event is in: ', Math.floor(daysDiff), this.mail);
        } else {
            this.reaction('The event is in: ', Math.floor(daysDiff), this.mail);
        }
        this.globalTime = Math.floor(daysDiff);
    }

    reaction(title, time, mail) {
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
            text: time + " days"
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
        return this.id;
    }

    setParameter(date) {
        this.date = date;
    }
}

module.exports = Time;
