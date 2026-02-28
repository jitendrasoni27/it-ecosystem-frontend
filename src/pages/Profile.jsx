import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Building, MapPin, Phone, Globe, Mail, Save, Camera, Smartphone, MessageSquare, Hash, Briefcase, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';
import { locationData, countriesList } from '../data/locations';

const Profile = () => {
    const { userRole, currentUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: currentUser?.fullName || '',
        organizationName: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        whatsappNumber: '',
        mobileNumber: '',
        phoneNumber: '',
        website: '',
        email: currentUser?.email || '',
        tallySerialNumber: '',
        dealsIn: '', // For Partners
        logo: null
    });

    const [isEditing, setIsEditing] = useState(true);

    // Autocomplete/Dropdown State
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
    const [activeCountryIndex, setActiveCountryIndex] = useState(-1);

    const [availableStates, setAvailableStates] = useState([]);
    const [filteredStates, setFilteredStates] = useState([]);
    const [showStateSuggestions, setShowStateSuggestions] = useState(false);
    const [activeStateIndex, setActiveStateIndex] = useState(-1);

    const [availableCities, setAvailableCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [activeCityIndex, setActiveCityIndex] = useState(-1);

    // Initial load of states/cities if data exists
    useEffect(() => {
        if (formData.country && locationData[formData.country]) {
            setAvailableStates(Object.keys(locationData[formData.country]));
            if (formData.state && locationData[formData.country][formData.state]) {
                setAvailableCities(locationData[formData.country][formData.state]);
            }
        }
    }, []);

    const filterData = (query, dataList) => {
        if (!query) return dataList;
        return dataList.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    };

    // --- Country Logic ---
    const handleCountryChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, country: value, state: '', city: '' }));
        setAvailableStates([]);
        setFilteredStates([]);
        setAvailableCities([]);
        setFilteredCities([]);

        if (value) {
            const filtered = filterData(value, countriesList);
            setFilteredCountries(filtered);
            setShowCountrySuggestions(true);
            setActiveCountryIndex(0);
        } else {
            setShowCountrySuggestions(false);
            setFilteredCountries([]);
        }
    };

    const selectCountry = (country) => {
        setFormData(prev => ({ ...prev, country: country, state: '', city: '' }));
        setShowCountrySuggestions(false);
        setActiveCountryIndex(-1);

        if (locationData[country]) {
            const states = Object.keys(locationData[country]);
            setAvailableStates(states);
            setFilteredStates(states);
        } else {
            setAvailableStates([]);
            setFilteredStates([]);
        }
    };

    // --- State Logic ---
    const handleStateChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, state: value, city: '' }));
        setAvailableCities([]);
        setFilteredCities([]);

        const filtered = filterData(value, availableStates);
        setFilteredStates(filtered);
        setShowStateSuggestions(true);
        setActiveStateIndex(0);
    };

    const selectState = (state) => {
        setFormData(prev => ({ ...prev, state: state, city: '' }));
        setShowStateSuggestions(false);
        setActiveStateIndex(-1);

        const countryData = locationData[formData.country];
        if (countryData && countryData[state]) {
            const cities = countryData[state];
            setAvailableCities(cities);
            setFilteredCities(cities);
        } else {
            setAvailableCities([]);
            setFilteredCities([]);
        }
    };

    // --- City Logic ---
    const handleCityChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, city: value }));

        const filtered = filterData(value, availableCities);
        setFilteredCities(filtered);
        setShowCitySuggestions(true);
        setActiveCityIndex(0);
    };

    const selectCity = (city) => {
        setFormData(prev => ({ ...prev, city: city }));
        setShowCitySuggestions(false);
        setActiveCityIndex(-1);
    };

    const handleKeyDown = (e, list, selectFunc, showFunc, activeIndex, setActiveIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (list.length > 0 && activeIndex >= 0) {
                selectFunc(list[activeIndex]);
            } else if (list.length > 0) {
                selectFunc(list[0]);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeIndex > 0) setActiveIndex(prev => prev - 1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (activeIndex < list.length - 1) setActiveIndex(prev => prev + 1);
        } else if (e.key === 'Escape') {
            showFunc(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                logo: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock API Save
        console.log('Saving Profile:', formData);
        setIsEditing(false);
        // Show success message logic here
    };

    const isPartner = userRole === 'partner';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <SEO title="User Profile" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                    <div className="flex gap-4">
                        {userRole === 'admin' && (
                            <button
                                onClick={() => navigate('/admin-dashboard', { state: { activeTab: 'logs' } })}
                                className="flex items-center gap-2 text-primary hover:underline border-r pr-4 border-gray-300 dark:border-gray-700"
                            >
                                <Clock className="w-4 h-4" /> View Logs
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-primary hover:underline"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    {/* Header / Banner mock */}
                    <div className="h-32 bg-gradient-to-r from-primary to-blue-600"></div>

                    <div className="px-4 py-5 sm:p-6 relative">
                        {/* Logo / Photo Upload */}
                        <div className="absolute -top-16 left-6">
                            <div className="relative group">
                                <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-white flex items-center justify-center overflow-hidden shadow-md">
                                    {formData.logo ? (
                                        <img src={formData.logo} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-12 w-12 text-gray-400" />
                                    )}
                                </div>
                                <label htmlFor="logo-upload" className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors">
                                    <Camera className="h-4 w-4" />
                                </label>
                                <input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleLogoChange}
                                />
                            </div>
                        </div>

                        <div className="mt-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Organization Details Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 flex items-center border-b pb-2 mb-4 dark:border-gray-700">
                                            <Building className="mr-2 h-5 w-5 text-primary" />
                                            Organization Details
                                        </h3>
                                    </div>

                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>

                                    {/* Organization Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organization Name</label>
                                        <input
                                            type="text"
                                            name="organizationName"
                                            value={formData.organizationName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="e.g. Acme Corp"
                                        />
                                    </div>

                                    {/* Tally Serial Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tally Serial Number</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Hash className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="tallySerialNumber"
                                                value={formData.tallySerialNumber}
                                                onChange={handleChange}
                                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                placeholder="Serial No."
                                            />
                                        </div>
                                    </div>

                                    {/* Partner Specific: Deals In */}
                                    {isPartner && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deals In</label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Briefcase className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="dealsIn"
                                                    value={formData.dealsIn}
                                                    onChange={handleChange}
                                                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="e.g. Hardware, Software"
                                                />
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* Address Details Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 flex items-center border-b pb-2 mb-4 dark:border-gray-700">
                                            <MapPin className="mr-2 h-5 w-5 text-primary" />
                                            Address Details
                                        </h3>
                                    </div>

                                    {/* 1. Country */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleCountryChange}
                                            onKeyDown={(e) => handleKeyDown(e, filteredCountries, selectCountry, setShowCountrySuggestions, activeCountryIndex, setActiveCountryIndex)}
                                            onFocus={() => setShowCountrySuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowCountrySuggestions(false), 200)}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Select Country"
                                            autoComplete="off"
                                        />
                                        {showCountrySuggestions && filteredCountries.length > 0 && (
                                            <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                {filteredCountries.map((country, index) => (
                                                    <li
                                                        key={index}
                                                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${index === activeCountryIndex ? 'bg-primary text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                                                        onClick={() => selectCountry(country)}
                                                    >
                                                        {country}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* 2. State */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleStateChange}
                                            onKeyDown={(e) => handleKeyDown(e, filteredStates, selectState, setShowStateSuggestions, activeStateIndex, setActiveStateIndex)}
                                            onClick={() => setShowStateSuggestions(true)}
                                            onFocus={() => setShowStateSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                                            disabled={!formData.country}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                                            placeholder={formData.country ? "Select State" : "Select Country First"}
                                            autoComplete="off"
                                        />
                                        {showStateSuggestions && filteredStates.length > 0 && (
                                            <ul className="absolute z-40 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                {filteredStates.map((state, index) => (
                                                    <li
                                                        key={index}
                                                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${index === activeStateIndex ? 'bg-primary text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                                                        onClick={() => selectState(state)}
                                                    >
                                                        {state}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* 3. City */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleCityChange}
                                            onKeyDown={(e) => handleKeyDown(e, filteredCities, selectCity, setShowCitySuggestions, activeCityIndex, setActiveCityIndex)}
                                            onClick={() => setShowCitySuggestions(true)}
                                            onFocus={() => setShowCitySuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                                            disabled={!formData.state}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800"
                                            placeholder={formData.state ? "Select City" : "Select State First"}
                                            autoComplete="off"
                                        />
                                        {showCitySuggestions && filteredCities.length > 0 && (
                                            <ul className="absolute z-30 mt-1 w-full bg-white dark:bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                {filteredCities.map((city, index) => (
                                                    <li
                                                        key={index}
                                                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${index === activeCityIndex ? 'bg-primary text-white' : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                                                        onClick={() => selectCity(city)}
                                                    >
                                                        {city}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* 4. Pincode */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="e.g. 400001"
                                        />
                                    </div>

                                    {/* 5. Address */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address (Street, Area)</label>
                                        <textarea
                                            name="address"
                                            rows={2}
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Contact Info Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 flex items-center border-b pb-2 mb-4 dark:border-gray-700">
                                            <Phone className="mr-2 h-5 w-5 text-primary" />
                                            Contact Information
                                        </h3>
                                    </div>

                                    {/* Mobile Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Smartphone className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Whatsapp Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Whatsapp Number</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MessageSquare className="h-4 w-4 text-green-500" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="whatsappNumber"
                                                value={formData.whatsappNumber}
                                                onChange={handleChange}
                                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number (Landline) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Landline)</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Website */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Globe className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="url"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleChange}
                                                className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                placeholder="https://www.example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end pt-5">
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
