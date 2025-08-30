// Icons removed for simplicity
// import { earringsItems, necklaceItems } from "../../../../constant";
import dayjs from "dayjs";
import apiClient from "../../../../lib/utils";
import CustomImg from "../../../../components/ui/customImg";

const ProductsTable = ({ showEditFormModal ,allProducts, getAllProducts, isLoading}) => {
  const handleDelete =async(id)=>{
    try {
      await apiClient.post({ url: "/products/status", data:{id} });
      getAllProducts();
   } catch (error) {
     console.log(error?.data?.message || "error");
   }
  }
  return (
    <div className="w-full sm:pt-[9rem]">
      {/* Desktop and Tablet View */}
      <div className="hidden md:block h-full overflow-hidden bg-white rounded-lg shadow">
        <div className="h-full overflow-auto table_container">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              {/* Sticky header */}
              <tr>
                {/* <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 accent-blue-400"
                  />
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allProducts?.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {/* <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 accent-blue-400"
                    />
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <CustomImg
                      src={item?.images[0]}
                      className="w-10 min-w-10 h-10"
                      alt={item.name}
                      loading="lazy"
                    />
                    <span className="ml-2">
                       {item.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 capitalize py-4 whitespace-nowrap text-sm text-gray-900">
                    {item?.Category?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    In Stock
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dayjs(item.createdAt).format('DD-MM-YYYY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <span className="text-red-500 cursor-pointer" onClick={()=>handleDelete(item._id)}>🗑</span>
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="text-blue-500 cursor-pointer" onClick={()=>showEditFormModal({status:true, defaultValues:item})}>✏</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden h-full overflow-auto space-y-4 px-2">
        {allProducts?.map((item, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                {/* <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 accent-blue-400"
                /> */}
                <span className="flex items-center">
                  <CustomImg
                    src={item?.images[0]}
                    className="w-10 min-w-10 h-10"
                    alt={item.title}
                    loading="lazy"
                  />
                  <span className="ml-2">
                     {item.name}
                  </span>
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="text-red-500 cursor-pointer" onClick={()=>handleDelete(item._id)}>🗑</span>
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <span className="text-blue-500 cursor-pointer" onClick={()=>showEditFormModal({status:true, defaultValues:item})}>✏</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500">Price:</div>
                <div className="text-sm text-gray-900">
                ₹{item.price.toFixed(2)}
                </div>

                <div className="text-sm text-gray-500">Category:</div>
                <div className="text-sm text-gray-900 capitalize"> {item?.Category?.name}</div>

                <div className="text-sm text-gray-500">Status:</div>
                <div>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>

                <div className="text-sm text-gray-500">Stock:</div>
                <div className="text-sm text-gray-900">In Stock</div>

                <div className="text-sm text-gray-500">Date:</div>
                <div className="text-sm text-gray-900"> {dayjs(item.createdAt).format('DD-MM-YYYY')}</div>
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

export default ProductsTable;
