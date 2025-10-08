import React, { useState } from 'react';
import { Search, Heart, UserPlus, UserCheck, Play } from 'lucide-react';
import postData from '../data/PostData.json';

const AlumniFeed = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [followedUsers, setFollowedUsers] = useState(new Set());
    const [likedPosts, setLikedPosts] = useState(new Set());

    // Import post data from JSON file
    const posts = Array.isArray(postData) ? postData : (postData.Posts || postData.posts || []);

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch =
            post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.authorTitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Toggle follow
    const toggleFollow = (postId) => {
        const newFollowed = new Set(followedUsers);
        if (newFollowed.has(postId)) {
            newFollowed.delete(postId);
        } else {
            newFollowed.add(postId);
        }
        setFollowedUsers(newFollowed);
    };

    // Toggle like
    const toggleLike = (postId) => {
        const newLiked = new Set(likedPosts);
        if (newLiked.has(postId)) {
            newLiked.delete(postId);
        } else {
            newLiked.add(postId);
        }
        setLikedPosts(newLiked);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Alumni Posts</h1>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for Posts"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 bg-white shadow-sm"
                        />
                    </div>
                </div>

                {/* Create Post Button */}
                <a
                    href="/post-creation"
                    className="block mb-8 p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 cursor-pointer group"
                >
                    <p className="text-gray-500 group-hover:text-pink-600 transition-colors">
                        Alumni share your insights here...
                    </p>
                </a>

                {/* Post Feed */}
                <div className="space-y-6">
                    {filteredPosts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
                            <p className="text-gray-600">Try adjusting your search query</p>
                        </div>
                    ) : (
                        filteredPosts.map((post, index) => (
                            <React.Fragment key={post.id}>
                                {index > 0 && <hr className="border-gray-200" />}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                                    <div className="flex gap-4">
                                        {/* Profile Picture */}
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center border-2 border-gray-200">
                                                {post.authorPfp ? (
                                                    <img
                                                        src={post.authorPfp}
                                                        alt={post.author}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-lg font-bold text-purple-700">
                                                        {post.author.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Author Info */}
                                            <div className="mb-3">
                                                <h3 className="text-base font-semibold text-gray-900">
                                                    {post.author}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {post.authorTitle}
                                                </p>
                                            </div>

                                            {/* Video Embed */}
                                            {post.videoUrl && (
                                                <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 relative" style={{ paddingBottom: '56.25%' }}>
                                                    <iframe
                                                        src={post.videoUrl}
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                                {post.description}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-3">
                                                {/* Follow Button */}
                                                <button
                                                    onClick={() => toggleFollow(post.id)}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                                        followedUsers.has(post.id)
                                                            ? 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
                                                            : 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white hover:shadow-md'
                                                    }`}
                                                >
                                                    {followedUsers.has(post.id) ? (
                                                        <>
                                                            <UserCheck className="w-4 h-4" />
                                                            Following
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserPlus className="w-4 h-4" />
                                                            Follow
                                                        </>
                                                    )}
                                                </button>

                                                {/* Like Button */}
                                                <button
                                                    onClick={() => toggleLike(post.id)}
                                                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                                                        likedPosts.has(post.id)
                                                            ? 'bg-pink-100'
                                                            : 'bg-blue-50 hover:bg-blue-100'
                                                    }`}
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 transition-all duration-200 ${
                                                            likedPosts.has(post.id)
                                                                ? 'fill-pink-500 text-pink-500'
                                                                : 'text-blue-500'
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlumniFeed;