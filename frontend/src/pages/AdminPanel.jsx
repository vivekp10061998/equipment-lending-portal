import { useEffect, useState } from "react";
import {
  addEquipment,
  deleteEquipment,
  getEquipment,
  getRequests,
  updateRequestStatus
} from "../services/storageService";

function AdminPanel() {
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    condition: "Good",
    quantity: 1,
    available: 1,
    image: ""
  });

  const loadData = () => {
    setItems(getEquipment());
    setRequests(getRequests());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleAddEquipment = (event) => {
    event.preventDefault();

    if (!form.name || !form.category) {
      alert("Please enter equipment name and category.");
      return;
    }

    addEquipment(form);

    setForm({
      name: "",
      category: "",
      condition: "Good",
      quantity: 1,
      available: 1,
      image: ""
    });

    loadData();
  };

  const handleDelete = (id) => {
    deleteEquipment(id);
    loadData();
  };

  const handleStatusChange = (requestId, status) => {
    updateRequestStatus(requestId, status);
    loadData();
  };

  return (
    <main className="page">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Admin Control</p>
          <h1>Manage equipment and approvals</h1>
        </div>
      </div>

      <section className="panel">
        <h2>Add Equipment</h2>

        <form className="adminForm" onSubmit={handleAddEquipment}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Equipment name"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
          />

          <select name="condition" value={form.condition} onChange={handleChange}>
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
          </select>

          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="1"
            placeholder="Quantity"
          />

          <input
            type="number"
            name="available"
            value={form.available}
            onChange={handleChange}
            min="0"
            placeholder="Available"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL optional"
          />

          <button className="primaryBtn" type="submit">
            Add Equipment
          </button>
        </form>
      </section>

      <section className="panel">
        <h2>Equipment Management</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Qty</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.condition}</td>
                  <td>{item.quantity}</td>
                  <td>{item.available}</td>
                  <td>
                    <button className="dangerBtn" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan="6">No equipment found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Approval Queue</h2>

        <div className="requestCards">
          {requests.map((request) => (
            <div className="requestCard" key={request.id}>
              <div>
                <h3>{request.equipmentName}</h3>
                <p>
                  {request.requestedBy} · {request.role} ·{" "}
                  <span className={`status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </p>
              </div>

              <div className="actionGroup">
                {request.status === "Pending" && (
                  <>
                    <button
                      className="approveBtn"
                      onClick={() => handleStatusChange(request.id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="rejectBtn"
                      onClick={() => handleStatusChange(request.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}

                {request.status === "Approved" && (
                  <button
                    className="primaryBtn smallBtn"
                    onClick={() => handleStatusChange(request.id, "Returned")}
                  >
                    Mark Returned
                  </button>
                )}
              </div>
            </div>
          ))}

          {requests.length === 0 && <p>No borrowing requests found.</p>}
        </div>
      </section>
    </main>
  );
}

export default AdminPanel;