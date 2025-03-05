import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Loading from "../loadingscreen/Loading";

export default function LinkWalletBody() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    walletAddress: "",
    network: "TRC20",
    cryptoType: "USDT",
  });

  // Fetch Wallet Data
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await axiosInstance.get("/api/users/get-wallet");
        setWallet(response.data);
      } catch (err) {
        setWallet(null); // No wallet exists
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Wallet Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/users/create-wallet", formData);
      setWallet(response.data);
    } catch (err) {
      console.error("Error adding wallet:", err.response?.data?.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-xl p-6 mx-auto bg-[#F9F7F7] rounded-lg shadow-lg">
    <h2 className="mb-6 text-2xl font-semibold text-[#112D4E]">
      {wallet ? "Your Linked Wallet" : "Link your crypto wallet"}
    </h2>
  
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#3F72AF]">First Name</label>
          <input
            type="text"
            name="firstName"
            value={wallet ? wallet.firstName : formData.firstName}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-[#DBE2EF] rounded-md focus:ring-2 focus:ring-[#3F72AF] outline-none"
            placeholder="Enter your name"
            disabled={!!wallet}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3F72AF]">Phone</label>
          <input
            type="tel"
            name="phone"
            value={wallet ? wallet.phone : formData.phone}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-[#DBE2EF] rounded-md focus:ring-2 focus:ring-[#3F72AF] outline-none"
            placeholder="Enter your phone"
            disabled={!!wallet}
            required
          />
        </div>
      </div>
  
      {/* Wallet Address */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-[#3F72AF]">Crypto Wallet Address</label>
        <input
          type="text"
          name="walletAddress"
          value={wallet ? wallet.walletAddress : formData.walletAddress}
          onChange={handleChange}
          className="w-full mt-2 p-3 border border-[#DBE2EF] rounded-md focus:ring-2 focus:ring-[#3F72AF] outline-none"
          placeholder="Enter wallet address"
          disabled={!!wallet}
          required
        />
      </div>
  
      {/* Network Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-[#3F72AF]">Select Network</label>
        <div className="flex mt-2 space-x-4">
          {["TRC20", "ERC20", "BTC"].map((network) => (
            <label key={network} className="flex items-center space-x-2">
              <input
                type="radio"
                name="network"
                value={network}
                checked={wallet ? wallet.network === network : formData.network === network}
                onChange={handleChange}
                className="text-[#ff2828] focus:ring-[#ff2828]"
                disabled={!!wallet}
                required
              />
              <span className="text-[#112D4E]">{network}</span>
            </label>
          ))}
        </div>
      </div>
  
      {/* Crypto Type Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-[#3F72AF]">Select Crypto</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {["USDT", "USDC", "ETH", "BTC"].map((crypto) => (
            <label key={crypto} className="flex items-center space-x-2">
              <input
                type="radio"
                name="cryptoType"
                value={crypto}
                checked={wallet ? wallet.cryptoType === crypto : formData.cryptoType === crypto}
                onChange={handleChange}
                className="text-[#ff2828] focus:ring-[#ff2828]"
                disabled={!!wallet}
                required
              />
              <span className="text-[#112D4E]">{crypto}</span>
            </label>
          ))}
        </div>
      </div>
  
      {/* Submit Button */}
      <div className="mt-6 text-center">
        {!wallet ? (
          <button
            type="submit"
            className="w-full px-4 py-3 text-base font-medium text-white bg-[#3F72AF] border border-transparent rounded-md shadow-sm hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] focus:ring-offset-2 focus:ring-offset-gray-50"
            >
            Confirm
          </button>
        ) : (
          <p className="text-green-600">Your wallet is linked successfully!</p>
        )}
      </div>
    </form>
  </div>
  
  );
}
