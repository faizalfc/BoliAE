import { useEffect, useMemo, useState } from "react";
import { fetchItemsApi } from "../api";
import { useAuth } from "../auth/AuthContext";
import "./Dashboard.css";

function statusClass(status) {
  if (status === "In Stock") return "status in-stock";
  if (status === "Low Stock") return "status low-stock";
  return "status out-of-stock";
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadItems = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchItemsApi();
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load catalog");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadItems();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => item.name.toLowerCase().includes(term));
  }, [items, query]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="welcome">Welcome back</p>
          <h1>{user?.name || "Dashboard"}</h1>
        </div>
        <button type="button" className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      <section className="toolbar">
        <label htmlFor="search" className="sr-only">
          Search catalog
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search items by name..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className="count">{filteredItems.length} items</p>
      </section>

      {loading ? <p className="state">Loading catalog...</p> : null}
      {error ? <p className="state error">{error}</p> : null}

      {!loading && !error && filteredItems.length === 0 ? (
        <p className="state">No items match “{query}”.</p>
      ) : null}

      <div className="grid">
        {filteredItems.map((item) => (
          <article key={item.id} className="card">
            <img src={item.image} alt={item.name} />
            <div className="card-body">
              <span className={statusClass(item.status)}>{item.status}</span>
              <h2>{item.name}</h2>
              <p className="category">{item.category}</p>
              <p className="price">${item.price.toLocaleString()}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
