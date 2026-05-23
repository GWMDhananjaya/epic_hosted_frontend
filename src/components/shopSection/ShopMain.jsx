import React, { useState } from "react";

// ALL YOUR VEHICLE PARTS & LIGHTS DATA - Edit this section!
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "LED Headlight Kit - H7",
    category: "Headlights",
    description:
      "Super bright 20000LM LED headlights, 6000K cool white, plug and play installation. Fits most vehicles.",
    price: "$49.99",
    image: "/images/led-headlight-h7.jpg",
    compatibility: ["Honda", "Toyota", "Ford", "BMW"],
    warranty: "2 years",
    inStock: true,
  },
  {
    id: 2,
    name: "Smoked LED Tail Lights",
    category: "Tail Lights",
    description:
      "Sequential turn signals, dark smoke finish, DOT approved. Perfect for truck and SUV upgrades.",
    price: "$129.99",
    image: "/images/smoked-tail-lights.jpg",
    compatibility: ["Ford F-150", "Chevy Silverado", "RAM 1500"],
    warranty: "1 year",
    inStock: true,
  },
  {
    id: 3,
    name: "Yellow LED Fog Lights",
    category: "Fog Lights",
    description:
      "3000K amber yellow, waterproof IP67, cuts through fog and rain. Universal fit for most cars.",
    price: "$39.99",
    image: "/images/yellow-fog-lights.jpg",
    compatibility: ["Universal Fit"],
    warranty: "2 years",
    inStock: true,
  },
  {
    id: 4,
    name: "RGB Bluetooth Underbody Lights",
    category: "Interior/Exterior",
    description:
      "16 million colors, smartphone app control, music sync mode. Make your car stand out!",
    price: "$79.99",
    image: "/images/rgb-underbody.jpg",
    compatibility: ["Universal Fit"],
    warranty: "1 year",
    inStock: true,
  },
  {
    id: 5,
    name: "Super Bright LED Bulbs (Set of 2)",
    category: "Bulbs",
    description:
      "12000LM per pair, 6500K white, 50,000 hours lifespan. Upgrade your stock bulbs instantly.",
    price: "$29.99",
    image: "/images/led-bulbs.jpg",
    compatibility: ["Universal Fit"],
    warranty: "3 years",
    inStock: true,
  },
  {
    id: 6,
    name: "Projector Headlights with DRL",
    category: "Headlights",
    description:
      "Modern projector design with daytime running lights, black housing, plug and play.",
    price: "$189.99",
    image: "/images/projector-headlights.jpg",
    compatibility: ["Honda Civic", "Accord", "CR-V"],
    warranty: "2 years",
    inStock: false,
  },
];

// Helper function to get correct image path for GitHub Pages
const getImagePath = (imagePath) => {
  if (!imagePath) return null;
  // If it's already a full URL or data URL, return as is
  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  // For production on GitHub Pages, add the base path
  if (import.meta.env.PROD) {
    return `/epic_hosted_frontend${imagePath}`;
  }
  return imagePath;
};

// Create SVG placeholder when images fail to load
const createSVGPlaceholder = (productName) => {
  const encodedName = encodeURIComponent(productName);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%239338ec;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='18' font-family='Arial, sans-serif' font-weight='bold'%3E${encodedName}%3C/text%3E%3C/svg%3E`;
};

const ShopMain = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [failedImages, setFailedImages] = useState({});

  // Get unique categories
  const categories = ["All", ...new Set(PRODUCTS_DATA.map((p) => p.category))];

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  // Add to cart function
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Show notification
    alert(`${product.name} added to cart!`);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace("$", "")) * item.quantity,
    0,
  );

  // Handle image error - show SVG placeholder instead
  const handleImageError = (productId) => {
    if (!failedImages[productId]) {
      setFailedImages((prev) => ({
        ...prev,
        [productId]: true,
      }));
    }
  };

  return (
    <section id="shop" className="px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Premium Vehicle Lights & Auto Parts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Shop our extensive collection of high-quality LED headlights, tail
            lights, fog lights, and auto accessories.
          </p>
        </div>

        {/* Cart Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 flex items-center gap-2"
          >
            🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowCart(false)}
            />
            {/* Cart Panel */}
            <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-xl z-50 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b py-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-green-600">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image Section - Now with actual images and fallback */}
                <div className="h-56 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                  {!failedImages[product.id] && product.image ? (
                    <img
                      src={getImagePath(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(product.id)}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={createSVGPlaceholder(product.name)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-5 flex-grow">
                  {/* Category badge */}
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mb-2">
                    {product.category}
                  </span>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-3 text-sm line-clamp-3">
                    {product.description}
                  </p>

                  {/* Compatibility */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">
                      Fits: {product.compatibility.join(", ")}
                    </p>
                    {product.warranty && (
                      <p className="text-xs text-green-600 mt-1">
                        Warranty: {product.warranty}
                      </p>
                    )}
                  </div>

                  {/* Price and Stock */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price}
                    </span>
                    {!product.inStock && (
                      <span className="text-red-500 text-sm font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-lg transition ${
                      product.inStock
                        ? "bg-blue-600 text-white hover:bg-blue-700 active:transform active:scale-95"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Add to Cart 🛒" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopMain;
