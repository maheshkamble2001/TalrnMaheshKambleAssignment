import React, { useState } from 'react';
import MultiSelect from '../MultiSelectDropDown/MultiSelect';
import { data } from 'react-router-dom';
import { addDeveloper } from '../../services/developers';

const ModalBox = ({ open, close }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    techStack: [],
    experience: ''
  });
  console.log(formData)
  const techOptions = [
    "React",
    "Node.js",
    "Python",
    "Vue.js",
    "MongoDB",
    "Tailwind CSS",
    "Docker",
    "AWS",
  ];
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    if (formData.techStack.length === 0) {
      newErrors.techStack = 'At least one tech stack must be selected';
    }
    if (!formData.experience || formData.experience <= 0) {
      newErrors.experience = 'Experience must be a positive number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'techStack') {
      const options = e.target.selectedOptions;
      const selectedValues = Array.from(options).map(option => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedValues
      }));
      if (errors.techStack) {
        setErrors((prev) => ({ ...prev, techStack: '' }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (validateForm()) {  

        const res = addDeveloper(formData);
        // Handle form submission (e.g., API call)
        // setFormData({ name: '', role: '', techStack: [], experience: '' });
        setErrors({});
        // close();
      }
    } catch (error) {
      console.log("Errors",error)
    }
  };

  return (
    <>
      {/* Main modal */}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto ${open ? 'flex' : 'hidden'
          } items-center justify-center p-2 transition-opacity duration-300 ease-in-out ${open ? 'opacity-100' : 'opacity-0'
          }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        tabIndex="-1"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition duration-300"
          // onClick={close}
        />

        {/* Modal panel */}
        <div
          className={`relative transform transition-all duration-300 ease-in-out w-full max-w-sm max-h-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
            }`}
        >
          {/* Modal content */}
          <div className="p-4">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-gray-200/50 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-blue-100/80 rounded-lg">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-gray-900">Add New Developer</h3>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-full p-1.5 transition-all duration-200"
                onClick={close}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block text-xs w-full px-2 py-1.5 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-blue-500 transition-all duration-200 bg-white/50 ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300/50 focus:ring-blue-500 focus:border-blue-500'}`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label htmlFor="role" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={`block w-full px-2 py-1.5 text-xs border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:border-blue-500 transition-all duration-200 bg-white/50 ${errors.role ? 'border-red-300 focus:ring-red-500' : 'border-gray-300/50 focus:ring-blue-500 focus:border-blue-500'}`}
                    >
                      <option value="">Select Role</option>
                      <option value="Frontend">Frontend Developer</option>
                      <option value="Backend">Backend Developer</option>
                      <option value="Fullstack">Full Stack Developer</option>
                      <option value="PM">Product Manager</option>
                      <option value="DevOps">DevOps Engineer</option>
                    </select>
                    {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                  </div>
                  <div>
                    <label htmlFor="techStack" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Tech Stack <span className="text-gray-500">( Technical Skills )</span>
                    </label>
                    <MultiSelect
                      options={techOptions}
                      selectedValues={formData.techStack}
                      onChange={(newValues) =>
                        setFormData((prev) => ({ ...prev, techStack: newValues }))
                      }
                      error={errors.techStack}
                    />


                    {errors.techStack && <p className="mt-1 text-xs text-red-600">{errors.techStack}</p>}
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Experience <span className="text-gray-500">( Years )</span>
                    </label>
                    <input
                      type="number"
                      name="experience"
                      id="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min="0"
                      className={`block text-xs w-full px-2 py-1.5 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-blue-500 transition-all duration-200 bg-white/50 ${errors.experience ? 'border-red-300 focus:ring-red-500' : 'border-gray-300/50 focus:ring-blue-500 focus:border-blue-500'}`}
                      placeholder="0"
                    />
                    {errors.experience && <p className="mt-1 text-xs text-red-600">{errors.experience}</p>}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200/50">
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100/50 border border-gray-300/50 rounded-lg hover:bg-gray-200/50 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="-ml-0.5 mr-1.5 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBox;