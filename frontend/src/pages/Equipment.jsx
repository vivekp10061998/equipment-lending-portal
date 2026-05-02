import { useMemo, useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import { equipmentList } from "../data/mockData";

function Equipment() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(equipmentList.map((item) => item.category))];

  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="page">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Equipment Catalogue</p>
          <h1>Find and request school resources</h1>
        </div>
      </div>

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
          <EquipmentCard key={item.id} item={item} />
        ))}
      </section>
    </main>
  );
}

export default Equipment;