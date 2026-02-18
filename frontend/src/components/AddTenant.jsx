import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddTenant = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error("First and Last Name are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/tenants", {
        firstName,
        lastName,
        email,
        unitNumber,
        phoneNumber,
      });

      document.getElementById("my_modal_3").close();
      toast.success("Tenant added successfully!");
      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setUnitNumber("");
        setPhoneNumber("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add tenant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h2 className="text-xl font-bold mb-4">Add Tenant</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Unit Number"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
                document.getElementById("my_modal_3").close()
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

export default AddTenant;
