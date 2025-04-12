"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { InfoIcon, XIcon, Link2Icon, AlertCircleIcon } from "lucide-react";

const SourceAnalytics = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    source: "",
    medium: "",
    campaign: "",
    startDate: "",
    endDate: "",
  });

  // Process data for chart visualization
  const processChartData = (data = []) => {
    // Group by source
    const sourceCount = {};
    const mediumCount = {};
    const campaignCount = {};

    data.forEach((item) => {
      sourceCount[item.source] = (sourceCount[item.source] || 0) + 1;
      mediumCount[item.medium] = (mediumCount[item.medium] || 0) + 1;
      campaignCount[item.campaign] = (campaignCount[item.campaign] || 0) + 1;
    });

    const sourceData = Object.keys(sourceCount).map((source) => ({
      name: source || "unknown",
      visits: sourceCount[source],
    }));

    const mediumData = Object.keys(mediumCount).map((medium) => ({
      name: medium || "unknown",
      visits: mediumCount[medium],
    }));

    const campaignData = Object.keys(campaignCount).map((campaign) => ({
      name: campaign || "unknown",
      visits: campaignCount[campaign],
    }));

    return {
      sourceData,
      mediumData,
      campaignData,
    };
  };

  // Fetch analytics data using React Query
  const fetchAnalytics = async () => {
    // Build query parameters
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", 10);

    if (filters.source) params.append("source", filters.source);
    if (filters.medium) params.append("medium", filters.medium);
    if (filters.campaign) params.append("campaign", filters.campaign);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);

    const res = await api.get(`/analytics/track-visit?${params.toString()}`);
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["analytics", page, filters],
    queryFn: fetchAnalytics,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const analytics = data?.data || [];
  const pages = data?.pages || 1;
  const total = data?.total || 0;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      source: "",
      medium: "",
      campaign: "",
      startDate: "",
      endDate: "",
    });
    setPage(1);
  };

  const { sourceData, mediumData, campaignData } = processChartData(analytics);

  // Get unique values for dropdowns
  const getUniqueValues = (field) => {
    const values = new Set(analytics.map((item) => item[field]));
    return [...values];
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            {/* <h1 className="text-2xl font-bold mb-2 text-gray-800">
              Traffic Analytics
            </h1> */}
            {/* <p className="text-gray-600 text-sm">
              Total Visits: <span className="font-medium">{total}</span>
            </p> */}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <InfoIcon size={16} />
            How to use UTM tracking
          </button>
        </div>

        {/* Filters Section */}
        <section className="mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full inline-block"></span>
              Filters
            </h2>
            <form onSubmit={applyFilters}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Source
                  </label>
                  <input
                    name="source"
                    placeholder="e.g., google, facebook"
                    value={filters.source}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    list="sourceOptions"
                  />
                  <datalist id="sourceOptions">
                    {getUniqueValues("source").map((source) => (
                      <option key={source} value={source} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Medium
                  </label>
                  <input
                    name="medium"
                    placeholder="e.g., cpc, organic"
                    value={filters.medium}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    list="mediumOptions"
                  />
                  <datalist id="mediumOptions">
                    {getUniqueValues("medium").map((medium) => (
                      <option key={medium} value={medium} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Campaign
                  </label>
                  <input
                    name="campaign"
                    placeholder="e.g., spring-sale"
                    value={filters.campaign}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    list="campaignOptions"
                  />
                  <datalist id="campaignOptions">
                    {getUniqueValues("campaign").map((campaign) => (
                      <option key={campaign} value={campaign} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-white text-gray-700 border border-gray-200 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </div>
        </section>

        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="text-gray-500 flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading data...
            </div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="text-red-500 flex items-center gap-2">
              <AlertCircleIcon size={20} />
              Error loading data: {error?.message || "Unknown error"}
            </div>
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <section className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Source Chart */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-base font-medium mb-3 text-gray-800">
                    Traffic by Source
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sourceData}
                        margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
                        barSize={sourceData.length > 10 ? 15 : 30}
                      >
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          interval={0}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #f0f0f0",
                            borderRadius: "4px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                        />
                        <Bar
                          dataKey="visits"
                          name="Visits"
                          fill="#3b82f6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Medium Chart */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-base font-medium mb-3 text-gray-800">
                    Traffic by Medium
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mediumData}
                        margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
                        barSize={mediumData.length > 10 ? 15 : 30}
                      >
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          interval={0}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #f0f0f0",
                            borderRadius: "4px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          }}
                        />
                        <Bar
                          dataKey="visits"
                          name="Visits"
                          fill="#10b981"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Campaign Chart */}
              <div className="mt-4 bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-base font-medium mb-3 text-gray-800">
                  Traffic by Campaign
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={campaignData}
                      margin={{ top: 5, right: 20, bottom: 30, left: 0 }}
                      barSize={campaignData.length > 10 ? 15 : 30}
                    >
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #f0f0f0",
                          borderRadius: "4px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                      />
                      <Bar
                        dataKey="visits"
                        name="Visits"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Data Table Section */}
            <section className="mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-base font-medium text-gray-800">
                    Detailed Analytics
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="p-3 text-left font-medium">Source</th>
                        <th className="p-3 text-left font-medium">Medium</th>
                        <th className="p-3 text-left font-medium">Campaign</th>
                        <th className="p-3 text-left font-medium">Path</th>
                        <th className="p-3 text-left font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {analytics.length > 0 ? (
                        analytics.map((item) => (
                          <tr
                            key={item._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="p-3 text-gray-700">
                              {item.source || "-"}
                            </td>
                            <td className="p-3 text-gray-700">
                              {item.medium || "-"}
                            </td>
                            <td className="p-3 text-gray-700">
                              {item.campaign || "-"}
                            </td>
                            <td className="p-3 text-gray-700">
                              {item.path || "/"}
                            </td>
                            <td className="p-3 text-gray-700">
                              {new Date(item.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-4 text-center text-gray-500"
                          >
                            No data found with the current filters
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Pagination Section */}
            {pages > 1 && (
              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm text-gray-600">
                  Page {page} of {pages} ({total} records)
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      page === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (pages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= pages - 2) {
                      pageNum = pages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-1.5 rounded-md text-sm ${
                          page === pageNum
                            ? "bg-blue-500 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage(Math.min(pages, page + 1))}
                    disabled={page === pages}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      page === pages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* How to Use Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <InfoIcon size={20} className="text-blue-500" />
                How to Track Visitors Using UTM Links
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-800 font-medium">
                  We've added smart tracking to your website that helps monitor:
                </p>
                <ul className="mt-2 space-y-1 text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>
                      Where visitors come from (Google, social media, email,
                      ads)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>Which campaigns perform best</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  How to Use
                </h4>
                <p className="text-gray-600 mb-3">
                  Just add UTM parameters to your URL like this:
                </p>
                <div className="bg-gray-50 p-3 rounded border border-gray-200 font-mono text-sm text-gray-700 flex items-center gap-2 overflow-x-auto">
                  <Link2Icon
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                  <span>
                    https://soulsun.in/?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  Examples
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-700 font-medium mb-1">
                      From Google Search:
                    </p>
                    <div className="bg-gray-50 p-2 rounded border border-gray-200 font-mono text-sm text-gray-700 overflow-x-auto">
                      https://soulsun.in/?utm_source=google&utm_medium=search&utm_campaign=spring-sale
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">
                      From Facebook Ads:
                    </p>
                    <div className="bg-gray-50 p-2 rounded border border-gray-200 font-mono text-sm text-gray-700 overflow-x-auto">
                      https://soulsun.in/?utm_source=facebook&utm_medium=cpc&utm_campaign=fb-offer
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 font-medium mb-1">
                      From Email Newsletter:
                    </p>
                    <div className="bg-gray-50 p-2 rounded border border-gray-200 font-mono text-sm text-gray-700 overflow-x-auto">
                      https://soulsun.in/?utm_source=newsletter&utm_medium=email&utm_campaign=weekly-deals
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  What Happens
                </h4>
                <p className="text-gray-600">
                  When someone visits your site using any of the above links:
                </p>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      The source, medium, and campaign are recorded in your
                      backend.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      You can view and analyze where your traffic is coming
                      from.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

///
export default SourceAnalytics;
