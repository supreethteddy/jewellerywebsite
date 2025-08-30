import dayjs from "dayjs";
// Icons removed for simplicity
import React, { useState } from "react";
import Modal from "../../../../components/Modal";
import apiClient from "../../../../lib/utils";
import InvoiceModal from "./InvoiceModal";
import { BiCloudDownload } from "react-icons/bi";

const OrdersTable = ({ allorders, getAllCategories, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [showModal, setShowModal] = useState(false);

  const updateStatus = async (value) => {
    try {
      const res = await apiClient.post({
        url: `/shipping/status`,
        data: { id: order.id, status: Boolean(order.status) },
      });
      if (res.message.includes("successfully")) {
        setOrder({});
        setIsOpen(false);
        getAllCategories();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="w-full sm:pt-[6rem]">
      {/* Desktop and Tablet View */}
      <div className="hidden md:block table_container overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 accent-blue-400"
                />
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allorders?.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                {/* <td className="p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 accent-blue-400"
                  />
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Order# {order?._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order?.totalPrice?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order?.totalPrice?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                      order?.isDelivered
                        ? "text-green-800 bg-green-100"
                        : "text-white bg-yellow-600"
                    }`}
                  >
                    {order?.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order?.user?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-sm text-gray-900">{order?.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {dayjs(order?.createdAt).format("DD-MM-YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {/* <button className="text-gray-400 hover:text-gray-500">
                      <Trash2 className="w-5 h-5" />
                    </button> */}
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => {
                        setIsOpen(true);
                        setOrder({
                          id: order?._id,
                          status: order?.isDelivered,
                        });
                      }}
                    >
                      <span className="text-blue-500">✏</span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div onClick={() => setShowModal(true)}>
                    <button className="text-gray-400 hover:text-gray-500">
                      <BiCloudDownload
                        style={{ width: "25px", height: "25px" }}
                        className="me-2"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {allorders?.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 accent-blue-400"
                /> */}
                <span className="font-medium text-gray-900">
                  Order# {order?._id}
                </span>
              </div>
              <div className="flex space-x-2">
                {/* <button className="text-gray-400 hover:text-gray-500">
                  <Trash2 className="w-5 h-5" />
                </button> */}
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    setIsOpen(true);
                    setOrder({ id: order?._id, status: order?.isDelivered });
                  }}
                >
                  <span className="text-blue-500">✏</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">Price:</div>
                <div className="text-sm text-gray-900">
                  ₹{order?.totalPrice?.toFixed(2)}
                </div>

                <div className="text-sm text-gray-500">Order Total:</div>
                <div className="text-sm text-gray-900">
                  ₹{order?.totalPrice?.toFixed(2)}
                </div>

                <div className="text-sm text-gray-500">Status:</div>
                <div>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order?.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </div>

                <div className="text-sm text-gray-500">Customer:</div>
                <div className="text-sm text-gray-900">{order?.user?.name}</div>

                <div className="text-sm text-gray-500">Date:</div>
                <div className="text-sm text-gray-900">
                  {dayjs(order?.createdAt).format("DD-MM-YYYY")}
                </div>
              </div>
            </div>
            <InvoiceModal
              allorders={order}
              showModal={showModal}
              closeModal={() => setShowModal(false)}
            />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="animate-spin text-grey-500 h-6 w-6 rounded-full" />
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Order Status"
      >
        <div className="flex flex-col p-5">
          <label className="text-sm">Status</label>
          <select
            name="discountType"
            value={order.status}
            onChange={(e) =>
              setOrder((pre) => ({ ...pre, status: e.target.value }))
            }
            className="p-2 bg-gray-100 rounded outline-none border"
          >
            <option value={true}>Delivered</option>
            <option value={false}>Pending</option>
          </select>
          <button
            className="w-max justify-end bg-primary text-white p-2 rounded-md mt-2"
            onClick={updateStatus}
          >
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrdersTable;
