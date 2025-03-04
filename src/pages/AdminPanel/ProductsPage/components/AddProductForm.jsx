import React, { useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Dropdown from "./Dropdown";
import apiClient from "../../../../lib/utils";

const AddProductForm = ({
  isOpen,
  onClose,
  allCategories,
  defaultValue,
  getAllProducts,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    bestSeller: false,
    images: { img1: null, img2: null },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    setFormData((prev) => ({
      ...prev,
      images: { ...prev.images, [name]: files[0] },
    }));
  };
  useEffect(() => {
    if (defaultValue) {
      // Pre-fill the form data with default values if it's an edit
      setFormData({
        name: defaultValue.name || "",
        price: defaultValue.price || "",
        description: defaultValue.description || "",
        category: defaultValue.Category?.name || "",
        bestSeller: defaultValue.bestSeller || false,
        images: { img1: null, img2: null }, // Images will be handled separately
      });
    }
  }, [defaultValue]);
  const handleCategoryChange = (selected) => {
    setFormData((prev) => ({ ...prev, category: selected }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    // if (!formData.images.img1 || !formData.images.img2) newErrors.images = "Both images are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("Category", formData.category);
      formDataToSend.append("bestSeller", formData.bestSeller);
      formDataToSend.append("images", formData.images.img1);
      formDataToSend.append("images", formData.images.img2);
      if (defaultValue) {
        await apiClient.put({
          url: `/products/${defaultValue._id}`,
          data: formDataToSend,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await apiClient.post({
          url: "/products",
          data: formDataToSend,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        bestSeller: false,
        images: { img1: null, img2: null },
      });
      onClose();
    } catch (error) {
      console.log(error?.data?.message || "Error saving product");
    } finally {
      getAllProducts();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Product">
      <form onSubmit={submitForm} className="p-4 grid gap-3 pb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 bg-gray-100 rounded outline-none border"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 bg-gray-100 rounded outline-none border"
            />
            {errors.price && (
              <span className="text-red-500 text-xs">{errors.price}</span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm">Image 1</label>
            <input
              onChange={handleImageChange}
              name="img1"
              type="file"
              className="bg-gray-100 rounded p-2"
            />
            {formData.images.img1 && (
              <img
                src={URL.createObjectURL(formData.images.img1)}
                alt="Preview"
                className="aspect-[19/9] w-full object-contain mt-2 bg-gray-200 rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Image 2</label>
            <input
              onChange={handleImageChange}
              name="img2"
              type="file"
              className="bg-gray-100 rounded p-2"
            />
            {formData.images.img2 && (
              <img
                src={URL.createObjectURL(formData.images.img2)}
                alt="Preview"
                className="aspect-[19/9] w-full object-contain mt-2 bg-gray-200 rounded-lg"
              />
            )}
          </div>
        </div>
        {errors.images && (
          <span className="text-red-500 text-xs">{errors.images}</span>
        )}

        <div>
          <label className="text-sm">Category</label>
          <Dropdown
            label="Category"
            options={allCategories}
            selected={formData.category}
            onChange={handleCategoryChange}
          />
          {errors.category && (
            <span className="text-red-500 text-xs">{errors.category}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Best Seller</label>
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
            <span className="text-red-500 text-xs">{errors.description}</span>
          )}
        </div>

        <button className="btn1 bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 mt-2">
          Save
        </button>
      </form>
    </Modal>
  );
};

export default AddProductForm;
