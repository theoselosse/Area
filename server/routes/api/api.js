const express = require('express');
const router = express.Router();
const utils = require('../../utils');
const Widget = require('../../models/Widget');

const {deleteInWidgets, updateInWidgets} = require('../../services_handler');

router.get('/widgets/list', (req, res) => {
    const widgets = {
        weather: {
            parameters: {
                city: {
                    type: "string",
                    placeholder: "Ville"
                }
            }
        },
        rss: {
            parameters: {
                url: {
                    type: "string",
                    placeholder: "Url du flux RSS"
                }
            }
        },
        intra: {
            parameters: {
                autologin: {
                    type: "string",
                    placeholder: "Id d'autologin (ex: auth-xxx)"
                }
            }
        },
        time: {
            parameters: {
                timezone: {
                    type: "string",
                    placeholder: "Europe/Paris"
                }
            }
        }
    }
    res.json(widgets);
});

//TODO: error check return res if no token/widget on all fnctns below
router.get("/widgets", async (req, res) => {
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    const token = authHeader.split(' ')[1];
    //console.log(token);

    if (token) {
        utils.verifyToken(token, res, (user) => {
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid token."
                });
            }
            
            let userId = user.id;

            Widget.find({userId: userId}, (err, widgets) => {
                if (err)
                    return res.send(err);
                
                return res.status(200).json(widgets);
            });
        });
    }
});

router.post("/widgets/create", async (req, res) => {
    const {widget, token} = req.body;

    if (token && widget) {
        utils.verifyToken(token, res, (user) => {
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid token."
                });
            }
            let userId = user.id;
            let widgetType = widget.type;
            let widgetParameter = widget.parameter;
            const newWidget = new Widget({userId: userId, type: widgetType, parameter: widgetParameter, exists: false});

            newWidget.save(err => {
                if (err)
                    return res.send(err);
                else
                    return res.status(200).json(newWidget);
            })
        });
    }
});

router.post("/widgets/update", async (req, res) => {
    const {widget, token} = req.body;

    if (token && widget) {
        utils.verifyToken(token, res, (user) => {
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid token."
                });
            }
            let userId = user.id;
            let widgetId = widget.id;
            let widgetType = widget.type;
            let widgetParameter = widget.parameter;

            Widget.findOneAndUpdate({userId: userId, _id: widgetId}, {parameter: widgetParameter}, (err, dbWidget) => {
                if (err)
                    return res.send(err);
                else {
                    updateInWidgets(widgetId, widgetParameter);
                    return res.status(200).json(dbWidget);
                }
            });
        });
    }
});

router.post('/widgets/delete', async (req, res) => {
    const {widget, token} = req.body;
    
    if (token && widget) {
        utils.verifyToken(token, res, (user) => {
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid token."
                });
            }
            let userId = user.id;
            let widgetId = widget.id;
            let widgetParameter = widget.parameter;

            Widget.findOneAndRemove({userId: userId, _id: widgetId}, (err, dbWidget) => {
                if (err)
                    return res.send(err);
                else {
                    deleteInWidgets(widgetId);
                    return res.status(200).json(dbWidget);
                }
            });
        });
    }
});

module.exports = router;
