import React, { useState } from 'react';
import { ArrowLeft, Upload, Video, Image, Link, Send, X } from 'lucide-react';

const PostCreation = () => {
    const [postContent, setPostContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [showVideoInput, setShowVideoInput] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const maxChars = 500;

    const handleContentChange = (e) => {
        const text = e.target.value;
        if (text.length <= maxChars) {
            setPostContent(text);
            setCharCount(text.length);
        }
    };

    const handleVideoUrlChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const handleSubmit = () => {
        if (!postContent.trim()) return;

        // Handle post submission logic here
        console.log('Post submitted:', { postContent, videoUrl });
        alert('Post shared successfully!');
        // Reset form
        setPostContent('');
        setVideoUrl('');
        setShowVideoInput(false);
        setCharCount(0);
    };

    const removeVideo = () => {
        setVideoUrl('');
        setShowVideoInput(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <a
                        href="/feed"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Feed</span>
                    </a>
                    <h1 className="text-3xl font-bold text-gray-900">Share Your Insights</h1>
                    <p className="text-gray-600 mt-2">Connect with fellow alumni and share your experiences</p>
                </div>

                {/* Post Creation Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Author Info Section */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center border-2 border-gray-200">
                                <span className="text-lg font-bold text-purple-700">Y</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Your Name</h3>
                                <p className="text-sm text-gray-600">Your Title & Company</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Input */}
                    <div className="p-6">
                        <textarea
                            value={postContent}
                            onChange={handleContentChange}
                            placeholder="What insights would you like to share with fellow alumni? Share your experiences, achievements, or advice..."
                            className="w-full min-h-[200px] text-gray-900 placeholder-gray-400 resize-none focus:outline-none text-base leading-relaxed"
                        />

                        {/* Character Count */}
                        <div className="flex justify-end mt-2">
                            <span className={`text-sm ${charCount > maxChars * 0.9 ? 'text-pink-600' : 'text-gray-400'}`}>
                                {charCount}/{maxChars}
                            </span>
                        </div>
                    </div>

                    {/* Video URL Section */}
                    {showVideoInput && (
                        <div className="px-6 pb-4">
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Video className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-900">Add Video</span>
                                    </div>
                                    <button
                                        onClick={removeVideo}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <input
                                    type="url"
                                    value={videoUrl}
                                    onChange={handleVideoUrlChange}
                                    placeholder="Paste YouTube or Vimeo URL (e.g., https://youtube.com/watch?v=...)"
                                    className="w-full px-4 py-2 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                                />
                                {videoUrl && (
                                    <p className="text-xs text-blue-600 mt-2">✓ Video link added</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Media Buttons */}
                    {!showVideoInput && (
                        <div className="px-6 pb-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowVideoInput(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Video className="w-5 h-5" />
                                    <span className="text-sm font-medium">Add Video</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                            Your post will be visible to all alumni
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="/alumni-feed"
                                className="px-6 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </a>
                            <button
                                onClick={handleSubmit}
                                disabled={!postContent.trim()}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                            >
                                <Send className="w-4 h-4" />
                                Share Post
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Tips for Great Posts</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-0.5">•</span>
                            <span>Share authentic experiences and lessons learned in your career journey</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span>Include actionable advice that fellow alumni can apply</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            <span>Add video content to make your posts more engaging</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>Be respectful and professional in all communications</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostCreation;