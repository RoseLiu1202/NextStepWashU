import React, { useState } from 'react';
import { Search, ChevronRight, Briefcase, GraduationCap, Building2, TrendingUp } from 'lucide-react';
import careerData from '../data/CareerData.json';

const CareerExplorer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [selectedMajors, setSelectedMajors] = useState([]);

    // Import career data from JSON file
    // Handle both array and object with Careers property (capital C)
    const careers = Array.isArray(careerData) ? careerData : (careerData.Careers || careerData.careers || []);

    // Filter options
    const industries = [
        { id: 'Tech', label: 'Tech/Engineering' },
        { id: 'Arts/Literature', label: 'Arts/Literature' },
        { id: 'Math', label: 'Mathematics' },
        { id: 'Finance/Tech', label: 'Finance/Tech' },
        { id: 'Tech/Math', label: 'Tech/Math' },
        { id: 'Tech/Literature', label: 'Tech/Literature' },
        { id: 'Arts/Tech', label: 'Arts/Tech' },
        { id: 'Arts', label: 'Arts' }
    ];

    const schools = [
        { id: 'Engineering', label: 'Engineering' },
        { id: 'Arts/Literature', label: 'Arts/Literature' },
        { id: 'Arts/Design', label: 'Arts/Design' },
        { id: 'Arts', label: 'Arts' },
        { id: 'Arts/Engineering', label: 'Arts/Engineering' }
    ];

    const majors = [
        { id: 'CS', label: 'Computer Science' },
        { id: 'Computer Science', label: 'Computer Science' },
        { id: 'Computer Engineering', label: 'Computer Engineering' },
        { id: 'Cybersecurity', label: 'Cybersecurity' },
        { id: 'Software Engineering', label: 'Software Engineering' },
        { id: 'Game Design', label: 'Game Design' },
        { id: 'Robotics', label: 'Robotics' },
        { id: 'Applied Mathematics', label: 'Applied Mathematics' },
        { id: 'Statistics', label: 'Statistics' },
        { id: 'Actuarial Science', label: 'Actuarial Science' },
        { id: 'Cryptography', label: 'Cryptography' },
        { id: 'Technical Writing', label: 'Technical Writing' },
        { id: 'Creative Writing', label: 'Creative Writing' },
        { id: 'Human-Computer Interaction', label: 'UX/UI Design' },
        { id: 'Digital Arts', label: 'Digital Arts' },
        { id: 'English', label: 'English' },
        { id: 'Mathematics', label: 'Mathematics' },
        { id: '3D Animation', label: '3D Animation' }
    ];

    // Toggle filter
    const toggleFilter = (value, selectedArray, setSelectedArray) => {
        if (selectedArray.includes(value)) {
            setSelectedArray(selectedArray.filter(item => item !== value));
        } else {
            setSelectedArray([...selectedArray, value]);
        }
    };

    // Filter careers
    const filteredCareers = careers.filter(career => {
        const matchesSearch = career.careerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            career.careerDesc.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesIndustry = selectedIndustries.length === 0 ||
            selectedIndustries.includes(career.Industry);

        const matchesSchool = selectedSchools.length === 0 ||
            selectedSchools.includes(career.School);

        const matchesMajor = selectedMajors.length === 0 ||
            selectedMajors.includes(career.Major);

        return matchesSearch && matchesIndustry && matchesSchool && matchesMajor;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header Banner */}
            <div className="relative h-64 bg-gradient-to-r from-pink-100 via-purple-100 to-orange-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 via-purple-200/40 to-orange-200/40"></div>
                <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">Explore Your Career</h1>
                    <p className="text-xl text-gray-700">Discover paths that match your interests and goals</p>
                </div>
                {/* Decorative gradient orbs */}
                <div className="absolute top-10 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-20 w-48 h-48 bg-purple-300/30 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Careers</h3>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search careers..."
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
                            <div>
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

                            {/* Clear Filters */}
                            {(selectedIndustries.length > 0 || selectedSchools.length > 0 || selectedMajors.length > 0 || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setSelectedIndustries([]);
                                        setSelectedSchools([]);
                                        setSelectedMajors([]);
                                        setSearchQuery('');
                                    }}
                                    className="w-full mt-6 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Career Cards Grid */}
                    <div className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredCareers.length}</span> {filteredCareers.length === 1 ? 'career' : 'careers'}
                            </p>
                        </div>

                        {filteredCareers.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No careers found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search query</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCareers.map(career => (
                                    <div
                                        key={career.careerID}
                                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 transition-all duration-200 group"
                                    >
                                        {/* Career Image */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            <img
                                                src={career.careerImg}
                                                alt={career.careerName}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                        </div>

                                        {/* Career Info */}
                                        <div className="p-5">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {career.careerName}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                                {career.careerDesc}
                                            </p>

                                            {/* Gradient Border Button */}
                                            <button className="relative px-5 py-2 bg-white text-gray-800 font-semibold text-sm rounded-full border-2 border-transparent hover:bg-gradient-to-r hover:from-pink-200 hover:via-purple-200 hover:to-orange-200 transition-all duration-200 group-hover:shadow-md">
                        <span className="relative z-10 flex items-center">
                          Explore Path
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-orange-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
                                            </button>
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

export default CareerExplorer;