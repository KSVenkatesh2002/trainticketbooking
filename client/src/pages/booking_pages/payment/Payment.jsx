import {
  faCreditCard,
  faMobileAlt,
  faTrain,
  faMoneyBillWave,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paymentSuccess } from "../../../redux/slices/trainSlice";
import { motion, AnimatePresence } from "framer-motion";

// Components
import TripSummary from "./subComponents/TripSummary";
import PassengerSummary from "./subComponents/PassengerSummary";
import CardForm from "./subComponents/CardForm";
import UpiForm from "./subComponents/UpiForm";
import SuccessModal from "./subComponents/SuccessModal";

const Payment = () => {
  const {
    currentTrainList,
    bookingTrain,

    price,
    passengerList,
    currentBookingPnr,
  } = useSelector((state) => state.train);

  const t =
    currentTrainList.filter((train) => train._id === bookingTrain)[0] || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cardDetails, setCardDetails] = useState({
    holderName: "",
    cardNo: "",
    expiry: "",
    cvv: "",
  });
  const [payMethodCard, setPayMethodCard] = useState(true); // Default to card, or can be false
  const [UPI, setUPI] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [upiId, setupiID] = useState("");

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleCardOnChange = (e) => {
    const { name, value } = e.target;

    setCardDetails((prevState) => {
      if (name === "cardNo") {
        let cardNum = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (cardNum.length > 16) cardNum = cardNum.slice(0, 16); // Limit to 16 digits
        let formattedNum = cardNum.replace(/(\d{4})(?=\d)/g, "$1 "); // Format in groups of 4
        return { ...prevState, [name]: formattedNum };
      }

      if (name === "expiry") {
        let exp = value.replace(/\D/g, ""); // Remove non-numeric characters
        if (exp.length > 4) exp = exp.slice(0, 4); // Limit to 4 digits (MMYY)

        if (exp.length >= 2) {
          let month = exp.slice(0, 2);
          let year = exp.slice(2);

          // Ensure valid month (01-12)
          if (parseInt(month) > 12) month = "12";
          if (month === "00") month = "01";

          exp = year ? `${month}/${year}` : month; // Format as MM/YY
        }

        return { ...prevState, [name]: exp };
      }

      return { ...prevState, [name]: value };
    });
  };

  const validatePayment = (method) => {
    if (method === "card") {
      if (
        !cardDetails.holderName ||
        !cardDetails.cardNo ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        alert("Please fill in all card details.");
        return false;
      }
      if (cardDetails.cardNo.replace(/\s/g, "").length !== 16) {
        alert("Please enter a valid 16-digit card number.");
        return false;
      }
      const expiryParts = cardDetails.expiry.split("/");
      if (
        expiryParts.length !== 2 ||
        expiryParts[0] < 1 ||
        expiryParts[0] > 12 ||
        expiryParts[1].length !== 2
      ) {
        alert("Please enter a valid expiry date (MM/YY).");
        return false;
      }
      if (cardDetails.cvv.length !== 3) {
        alert("Please enter a valid 3-digit CVV.");
        return false;
      }
    } else if (method === "upi") {
      // Logic regarding checking UPI selection or ID
      if (UPI && !upiId && UPI !== "g" && UPI !== "a") {
        // If custom UPI ID field is used (though current logic is a bit mixed, let's respect the existing flow)
        if (!upiId && !UPI) {
          alert("Please select a UPI app or enter a UPI ID.");
          return false;
        }
      }
      // Ensuring we have something
      if (!UPI && !upiId) {
        alert("Please provide UPI details");
        return false;
      }
    }
    return true;
  };

  async function makePayment(method) {
    if (!validatePayment(method)) return;

    // Safely get price
    let ticketPrice;
    if (typeof price === "object" && price !== null) {
      ticketPrice = price[bookingTrain];
    } else {
      ticketPrice = price;
    }

    // Ensure PNR list is flat (handling potential past state errors)
    const flatPnrList = Array.isArray(currentBookingPnr)
      ? currentBookingPnr.flat(Infinity)
      : [currentBookingPnr];

    // Debug payload
    const payload = {
      pnrList: flatPnrList,
      price: ticketPrice,
      method,
      ...(method === "upi" ? { upiId: upiId || UPI } : { cardDetails }),
    };
    console.log("Sending Payment Payload:", payload);

    try {
      const res = await fetch("/api/train/book-ticket/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Payment Response:", data);
      if (data.success) {
        setShowResult(true);
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (e) {
      console.log(e);
      alert("An error occurred during payment processing");
    }
  }

  // Calculate total amount safely
  const singleTicketPrice =
    typeof price === "object" && price !== null ? price[bookingTrain] : price;
  const totalAmount = singleTicketPrice * passengerList.length;

  return (
    <div className="min-h-screen bg-slate-950 py-6 px-4 md:px-8 flex justify-center pb-24 md:pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* LEFT COLUMN - Booking Summary */}
        <div className="lg:col-span-7 space-y-6">
          <TripSummary
            t={t}
            bookingTrain={bookingTrain}
            itemVariants={itemVariants}
          />

          <PassengerSummary
            passengerList={passengerList}
            itemVariants={itemVariants}
          />
        </div>

        {/* RIGHT COLUMN - Payment Method */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-4">
            {/* Security Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-emerald-500 bg-emerald-500/10 py-2 rounded-xl border border-emerald-500/20 text-xs font-bold uppercase tracking-wider"
            >
              <FontAwesomeIcon icon={faLock} /> Secure SSL Payment
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5"
            >
              <div className="bg-slate-800/40 p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                  </span>
                  Payment Details
                </h2>
                <div className="mt-6 flex bg-slate-950 rounded-xl p-1.5 border border-white/5 shadow-inner">
                  <button
                    onClick={() => setPayMethodCard(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                      payMethodCard
                        ? "bg-slate-800 text-orange-500 shadow-lg ring-1 ring-white/5"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <FontAwesomeIcon icon={faCreditCard} /> Card
                  </button>
                  <button
                    onClick={() => setPayMethodCard(false)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
                      !payMethodCard
                        ? "bg-slate-800 text-orange-500 shadow-lg ring-1 ring-white/5"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <FontAwesomeIcon icon={faMobileAlt} /> UPI
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {payMethodCard ? (
                    <CardForm
                      cardDetails={cardDetails}
                      handleCardOnChange={handleCardOnChange}
                      makePayment={makePayment}
                      totalAmount={totalAmount}
                    />
                  ) : (
                    <UpiForm
                      UPI={UPI}
                      setUPI={setUPI}
                      upiId={upiId}
                      setupiID={setupiID}
                      makePayment={makePayment}
                      totalAmount={totalAmount}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <SuccessModal
        showResult={showResult}
        onSuccessClose={() => {
          dispatch(paymentSuccess());
          navigate("/");
        }}
      />
    </div>
  );
};

export default Payment;
