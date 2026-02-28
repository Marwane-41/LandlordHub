import React, { useEffect, useState } from 'react';
import { Link, PenIcon, TrashIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../lib/axios';

const EditTenant = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [tenants, setTenants] = useState([]);               // get all tenants as an array 
  const [filtered, setFiltered] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [editForm , setEditForm] = useState({
    firstName: "",
    lastName: "",
    unitNumber: "",
    email: "",
    phoneNumber: ""
  })

  
  // Fetch tenants
  useEffect(() => {
    const fetchTableTenants = async () => {
      try {
        const Tenantres = await api.get("/tenants");
        setTenants(Tenantres.data);
        setFiltered(Tenantres.data); // initialize filtered list
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTableTenants();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSave = async () => {
    // logic goes here 

    if (!selectedTenant)  return;

    try {
      // send to api : 
      const res = await api.put(
        `/tenants/${selectedTenant._id}`, editForm
        
      );
      // update the UI , no need for refresh : 
      setTenants(prev => 
        prev.map(t => t._id === selectedTenant._id ? res.data : t)
      );
      setFiltered(prev =>
        prev.map(t => t._id === selectedTenant._id ? res.data : t)
      );
      
      // close the modal : 
      const modal2 = document.getElementById("edit_singletenant_modal");
      const modal1 = document.getElementById("edit_tenant_modal");
      
      if (modal2) modal2.close();
      if (modal1) modal1.close();

      // toast message , toast shows on the main page 
      setTimeout(() => {
        toast.success("Tenant updated successfully!");
      }, 100); 
  
    } catch (error) {
      console.error(error);
      toast.error("update failed!!")
      
    }
  }

  const handleDeleteTenant = async () => {
    if (!selectedTenant) return;
  
    try {
      await api.delete(`/tenants/${selectedTenant._id}`);
  
      // Remove the tenant from your local state so UI updates immediately
      setTenants(prev => prev.filter(t => t._id !== selectedTenant._id));
      setFiltered(prev => prev.filter(t => t._id !== selectedTenant._id));
  
      // Close the modal (DOM API consistent with your pattern)
      const modal = document.getElementById("delete_tenant_modal");
      if (modal) modal.close();
  
      // Clear selected tenant so modal text resets next time
      setSelectedTenant(null);
  
      // Optional: show toast feedback if you have toast available
      toast.success("Tenant deleted");
    } catch (err) {
      console.error("Error deleting tenant:", err);
      // Optional: show error toast
      toast.error("Could not delete tenant");
    }
  };

  useEffect(() => {
    if (!query) {
      setFiltered(tenants);
    } else {
      setFiltered(
        tenants.filter((tenant) =>
          tenant.firstName.toLowerCase().includes(query.toLowerCase()) ||
          tenant.lastName.toLowerCase().includes(query.toLowerCase()) ||
          tenant.unitNumber.toString().includes(query)
        )
      );
    }
  }, [query, tenants]);


  return (
    <dialog id="edit_tenant_modal" className="modal">
      <div className="modal-box w-11/12 max-w-7xl h-[90vh]">
        <label className="block mb-2 font-bold">Search for tenants:</label>
        <input
          type="search"
          placeholder="Enter name or unit number"
          className="input input-bordered w-full mb-4 "
          value={query}
          onChange={handleSearch}
        />

        {/* the table to display all tenants  */}
        <div className="overflow-x-auto max-h-full overflow-y-auto rounded-lg">
          <table className="table table-zebra text-large w-full p-4">
            <thead className="bg-base-200">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Unit Number</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No tenants found
                  </td>
                </tr>
              ) : (
                filtered.map((tenant) => (
                  <tr key={tenant._id} className="hover">
                    
                    <td>{tenant.firstName}</td>
                    <td>{tenant.lastName}</td>
                    <td>{tenant.unitNumber}</td>
                    <td>{tenant.email}</td>
                    <td>{tenant.phoneNumber}</td>
                    <td>
                      {/* buttons for edit and delete  */}

                    <button onClick={() => {
                      setSelectedTenant(tenant);     // store the selected tenant 
                      // display the selected tenant's info pre-filled 
                      setEditForm({
                        firstName: tenant.firstName,
                        lastName: tenant.lastName,
                        unitNumber:tenant.unitNumber,
                        email: tenant.email,
                        phoneNumber: tenant.phoneNumber,
                      });
                      // opening the modal 
                      const modal = document.getElementById("edit_singletenant_modal")
                      if (modal) modal.showModal();

                    }} 
                      className='btn btn-ghost' > 
                      <PenIcon></PenIcon>  Edit 
                    </button>

                    {/* delete button  */}
                    <button onClick={() => {
                      setSelectedTenant(tenant)   // store the clicked tenant 
                      const modal = document.getElementById("delete_tenant_modal")
                      if ( modal ) modal.showModal(); 
                    }}
                      className='btn btn-ghost' > 
                      <TrashIcon></TrashIcon>  Delete
                    </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for deleting tenant  */}
      <dialog id="delete_tenant_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete tenant?</h3>
                  <p className="py-4">
                               Are you sure you want to delete{" "}
                        <strong>
                          {selectedTenant ? `${selectedTenant.firstName} ${selectedTenant.lastName}` : ""}
                        </strong>
                        ?
                      </p>

                      <div className="flex justify-end gap-3 mt-4">
                        <form method="dialog">
                          <button
                            className="btn"
                            onClick={() => {
                              // close via form and clear selection
                              setSelectedTenant(null);
                            }}
                          >
                            Cancel
                          </button>
                        </form>

                        <button
                          className="btn btn-error"
                          onClick={handleDeleteTenant}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>

                  {/* modal for editing tenant */}
                  <dialog id="edit_singletenant_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Tenant Info</h3>
                        <form
                         className='flex flex-col gap-3 mt-4'
                         onSubmit={(e)=> {
                          e.preventDefault();  //prevents page reload 
                          handleSave();

                         }}>

                          <input
                          className='input input-bordered'
                          placeholder='First Name'
                          value={editForm.firstName}
                          onChange={(e)=> {
                            setEditForm({...editForm,firstName:e.target.value})
                          }}>
                          </input>


                          <input
                          className='input input-bordered'
                          placeholder='Last Name'
                          value={editForm.lastName}
                          onChange={(e)=> {
                            setEditForm({...editForm,lastName:e.target.value})
                          }}>
                          </input>


                          <input
                          className='input input-bordered'
                          placeholder='Unit Number'
                          value={editForm.unitNumber}
                          onChange={(e)=> {
                            setEditForm({...editForm,unitNumber:e.target.value})
                          }}>
                          </input>


                          <input
                          className='input input-bordered'
                          placeholder='Email'
                          value={editForm.email}
                          onChange={(e)=> {
                            setEditForm({...editForm,email:e.target.value})
                          }}>
                          </input>


                          <input
                          className='input input-bordered'
                          placeholder='Phone Number'
                          value={editForm.phoneNumber}
                          onChange={(e)=> {
                            setEditForm({...editForm,phoneNumber:e.target.value})
                          }}>
                          </input>

                          <div className='flex flex-row justify-end gap-1'>
                          <button 
                            type="button"
                            className="btn btn-primary"
                            onClick={() => document.getElementById("edit_singletenant_modal").close()}
                          >
                            Close
                          </button>
                            <button 
                              type="submit" 
                              className="btn btn-secondary"
                            >
                              Save Changes
                            </button>

                          </div>
                          
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

  );
};

export default EditTenant;
