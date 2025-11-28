import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // Assuming React Router for navigation; remove if not using
import ModalBox from '../../component/Modal/ModalBox';
import { getAllDevelopers } from '../../services/developers';

const Developers = () => {
    const [addModal, setAddModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const developers = [
        {
            id: 1,
            name: 'Alex Johnson',
            email: 'alex@example.com',
            role: 'Product Manager',
            status: 'Active',
            techStack: ['React', 'Node.js', 'Tailwind'],
            experience: '5 years',
            avatarColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
            avatarTextColor: 'text-white',
            avatarInitials: 'AJ'
        },
        {
            id: 2,
            name: 'Maria Gomez',
            email: 'maria@example.com',
            role: 'Developer',
            status: 'Pending',
            techStack: ['Vue.js', 'Python', 'MongoDB'],
            experience: '3 years',
            avatarColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
            avatarTextColor: 'text-white',
            avatarInitials: 'MG'
        }
        // Add more developers as needed
    ];

    const fetchRecords = async()=>{
        try {
            const res = await getAllDevelopers({search:"hi ",id:1});
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchRecords();
    },[])


    const getTechStackBadges = (stack) => (
        <div className="flex flex-wrap gap-1">
            {stack.map((tech, idx) => (
                <span
                    key={idx}
                    className="inline-flex px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-md border border-gray-200 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
                >
                    {tech}
                </span>
            ))}
        </div>
    );

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
                {/* Sidebar */}
                {/* <div
                    className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-md shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out border-r border-gray-200/50`}
                >
                    <div className="flex items-center justify-center h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
                        <h1 className="text-base font-bold tracking-tight">Dev Dashboard</h1>
                    </div>
                    <nav className="mt-4 px-4 space-y-1">
                        <Link
                            to="/dashboard"
                            className="group flex items-center px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Dashboard
                        </Link>
                        <Link
                            to="/developers"
                            className="group flex items-center px-3 py-2 text-xs text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg font-semibold shadow-md ring-1 ring-blue-200/50"
                        >
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                />
                            </svg>
                            Developers
                        </Link>
                        <Link
                            to="/analytics"
                            className="group flex items-center px-3 py-2 text-xs text-gray-700 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            Analytics
                        </Link>
                    </nav>
                </div> */}

                {/* Mobile menu overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                    
                    <main className="flex-1 overflow-y-auto">
                        <div className="py-6">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                {/* Content */}
                                <div className="mb-6">
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-3">
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Developer Management</h1>
                                        </div>
                                        <button
                                            onClick={() => setAddModal(true)}
                                            className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ring-1 ring-white/20 text-sm"
                                        >
                                            <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Developer
                                        </button>
                                    </div>

                                    {/* Search and Filters */}
                                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-4 mb-6 border border-gray-200/50">
                                        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
                                            <div className="relative flex-1">
                                                <input
                                                    type="text"
                                                    placeholder="Search developers by name, email, role, or tech..."
                                                    className="w-full pl-12 pr-4 py-2 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 shadow-inner hover:shadow-md text-sm"
                                                />
                                                <svg className="absolute left-4 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <select className="px-4 py-2 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 shadow-inner hover:shadow-md flex-shrink-0 text-sm">
                                                <option>All Status</option>
                                                <option>Active</option>
                                                <option>Pending</option>
                                                <option>Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-gray-200/50">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 border-b border-gray-200/50">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">Sr. No.</th>
                                                        <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">Name </th>
                                                        <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">Role</th>
                                                        <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">Tech Stack</th>
                                                        <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">Experience</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100/50">
                                                    {developers.map((developer, index) => (
                                                        <tr
                                                            key={developer.id}
                                                            className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 even:bg-gray-25/50"
                                                        >
                                                            <td className="px-4 py-3 whitespace-nowrap text-xs font-bold text-gray-900">
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                <div className="flex items-center space-x-3">
                                                                    <div className={`w-8 h-8 ${developer.avatarColor} rounded-lg flex items-center justify-center shadow-lg ring-1 ring-white/30`}>
                                                                        <span className={`text-xs font-bold ${developer.avatarTextColor}`}>{developer.avatarInitials}</span>
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-bold text-gray-900 text-sm">{developer.name}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap">
                                                                <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full">{developer.role}</span>
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {getTechStackBadges(developer.techStack)}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-xs font-semibold text-gray-700">
                                                                {developer.experience}
                                                            </td>
                                                        </tr>))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-3 flex items-center justify-between border-t border-gray-200/50">
                                            <div className="text-xs text-gray-700 flex-shrink-0 font-medium">
                                                Showing <span className="text-gray-900">1</span> to{' '}
                                                <span className="text-gray-900">{developers.length}</span> of{' '}
                                                <span className="text-gray-900">{developers.length}</span> results
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="px-3 py-1.5 text-xs font-semibold text-gray-500 bg-white/80 border border-gray-300/50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                                                    Previous
                                                </button>
                                                <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white/80 border border-gray-300/50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <ModalBox open={addModal} close={() => setAddModal(false)} />
        </>
    );
};

export default Developers;