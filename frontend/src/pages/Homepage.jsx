import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Users, DollarSign, CheckCircle, Clock, Minus, Pencil } from "lucide-react";
import AddTenant from "../components/AddTenant";
import AddPayment from "../components/AddPayment";
import EditPayment from "../components/EditPayment";
import EditTenant from "../components/EditTenant";

const Homepage = () => {
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tenantsCount, setTenantsCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [unpaidNumber, setUnpaidNumber] = useState(0);
  const [paidNumber, setPaidNumber] = useState(0);

  // Fetch tenants, payments, totals
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantsRes, paymentsRes, totalRes] = await Promise.all([
          axios.get("http://localhost:5001/api/tenants"),
          axios.get("http://localhost:5001/api/payments"),
          axios.get("http://localhost:5001/api/payments/total"),
        ]);

        setTenants(tenantsRes.data);
        setPayments(paymentsRes.data);

        setTenantsCount(tenantsRes.data.length);
        setPaymentsCount(paymentsRes.data.length);
        setPaymentAmount(totalRes.data.totalPayment);


        // when there is an unpaid status , filter that and update the count 
        const unpaidCount = paymentsRes.data.filter(
          (t) => t.status?.toLowerCase().trim() === "unpaid"
        ).length;

        // only count payments that have status : "paid"
        const paidCount = paymentsRes.data.filter(
          (t) => t.status?.toLowerCase().trim() === "paid"
        ).length;

        setPaidNumber(paidCount);
        
        setUnpaidNumber(unpaidCount);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="">

      {/* Modals */}
      <AddTenant />
      <AddPayment />
      <EditPayment/>
      <EditTenant/>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-7 shadow-2xl">
        <div className="stat bg-base-100 rounded-box shadow-2xl">
          <div className="stat-figure text-primary">
            <Users className="w-6 h-6" />
          </div>
          <div className="stat-title text-xl">Total Tenants</div>
          <div className="stat-value text-primary">{tenantsCount}</div>
        </div>

        <div className="stat bg-base-100 rounded-box shadow-2xl">
          <div className="stat-figure text-success">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="stat-title text-xl">Payments Made</div>
          <div className="stat-value text-success">{paymentsCount}</div>
        </div>

        <div className="stat bg-base-100 rounded-box shadow-2xl">
          <div className="stat-figure text-success">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="stat-title text-xl">Total Amount Paid</div>
          <div className="stat-value text-success">{paymentAmount}</div>
        </div>

        <div className="stat bg-base-100 rounded-box shadow-2xl">
          <div className="stat-figure text-warning">
            <Clock className="w-6 h-6" />
          </div>
          <div className="stat-title text-xl">Pending / Unpaid</div>
          <div className="stat-value text-warning">{unpaidNumber}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-rows-1 w-full gap-3 px-4 ">
        <button
          className="btn btn-primary gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <Plus className=" w-4 h-4" /> Add Tenant 
        </button>

        <button
          className="btn btn-primary gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 "
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <Plus className=" w-4 h-4" /> Add payment
        </button>

        <button className="btn btn-primary gap-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 " onClick={()=>document.getElementById('edit_tenant_modal').showModal()}>
        <Pencil className="w-4 h-4" />Edit Tenant
        </button>
        <dialog id="edit_tenant_modal" className="modal">
          <div className="modal-box w-full">
          </div>          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <button className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 btn btn-primary gap-2 " onClick={()=>document.getElementById('edit_payment_modal').showModal()}>
        <Pencil className="w-4 h-4 " />Edit Payment
        </button>
        <dialog id="edit_payment_modal" className="modal">
          <div className="modal-box">
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

      </div>

      <div className="grid grid-row gap-3">
        <h2 className="font-bold p-4"> Recent Activity </h2>
        {/* I have to fetch the data here to display recent activity , means created a little bit after updating the backend  */}
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Full Name</th>
                <th>Unit Number</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant, index) => (
                <tr key={index} className="bg-base-200">
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>

    </section>
  );
};

export default Homepage;
