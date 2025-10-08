import React, { useState } from 'react';
import { Search, Briefcase, Building2, GraduationCap, BookOpen, Star, Clock, Calendar, Tag } from 'lucide-react';
import courseData from '../data/CourseData.json';

const CoursesExplorer = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedSchools, setSelectedSchools] = useState([]);
    const [selectedMajors, setSelectedMajors] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    // Import course data from JSON file
    const courses = Array.isArray(courseData) ? courseData : (courseData.Courses || courseData.courses || []);

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
        { id: 'F', label: 'F' }
    ];

    // Toggle filter
    const toggleFilter = (value, selectedArray, setSelectedArray) => {
        if (selectedArray.includes(value)) {
            setSelectedArray(selectedArray.filter(item => item !== value));
        } else {
            setSelectedArray([...selectedArray, value]);
        }
    };

    // Filter courses
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesIndustry = selectedIndustries.length === 0 ||
            selectedIndustries.includes(course.Industry);

        const matchesSchool = selectedSchools.length === 0 ||
            selectedSchools.includes(course.School);

        const matchesMajor = selectedMajors.length === 0 ||
            selectedMajors.includes(course.Major);

        const matchesDays = selectedDays.length === 0 ||
            (course.Days && selectedDays.some(day => course.Days.includes(day)));

        return matchesSearch && matchesIndustry && matchesSchool && matchesMajor && matchesDays;
    });

    // Format time display
    const formatTime = (times) => {
        if (!times || times.length === 0) return '';
        if (times.length === 1) return `${times[0]}:00`;
        return `${times[0]}:00 - ${times[times.length - 1]}:00`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Make a Recommendation Button */}
                <div className="mb-6 flex justify-end">
                    <a
                        href="/recommendation-creation"
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        Make a Course Recommendation
                    </a>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Courses</h3>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
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
                                            className={`flex items-center justify-center w-10 h-10 rounded-lg border-2 cursor-pointer transition-all ${
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

                            {/* Clear Filters */}
                            {(selectedIndustries.length > 0 || selectedSchools.length > 0 || selectedMajors.length > 0 || selectedDays.length > 0 || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setSelectedIndustries([]);
                                        setSelectedSchools([]);
                                        setSelectedMajors([]);
                                        setSelectedDays([]);
                                        setSearchQuery('');
                                    }}
                                    className="w-full mt-6 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Course Cards */}
                    <div className="flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
                            </p>
                        </div>

                        {filteredCourses.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search query</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCourses.map(course => (
                                    <div
                                        key={course.courseID}
                                        className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <BookOpen className="w-5 h-5 text-purple-600" />
                                            </div>

                                            {/* Rating */}
                                            {course.courseRating && (
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-xs font-semibold text-gray-900">{course.courseRating}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Course Info */}
                                        <div className="mb-3">
                                            <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">{course.courseName}</h3>
                                            <p className="text-xs text-gray-600 font-medium">{course.code}</p>
                                        </div>

                                        <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3 flex-grow">
                                            {course.description}
                                        </p>

                                        {/* Tags */}
                                        {course.Tags && course.Tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {course.Tags.slice(0, 2).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-pink-50 to-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200"
                                                    >
                                                        <Tag className="w-2.5 h-2.5" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Course Details */}
                                        <div className="space-y-1.5 text-xs text-gray-600 pt-3 border-t border-gray-100">
                                            {course.Days && course.Days.length > 0 && (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span>{course.Days.join(', ')}</span>
                                                </div>
                                            )}
                                            {course.Times && course.Times.length > 0 && (
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span>{formatTime(course.Times)}</span>
                                                </div>
                                            )}
                                            {course.skills && course.skills.length > 0 && (
                                                <div className="flex items-center gap-1.5">
                                                    <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span className="truncate">{course.skills.join(', ')}</span>
                                                </div>
                                            )}
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

export default CoursesExplorer;