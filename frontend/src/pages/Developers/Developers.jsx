import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom"; // Assuming React Router for navigation; remove if not using
import ModalBox from "../../component/Modal/ModalBox";
import { getAllDevelopers } from "../../services/developers";
import toast from "react-hot-toast";

const Developers = () => {
  const [addModal, setAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [record, setRecord] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTechStack, setSelectedTechStack] = useState(null);

  const allRoles = [
    { label: "Frontend Developer", value: "Frontend" },
    { label: "Backend Developer", value: "Backend" },
    { label: "Full Stack Developer", value: "Fullstack" },
  ];

  const techOptions = [
    "React",
    "Node.js",
    "Python",
    "Vue.js",
    "MongoDB",
    "Tailwind CSS",
    "Docker",
    "AWS",
  ];

  const fetchRecords = async () => {
    try {
      const res = await getAllDevelopers({
        search: search,
        role: selectedRole,
        techStack: selectedTechStack,
      });
      if (res.code == 200) {
        setRecord(res.data || []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [search, selectedRole, selectedTechStack]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Content */}
                <div className="mb-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-3">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                        Developer Management
                      </h1>
                    </div>
                    <button
                      onClick={() => setAddModal(true)}
                      className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ring-1 ring-white/20 text-sm"
                    >
                      <svg
                        className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
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
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                          placeholder="Search developers by name, role, or tech..."
                          className="md:w-xl w-full  pl-12 pr-4 py-2 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 shadow-inner hover:shadow-md text-sm"
                        />
                        <svg
                          className="absolute left-4 top-2.5 w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="px-4 py-2 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 shadow-inner hover:shadow-md flex-shrink-0 text-sm"
                      >
                        <option>Select Role</option>
                        {allRoles.map(({ label, value }, i) => {
                          return (
                            <>
                              <option value={value}>{label}</option>
                            </>
                          );
                        })}
                      </select>
                      <select
                        value={selectedTechStack}
                        onChange={(e) => setSelectedTechStack(e.target.value)}
                        className="px-4 py-2 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 shadow-inner hover:shadow-md flex-shrink-0 text-sm"
                      >
                        <option>Select Tech Stack</option>
                        {techOptions.map((data, i) => {
                          return (
                            <>
                              <option value={data}>{data}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md overflow-hidden border border-gray-200/50">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 border-b border-gray-200/50">
                          <tr>
                            <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">
                              Sr. No.
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">
                              Name{" "}
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">
                              Tech Stack
                            </th>
                            <th className="px-4 py-3 text-left font-bold text-gray-700 text-xs uppercase tracking-wider">
                              Experience
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/50">
                          {(record.length > 0 &&
                            record.map(
                              (
                                { name, role, experience, techStack, id },
                                index
                              ) => (
                                <tr
                                  key={id}
                                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 even:bg-gray-25/50"
                                >
                                  <td className="px-4 py-3 whitespace-nowrap text-xs font-bold text-gray-900">
                                    {index + 1}
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center space-x-3">
                                      {/* <div className={`w-8 h-8  rounded-lg flex items-center justify-center shadow-lg ring-1 ring-white/30`}>
                                                                        <span className={`text-xs font-bold ${developer.avatarTextColor}`}>{developer.avatarInitials}</span>
                                                                    </div> */}
                                      <div>
                                        <div className="font-bold text-gray-900 text-sm">
                                          {name}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full">
                                      {role}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">{techStack}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-xs font-semibold text-gray-700">
                                    {(experience && `${experience} years`) ||
                                      "0 years"}
                                  </td>
                                </tr>
                              )
                            )) || (
                            <tr>
                              <td
                                className="px-4 py-3 whitespace-nowrap text-center"
                                colSpan={12}
                              >
                                No Data Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-3 flex items-center justify-between border-t border-gray-200/50">
                      <div className="text-xs text-gray-700 flex-shrink-0 font-medium">
                        Showing <span className="text-gray-900">1</span> to{" "}
                        <span className="text-gray-900">{record.length}</span>{" "}
                        of{" "}
                        <span className="text-gray-900">{record.length}</span>{" "}
                        results
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

      <ModalBox
        open={addModal}
        close={() => {
          fetchRecords();
          setAddModal(false);
        }}
      />
    </>
  );
};

export default Developers;
