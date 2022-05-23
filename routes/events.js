/* 
    Events routes
    /api/events
*/
const { getEvents, 
        createEvent, 
        updateEvent, 
        deleteEvent } = require("../controllers/events");
const {validateJWT} = require("../middlewares/validate-jwt");
const { Router } = require('express');
const { check } = require("express-validator");
const { valiateFields } = require("../middlewares/fieldsValidator");
const { isDate } = require("../helpers/isDate");

const router = Router()
router.use(validateJWT)

// Get events
router.get('/', getEvents)


// Create new event
router.post(
            '/', 
            [
                check('title', 'Title is required').not().isEmpty(),
                check('start', 'Start date is required').custom(isDate),
                check('end', 'End date is required').custom(isDate),
                valiateFields
            ],
            createEvent)


// Update event
router.put('/:id', updateEvent)

// Delete event
router.delete('/:id', deleteEvent)

module.exports = router