import React, { useState } from 'react'

function  ProductCard() {
  const [amount, setamount] = useState(50);
  const s_key="rzp_test_SMRDUj0klT0MpA"

      // handlePayment Function
      const handlePayment = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount
                })
            });

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data)
        } catch (error) {
            console.log(error);
        }
    }

     // handlePaymentVerify Function
     const handlePaymentVerify = async (data) => {
      const options = {
          key: s_key,
          amount: data.amount,
          currency: data.currency,
          name: "Kiraan",
          description: "Test Mode",
          order_id: data.id,
          handler: async (response) => {
              console.log("response", response)
              try {
                  const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                      method: 'POST',
                      headers: {
                          'content-type': 'application/json'
                      },
                      body: JSON.stringify({
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                      })
                  })

                  const verifyData = await res.json();

                  if (verifyData.message) {
                      toast.success(verifyData.message)
                  }
              } catch (error) {
                  console.log(error);
              }
          },

            // ✅ ADD HERE
    modal: {
      ondismiss: function () {
          alert("Payment cancelled by user");
      }
  },
          theme: {
              color: "#5f63b8"
          }
      };
      const rzp1 = new window.Razorpay(options);

// 🔴 Handle failure here
rzp1.on("payment.failed", function (response) {
    console.log("Payment Failed:", response.error);

    alert("Payment Failed:kiran " + response.error.description);

    // Optional: redirect
    // window.location.href = "/payment-failed";
});

// Open popup
rzp1.open();
  }



  return (
    <div> 
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrbpeHqKVLfTea1CQ-57uNauZl9xtT0V5hUQ&s" alt="product image" />
      <h2>Product Name</h2>
      <p>Product Description</p>
      <p>500</p>
      <button onClick={handlePayment}>By Now</button>
    </div>
  )
}

export default  ProductCard