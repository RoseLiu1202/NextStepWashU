// src/components/AIJournalInterface.jsx
import React, { useState } from 'react';
import { MessageCircle, Lightbulb, TrendingUp, Calendar, BookmarkPlus, Target, Sparkles, Archive, ChevronDown, ChevronUp, Send, Plus, X, Loader2 } from 'lucide-react';

const AIJournalInterface = () => {
    const [messages, setMessages] = useState([
        {
            type: 'ai',
            content: "Hi! I'm here to help you explore your thoughts about your future. What's on your mind today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [showInsights, setShowInsights] = useState(true);
    const [showActions, setShowActions] = useState(false);
    const [journalMode, setJournalMode] = useState('conversation');
    const [isLoading, setIsLoading] = useState(false);

    const insights = [
        { text: "You've mentioned 'teamwork' 4 times this month", icon: TrendingUp, color: 'bg-blue-100 text-blue-700' },
        { text: "Your confidence about consulting has grown", icon: Sparkles, color: 'bg-purple-100 text-purple-700' },
        { text: "You haven't explored marketing in 3 weeks", icon: Calendar, color: 'bg-amber-100 text-amber-700' }
    ];

    const suggestedActions = [
        { text: "Save 'Leadership in Tech' course", action: "course", icon: BookmarkPlus },
        { text: "Set goal: Talk to 1 alumni this week", action: "goal", icon: Target },
        { text: "Revisit Product Management path", action: "explore", icon: TrendingUp }
    ];

    const reflectionPrompts = [
        "What energized you this week?",
        "What made you anxious about your future?",
        "What type of work environment excites you?",
        "What skills do you want to develop?"
    ];

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue;
        setInputValue('');
        setIsLoading(true);

        // Add user message to UI immediately
        const newUserMessage = {
            type: 'user',
            content: userMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMessage]);

        try {
            // Prepare messages for API (convert to OpenAI format)
            const apiMessages = messages
                .filter(m => m.type !== 'system') // Filter out any system messages
                .map(m => ({
                    role: m.type === 'user' ? 'user' : 'assistant',
                    content: m.content
                }));

            // Add the new user message
            apiMessages.push({
                role: 'user',
                content: userMessage
            });

            // Call your backend API
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: apiMessages,
                    journalMode: journalMode
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();

            // Add AI response to UI
            setMessages(prev => [...prev, {
                type: 'ai',
                content: data.message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

        } catch (error) {
            console.error('Error calling API:', error);

            // Show error message to user
            setMessages(prev => [...prev, {
                type: 'ai',
                content: "I'm having trouble connecting right now. Please make sure the server is running and try again.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-slate-50 to-blue-50" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200 flex-shrink-0">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Journal</h1>
                    <p className="text-sm text-gray-600">A private space to explore and reflect</p>
                </div>

                <div className="p-4 border-b border-gray-200 flex-shrink-0">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                        Journal Mode
                    </label>
                    <div className="space-y-2">
                        <button
                            onClick={() => setJournalMode('conversation')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                journalMode === 'conversation' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-50'
                            }`}
                        >
                            <MessageCircle className="inline w-4 h-4 mr-2" />
                            Open Conversation
                        </button>
                        <button
                            onClick={() => setJournalMode('venting')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                journalMode === 'venting' ? 'bg-amber-100 text-amber-700 font-medium' : 'hover:bg-gray-50'
                            }`}
                        >
                            <Archive className="inline w-4 h-4 mr-2" />
                            Just Venting (No advice)
                        </button>
                        <button
                            onClick={() => setJournalMode('structured')}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                journalMode === 'structured' ? 'bg-green-100 text-green-700 font-medium' : 'hover:bg-gray-50'
                            }`}
                        >
                            <Target className="inline w-4 h-4 mr-2" />
                            Structured Reflection
                        </button>
                    </div>
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto p-4">
                    <button
                        onClick={() => setShowInsights(!showInsights)}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-3"
                    >
                        <span className="flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                            Recent Insights
                        </span>
                        {showInsights ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showInsights && (
                        <div className="space-y-2 mb-6">
                            {insights.map((insight, idx) => (
                                <div key={idx} className={`p-3 rounded-lg ${insight.color} text-xs`}>
                                    <insight.icon className="w-3 h-3 inline mr-2" />
                                    {insight.text}
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => setShowActions(!showActions)}
                        className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-3"
                    >
                        <span className="flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                            Suggested Actions
                        </span>
                        {showActions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showActions && (
                        <div className="space-y-2 mb-6">
                            {suggestedActions.map((action, idx) => (
                                <button
                                    key={idx}
                                    className="w-full text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-xs group"
                                >
                                    <action.icon className="w-3 h-3 inline mr-2 text-gray-400 group-hover:text-blue-600" />
                                    {action.text}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Need a prompt?
                        </p>
                        <div className="space-y-2">
                            {reflectionPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setInputValue(prompt)}
                                    className="w-full text-left p-2 rounded text-xs text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                    <div className="flex items-center text-xs text-gray-500">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        This journal is private to you
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h2 className="font-semibold text-gray-900">
                            {journalMode === 'conversation' && 'Open Conversation'}
                            {journalMode === 'venting' && 'Venting Space'}
                            {journalMode === 'structured' && 'Guided Reflection'}
                        </h2>
                        <p className="text-xs text-gray-500">
                            {journalMode === 'conversation' && 'AI will provide suggestions and recommendations'}
                            {journalMode === 'venting' && 'No advice, just listening'}
                            {journalMode === 'structured' && 'Follow prompts to clarify your thoughts'}
                        </p>
                    </div>
                    <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        View History
                    </button>
                </div>

                {/* Messages - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-2xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                                <div className={`rounded-2xl px-4 py-3 ${
                                    msg.type === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : msg.isError
                                            ? 'bg-red-50 border border-red-200 text-red-800'
                                            : 'bg-white border border-gray-200'
                                }`}>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                                <div className="flex items-center mt-1 px-2 space-x-2">
                                    <span className="text-xs text-gray-400">{msg.timestamp}</span>
                                    {msg.type === 'ai' && !msg.isError && (
                                        <span className="text-xs text-gray-400">• AI Response</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                <span className="text-sm text-gray-600">Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area - Fixed at bottom */}
                <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-end space-x-2">
                            <div className="flex-1 relative">
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    disabled={isLoading}
                                    placeholder={
                                        journalMode === 'venting'
                                            ? "Share what's on your mind..."
                                            : "Type your thoughts, questions, or concerns..."
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                                    rows="3"
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !inputValue.trim()}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                            <span>Press Enter to send, Shift + Enter for new line</span>
                            <span>Your thoughts are private and secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIJournalInterface;