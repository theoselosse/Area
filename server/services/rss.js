const Parser = require('rss-parser');
const nodemailer = require('nodemailer');

class Rss {
    constructor(_id, _rss, _mail) {
        this.id = _id;
        this.rss = _rss;
        this.mail = _mail;
        this.globalFeed = null;
    }

    getRssFeed(interval) {
        let currentDate = new Date();
        let comparisonDate = new Date(currentDate.getTime() - (60000 * interval));
        let parser = new Parser();
        let feed = parser.parseURL(this.rss)
            .then(res => {
                for (const [key, item] of Object.entries(res.items)) {
                    let pubDate = new Date(item.pubDate);
                    console.log(pubDate + '\t' + comparisonDate);
                    if (pubDate >= comparisonDate) {
                        if (this.globalFeed != null) {
                            if (this.globalFeed.items[key].title != res.items[key].title) {
                                this.reaction(item.title, item.link, this.mail);
                            }
                        } else {
                            this.reaction(item.title, item.link, this.mail);
                        }
                    }
                };
                this.globalFeed = res;
            }).catch (err => {
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
        return this.id;
    }

    setParameter(rss) {
        this.rss = rss;
    }
}

module.exports = Rss;
