import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: ''
  });

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('multiStepForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (data) => {
    localStorage.setItem('multiStepForm', JSON.stringify(data));
  };

  const updateForm = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    saveProgress(newData);
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        alert("Name and Email are required!");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.projectType || !formData.description) {
        alert("Project Type and Description are required!");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Form Submitted Successfully!\n\nWe will contact you soon.");
    localStorage.removeItem('multiStepForm'); // Clear after submit
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="progress-bar">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`progress-step ${step >= s ? 'active' : ''}`}
            />
          ))}
        </div>

        <h1>Let's Build Your Website</h1>
        <p className="subtitle">Step {step} of 4</p>

        <AnimatePresence mode="wait">
          <motion.form
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
          >
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="step">
                <h2>Personal Information</h2>
                <input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} required />
                <input type="email" placeholder="Business Email *" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} required />
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} />
                <input type="text" placeholder="Company Name" value={formData.company} onChange={(e) => updateForm('company', e.target.value)} />
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="step">
                <h2>Project Details</h2>
                <select value={formData.projectType} onChange={(e) => updateForm('projectType', e.target.value)} required>
                  <option value="">Select Project Type</option>
                  <option value="wordpress">WordPress Website</option>
                  <option value="ecommerce">E-commerce Store</option>
                  <option value="lms">LMS / Online Course</option>
                  <option value="redesign">Website Redesign</option>
                  <option value="custom">Custom Web App</option>
                </select>
                <textarea placeholder="Describe your project..." rows="5" value={formData.description} onChange={(e) => updateForm('description', e.target.value)} required />
              </div>
            )}

            {/* Step 3: Budget & Timeline */}
            {step === 3 && (
              <div className="step">
                <h2>Budget & Timeline</h2>
                <select value={formData.budget} onChange={(e) => updateForm('budget', e.target.value)}>
                  <option value="">Select Budget Range</option>
                  <option value="500-1500">$500 - $1,500</option>
                  <option value="1500-3000">$1,500 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000+">$5,000+</option>
                </select>
                <select value={formData.timeline} onChange={(e) => updateForm('timeline', e.target.value)}>
                  <option value="">Project Timeline</option>
                  <option value="2weeks">Within 2 Weeks</option>
                  <option value="1month">1 Month</option>
                  <option value="2months">2 Months</option>
                  <option value="3months">3+ Months</option>
                </select>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="step review-step">
                <h2>Review Your Information</h2>
                <div className="review-info">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Project:</strong> {formData.projectType}</p>
                  <p><strong>Budget:</strong> {formData.budget}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {step > 1 && <button type="button" onClick={prevStep} className="btn-secondary">Back</button>}
              
              {step < 4 ? (
                <button type="button" onClick={nextStep} className="btn-primary">Next Step</button>
              ) : (
                <button type="submit" className="btn-primary">Submit Application</button>
              )}
            </div>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;