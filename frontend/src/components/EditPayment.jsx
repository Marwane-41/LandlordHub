import React, { useState, useEffect } from 'react';

import { PenBox, PenIcon, TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const EditPayment = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editForm, setEditForm] = useState({
    fullname: "",
    status : "",
    date : "",
    amountpaid : ""
  })
  

  // Fetch payments on mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await api.get('/payments');
        setPayments(res.data);
        setFiltered(res.data); // Initialize filtered list
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Filter payments when query changes
  useEffect(() => {
    const lower = query.toLowerCase();
    const results = payments.filter(
      (p) =>
        p.tenantName?.toLowerCase().includes(lower) ||
        p.unitNumber?.toString().includes(lower)
    );
    setFiltered(results);
  }, [query, payments]);


  const handleDeletePayment = async () => {
    if(!selectedPayment) return;

  
    try {
      await api.delete(`/payments/${selectedPayment._id}`);

      // closing the modal 
      const modal = document.getElementById("delete_payment_modal");
      if (modal) modal.close();

      setSelectedPayment(null);
      toast.success("Deleted Payment successfully ! ")

    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Could not delete payment");
    }
  };

  const handleSavedPayment = async () => {
    if(!selectedPayment) return 
  }



  return (
    <dialog id="edit_payment_modal" className="modal">
      <div className="modal-box w-11/12 max-w-7xl h-[90vh]">
        <label className="block mb-2 font-bold">Search for payments:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter tenant name or unit"
          className="input input-bordered w-full mb-4"
        />

        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p>No results found</p>
        ) : (
          <div className="overflow-x-auto max-h-full overflow-y-auto ">
            <table className="table table-zebra text-sm w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Date Paid</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p) => (
                  <tr key={p._id} className="hover">
                    <td>{p.tenantName}</td>
                    <td>{p.status}</td>
                    <td>{p.amount}</td>
                    <td>{p.datePaid}</td>
                    <td>
                      {/* buttons for edit and delete  */}

                        <button 
                        onClick={()=>document.getElementById('edit_payment_modal2').showModal()}
                        className='btn btn-ghost' > 
                        <PenIcon></PenIcon>  Edit 
                        </button>

                        <button

                        onClick={() =>{
                          setSelectedPayment(p)
                         document.getElementById('delete_payment_modal').showModal()}}
                        className='btn btn-ghost' > 
                        <TrashIcon></TrashIcon>  Delete
                        </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}


        {/* modals for edit and delete buttons  */}
        <dialog id="edit_payment_modal2" className="modal">

          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Payment</h3>
            
              <form className='flex flex-col gap-4 mt-3'
                onSubmit={(e)=> {
                  e.preventDefault();  //prevents page reload 
                  handleSavedPayment();
               }}>
                
                <input
                  className='input input-bordered'
                  placeholder='Full name '
                  value={editForm.fullname}
                  onChange={(e)=> {
                    setEditForm({...editForm,fullname:e.target.value})
                  }}>
                </input>

                <input
                  className='input input-bordered'
                  placeholder='Status'
                  value={editForm.status}
                  onChange={(e)=> {
                    setEditForm({...editForm,status:e.target.value})
                  }}>
                </input>

                <input
                  className='input input-bordered'
                  placeholder='Amount paid'
                  value={editForm.amountpaid}
                  onChange={(e)=> {
                    setEditForm({...editForm,amountpaid:e.target.value})
                  }}>
                </input>

                <input
                  className='input input-bordered'
                  placeholder='Date'
                  value={editForm.date}
                  onChange={(e)=> {
                    setEditForm({...editForm,date:e.target.value})
                  }}>
                </input>

              </form>

              <div className='flex flex-row justify-end gap-3 mt-4'>

                <button className='btn  btn-primary'
                onClick={handleSavedPayment}
                > Save Changes  
                </button>
                <button className='btn btn-error'
                > Cancel 
                </button>

              </div>
            
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="delete_payment_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Payment?</h3>
            <p className="py-4">Are you sure you want to delete this payment?</p>

            <div className="flex justify-end gap-3 mt-4">
              <button 
                className="btn btn-error" 
                onClick={() => document.getElementById("delete_payment_modal").close()}
              >
                Cancel
              </button>

              <button 
                className="btn btn-primary"
                onClick={handleDeletePayment}
              >
                Delete
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button></button>
          </form>
        </dialog>

      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>

    </dialog>
  );
};

export default EditPayment;
