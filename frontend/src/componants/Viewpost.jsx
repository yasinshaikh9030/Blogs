import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState, useEffect } from 'react'
const Viewpost = () => {
    const [posts, setPosts] = useState([]);
    const dummyuser = "dummyuser";
    const [likedId, setLikedId] = useState(null);
    const [commentInputs, setCommentInputs] = useState({});
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [postComments, setPostComments] = useState([]);




    const postviewer = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/blogs/post/getall");
            console.log("posts fetched successfully", res.data);
            setPosts(res.data.postdata);
            toast.success("Posts fetched successfully");


        }
        catch (err) {
            console.log("post nhi mil rhi", err);
            console.error(err);
            toast.error("Error fetching posts")
        }
    }

    const likehandler = async (postid) => {
        try {
            const res = await axios.post("http://localhost:4000/api/v1/blogs/post/likes", {
                post: postid,
                user: dummyuser,
            });
            console.log("post liked successfully", res.data);
            setLikedId(res.data.likedata._id); // Store the liked ID
            toast.success("Post liked successfully");
            // Refresh posts to show updated like count
            postviewer();
        }
        catch (err) {
            console.error("Error liking post", err);
            toast.error("Error liking post");
        }
    }


    const unlikehandler = async (post) => {
        try {
            if (!likedId) {
                toast.error("You haven't liked this post yet");
                return;
            }
            const res = await axios.post("http://localhost:4000/api/v1/blogs/post/unlike", {
                post: post._id,
                like: likedId, // Use the stored liked ID
            });
            setLikedId(null); // Reset liked ID after unliking

            console.log("Post unliked successfully", res.data);
            toast.success("Post unliked successfully");
            postviewer(); // Refresh
        } catch (err) {
            console.error("Error unliking post", err);
            toast.error("Error unliking post");
        }
    };


    const commenthandler = async (post, body) => {
        if (!body || body.trim() === "") {
            toast.error("Comment cannot be empty");
            return;
        }

        try {
            const res = await axios.post("http://localhost:4000/api/v1/blogs/comment/create", {
                post: post._id,
                user: dummyuser,
                body: body,
            });
            console.log("Comment added successfully", res.data);
            toast.success("Comment added successfully");
            postviewer(); // refresh posts
            setCommentInputs((prev) => ({ ...prev, [post._id]: "" })); // Clear input
        } catch (err) {
            console.error("Error adding comment", err);
            toast.error("Error adding comment");
        }
    };
    const viewcomments = async (postId) => {
        try {
            const res = await axios.get("http://localhost:4000/api/v1/blogs/comment/getall");
            const allComments = res.data.commentdata;

            const filtered = allComments.filter((comment) => comment.post === postId);

            setPostComments(filtered);
            setSelectedPostId(postId);
        } catch (err) {
            console.error("Error fetching comments", err);
            toast.error("Error fetching comments");
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        <span className="text-indigo-600">Blog</span> Posts
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Discover amazing stories and insights from our community
                    </p>
                    <button
                        onClick={postviewer}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Load All Posts</span>
                    </button>
                </div>

                {/* Posts Container */}
                <div className="space-y-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
                                <p className="text-gray-500">Click "Load All Posts" to view the latest blog posts</p>
                            </div>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {/* Post Header */}
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                                        {post.title}
                                    </h2>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Just now</span>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="p-6">
                                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                        {post.body}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-4 mb-6">
                                        <button
                                            onClick={() => likehandler(post._id)}
                                            className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                                        >
                                            <span className="text-lg">❤️</span>
                                            <span>{post.likes.length} Likes</span>
                                        </button>
                                        <button
                                            onClick={() => unlikehandler(post)}
                                            className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <span>Unlike</span>
                                        </button>
                                        <button
                                            onClick={() => viewcomments(post._id)}
                                            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span>View Comments</span>
                                        </button>
                                    </div>

                                    {/* Comment Input Section */}
                                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Add a Comment
                                        </h4>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="text"
                                                placeholder="Write a thoughtful comment..."
                                                value={commentInputs[post._id] || ""}
                                                onChange={(e) =>
                                                    setCommentInputs({ ...commentInputs, [post._id]: e.target.value })
                                                }
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-base"
                                            />
                                            <button
                                                onClick={() => commenthandler(post, commentInputs[post._id])}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold flex items-center justify-center space-x-2 min-w-[120px] shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                <span>Add Comment</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Comments Section */}
                                    {selectedPostId === post._id && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                Comments
                                            </h4>
                                            {postComments.length > 0 ? (
                                                <div className="space-y-3">
                                                    {postComments.map((comment) => (
                                                        <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                                                            <div className="flex items-start space-x-3">
                                                                <div className="bg-indigo-100 rounded-full p-2">
                                                                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center space-x-2 mb-1">
                                                                        <span className="font-semibold text-gray-800">{comment.user}</span>
                                                                        <span className="text-xs text-gray-500">•</span>
                                                                        <span className="text-xs text-gray-500">now</span>
                                                                    </div>
                                                                    <p className="text-gray-700">{comment.body}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                    <p className="text-gray-500 font-medium">No comments yet</p>
                                                    <p className="text-gray-400 text-sm">Be the first to share your thoughts!</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )

}

export default Viewpost