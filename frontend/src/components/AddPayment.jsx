import React, { useState } from "react";

import toast from "react-hot-toast";
import api from "../lib/axios";

const AddPayment = () => {
  const [tenantName, setTenantName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [datePaid, setDatePaid] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await api.post("/payments", {
        tenantName,
        status,
        amount,
        datePaid,
      });

      document.getElementById("my_modal_1").close();
      toast.success("Payment added successfully!");     // toast message ( notifications )

      if (res.status === 200) {
        setTenantName("");                  
        setAmount("");
        setStatus("");
        setDatePaid("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4">Add Payment</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="Tenant Name"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Amount Paid"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Date"
            value={datePaid}
            onChange={(e) => setDatePaid(e.target.value)}
            className="input input-bordered w-full"
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Adding..." : "Submit"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                document.getElementById("my_modal_1").close()
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default AddPayment;
