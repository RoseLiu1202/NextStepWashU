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
import CareerDetailPage from './components/CareerIndividual.jsx';
import PostSubmit from './components/postSubmit.jsx';

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<CareerHome />} />
                <Route path="/careers" element={<CareerHome />} />
                <Route path="/careers/:careerID" element={<CareerDetailPage />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/postSubmit" element={<PostSubmit />} />
                <Route path="/journal" element={<AIJournalInterface />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;