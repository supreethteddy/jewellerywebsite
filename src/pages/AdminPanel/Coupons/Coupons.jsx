import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import CouponsTable from "./components/CouponsTable";
import AddCouponForm from "./components/AddCouponForm";
import apiClient from "../../../lib/utils";

const Coupons = () => {
  const [showAddCouponForm, setShowAddCouponForm] = React.useState(false);

  const [allCoupans, setAllCoupans] = useState();
  const [filterCoupans, setFilterCoupans] = useState();
  const [defaultValues, setDefaultValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAllCoupans = async () => {
    try {
      setIsLoading(true)
      const res = await apiClient.get({ url: `/coupan` });
      setAllCoupans(res);
      setFilterCoupans(res);
    } catch (error) {
      console.log(error?.data?.message || "error");
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getAllCoupans();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Convert search input to lowercase
    setFilterCoupans(
      allCoupans?.filter(
        (item) => item?.code?.toLowerCase().includes(searchTerm) // Convert coupon code to lowercase for comparison
      )
    );
  };
  const handleEdit = (values) => {
    setDefaultValues(values);
    setShowAddCouponForm(true);
  };
  return (
    <div className="w-full relative">
      <div className="pb-[3rem] sm:py-[2rem] sm:px-4">
        <div className="space-y-4 md:ml-[12rem] sm:fixed left-0 top-0 w-full bg-white md:max-w-[calc(100%-12rem)] z-20 p-4">
          <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
            <h4 className="heading-2">Coupons</h4>
            {!showAddCouponForm && (
              <button
                onClick={() => setShowAddCouponForm(true)}
                className="btn1 bg-primary text-white hover:bg-primary/90 hover:-translate-y-1"
              >
                <Plus strokeWidth={3} size={17} /> Add Coupon
              </button>
            )}
          </div>
          <hr />

          {!showAddCouponForm && (
            <div className="flex sm:flex-row flex-col sm:items-center gap-3">
              <div className="flex items-center gap-2 p-2 rounded border">
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Coupon"
                  className="outline-none w-full border-none"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-5 px-4 sm:px-0">
          {showAddCouponForm ? (
            <AddCouponForm
              onClose={() => {setShowAddCouponForm(false);setDefaultValues(null)}}
              getAllCoupans={getAllCoupans}
              defaultValues={defaultValues}
            />
          ) : (
            <CouponsTable
              filterCoupans={filterCoupans}
              getAllCoupans={getAllCoupans}
              handleEdit={handleEdit}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
