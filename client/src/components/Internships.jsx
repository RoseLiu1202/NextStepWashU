import React, { useState } from 'react';
import { Search, Briefcase, Building2, GraduationCap, DollarSign, Bookmark, Award, CheckCircle } from 'lucide-react';
import internshipData from '../data/InternshipData.json';

const InternshipsExplorer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [minPay, setMinPay] = useState('');

    // Import internship data from JSON file
    const internships = Array.isArray(internshipData) ? internshipData : (internshipData.Internships || internshipData.internships || []);

    // Filter options
    const industries = [
        { id: 'Tech', label: 'Tech/Engineering' },
        { id: 'Arts', label: 'Arts/Literature' },
        { id: 'Mathematics', label: 'Mathematics' },
        { id: 'Science', label: 'Science' }
    ];

    const schools = [
        { id: 'Engineering', label: 'Engineering' },
        { id: 'Business', label: 'Business' },
        { id: 'Law', label: 'Law' }
    ];

    const majors = [
        { id: 'CS', label: 'Computer Science' },
        { id: 'DataScience', label: 'Data Science' },
        { id: 'Lawyer', label: 'Law' },
        { id: 'Writing', label: 'Writing' }
    ];

    // Toggle filter
    const toggleFilter = (value, selectedArray, setSelectedArray) => {
        if (selectedArray.includes(value)) {
            setSelectedArray(selectedArray.filter(item => item !== value));
        } else {
            setSelectedArray([...selectedArray, value]);
        }
    };

    // Parse pay value (handles "None" or numeric strings)
    const parsePay = (payStr) => {
        if (!payStr || payStr === "None" || payStr === "none") return 0;
        const numericPay = parseFloat(payStr.toString().replace(/[^0-9.]/g, ''));
        return isNaN(numericPay) ? 0 : numericPay;
    };

    // Filter internships
    const filteredInternships = internships.filter(internship => {
        const matchesSearch = internship.internshipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            internship.internshipDesc.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesIndustry = selectedIndustries.length === 0 ||
            selectedIndustries.includes(internship.Industry);

        const matchesSchool = selectedSchools.length === 0 ||
            selectedSchools.includes(internship.School);

        const matchesMajor = selectedMajors.length === 0 ||
            selectedMajors.includes(internship.Major);

        const internshipPay = parsePay(internship.pay);
        const matchesPay = minPay === '' || internshipPay >= parseFloat(minPay);

        return matchesSearch && matchesIndustry && matchesSchool && matchesMajor && matchesPay;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Internships</h3>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search internships..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                                    />
                                </div>
                            </div>

                            {/* Industry Filter */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <Briefcase className="w-4 h-4 text-pink-500 mr-2" />
                                    <p className="text-sm font-semibold text-gray-700">Industry</p>
                                </div>
                                <div className="space-y-2">
                                    {industries.map(industry => (
                                        <label key={industry.id} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedIndustries.includes(industry.id)}
                                                onChange={() => toggleFilter(industry.id, selectedIndustries, setSelectedIndustries)}
                                                className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-2 focus:ring-pink-200 cursor-pointer"
                                            />
                                            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{industry.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* School Filter */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <Building2 className="w-4 h-4 text-purple-500 mr-2" />
                                    <p className="text-sm font-semibold text-gray-700">School</p>
                                </div>
                                <div className="space-y-2">
                                    {schools.map(school => (
                                        <label key={school.id} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedSchools.includes(school.id)}
                                                onChange={() => toggleFilter(school.id, selectedSchools, setSelectedSchools)}
                                                className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer"
                                            />
                                            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{school.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Major Filter */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <GraduationCap className="w-4 h-4 text-orange-500 mr-2" />
                                    <p className="text-sm font-semibold text-gray-700">Major</p>
                                </div>
                                <div className="space-y-2">
                                    {majors.map(major => (
                                        <label key={major.id} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedMajors.includes(major.id)}
                                                onChange={() => toggleFilter(major.id, selectedMajors, setSelectedMajors)}
                                                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-2 focus:ring-orange-200 cursor-pointer"
                                            />
                                            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{major.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Minimum Pay Filter */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                                    <p className="text-sm font-semibold text-gray-700">Minimum Pay</p>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Hourly minimum ($)"
                                    value={minPay}
                                    onChange={(e) => setMinPay(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-300"
                                />
                            </div>

                            {/* Clear Filters */}
                            {(selectedIndustries.length > 0 || selectedSchools.length > 0 || selectedMajors.length > 0 || minPay || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setSelectedIndustries([]);
                                        setSelectedSchools([]);
                                        setSelectedMajors([]);
                                        setMinPay('');
                                        setSearchQuery('');
                                    }}
                                    className="w-full mt-6 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Internship Cards */}
                    <div className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredInternships.length}</span> {filteredInternships.length === 1 ? 'internship' : 'internships'}
                            </p>
                        </div>

                        {filteredInternships.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Briefcase className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search query</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredInternships.map(internship => (
                                    <div
                                        key={internship.internshipID}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                                    >
                                        <div className="flex gap-5">
                                            {/* Company Logo */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center border border-gray-300 overflow-hidden">
                                                {internship.internshipImage ? (
                                                    <img src={internship.internshipImage} alt={internship.internshipName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Briefcase className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{internship.internshipName}</h3>
                                                        {internship.pay && internship.pay !== "None" && (
                                                            <p className="text-sm text-green-600 font-medium mt-1">
                                                                ${internship.pay}/hr
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors group">
                                                        <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                                                    </button>
                                                </div>

                                                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                                    {internship.internshipDesc}
                                                </p>

                                                {/* Skills and Qualities */}
                                                <div className="flex flex-wrap gap-4 mb-3">
                                                    {internship.skills && internship.skills.length > 0 && (
                                                        <div className="flex items-start gap-2">
                                                            <Award className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                            <div className="flex flex-wrap gap-2">
                                                                {internship.skills.map((skill, idx) => (
                                                                    <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {internship.qualities && internship.qualities.length > 0 && (
                                                    <div className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <div className="flex flex-wrap gap-2">
                                                            {internship.qualities.map((quality, idx) => (
                                                                <span key={idx} className="text-xs text-gray-600">
                                                                    {quality}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipsExplorer;