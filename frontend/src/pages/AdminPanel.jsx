import { useState } from "react";
import { equipmentList, requestList } from "../data/mockData";

function AdminPanel() {
  const [items, setItems] = useState(equipmentList);

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="page">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Admin Control</p>
          <h1>Manage equipment and approvals</h1>
        </div>
        <button className="primaryBtn">Add Equipment</button>
      </div>

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
                    <button className="dangerBtn" onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Approval Queue</h2>

        <div className="requestCards">
          {requestList.map((request) => (
            <div className="requestCard" key={request.id}>
              <div>
                <h3>{request.equipmentName}</h3>
                <p>{request.requestedBy} · {request.role}</p>
              </div>

              <div className="actionGroup">
                <button className="approveBtn">Approve</button>
                <button className="rejectBtn">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdminPanel;