const authRequired = require('../../middleware/authRequired');
const schedule = require('../schedulingModel');
const router = require('express').Router({ mergeParams: true });

router.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});


/******************************************************************************
 *                      GET ALL appointments by groomer_id
 ******************************************************************************/
router.get('/', async (req, res) => {
    try {

        const { id : groom_id } = req.params;

        if (!groom_id) {
            return res.status(400).json({ message: "Groomer ID required!" });
        }

        const invalid = await schedule.validGroomer(groom_id);

        if (!invalid.length) {
            return res.status(409).json({
                message: 'No groomer found by said ID',
              });
        }

        const data = await schedule.findAppointmentsByGroomerId(groom_id);

        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/******************************************************************************
 *                     PUT appointments ( groomer appointment confirmation! )
 ******************************************************************************/

router.put('/confirm/:customer_id', async (req, res) => {
    try {
        const { id : groom_id, customer_id } = req.params;
        const { confirmation , start} = req.body;

        if (!groom_id || !customer_id || !start ) {
            return res.status(400).json({ message: "Groomer id, customer id, appointment start time, and confirmation required!" });
        }

        if (typeof confirmation != "boolean"){
            return res.status(400).json({ message: "Confirmation requires a boolean value" });
        }

        const data = await schedule.findAppointmentsByRelation(customer_id, groom_id);

        if (data.length){
            await schedule.updateConfirmation(customer_id, groom_id, start, confirmation)
            return res.status(200).json({ message: `${(confirmation ? 'appoinment accepted!': 'appointment declined!')}`}); 
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
