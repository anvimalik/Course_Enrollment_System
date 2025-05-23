import { useState } from 'react';
import axios from 'axios';

const courses = ['React Basics', 'Node.js Fundamentals', 'MongoDB Mastery', 'Fullstack Bootcamp'];

function EnrollmentForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    courseName: courses[0],
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    const { studentName, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!studentName || !email) return 'All fields are required.';
    if (!emailRegex.test(email)) return 'Invalid email address.';
    return null;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setMessage('');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/enrollments/enroll', formData);
      setMessage('Enrollment successful!');
      setError('');
      setFormData({ studentName: '', email: '', courseName: courses[0] });
    } catch (err) {
      setError('Failed to enroll. Server error.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow border-b-indigo-600">
      <h2 className="text-xl font-bold mb-4 text-center">Enroll in a Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="studentName"
          value={formData.studentName}
          type="text"
          placeholder="Student Name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <select
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {courses.map((course, idx) => (
            <option key={idx} value={course}>{course}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enroll
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
}

export default EnrollmentForm;
