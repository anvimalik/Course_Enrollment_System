const Enrollment = require('../models/enrollmentModel');

exports.createEnrollment = async (req, res) => {
  try {
    const { studentName, email, courseName } = req.body;
    if (!studentName || !email || !courseName) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    const newEnroll = await Enrollment.create({ studentName, email, courseName });
    res.status(201).json(newEnroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ enrollDate: -1 });
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEnrollment = async(req,res) =>{
    try{
        const { id } = req.params;
        const {studentName,courseName,email} = req.body;
        const updated = await Enrollment.findByIdAndUpdate(id,{studentName,email,courseName},{new:true, runValidators: true});
        if(!updated) return res.status(404).json({error:"Enrollment not found"});
        res.status(200).json(updated);
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};

exports.deleteEnrollment = async(req,res) => {
    try{
        const { id } = req.params;
        const deleted = await Enrollment.findByIdAndDelete(id);
        if(!deleted) return res.status(404).json({error: "Enrollment not found"});
        res.status(200).json({message: "Enrollment deleted successfully"});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
};