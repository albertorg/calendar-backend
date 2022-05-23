const { response, json } = require("express")
const Events = require('../models/events')



const getEvents = async (req, res = response, next) => {

    const events = await Events.find()
        .populate('user', 'name')

    res.json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response, next) => {

    const event = new Events(req.body)

    try {
        event.user = req.uid

        const savedEvent = await event.save()

        res.json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact the admin'
        })
    }
}

const updateEvent = (req, res = response, next) => {

    res.json({
        ok: true,
        msg: 'updateEvents'
    })
}

const deleteEvent = (req, res = response, next) => {

    res.json({
        ok: true,
        msg: 'deleteEvents'
    })
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}