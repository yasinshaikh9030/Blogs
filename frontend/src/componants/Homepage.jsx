import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
const Homepage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');


    const posthandler = async () => {
        try {
            const post = await axios.post(`${API_URL}/api/v1/blogs/post/create`, {
                title,
                body
            });
            console.log("post created succefully", post.data);
            toast.success("Post created successfully");
            setTitle('');
            setBody('');
        }
        catch (err) {
            console.log(err);
            console.log("error aahe bhava")
            toast.error("Error in posting data");
        }

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">
                        Welcome to <span className="text-indigo-600">Blogging World</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Share your thoughts, stories, and ideas with the world. Create beautiful blog posts that inspire and engage your readers.
                    </p>
                </div>

                {/* Create Post Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex items-center mb-6">
                        <div className="bg-indigo-100 p-3 rounded-full mr-4">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Post Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(a) => setTitle(a.target.value)}
                                placeholder="Enter an engaging title for your post..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg"
                            />
                        </div>

                        {/* Body Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Post Content
                            </label>
                            <textarea
                                value={body}
                                onChange={(a) => setBody(a.target.value)}
                                placeholder="Write your story, share your thoughts, or express your ideas..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg resize-none"
                            />
                        </div>

                        {/* Publish Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={posthandler}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>Publish Post</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
