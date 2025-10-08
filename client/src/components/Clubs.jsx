import React, { useState } from 'react';
import { Search, Briefcase, Building2, GraduationCap, Users, Calendar, Clock, Bookmark } from 'lucide-react';
import clubData from '../data/ClubData.json';

const ClubsExplorer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);

    // Import club data from JSON file
    const clubs = Array.isArray(clubData) ? clubData : (clubData.Clubs || clubData.clubs || []);

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

    const days = [
        { id: 'M', label: 'M' },
        { id: 'T', label: 'T' },
        { id: 'W', label: 'W' },
        { id: 'Th', label: 'Th' },
        { id: 'F', label: 'F' },
        { id: 'S', label: 'S' },
        { id: 'Sun', label: 'Sun' }
    ];

    const times = [
        { id: '8-9', label: '8-9' },
        { id: '10-11', label: '10-11' },
        { id: '12-1', label: '12-1' }
    ];

    // Toggle filter
    const toggleFilter = (value, selectedArray, setSelectedArray) => {
        if (selectedArray.includes(value)) {
            setSelectedArray(selectedArray.filter(item => item !== value));
        } else {
            setSelectedArray([...selectedArray, value]);
        }
    };

    // Filter clubs
    const filteredClubs = clubs.filter(club => {
        const matchesSearch = club.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            club.clubDesc.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesIndustry = selectedIndustries.length === 0 ||
            selectedIndustries.includes(club.Industry);

        const matchesSchool = selectedSchools.length === 0 ||
            selectedSchools.includes(club.School);

        const matchesMajor = selectedMajors.length === 0 ||
            selectedMajors.includes(club.Major);

        const matchesDays = selectedDays.length === 0 ||
            (club.MeetDay && selectedDays.some(day => club.MeetDay.includes(day)));

        const matchesTimes = selectedTimes.length === 0 ||
            (club.MeetTime && selectedTimes.includes(club.MeetTime));

        return matchesSearch && matchesIndustry && matchesSchool && matchesMajor && matchesDays && matchesTimes;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Clubs</h3>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search clubs..."
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

                            {/* Days Filter */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                                    <p className="text-sm font-semibold text-gray-700">Days</p>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {days.map(day => (
                                        <label
                                            key={day.id}
                                            className={`flex items-center justify-center min-w-[2.5rem] h-10 px-2 rounded-lg border-2 cursor-pointer transition-all ${
                                                selectedDays.includes(day.id)
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-blue-300'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedDays.includes(day.id)}
                                                onChange={() => toggleFilter(day.id, selectedDays, setSelectedDays)}
                                                className="hidden"
                                            />
                                            <span className="text-sm font-semibold">{day.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Times Filter */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <Clock className="w-4 h-4 text-green-500 mr-2" />
                                    <p className="text-sm font-semibold text-gray-700">Times</p>
                                </div>
                                <div className="space-y-2">
                                    {times.map(time => (
                                        <label key={time.id} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedTimes.includes(time.id)}
                                                onChange={() => toggleFilter(time.id, selectedTimes, setSelectedTimes)}
                                                className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-2 focus:ring-green-200 cursor-pointer"
                                            />
                                            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{time.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {(selectedIndustries.length > 0 || selectedSchools.length > 0 || selectedMajors.length > 0 || selectedDays.length > 0 || selectedTimes.length > 0 || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setSelectedIndustries([]);
                                        setSelectedSchools([]);
                                        setSelectedMajors([]);
                                        setSelectedDays([]);
                                        setSelectedTimes([]);
                                        setSearchQuery('');
                                    }}
                                    className="w-full mt-6 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Club Cards */}
                    <div className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredClubs.length}</span> {filteredClubs.length === 1 ? 'club' : 'clubs'}
                            </p>
                        </div>

                        {filteredClubs.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No clubs found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search query</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredClubs.map(club => (
                                    <div
                                        key={club.clubID}
                                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                                    >
                                        <div className="flex gap-5">
                                            {/* Club Image */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center border border-gray-300 overflow-hidden">
                                                {club.clubImage ? (
                                                    <img src={club.clubImage} alt={club.clubName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Users className="w-8 h-8 text-gray-400" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{club.clubName}</h3>
                                                    </div>
                                                    <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors group">
                                                        <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                                                    </button>
                                                </div>

                                                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                                    {club.clubDesc}
                                                </p>

                                                {/* Meeting Info */}
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    {club.MeetDay && club.MeetDay.length > 0 && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{club.MeetDay.join(', ')}</span>
                                                        </div>
                                                    )}
                                                    {club.MeetTime && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{club.MeetTime}</span>
                                                        </div>
                                                    )}
                                                </div>
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

export default ClubsExplorer;