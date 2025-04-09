import React from "react";
import SalesOverview from "../components/SalesOverview";
import TopProducts from "../components/TopProducts";
import CustomerMetrics from "../components/CustomerMetrics";
import RepeatCustomers from "../components/RepeatCustomers";
import CartAnalytics from "../components/CartAnalytics";
import SalesTrends from "../components/SalesTrends";
import ProductPerformance from "../components/ProductPerformance";
import DeviceStats from "../components/DeviceStats";
import SearchQueries from "../components/search-queries";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          View your store's performance metrics and insights
        </p>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-8">
        {/* Sales & Revenue Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Sales & Revenue</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SalesOverview />
            <TopProducts />
          </div>

          <SalesTrends />
        </section>

        {/* Customer Analytics Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">
              Customer Analytics
            </h2>
          </div>

          <CustomerMetrics />
        </section>

        {/* Product Analytics Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-purple-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">
              Product Analytics
            </h2>
          </div>

          <ProductPerformance />
        </section>

        {/* Repeat Customer Analytics Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-yellow-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">
              Repeat Customer Analytics
            </h2>
          </div>

          <RepeatCustomers />
        </section>

        {/* Cart & Checkout Analytics Section */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-red-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Cart Analytics</h2>
          </div>

          <CartAnalytics />
        </section>
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">
              Device Usage Stats
            </h2>
          </div>

          <DeviceStats />
        </section>
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-green-600 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">
              User Search Queries
            </h2>
          </div>

          <SearchQueries />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
