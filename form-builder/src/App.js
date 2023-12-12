

import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder/FormBuilder';
import FormFill from './components/FormFill/FormFill';
import FormPreview from './components/FormPreview/FormPreview';

function App() {
  const [selectedTab, setSelectedTab] = useState('builder');
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setSelectedTab('preview');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">MERN Form Builder</h1>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <button
          className={`px-4 py-2 mr-4 ${
            selectedTab === 'builder' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setSelectedTab('builder')}
        >
          Form Builder
        </button>
        <button
          className={`px-4 py-2 mr-4 ${
            selectedTab === 'fill' ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setSelectedTab('fill')}
        >
          Form Fill
        </button>
        <button
          className={`px-4 py-2 ${
            selectedTab === 'preview' ? 'bg-purple-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setSelectedTab('preview')}
        >
          Form Preview
        </button>
      </div>

      {/* Render selected component */}
      {selectedTab === 'builder' && <FormBuilder onSubmit={handleFormSubmit} />}
      {selectedTab === 'fill' && formData && <FormFill form={formData} />}
      {selectedTab === 'preview' && formData && <FormPreview form={formData} />}
    </div>
  );
}

export default App;
