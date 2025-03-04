import dayjs from "dayjs";
import { LoaderCircle, PenLine, Trash2 } from "lucide-react";
import React from "react";
import apiClient from "../../../../lib/utils";

const CouponsTable = ({
  filterCoupans,
  getAllCoupans,
  handleEdit,
  isLoading,
}) => {
  const handleDelete = async (id) => {
    try {
      const res = await apiClient.delete({
        url: "/coupan",
        data: { id },
      });
      if (res.message === "Coupon is deleted.") {
        getAllCoupans();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="w-full sm:pt-[7.5rem]">
      <div className="hidden md:block table_container overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coupon Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coupon Amount
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product IDs
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage Limits
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 w-full">
            {filterCoupans?.length < 1 && (
              <div className="w-full flex flex-col justify-center items-center">
                {" "}
                <img
                  src={"/empty-folder.png"}
                  className="w-20 h-20"
                  alt={"no data | soulsun"}
                />
                <p className="font-light">List is empty.</p>
              </div>
            )}
            {filterCoupans?.map((coupon) => (
              <tr key={coupon.code} className="hover:bg-gray-50">
                <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-900">
                  <div className="relative px-4 py-3 bg-gray-300 text-center rounded overflow-hidden">
                    {coupon.code}
                    <span className="w-6 h-6 rounded-full absolute -left-3 bg-white top-1/2 -translate-y-1/2"></span>
                    <span className="w-6 h-6 rounded-full absolute -right-3 bg-white top-1/2 -translate-y-1/2"></span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coupon.discountType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {coupon.discountType === 'percentage'?'':'₹'}{coupon.discountValue} {coupon.discountType === 'percentage'?'%':''}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-wrap max-w-[15rem]">
                  {coupon.productIds.join(", ")}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coupon.usageLimit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dayjs(coupon.expiryDate).format("DD-MM-YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => handleDelete(coupon._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => handleEdit(coupon)}
                    >
                      <PenLine className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden block space-y-4">
        {filterCoupans?.map((coupon) => (
          <div key={coupon.code} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900 flex">
                  Code: {coupon.code}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleDelete(coupon._id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => handleEdit(coupon)}
                >
                  <PenLine className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-[8rem_auto] gap-2">
                <div className="text-sm text-gray-500">Coupon Type:</div>
                <div className="text-sm text-gray-900">
                  {coupon.discountType}
                </div>

                <div className="text-sm text-gray-500">Coupon Amount:</div>
                <div className="text-sm text-gray-900">
                {coupon.discountType === 'percentage'?'':'₹'}{coupon.discountValue} {coupon.discountType === 'percentage'?'%':''}
                </div>

                {/* <div className="text-sm text-gray-500">Product IDs:</div>
                <div>
                  <span className="inline-flex text-sm">
                    {coupon.productIds.join(", ")}
                  </span>
                </div> */}

                <div className="text-sm text-gray-500">Usage Limits:</div>
                <div className="text-sm text-gray-900">
                  {coupon.usageLimits}
                </div>

                <div className="text-sm text-gray-500">Expiry Date:</div>
                <div className="text-sm text-gray-900">
                  {" "}
                  {dayjs(coupon.expiryDate).format("DD-MM-YYYY")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin text-grey-500 h-6 w-6 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default CouponsTable;
