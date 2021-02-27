const authRequired = require('../../middleware/authRequired');
const schedule = require('../schedulingModel');
const router = require('express').Router({ mergeParams: true });

router.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

/******************************************************************************
 *            GET ALL appointments with groomer search ( all app. by customer name )
 ******************************************************************************/
router.get('/', async (req, res) => {
    try {

        const { id : groom_id } = req.params;
        const { given_name } = req.body;

        if (!groom_id) {
            return res.status(400).json({ message: "Groomer ID required!" });
        }
        
        if (given_name.length <= 1){
            return res.status(400).json({ message: "Please enter a customer name" });
        }

        const invalidGroomer = await schedule.validGroomer(groom_id);

        if (!invalidGroomer.length) {
            return res.status(409).json({
                message: 'No groomer found by said ID',
              });
        }


        const data = await schedule.findDataByCustomerName(groom_id, given_name);

        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;