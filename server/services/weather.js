const axios = require('axios');
const nodemailer = require('nodemailer');

class Weather {
    constructor(_id, _city, _mail) {
        this.id = _id;
        this.city = _city;
        this.mail = _mail;
        this.globalWeather = null;
    }

    getWeather(interval) {
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=b02c1c9dee58bb985814d03ed0f55255`;

        axios.get(url)
            .then(res => {
                let weather = res.data.list;
                var temp;
                for (const [key, item] of Object.entries(weather)) {
                    temp = item.main.temp;
                    break;
                };
                if (this.globalWeather == null) {
                    this.reaction2("Temperature in ", this.city, temp, this.mail);
                    this.globalWeather = temp;
                } else {
                    if (temp != this.globalWeather) {
                        this.reaction('Temperature has changed in  ', this.city, this.globalWeather, temp, this.mail);
                    }
                }
                this.globalWeather = temp;
            }
        ).catch(err => {
            console.error(err);
        });
    }

    reaction(title, city, old_t, new_t, mail) {
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
            subject: title + city + ': ',
            text: "From " + old_t + " to " + new_t
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    reaction2(title, city, temp, mail) {
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
            subject: title + city + ': ',
            text: "Current temperature is " + temp + " in " + city
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

    setParameter(city) {
        this.city = city;
    }
}

module.exports = Weather;
