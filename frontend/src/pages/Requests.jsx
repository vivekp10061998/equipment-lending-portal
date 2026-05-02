import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getRequests,
  updateRequestStatus
} from "../services/storageService";

function Requests() {
  const [requests, setRequests] = useState([]);
  const user = getCurrentUser();

  const loadRequests = () => {
    const allRequests = getRequests();

    if (user.role === "ADMIN") {
      setRequests(allRequests);
    } else {
      setRequests(allRequests.filter((request) => request.userId === user.id));
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = (requestId, status) => {
    updateRequestStatus(requestId, status);
    loadRequests();
  };

  return (
    <main className="page">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Borrowing Workflow</p>
          <h1>{user.role === "ADMIN" ? "Manage all requests" : "Track my request status"}</h1>
        </div>
      </div>

      <section className="panel">
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Equipment</th>
                <th>Requested By</th>
                <th>Role</th>
                <th>Date</th>
                <th>Status</th>
                {user.role === "ADMIN" && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id}</td>
                  <td>{request.equipmentName}</td>
                  <td>{request.requestedBy}</td>
                  <td>{request.role}</td>
                  <td>{request.date}</td>
                  <td>
                    <span className={`status ${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </td>

                  {user.role === "ADMIN" && (
                    <td>
                      <div className="tableActions">
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
                    </td>
                  )}
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan={user.role === "ADMIN" ? "7" : "6"}>
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Requests;