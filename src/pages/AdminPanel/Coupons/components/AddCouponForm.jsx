import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/utils";
// import MultiSelect from "./multiInput";

const AddCouponForm = ({ onClose, getAllCoupans, defaultValues }) => {
  const [formData, setFormData] = useState({
    code: defaultValues?.code || "",
    description: defaultValues?.description || "",
    discountType: defaultValues?.discountType || "",
    usageLimit: defaultValues?.usageLimit || "",
    usageLimitPerUser: defaultValues?.usageLimitPerUser || "",
    minimumAmount: defaultValues?.minimumAmount || "",
    expiryDate: defaultValues?.expiryDate?.split("T")[0] || "",
    discountValue: defaultValues?.discountValue || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Coupon Code is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.discountType)
      newErrors.discountType = "Discount Type is required";
    if (!formData.usageLimit || formData.usageLimit <= 0)
      newErrors.usageLimit = "Usage Limit must be a positive number";
    if (!formData.usageLimitPerUser || formData.usageLimitPerUser <= 0)
      newErrors.usageLimitPerUser =
        "Usage Limit Per User must be a positive number";
    if (!formData.minimumAmount || formData.minimumAmount <= 0)
      newErrors.minimumAmount = "Minimum Amount must be a positive number";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) || 0 : value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let res;
      if (defaultValues) {
        res = await apiClient.put({
          url: `/coupan/${defaultValues?._id}`,
          data: formData,
          showToast:true
        });
      } else {
        res = await apiClient.post({
          url: "/coupan",
          data: formData,
          showToast:true
        });
      }

      if (res.message.includes("successfully")) {
        onClose();
        getAllCoupans();
        setFormData({
          code: "",
          description: "",
          discountType: "",
          usageLimit: "",
          usageLimitPerUser: "",
          minimumAmount: "",
          expiryDate: "",
          discountValue: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <form
      onSubmit={submitForm}
      className="grid gap-3 pb-4 max-w-xl sm:pt-[3rem]"
    >
      <div className="flex flex-col">
        <label className="text-sm">New Coupon Code</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        {errors.code && (
          <span className="text-red-500 text-sm">{errors.code}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Description</label>
        <textarea
          rows="3"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Discount Type</label>
        <select
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          className="p-2 bg-gray-100 rounded outline-none border"
        >
          <option value="" disabled>
            Select Discount Type
          </option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        {errors.discountType && (
          <span className="text-red-500 text-sm">{errors.discountType}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Discount Value</label>
        <input
          type="number"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          max={formData.discountType === "percentage" ? 100 : undefined}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        {errors.usageLimit && (
          <span className="text-red-500 text-sm">{errors.discountValue}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Usage Limit</label>
        <input
          type="number"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        {errors.usageLimit && (
          <span className="text-red-500 text-sm">{errors.usageLimit}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Usage Limit Per User</label>
        <input
          type="number"
          name="usageLimitPerUser"
          value={formData.usageLimitPerUser}
          onChange={handleChange}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        {errors.usageLimitPerUser && (
          <span className="text-red-500 text-sm">
            {errors.usageLimitPerUser}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Minimum Amount</label>
        <input
          type="number"
          name="minimumAmount"
          value={formData.minimumAmount}
          onChange={handleChange}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        {errors.minimumAmount && (
          <span className="text-red-500 text-sm">{errors.minimumAmount}</span>
        )}
      </div>

      {/* <div className="flex flex-col">
        <label className="text-sm">Products</label>
        <MultiSelect
          options={allProducts}
          selectedValues={formData.products}
          onChange={handleProductsChange}
          placeholder="Select products"
          selectAllText="Select All"
          clearText="Clear"
        />
      </div> */}
      {/* <div className="flex flex-col">
        <label className="text-sm">Products</label>
        <input
          type="text"
          name="products"
          value={formData.products}
          onChange={handleChange}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        <div className="my-3 flex gap-3">
          <button className="btn1 bg-primary text-white hover:bg-primary/90 hover:-translate-y-1">
            Select All
          </button>
          <button className="btn1 bg-gray-300 text-black hover:bg-gray-300/80 hover:-translate-y-1">
            Clear
          </button>
        </div>
      </div> */}
      <div className="flex flex-col">
        <label className="text-sm">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className="p-2 bg-gray-100 rounded outline-none border"
        />
        {errors.expiryDate && (
          <span className="text-red-500 text-sm">{errors.expiryDate}</span>
        )}
      </div>
      {/* <div className="flex gap-2">
        <input
          type="checkbox"
          name="autoApply"
          checked={formData.autoApply}
          onChange={handleChange}
          className="w-4 h-4 accent-primary outline-none border mt-[2px]"
        />
        <p className="text-sm">Check this box if you want to automatically apply this coupon.</p>
      </div> */}
      <div className="grid grid-cols-2 gap-5 mt-3">
        <button
          type="submit"
          className="btn1 bg-primary text-white hover:bg-primary/90 hover:-translate-y-1"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onClose}
          className="btn1 bg-gray-300 text-black hover:bg-gray-300/80 hover:-translate-y-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddCouponForm;
