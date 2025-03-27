import { Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import DropDown from "./components/Dropdown";
import ProductsTable from "./components/ProductsTable";
import AddProductForm from "./components/AddProductForm";
import AddCategoryForm from "./components/AddCategoryForm";
import apiClient from "../../../lib/utils";

const ProductsPage = () => {
  // const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedDropdownCategory, setSelectedDropdownCategory] =
    React.useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get({ url: `/products/all` });
      setAllProducts(res?.products);
      setFilteredProducts(res?.products);
    } catch (error) {
      console.log(error?.data?.message || "error");
    } finally {
      setIsLoading(false);
    }
  };
  const getAllCategories = async () => {
    try {
      const res = await apiClient.get({ url: `/category` });

      setAllCategories(res?.categories?.map((item) => item?.name));
    } catch (error) {
      console.log(error?.data?.message || "error");
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const [showAddProductModal, setShowAddProductModal] = React.useState({
    status: false,
    defaultValues: null,
  });
  const [showAddCategoryModal, setShowAddCategoryModal] = React.useState(false);

  return (
    <div className="w-full relative">
      <div className="pb-[3rem] sm:py-[2rem] sm:px-4">
        <div className="space-y-4 md:ml-[12rem] sm:fixed left-0 top-0 w-full bg-white md:max-w-[calc(100%-12rem)] z-20 p-4">
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
            <h4 className="heading-2">Products</h4>
            <div className="flex items-center gap-5">
              {/* <button
                onClick={() => setShowAddCategoryModal(true)}
                className="btn1 bg-primary text-white hover:bg-primary/90"
              >
                <Plus strokeWidth={3} size={17} /> <span>Add Category</span>
              </button> */}
              <button
                onClick={() =>
                  setShowAddProductModal({ status: true, defaultValues: null })
                }
                className="btn1 bg-primary text-white hover:bg-primary/90"
              >
                <Plus strokeWidth={3} size={17} /> <span>Add Product</span>
              </button>
            </div>
          </div>
          <hr />
          {/* <div className="sm:w-[20rem] grid grid-cols-3 text-sm">
            {["All", "In Stock", "Out of Stock"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`border-b pb-2 ${
                  selectedCategory === category && "border-black font-semibold"
                }`}
              >
                {category}
              </button>
            ))}
          </div> */}
          <div className="flex sm:flex-row flex-col sm:items-center gap-3">
            <div className="flex items-center gap-2 p-2 rounded border">
              <Search size={20} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none w-full border-none"
                onChange={(e) =>
                  setFilteredProducts(
                    allProducts.filter((ele) =>
                      ele.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  )
                }
              />
            </div>
            <div className="sm:w-[13rem]">
              <DropDown
                label="Category"
                options={["All", ...allCategories]}
                onChange={(item) => {
                  setSelectedDropdownCategory(item);
                  setFilteredProducts(
                    item === "All"
                      ? allProducts
                      : allProducts.filter(
                          (ele) => ele.Category.name === item
                        )
                  );
                }}
                selected={selectedDropdownCategory}
              />
            </div>
            <button
              className="btn1 bg-gray-500 text-white hover:bg-gray-600 h-fit"
              onClick={() => {
                setFilteredProducts(allProducts);
                setSelectedDropdownCategory("All");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="pt-5 px-2 sm:px-0">
          <ProductsTable
            showEditFormModal={setShowAddProductModal}
            allProducts={filteredProducts}
            getAllProducts={getAllProducts}
            isLoading={isLoading}
          />
        </div>
      </div>
      <AddProductForm
        isOpen={showAddProductModal.status}
        onClose={() =>
          setShowAddProductModal({ status: false, defaultValues: null })
        }
        allCategories={allCategories}
        getAllProducts={getAllProducts}
        defaultValue={showAddProductModal?.defaultValues}
      />
      <AddCategoryForm
        isOpen={showAddCategoryModal}
        onClose={() => {
          setShowAddCategoryModal(false);
          getAllCategories();
        }}
      />
    </div>
  );
};

export default ProductsPage;
