import React, { useState } from 'react';
import axios from 'axios';

const Complaint = ({ token }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        status: 'pending',
        images: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [errors, setErrors] = useState({});
    const [address, setAddress] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [uploadProgress, setUploadProgress] = useState(0);
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Please enter a clear issue title.';
        if (!formData.description.trim()) newErrors.description = 'A detailed description helps us understand the issue better.';
        if (!formData.category) newErrors.category = 'Select the most relevant category.';
        if (!formData.location) newErrors.location = 'Let us know where the issue is happening.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: files
        }));
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = new FormData();

        // Append text fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'images') {
                if (value.length > 0) {
                    data.append('image', value[0]);  // Add single image file to FormData
                }
            } else {
                data.append(key, value);
            }
        });

        try {
            const response = await axios.post('http://localhost:4000/issue/create', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Make sure to set this header for file uploads
                },

                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            setUploadProgress(0);
            alert(response.data.message);
            setFormData({
                title: '',
                description: '',
                category: '',
                location: '',
                status: 'pending',
                images: [],
            });
            setImagePreviews([]);
            setAddress('');
            setPlaceDetails(null);
            setSuggestions([]);
            setShowSuggestions(false);
            setActiveSuggestionIndex(-1);
        } catch (err) {
            console.error(err);
            setUploadProgress(0);
            alert('Something went wrong while submitting your report.');
        }
    };

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setAddress(value);
        setFormData({ ...formData, location: value });
        setErrors({ ...errors, location: '' });

        if (value.length > 2) {
            try {
                const response = await axios.get(`http://localhost:4000/api/autocomplete?query=${encodeURIComponent(value)}`);
                setSuggestions(response.data.data || []);
                setShowSuggestions(true);
                setActiveSuggestionIndex(-1);
            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        const fullLocation = suggestion.name
            ? `${suggestion.name}, ${suggestion.address}`
            : suggestion.address;
        setFormData(formData => ({
            ...formData,
            location: fullLocation,
        }));
        setAddress(fullLocation);
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        try {
            const response = await axios.post('http://localhost:4000/api/data', { address: suggestion.address });
            setPlaceDetails(response.data.placeDetails);
        } catch (error) {
            console.error('Error fetching place details:', error);
            setPlaceDetails(null);
        }
    };

    const handleKeyDown = (e) => {
        if (showSuggestions && suggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
                );
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[activeSuggestionIndex]);
                }
            } else if (e.key === 'Escape') {
                setShowSuggestions(false);
                setActiveSuggestionIndex(-1);
            }
        }
    };

    const handlesummeryChange = (e) => {
        setFormData({ ...formData, summery: e.target.value });
        setErrors({ ...errors, summery: '' });
    }

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (formData.description) {
            axios.post('http://127.0.0.1:5001/api/summarize', { complaint: formData.description })
            .then(response => {
                setFormData({ ...formData, summery: response.data.summary });
            })
            .catch(error => {
                console.error('Error generating summary:', error);
                alert('Failed to generate summary. Try again later.');
            });
        } else {
            alert('Please enter a description before generating a summary.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md" noValidate>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Issue Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Give your issue a clear, short title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`text-gray-700 w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Describe the Problem</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Share all the important details"
                    value={formData.description}
                    onChange={handleChange}
                    className={`text-gray-700 w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

    <div className="mb-4">
        <label htmlFor="summery" className="block text-gray-700 font-semibold mb-2">
            Summarize the Problem
        </label>
        <textarea
            id="summery"
            name="summery"
            placeholder="Share all the important details"
            value={formData.summery}
            onChange={handlesummeryChange}    
            className={`text-gray-700 w-full px-3 py-2 border rounded-md ${
            errors.summery ? 'border-red-500' : 'border-gray-300'
            }`}
        />
        {errors.summery && <p className="text-red-500 text-sm mt-1">{errors.summery}</p>}

        <button
            type="button"
            onClick={handleGenerate}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
            Generate
        </button>
    </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
                    What type of issue are you reporting?
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`text-gray-700 w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                >
                    <option value="">Please select a category</option>
                    <option value="road">Road Damage</option>
                    {/* <option value="potholes">Potholes</option> */}
                    <option value="sanitation">Sanitation Issue</option>
                    {/* <option value="garbage">Garbage Overflow</option> */}
                    {/* <option value="sewage">Sewage Blockage</option> */}
                    {/* <option value="water">Water Leakage</option> */}
                    <option value="lighting">Street Lighting Problem</option>
                    {/* <option value="electricity">Power Outage</option> */}
                    {/* <option value="traffic">Traffic Signal Issue</option> */}
                    {/* <option value="noise">Noise Pollution</option> */}
                    {/* <option value="construction">Unauthorized Construction</option> */}
                    {/* <option value="parks">Park Maintenance</option> */}
                    {/* <option value="others">Other</option> */}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
            </div>


            <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Where is it?</label>
                <input
                    id="location"
                    type="text"
                    value={address}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a location or address"
                    autoComplete="off"
                    className={`text-gray-700 w-full px-3 py-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-20 left-0 right-0 max-w-xs mx-auto">
                        <ul
                            className="bg-white border border-gray-300 rounded-md shadow-xl mt-2 max-h-60 overflow-y-auto"
                            id="suggestions-list"
                            role="listbox"
                        >
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={`${suggestion.name}-${index}`}
                                    id={`suggestion-${index}`}
                                    className={`px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition-colors cursor-pointer ${index === activeSuggestionIndex ? 'bg-blue-200' : ''
                                        }`}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    role="option"
                                    aria-selected={index === activeSuggestionIndex}
                                >
                                    <span className="block font-medium">{suggestion.name}</span>
                                    <span className="block text-xs text-gray-500">{suggestion.address}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                )}


            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Upload Photos (optional)</label>
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imagePreviews.length > 0 && (
                    <div className="flex flex-wrap mt-2 gap-2">
                        {imagePreviews.map((src, index) => (
                            <img key={index} src={src} alt={`preview-${index}`} className="h-20 w-20 object-cover rounded border" />
                        ))}
                    </div>
                )}
            {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                </div>
            )}
            </div>


            {placeDetails && (
                <div className="mb-4 p-4 bg-gray-100 rounded-md text-sm">
                    <h4 className="font-semibold mb-2">Location Details</h4>
                    <pre>{JSON.stringify(placeDetails, null, 2)}</pre>
                </div>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Submit My Report
            </button>
        </form>
    );
};

export default Complaint;
