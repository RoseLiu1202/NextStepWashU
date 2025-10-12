import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Video, Users, BookOpen, Briefcase, Code, Award } from 'lucide-react';
import courseData from '../data/CourseData.json';
import clubData from '../data/ClubData.json';
import internshipData from '../data/InternshipData.json';

const CareerDetailPage = () => {
    const { careerID } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('courses');

    // Import data from JSON files
    const courses = Array.isArray(courseData) ? courseData : (courseData.Courses || courseData.courses || []);
    const clubs = Array.isArray(clubData) ? clubData : (clubData.Clubs || clubData.clubs || []);
    const internships = Array.isArray(internshipData) ? internshipData : (internshipData.Internships || internshipData.internships || []);

    // Mock data - in production, this would come from props or API
    // For now, showing the same data for all careers
    // Later you can use careerID to fetch specific career data
    const careerData = {
        name: 'Software Engineer',
        description: 'A software engineering career involves designing, developing, testing, and maintaining software systems that power everything from mobile apps to large-scale cloud platforms. Software engineers use programming languages, algorithms, and system architecture principles to build efficient, scalable, and secure applications. The field offers diverse opportunities, including frontend and backend development, artificial intelligence, cybersecurity, embedded systems, and DevOps.',
        skills: ['Python', 'JavaScript', 'Java', 'System Design', 'Algorithms'],
        alumniStudied: ['Computer Science', 'Computer Engineering', 'Information Systems'],
        videos: [
            { id: 1, url: 'https://www.youtube.com/embed/U3ySiMerum0' },
            { id: 2, url: 'https://www.youtube.com/embed/GQzMiCBZw6Q' },
            { id: 3, url: 'https://www.youtube.com/embed/tJq42Qbh7po' },
            { id: 4, url: 'https://www.youtube.com/embed/j1fc0FlCjyI' }
        ]
    };

    const projects = [
        {
            code: "Chess App",
            title: "Coding Project",
            description: "Create a chess app that only allows legal moves and automatically detects check and checkmate"
        },
        {
            code: "Video game",
            title: "Game Development",
            description: "Create a new video game or show that you are capable of efficiently replicating one that already exists"
        },
        {
            code: "Twitter bot",
            title: "APIs, Backend",
            description: "Use Twitter's API to make a bot that reads or writes tweets automatically"
        }
    ];

    const ResourceCard = ({ item, showApproval = false }) => (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900">{item.code}</p>
                        {showApproval && item.alumniApproved && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-xs font-semibold rounded-full">
                                Alumni Approved
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-medium text-gray-700">{item.title}</p>
                </div>
                <button className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors flex-shrink-0">
                    <Plus className="w-4 h-4 text-blue-500" />
                </button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
        </div>
    );

    const tabs = [
        { id: 'courses', label: 'Recommended Courses', icon: BookOpen },
        { id: 'clubs', label: 'Clubs on Campus', icon: Users },
        { id: 'internships', label: 'Internships', icon: Briefcase },
        { id: 'projects', label: 'Personal Projects', icon: Code }
    ];

    const getTabContent = () => {
        switch (activeTab) {
            case 'courses':
                return courses;
            case 'clubs':
                return clubs;
            case 'internships':
                return internships;
            case 'projects':
                return projects;
            default:
                return [];
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Navigation Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <button
                            onClick={() => navigate('/careers')}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Careers
                        </button>
                        <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                        <span className="font-semibold text-gray-900">{careerData.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Career Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">{careerData.name}</h1>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Skills Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="w-5 h-5 text-pink-500" />
                                <h3 className="font-semibold text-gray-900">You Should Know</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {careerData.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 text-sm font-medium rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Alumni Studied Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Users className="w-5 h-5 text-purple-500" />
                                <h3 className="font-semibold text-gray-900">Alumni Studied</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {careerData.alumniStudied.map((major, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 text-sm font-medium rounded-full">
                                        {major}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{careerData.description}</p>
                    </div>
                </div>

                {/* Day in Life Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Video className="w-5 h-5 text-pink-500" />
                            <h2 className="text-2xl font-bold text-gray-900">Day in the Life</h2>
                        </div>
                        <a href="#" className="text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
                            View More →
                        </a>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {careerData.videos.map((video) => (
                            <div key={video.id} className="flex-shrink-0 w-80 aspect-video rounded-xl overflow-hidden shadow-md">
                                <iframe
                                    src={video.url}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alumni in the Field Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-500" />
                            <h2 className="text-2xl font-bold text-gray-900">Alumni in the Field</h2>
                        </div>
                        <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                            View More →
                        </a>
                    </div>
                    <div className="text-center py-8 text-gray-500">
                        Alumni profiles coming soon
                    </div>
                </div>

                {/* Tabbed Resources Section */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 overflow-x-auto">
                        <div className="flex">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors ${
                                            activeTab === tab.id
                                                ? 'text-pink-600 border-b-2 border-pink-600'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getTabContent().map((item, index) => (
                                <ResourceCard
                                    key={index}
                                    item={item}
                                    showApproval={activeTab === 'courses'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerDetailPage;