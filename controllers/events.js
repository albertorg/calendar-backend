const { response, json } = require("express")
const Events = require('../models/events')



const getEvents = async (req, res = response) => {

    const events = await Events.find()
        .populate('user', 'name')

    res.json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response) => {

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

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id
    const userId = req.uid
 
    try {
        const event = await Events.findById(eventId)

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'No event exists with tis ID'
            })
        }

        if (event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission for this action'
            })
        }

        const newEvent = {
            ...req.body,
            user: userId
        }

        const updatedEvent = await Events.findByIdAndUpdate(eventId, newEvent, {new: true})

        res.json({
            ok: true,
            evento: updatedEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact with admin'
        })
    }

}

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id
    const userId = req.uid

    try {
        const event = await Events.findById(eventId)

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'No event exists with tis ID'
            })
        }

        if (event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission for this action'
            })
        }

        const deletedEvent = await Events.findByIdAndDelete(eventId)

        res.json({
            ok: true,
            evento: deletedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please contact with admin'
        })
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}