import React, { useState, useEffect } from 'react';
import { User, Target, BookmarkCheck, Users, TrendingUp, Calendar, Briefcase, GraduationCap, Award, Clock, ChevronRight, MessageCircle, Plus, BarChart3, Sparkles, FileText, X, Check } from 'lucide-react';

const ProfileAndPathway = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [collectionView, setCollectionView] = useState('career');
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalDeadline, setNewGoalDeadline] = useState('');

    // Load data from localStorage or use defaults
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('nextstep_stats');
        return saved ? JSON.parse(saved) : {
            pathsExplored: 8,
            alumniConnected: 5,
            goalsCompleted: 3,
            explorationScore: 72
        };
    });

    const [currentGoals, setCurrentGoals] = useState(() => {
        const saved = localStorage.getItem('nextstep_goals');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: "Talk to 1 alumni in consulting", deadline: "Oct 15", progress: 60 },
            { id: 2, title: "Complete Business Analytics course", deadline: "Dec 10", progress: 30 },
            { id: 3, title: "Attend 2 career center workshops", deadline: "Oct 30", progress: 50 }
        ];
    });

    const [collections, setCollections] = useState(() => {
        const saved = localStorage.getItem('nextstep_collections');
        return saved ? JSON.parse(saved) : {
            'product-management': {
                courses: ['Human-Computer Interaction', 'Product Design Studio', 'Business Strategy'],
                internships: ['Google APM Intern', 'Microsoft PM Intern'],
                alumni: ['Sarah Chen (PM at Meta)', 'Alex Kim (PM at Stripe)']
            },
            'consulting': {
                courses: ['Business Analytics', 'Strategic Management', 'Data Visualization'],
                internships: ['McKinsey Summer Analyst', 'Bain Associate Consultant'],
                alumni: ['James Park (BCG Consultant)', 'Maria Lopez (Deloitte Senior)']
            }
        };
    });

    const [recentActivity, setRecentActivity] = useState(() => {
        const saved = localStorage.getItem('nextstep_activity');
        return saved ? JSON.parse(saved) : [
            { action: 'Saved', item: 'Google APM Internship', date: '2 days ago', icon: 'Briefcase' },
            { action: 'Connected with', item: 'Sarah Chen', date: '5 days ago', icon: 'Users' },
            { action: 'Explored', item: 'Data Science pathway', date: '1 week ago', icon: 'TrendingUp' },
            { action: 'Completed', item: 'Career reflection journal', date: '1 week ago', icon: 'FileText' }
        ];
    });

    const [alumniList, setAlumniList] = useState(() => {
        const saved = localStorage.getItem('nextstep_alumni');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Sarah Chen', role: 'Senior PM at Meta', year: '2019', available: true, imageColor: 'bg-blue-400', path: 'Product Management', connected: false },
            { id: 2, name: 'Alex Kim', role: 'PM at Stripe', year: '2020', available: true, imageColor: 'bg-purple-400', path: 'Product Management', connected: false },
            { id: 3, name: 'James Park', role: 'Consultant at BCG', year: '2018', available: true, imageColor: 'bg-green-400', path: 'Consulting', connected: false },
            { id: 4, name: 'Maria Lopez', role: 'Senior Consultant at Deloitte', year: '2019', available: false, imageColor: 'bg-pink-400', path: 'Consulting', connected: false },
            { id: 5, name: 'Jordan Lee', role: 'Group PM at Google', year: '2017', available: true, imageColor: 'bg-amber-400', path: 'Product Management', connected: false }
        ];
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('nextstep_stats', JSON.stringify(stats));
    }, [stats]);

    useEffect(() => {
        localStorage.setItem('nextstep_goals', JSON.stringify(currentGoals));
    }, [currentGoals]);

    useEffect(() => {
        localStorage.setItem('nextstep_collections', JSON.stringify(collections));
    }, [collections]);

    useEffect(() => {
        localStorage.setItem('nextstep_activity', JSON.stringify(recentActivity));
    }, [recentActivity]);

    useEffect(() => {
        localStorage.setItem('nextstep_alumni', JSON.stringify(alumniList));
    }, [alumniList]);

    // Icon mapping
    const getIconComponent = (iconName) => {
        const icons = { Briefcase, Users, TrendingUp, FileText };
        return icons[iconName] || Briefcase;
    };

    // Add new goal
    const handleAddGoal = () => {
        if (newGoalTitle.trim() && newGoalDeadline) {
            const newGoal = {
                id: Date.now(),
                title: newGoalTitle,
                deadline: newGoalDeadline,
                progress: 0
            };
            setCurrentGoals([...currentGoals, newGoal]);
            setNewGoalTitle('');
            setNewGoalDeadline('');
            setShowAddGoal(false);

            // Add activity
            const activity = {
                action: 'Created goal',
                item: newGoalTitle,
                date: 'Just now',
                icon: 'Target'
            };
            setRecentActivity([activity, ...recentActivity.slice(0, 9)]);
        }
    };

    // Update goal progress
    const updateGoalProgress = (goalId, newProgress) => {
        setCurrentGoals(currentGoals.map(goal => {
            if (goal.id === goalId) {
                if (newProgress === 100 && goal.progress < 100) {
                    // Goal completed
                    setStats({ ...stats, goalsCompleted: stats.goalsCompleted + 1 });
                    const activity = {
                        action: 'Completed',
                        item: goal.title,
                        date: 'Just now',
                        icon: 'Check'
                    };
                    setRecentActivity([activity, ...recentActivity.slice(0, 9)]);
                }
                return { ...goal, progress: newProgress };
            }
            return goal;
        }));
    };

    // Delete goal
    const deleteGoal = (goalId) => {
        setCurrentGoals(currentGoals.filter(goal => goal.id !== goalId));
    };

    // Connect with alumni
    const connectWithAlumni = (alumniId) => {
        setAlumniList(alumniList.map(alum => {
            if (alum.id === alumniId) {
                if (!alum.connected) {
                    setStats({ ...stats, alumniConnected: stats.alumniConnected + 1 });
                    const activity = {
                        action: 'Connected with',
                        item: alum.name,
                        date: 'Just now',
                        icon: 'Users'
                    };
                    setRecentActivity([activity, ...recentActivity.slice(0, 9)]);
                }
                return { ...alum, connected: true };
            }
            return alum;
        }));
    };

    // Add to collection
    const addToCollection = (path, type, item) => {
        setCollections({
            ...collections,
            [path]: {
                ...collections[path],
                [type]: [...(collections[path][type] || []), item]
            }
        });

        const activity = {
            action: 'Saved',
            item: item,
            date: 'Just now',
            icon: 'BookmarkCheck'
        };
        setRecentActivity([activity, ...recentActivity.slice(0, 9)]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Navigation Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <nav className="flex space-x-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    My Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab('alumni')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        activeTab === 'alumni' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Connect with Alumni
                                </button>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-500">💾 Auto-saving locally</span>
                            <button
                                onClick={() => {
                                    if (confirm('Clear all data and reset to defaults?')) {
                                        localStorage.clear();
                                        window.location.reload();
                                    }
                                }}
                                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Reset Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile View */}
            {activeTab === 'profile' && (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Hero Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-start space-x-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Alex Johnson</h2>
                                    <p className="text-gray-600 mb-4">Sophomore • Economics Major • Olin Business School</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Member since Aug 2024
                    </span>
                                        <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Active explorer
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                    <span className="text-2xl font-bold text-blue-900">{stats.pathsExplored}</span>
                                </div>
                                <p className="text-sm text-blue-700 font-medium">Paths Explored</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <Users className="w-5 h-5 text-purple-600" />
                                    <span className="text-2xl font-bold text-purple-900">{stats.alumniConnected}</span>
                                </div>
                                <p className="text-sm text-purple-700 font-medium">Alumni Connected</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <Target className="w-5 h-5 text-green-600" />
                                    <span className="text-2xl font-bold text-green-900">{stats.goalsCompleted}</span>
                                </div>
                                <p className="text-sm text-green-700 font-medium">Goals Completed</p>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <Award className="w-5 h-5 text-amber-600" />
                                    <span className="text-2xl font-bold text-amber-900">{stats.explorationScore}%</span>
                                </div>
                                <p className="text-sm text-amber-700 font-medium">Exploration Score</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Left Column - Goals & Activity */}
                        <div className="col-span-1 space-y-6">
                            {/* Current Goals */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                        <Target className="w-5 h-5 mr-2 text-blue-600" />
                                        Active Goals
                                    </h3>
                                    <button
                                        onClick={() => setShowAddGoal(true)}
                                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add
                                    </button>
                                </div>

                                {showAddGoal && (
                                    <div className="mb-4 p-3 border border-blue-200 rounded-lg bg-blue-50">
                                        <input
                                            type="text"
                                            placeholder="Goal title..."
                                            value={newGoalTitle}
                                            onChange={(e) => setNewGoalTitle(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Deadline (e.g., Nov 15)"
                                            value={newGoalDeadline}
                                            onChange={(e) => setNewGoalDeadline(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm"
                                        />
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handleAddGoal}
                                                className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                            >
                                                Add Goal
                                            </button>
                                            <button
                                                onClick={() => setShowAddGoal(false)}
                                                className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {currentGoals.map((goal) => (
                                        <div key={goal.id} className="border border-gray-200 rounded-lg p-3">
                                            <div className="flex items-start justify-between mb-2">
                                                <p className="text-sm font-medium text-gray-900 flex-1">{goal.title}</p>
                                                <button
                                                    onClick={() => deleteGoal(goal.id)}
                                                    className="text-gray-400 hover:text-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Due {goal.deadline}
                        </span>
                                                <span>{goal.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                                                <div
                                                    className="bg-blue-600 h-1.5 rounded-full transition-all"
                                                    style={{ width: `${goal.progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 25))}
                                                    className="flex-1 px-2 py-1 bg-green-50 text-green-700 rounded text-xs hover:bg-green-100"
                                                >
                                                    +25%
                                                </button>
                                                <button
                                                    onClick={() => updateGoalProgress(goal.id, 100)}
                                                    className="flex-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100"
                                                >
                                                    Complete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                                    Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {recentActivity.slice(0, 5).map((activity, idx) => {
                                        const IconComponent = getIconComponent(activity.icon);
                                        return (
                                            <div key={idx} className="flex items-center space-x-3 text-sm">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <IconComponent className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-gray-900">
                                                        <span className="text-gray-500">{activity.action}</span>{' '}
                                                        <span className="font-medium">{activity.item}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">{activity.date}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Collections */}
                        <div className="col-span-2">
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                            <BookmarkCheck className="w-5 h-5 mr-2 text-blue-600" />
                                            My Collections
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">Resources organized by your interests</p>
                                    </div>
                                </div>

                                {/* Career Path Collections */}
                                <div className="space-y-6">
                                    {Object.entries(collections).map(([path, items]) => (
                                        <div key={path} className="border border-gray-200 rounded-xl p-5">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 capitalize">
                                                        {path.replace('-', ' ')}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {items.courses.length + items.internships.length + items.alumni.length} items saved
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {/* Courses */}
                                                <div>
                                                    <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                        <GraduationCap className="w-3 h-3 mr-1" />
                                                        Courses ({items.courses.length})
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {items.courses.map((course, idx) => (
                                                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                {course}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Internships */}
                                                <div>
                                                    <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                        <Briefcase className="w-3 h-3 mr-1" />
                                                        Internships ({items.internships.length})
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {items.internships.map((internship, idx) => (
                                                            <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                                {internship}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Alumni */}
                                                <div>
                                                    <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                        <Users className="w-3 h-3 mr-1" />
                                                        Alumni Connections ({items.alumni.length})
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {items.alumni.map((alum, idx) => (
                                                            <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs flex items-center">
                                <MessageCircle className="w-3 h-3 mr-1" />
                                                                {alum}
                              </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Journal Insights */}
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 shadow-sm mt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                                    Your Journey Insights
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="text-2xl font-bold text-purple-600 mb-1">12</p>
                                        <p className="text-sm text-gray-600">Journal entries this month</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="text-2xl font-bold text-blue-600 mb-1">↑ 23%</p>
                                        <p className="text-sm text-gray-600">Confidence increase</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-white rounded-lg border-l-4 border-purple-500">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">Pattern detected:</span> You're most energized when discussing teamwork and impact-driven projects.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Alumni Connection View */}
            {activeTab === 'alumni' && (
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Connect with Alumni</h2>
                        <p className="text-gray-600 text-lg">Learn from WashU graduates in your fields of interest</p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {alumniList.map((alum) => (
                            <div key={alum.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4 mb-4">
                                    <div className={`w-16 h-16 ${alum.imageColor} rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xl`}>
                                        {alum.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{alum.name}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{alum.role}</p>
                                        <p className="text-xs text-gray-500">Class of {alum.year}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {alum.path}
                  </span>
                                </div>

                                {alum.connected ? (
                                    <button className="w-full px-4 py-2.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center justify-center cursor-default">
                                        <Check className="w-4 h-4 mr-2" />
                                        Connected
                                    </button>
                                ) : alum.available ? (
                                    <button
                                        onClick={() => connectWithAlumni(alum.id)}
                                        className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm font-medium"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Request Coffee Chat
                                    </button>
                                ) : (
                                    <button className="w-full px-4 py-2.5 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
                                        Currently Unavailable
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileAndPathway;