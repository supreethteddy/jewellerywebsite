import {
  // FilePlus2,
  LogOut,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import LineChart from "./components/LineChart";
import "./Dashboard.css";
import Transactions from "./components/Transactions";
import apiClient from "../../../lib/utils";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [range, setRange] = useState('12');
    const [allOrders, setAllOrders] =useState()
    const navigate = useNavigate();

    const getAllCategories = async () => {
      try {
        const res = await apiClient.get({ url: `/shipping/getStats`,});
        setAllOrders(res)
      } catch (error) {
        console.log(error?.data?.message || "error");
      }
    };
  
    useEffect(() => {
      getAllCategories();
    }, []);

  return (
    <div className="w-full relative">
      <div className="md:ml-[12rem] bg-white fixed top-0 left-0 w-full md:max-w-[calc(100%-12rem)] p-4 flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 p-2 rounded-full border">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-full border-none"
          />
        </div>
        <div className="flex items-center gap-5">
          <button className="btn1 bg-gray-300 text-black hover:bg-gray-300/80 hover:-translate-y-1" onClick={() => {
                  localStorage.removeItem("key");
                  localStorage.removeItem("user");
                  navigate("/admin/login");
                }}>
            <LogOut size={20} className="text-gray-600" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4 pt-[5rem] max-w-7xl">
        <hr />
        <div className="flex flex-col-reverse lg:grid grid-cols-[1fr,20rem] gap-5">
          {/* Left side */}
          <section className="w-full space-y-4 pb-[1rem] sm:pb-0">
            <div className="p-3 space-y-5 border rounded-lg w-full">
              <div className="w-full flex flex-wrap justify-between items-center gap-4">
                <p className="font-semibold">Sales Report</p>
                <div className="flex gap-2 text-[.8rem]">
                  <button className={`p-2 ${range ==='12'&&'border rounded-md'}`} onClick={()=>setRange('12')}>12 Months</button>
                  <button className={`p-2 ${range ==='6'&&'border rounded-md'}`} onClick={()=>setRange('6')}>6 Months</button>
                  <button className={`p-2 ${range ==='30d'&&'border rounded-md'}`} onClick={()=>setRange('30d')}>30 Days</button>
                  <button className={`p-2 ${range ==='7d'&&'border rounded-md'}`} onClick={()=>setRange('7d')}>7 Days</button>
                </div>
                {/* <button className="p-2 border rounded-md text-[.8rem] flex items-center gap-1 min-w-[7rem]">
                  <FilePlus2 size={20} />
                  <span>Export PDF</span>
                </button> */}
              </div>
              <LineChart range={range}/>
              <Transactions />
            </div>
          </section>
          <section className="grid sm:grid-cols-3 lg:flex flex-col gap-4">
            <div className="rounded-lg border p-4 space-y-2 h-fit">
              <small className="text-gray-400 uppercase">Net Sales</small>
              <div className="w-full flex items-center justify-between gap-4">
                <h5 className="font-semibold text-xl"> ₹{allOrders?.totalSales}</h5>
                {/* <small className="text-green-600">+5%</small> */}
              </div>
            </div>
            {/* <div className="rounded-lg border p-4 space-y-2 h-fit">
              <small className="text-gray-400 uppercase">earning</small>
              <div className="w-full flex items-center justify-between gap-4">
                <h5 className="font-semibold text-xl"> $2,38,485</h5>
                <small className="text-green-600">+14%</small>
              </div>
            </div> */}
            <div className="rounded-lg border p-4 space-y-2 h-fit">
              <small className="text-gray-400 uppercase">Order</small>
              <div className="w-full flex items-center justify-between gap-4">
                <h5 className="font-semibold text-xl"> {allOrders?.totalOrders}</h5>
                {/* <small className="text-green-600">+5%</small> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
