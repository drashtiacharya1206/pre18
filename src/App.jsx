
import { useState } from "react";
import {
  Package,
  Pencil,
  Save,
  X,
  Search,
  CheckCircle2,
  IndianRupee,
  Boxes,
  Sparkles,
  RotateCcw,
  Tag,
  Layers3,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    stock: 18,
    description: "Premium sound with comfortable wireless listening.",
    emoji: "🎧",
    color: "from-violet-500/20 to-indigo-500/5",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 3299,
    stock: 12,
    description: "A smart companion for everyday activities.",
    emoji: "⌚",
    color: "from-cyan-500/20 to-blue-500/5",
  },
  {
    id: 3,
    name: "Everyday Backpack",
    category: "Accessories",
    price: 1199,
    stock: 25,
    description: "A lightweight backpack for work and travel.",
    emoji: "🎒",
    color: "from-amber-500/20 to-orange-500/5",
  },
];

const emptyForm = {
  name: "",
  category: "Electronics",
  price: "",
  stock: "",
  description: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/15";

const emojiByCategory = {
  Electronics: "🎧",
  Accessories: "🎒",
  Clothing: "👕",
  Home: "🏠",
  Stationery: "✏️",
};

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#11182A] p-5 transition hover:border-white/20">
      <div className={`mb-4 inline-flex rounded-xl bg-white/5 p-3 ${color}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 break-words text-2xl font-black text-white sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedProduct =
    products.find((product) => product.id === selectedId) || null;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Select a product and load its existing details into the form
  const handleSelect = (product) => {
    setSelectedId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      description: product.description,
    });
    setMessage("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setMessage("");
    setError("");
  };

  // UPDATE operation
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      setError("Please select a product to update.");
      return;
    }

    if (
      !form.name.trim() ||
      form.price === "" ||
      form.stock === "" ||
      !form.description.trim()
    ) {
      setError("Please complete all product fields.");
      setMessage("");
      return;
    }

    if (
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0 ||
      !Number.isInteger(Number(form.stock)) ||
      Number(form.stock) < 0
    ) {
      setError("Enter a valid price and a whole-number stock quantity.");
      setMessage("");
      return;
    }

    const updatedProduct = {
      ...selectedProduct,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
      emoji:
        emojiByCategory[form.category] || selectedProduct.emoji,
    };

    setProducts((previous) =>
      previous.map((product) =>
        product.id === selectedId ? updatedProduct : product
      )
    );

    setMessage(`"${updatedProduct.name}" updated successfully!`);
    setError("");
  };

  const handleCancel = () => {
    setSelectedId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
  };

  const handleReset = () => {
    if (selectedProduct) {
      handleSelect(selectedProduct);
    } else {
      setForm(emptyForm);
      setMessage("");
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-[#090D18] text-slate-100">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#090D18]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-2.5 shadow-lg shadow-violet-500/20">
              <Package size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wide">
                NEXORA<span className="text-violet-400">.</span>
              </h1>
              <p className="text-[10px] tracking-[0.2em] text-slate-400">
                PRODUCT MANAGEMENT STUDIO
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 sm:px-4">
            <Pencil size={14} />
            Update Center
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {/* Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-900 p-7 sm:p-10">
          <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-violet-200">
                <Sparkles size={14} />
                SELECT • EDIT • SAVE
              </div>

              <h2 className="text-3xl font-black leading-tight sm:text-5xl">
                Make every
                <br />
                <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  detail count.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Select a product from your inventory, modify its details,
                and update your store instantly.
              </p>
            </div>

            <div className="hidden h-32 w-32 items-center justify-center rounded-3xl border border-white/10 bg-white/5 md:flex">
              <Pencil
                size={65}
                strokeWidth={1.3}
                className="text-violet-300"
              />
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Boxes size={22} />}
            label="Total Products"
            value={products.length}
            color="text-violet-300"
          />
          <StatCard
            icon={<Layers3 size={22} />}
            label="Units in Stock"
            value={totalStock.toLocaleString("en-IN")}
            color="text-cyan-300"
          />
          <StatCard
            icon={<IndianRupee size={22} />}
            label="Inventory Value"
            value={`₹${inventoryValue.toLocaleString("en-IN")}`}
            color="text-emerald-300"
          />
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Product selection */}
          <section>
            <div className="mb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                Your collection
              </p>
              <h3 className="text-2xl font-black">Select a Product</h3>
              <p className="mt-2 text-sm text-slate-400">
                Choose a product to load its details into the editor.
              </p>
            </div>

            <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/10 bg-[#11182A] px-4 py-3 focus-within:border-violet-400/50">
              <Search size={18} className="text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredProducts.map((product) => {
                const isSelected = selectedId === product.id;

                return (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className={`group rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                      isSelected
                        ? "border-violet-400 bg-violet-500/10 shadow-lg shadow-violet-950/20"
                        : "border-white/10 bg-[#11182A] hover:border-white/25"
                    }`}
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${
                          product.color ||
                          "from-violet-500/20 to-indigo-500/5"
                        } text-4xl`}
                      >
                        {product.emoji}
                      </div>

                      <span
                        className={`rounded-lg p-2 ${
                          isSelected
                            ? "bg-violet-500 text-white"
                            : "bg-white/5 text-slate-400 group-hover:text-violet-300"
                        }`}
                      >
                        <Pencil size={16} />
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-violet-300">
                      {product.category}
                    </span>

                    <h4 className="mt-2 break-words text-lg font-bold text-white">
                      {product.name}
                    </h4>

                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                      <span className="font-black text-white">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-slate-400">
                        {product.stock} units
                      </span>
                    </div>

                    <p
                      className={`mt-4 flex items-center gap-2 text-xs font-semibold ${
                        isSelected ? "text-violet-300" : "text-slate-500"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 size={15} />
                          Currently editing
                        </>
                      ) : (
                        "Click to edit product →"
                      )}
                    </p>
                  </button>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
                No matching products found.
              </div>
            )}
          </section>

          {/* Update form */}
          <section
            className={`rounded-3xl border p-6 shadow-xl transition sm:p-7 ${
              selectedProduct
                ? "border-violet-400/30 bg-[#11182A] shadow-violet-950/10"
                : "border-white/10 bg-[#11182A]/70"
            }`}
          >
            <div className="mb-7 flex items-center gap-3">
              <div className="rounded-xl bg-violet-500/15 p-3 text-violet-300">
                <Pencil size={23} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Edit Product</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedProduct
                    ? `Editing product #${selectedProduct.id}`
                    : "Select a product to begin"}
                </p>
              </div>
            </div>

            {!selectedProduct ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/30 p-6 text-center">
                <div className="mb-5 rounded-2xl bg-violet-500/10 p-5 text-violet-300">
                  <Package size={42} />
                </div>
                <h4 className="text-lg font-bold">Ready to edit?</h4>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                  Select any product card on the left. Its existing details
                  will appear here for editing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="flex items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-500/10 p-3">
                  <span className="text-3xl">{selectedProduct.emoji}</span>
                  <div>
                    <p className="text-xs text-violet-300">EDITING NOW</p>
                    <p className="mt-1 font-bold text-white">
                      {selectedProduct.name}
                    </p>
                  </div>
                </div>

                <Field label="Product Name">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Category">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Clothing</option>
                    <option>Home</option>
                    <option>Stationery</option>
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price (₹)">
                    <input
                      name="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Stock Quantity">
                    <input
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Description">
                  <textarea
                    name="description"
                    rows="3"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the product..."
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-300"
                  >
                    {error}
                  </p>
                )}

                {message && (
                  <p
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-300"
                  >
                    <CheckCircle2 size={18} className="shrink-0" />
                    {message}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-bold shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
                  >
                    <RotateCcw size={17} />
                    Reset
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm text-slate-400 transition hover:text-white"
                >
                  <X size={16} />
                  Cancel Editing
                </button>
              </form>
            )}
          </section>
        </div>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs text-slate-500">
          NEXORA EDITION · REACT UPDATE OPERATION · TAILWIND CSS
        </footer>
      </main>
    </div>
  );
}
