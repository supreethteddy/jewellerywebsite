import toast from "react-hot-toast";
import apiClient from "../../../lib/utils";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const displayRazorpay = async (amount, reset, setCartItems,data) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log(amount)

  try {
    // Load Razorpay script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.log("Razorpay SDK failed to load");
      toast("Razorpay SDK failed to load");
      return;
    }

    // Validate inputs
    if (!amount) {
      console.log("Amount is required");
      toast("Amount is required");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
              name: "Jewello",
      description: "Payment for products",

      prefill: {
        name: data.name,
        // email: "gaurav.kumar@example.com",
        contact: data.mobile,
      },
      theme: {
        color: "#CBA85C",
      },
      handler: async function (response) {
        const res = await apiClient.post({url:`/shipping`, data:{...data, products:cartItems}})
        if(res.shipping){
          console.log("Payment successful", response);
          

          
          localStorage.removeItem('cartItems');
          setCartItems([]);
          reset();
          toast.success("Order placed successfully");
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Checkout form closed");
        },
      },
    };

    // Ensure Razorpay is available
    if (!window.Razorpay) {
      console.log("Razorpay is not loaded");
      toast("Payment gateway is not available");
      return;
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log("Error in displayRazorpay:", error);
    toast("An error occurred while processing payment");
  }
};
