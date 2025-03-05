import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ClipboardDocumentListIcon } from '@heroicons/react/16/solid';
import axiosInstance from "../../utils/axiosInstance";

export default function WithdrawelBody() {
    const { user } = useAuth();
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [pin, setPin] = useState("");
    const [alert, setAlert] = useState(null);

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

    const withdraw = async (e) => {
        if (!wallet) {
            setAlert({ open: true, message: "Link a wallet first" })
            return;
        }
        if (!value) {
            setAlert({ open: true, message: "Amount is required" })
            return;
        }
        if (!pin) {
            setAlert({ open: true, message: "Pin is required" })
            return;
        }
        if (String(pin) !== String(user.pin)) {
            setAlert({ open: true, message: "Pin is wrong" })
            return;
        }
        if (!user.permissions.withdraw) {
            setAlert({ open: true, message: "You do not have permition to withdraw" })
            return;
        }
        if (value < 100) {
            setAlert({ open: true, message: "Minimum withdrawel amount is $100" })
            return;
        }
        if (user.totalEarnings < 100) {
            setAlert({ open: true, message: "Need $100+ to withdraw" })
            return;
        }
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`/api/users/withdraw/${user._id}`, {
                amount: value,
            });
            if (response.status === 201) {
                setAlert({ open: true, message: "Withdrawal successful!", severity: 'success' })
            }
        } catch (err) {
            console.error("Error adding wallet:", err.response?.data?.message);
        }
    };

    return (
        <div className="max-w-xl p-6 mx-auto bg-[#F9F7F7] rounded-lg shadow-lg">
            <div className="max-w-2xl px-6 py-10 mx-auto sm:px-8 sm:py-16 lg:px-0">
                <div className="mx-4ç sm:mx-6 ">
                    <dl className="space-y-4">
                        <div className="flex items-center justify-between">
                            <dt className="text-lg font-semibold text-[#112D4E]">Total Balance</dt>
                            <dd className="ml-4 text-base font-semibold text-[#3F72AF]">${user.totalEarnings}</dd>
                        </div>
                    </dl>
                </div>
                {/* Available for Withdrawal Section */}
                <div className="py-4 sm:mx-6">
                    {alert && alert.open && (
                        <div
                            className={`p-4 rounded-lg text-sm ${alert.severity === "success" ? "bg-[#3F72AF] text-white" : "bg-[#DBE2EF] text-[#112D4E]"}`}
                            role="alert"
                        >
                            {alert.message}
                        </div>
                    )}
                </div>

                {/* Amount Input Section */}
                <div className="mx-4 sm:mx-6">
                    <label htmlFor="price" className="block text-sm font-medium text-[#112D4E]">
                        Amount
                    </label>
                    <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline outline-1 outline-[#DBE2EF] focus-within:outline-2 focus-within:outline-[#3F72AF]">
                        <div className="text-base text-[#3F72AF] select-none sm:text-sm">$</div>
                        <input
                            required
                            id="price"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            name="price"
                            type="text"
                            placeholder="0.00"
                            className="block w-full py-1.5 pl-1 pr-3 text-base text-[#112D4E] placeholder-[#DBE2EF] focus:outline-none sm:text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setValue(user.totalEarnings)}
                            className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-[#3F72AF] outline outline-1 outline-[#DBE2EF] hover:bg-[#DBE2EF] hover:text-[#3F72AF] focus:outline-[#3F72AF]"
                        >
                            <ClipboardDocumentListIcon className="text-[#3F72AF] size-4" />
                            All
                        </button>
                    </div>
                </div>

                {/* Withdrawal PIN Input Section */}
                <div className="mx-4 mt-4 sm:mx-6">
                    <label htmlFor="pin" className="block text-sm font-medium text-[#112D4E]">
                        Withdrawal PIN
                    </label>
                    <input
                        required
                        id="pin"
                        name="pin"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        type="password"
                        placeholder="Enter Withdrawal PIN"
                        className="block w-full mt-2 rounded-md bg-white px-3 py-1.5 text-base text-[#112D4E] outline outline-1 outline-[#DBE2EF] placeholder-[#DBE2EF] focus:outline-[#3F72AF] sm:text-sm"
                    />
                </div>

                {/* Wallet Information Section */}
                <div className="mt-8">
                    <section aria-labelledby="cart-heading">
                        <ul role="list" className="border-t border-b border-[#DBE2EF] divide-y divide-[#DBE2EF]">
                            <li key={user.name} className="flex py-2">
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between mx-8">
                                        <p className="mt-1 text-[#3F72AF]">Account holder</p>
                                        <p className="mt-1 ml-4 text-[#112D4E]">{wallet ? wallet.firstName : "N/A"}</p>
                                    </div>
                                    <div className="flex justify-between mx-8">
                                        <p className="mt-1 text-[#3F72AF]">Wallet address</p>
                                        <p className="mt-1 ml-4 text-[#112D4E]">{wallet ? wallet.walletAddress : "N/A"}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Confirm Button Section */}
                    <section className="mx-4 mt-4 sm:mx-6">
                        <button
                            type="submit"
                            onClick={withdraw}
                            className="w-full px-4 py-3 text-base font-medium text-white bg-[#3F72AF] rounded-md shadow-sm hover:bg-[#112D4E] focus:ring-2 focus:ring-[#3F72AF]"
                        >
                            Confirm
                        </button>
                    </section>
                </div>
            </div>
        </div>

    );
}
