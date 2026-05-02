import { useEffect, useMemo, useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import {
  createBorrowRequest,
  getCurrentUser,
  getEquipment
} from "../services/storageService";

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");

  const user = getCurrentUser();

  useEffect(() => {
    setEquipment(getEquipment());
  }, []);

  const categories = ["All", ...new Set(equipment.map((item) => item.category))];

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [equipment, search, category]);

  const handleRequest = (equipmentId) => {
    setMessage("");

    if (user.role === "ADMIN") {
      setMessage("Admin cannot create borrowing request.");
      return;
    }

    try {
      createBorrowRequest(equipmentId);
      setMessage("Request submitted successfully. Waiting for admin approval.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="page">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Equipment Catalogue</p>
          <h1>Find and request school resources</h1>
        </div>
      </div>

      {message && <div className="infoBox">{message}</div>}

      <section className="filters">
        <input
          type="text"
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </section>

      <section className="equipmentGrid">
        {filteredEquipment.map((item) => (
          <EquipmentCard key={item.id} item={item} onRequest={handleRequest} />
        ))}
      </section>
    </main>
  );
}

export default Equipment;