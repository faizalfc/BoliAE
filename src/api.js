export const mockLoginApi = async (username, password) => {
  // 500ms network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (username === "admin" && password === "password123") {
    return {
      token: "fake-jwt-token-xyz-987",
      user: { id: 1, name: "Admin User", role: "admin" },
    };
  }

  throw new Error("Invalid username or password");
};

const ITEMS_DATABASE = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    category: "Hardware",
    price: 2499,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: 'Dell UltraSharp 27" 4K',
    category: "Monitors",
    price: 619,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Keychron K2 Mechanical Keyboard",
    category: "Accessories",
    price: 89,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 99,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Audio",
    price: 398,
    status: "In Stock",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "CalDigit TS4 Thunderbolt 4 Dock",
    category: "Hardware",
    price: 399,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=80",
  },
];

export const fetchItemsApi = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [...ITEMS_DATABASE];
};
