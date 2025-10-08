import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AIJournalInterface from './components/AIJournal.jsx';
import Navigation from './components/Navigation.jsx';
import Profile from './components/Profile.jsx';
import CareerHome from './components/CareerHome.jsx';
import Internships from './components/Internships.jsx';
import Courses from './components/Courses.jsx';
import Clubs from './components/Clubs.jsx';
import Feed from './components/Feed.jsx';






function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/careers" element={<CareerHome />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/journal" element={<AIJournalInterface />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Next Step WashU</h1>
                <p className="text-gray-600 mb-6">
                    Navigate career uncertainty with personalized guidance and support.
                </p>
                <Link
                    to="/journal"
                    className="block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Open AI Journal
                </Link>
            </div>
        </div>
    );
}

export default App;