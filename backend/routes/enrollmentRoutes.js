const express = require('express');
const router = express.Router();
const { createEnrollment,getAllEnrollments,updateEnrollment,deleteEnrollment } = require('../controllers/enrollmentController');

router.post('/enroll', createEnrollment);
router.get('/', getAllEnrollments);
router.put('/:id', updateEnrollment);
router.delete('/:id', deleteEnrollment);

module.exports = router;
 