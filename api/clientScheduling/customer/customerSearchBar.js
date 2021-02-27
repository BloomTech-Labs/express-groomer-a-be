const authRequired = require('../../middleware/authRequired');
const schedule = require('../schedulingModel');
const router = require('express').Router({ mergeParams: true });

router.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

/******************************************************************************
 *                      GET customers appointments by groomer business name
 ******************************************************************************/
router.get('/', async (req, res) => {
    try {
        const { customer_id } = req.params;
        const { business_name } = req.body


        const data = await schedule.findDataByGroomerBusiness(customer_id, business_name);

        if (!data.length){
            return res.status(409).json({
                message: 'No current appointments found.',
              });
        }

        res.status(200).json({appointments:data});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/******************************************************************************
 *                      GET appointments by DATE
 ******************************************************************************/
router.get('/date', async (req, res) => {
    try {

        const { customer_id } = req.params;
        const { date } = req.body;
        const invalid = await schedule.validCustomer(customer_id);
        if (!invalid.length) {
            return res.status(409).json({
                message: 'No customer found by said ID',
              });
        }

        const data = await schedule.findAppointmentsByDate(customer_id, date);

        
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;