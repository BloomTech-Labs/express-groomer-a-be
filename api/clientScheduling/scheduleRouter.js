const authRequired = require('../middleware/authRequired');
const express = require('express');
const schedule = require('./schedulingModel');
const router = require('express').Router({ mergeParams: true });

router.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

/******************************************************************************
 *                      GET ALL appointments by customer_id
 ******************************************************************************/
router.get('/', async (req, res) => {
    try {

        const { customer_id } = req.params;

        if (!customer_id) {
            return res.status(400).json({ message: "Customer ID required!" });
        }

        const invalid = await schedule.validCustomer(customer_id);

        if (!invalid.length) {
            return res.status(409).json({
                message: 'No customer found by said ID',
              });
        }

        const data = await schedule.findAppointmentsByCustomer(customer_id);

        res.status(200).json({ data: data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/******************************************************************************
 *                     GET appointments by customer/groomer relation
 ******************************************************************************/
router.get('/:groomer_id', async (req, res) => {
    try {
        const { customer_id, groomer_id : groom_id} = req.params;

        if (!groom_id) {
            return res.status(400).json({ message: "Groomer ID required!" });
        }

        const data = await schedule.findAppointmentsByRelation(customer_id, groom_id);

        if (!data.length){
            return res.status(409).json({
                message: 'No current appointments found.',
              });
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
