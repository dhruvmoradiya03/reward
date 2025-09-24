import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const AdminDashboard: NextPage = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const mockClients = [
    {
      id: "1",
      name: "Demo Client Ltd",
      subdomain: "demo",
      domain: "demo.rewardsplatform.com",
      clientType: "pay-plus-points",
      isActive: true,
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20",
    },
    {
      id: "2",
      name: "Points Only Corp",
      subdomain: "points",
      domain: "points.rewardsplatform.com",
      clientType: "only-points",
      isActive: true,
      createdAt: "2024-01-10",
      lastLogin: "2024-01-19",
    },
    {
      id: "3",
      name: "Payment Only Inc",
      subdomain: "payment",
      domain: "payment.rewardsplatform.com",
      clientType: "only-pay",
      isActive: false,
      createdAt: "2024-01-05",
      lastLogin: "2024-01-18",
    },
  ];

  const getClientTypeBadge = (type: string) => {
    const badges = {
      "only-pay": "bg-blue-100 text-blue-800",
      "only-points": "bg-green-100 text-green-800",
      "pay-plus-points": "bg-purple-100 text-purple-800",
    };
    return badges[type as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  const getClientTypeLabel = (type: string) => {
    const labels = {
      "only-pay": "Payment Only",
      "only-points": "Points Only",
      "pay-plus-points": "Pay + Points",
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <>
      <Head>
        <title>Super Admin Dashboard - Rewards Platform</title>
        <meta
          name="description"
          content="Super Admin Dashboard for managing client websites"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Super Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Manage client websites and configurations
                </p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/admin/clients/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Client
                </Link>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: "clients", label: "Clients", count: mockClients.length },
                { id: "settings", label: "System Settings", count: 0 },
                { id: "reports", label: "Reports", count: 0 },
                { id: "users", label: "Users", count: 0 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "clients" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Clients
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {mockClients.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Active Clients
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {mockClients.filter((c) => c.isActive).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Pay + Points
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {
                          mockClients.filter(
                            (c) => c.clientType === "pay-plus-points"
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <svg
                        className="w-6 h-6 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Points Only
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {
                          mockClients.filter(
                            (c) => c.clientType === "only-points"
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clients Table */}
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Client Websites
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage and configure client websites
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Domain
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockClients.map((client) => (
                        <tr key={client.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {client.name.charAt(0)}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {client.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {client.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {client.domain}
                            </div>
                            <div className="text-sm text-gray-500">
                              {client.subdomain}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClientTypeBadge(
                                client.clientType
                              )}`}
                            >
                              {getClientTypeLabel(client.clientType)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                client.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {client.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {client.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link
                                href={`/admin/clients/${client.id}`}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Configure
                              </Link>
                              <Link
                                href={`https://${client.domain}`}
                                target="_blank"
                                className="text-green-600 hover:text-green-900"
                              >
                                Visit Site
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                System Settings
              </h3>
              <p className="text-gray-600">
                System configuration options will be available here.
              </p>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reports
              </h3>
              <p className="text-gray-600">
                Reporting and analytics will be available here.
              </p>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                User Management
              </h3>
              <p className="text-gray-600">
                User management features will be available here.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
