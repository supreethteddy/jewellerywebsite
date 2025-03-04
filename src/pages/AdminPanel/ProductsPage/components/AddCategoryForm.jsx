import React from "react";
import Modal from "../../../../components/Modal";
import apiClient from "../../../../lib/utils";

const AddCategoryForm = ({ isOpen, onClose }) => {
  const submitForm = async(e) => {
    e.preventDefault();
     // Extract category name correctly
     const categoryName = e.target.elements.name.value.trim(); 

     if (!categoryName) {
       console.log("Category name is required");
       return;
     }
    onClose();
    try {
       await apiClient.post({ url: "/category", data:{name:categoryName} });
    } catch (error) {
      console.log(error?.data?.message || "error");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Category">
      <form onSubmit={submitForm} className="p-4 grid gap-3 pb-4">
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="name">Category Name</label>
          <input
            name='name'
            type="text"
            className="p-2 bg-gray-100 rounded outline-none border"
          />
        </div>
        <button className="btn1 bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 mt-2">
          Save
        </button>
      </form>
    </Modal>
  );
};

export default AddCategoryForm;
