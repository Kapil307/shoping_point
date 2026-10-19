
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchQuery = (
    searchParams.get("search") || ""
  ).trim().toLowerCase();

  // Fetch products from DummyJSON API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?sortBy=title&order=asc&limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        // Convert API data to the format used by ProductCard
        const formattedProducts = data.products.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.thumbnail,
          price: item.price,
          category: item.category,
          description: item.description,
          rating: item.rating,
          images: item.images,
        }));

        setAllProducts(formattedProducts);
      } catch (err) {
        setError(err.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Search by product name, category, or description
  const filteredProducts = allProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery)
    );
  });

  const products = filteredProducts.slice(0, visibleCount);

  // Reset visible products when search changes
  useEffect(() => {
    setVisibleCount(20);
  }, [searchQuery]);

  function clearSearch() {
    navigate("/#products");
  }

  return (
    <main className="home-page">
      {/* Hero Banner */}
      <section
        className="hero-banner"
        aria-label="ShopEase shopping banner"
      >
        <img
          src="/images/shoease-hero.png"
          alt="ShopEase shopping banner"
          className="hero-banner-image"
        />

        <button
          className="banner-hotspot category-electronics"
          aria-label="Shop Electronics"
          onClick={() => navigate("/electronics")}
        />

        <button
          className="banner-hotspot category-fashion"
          aria-label="Shop Fashion"
          onClick={() => navigate("/fashion")}
        />

        <button
          className="banner-hotspot category-beauty"
          aria-label="Shop Beauty"
          onClick={() => navigate("/beauty")}
        />

        <button
          className="banner-hotspot category-sports"
          aria-label="Shop Sports"
          onClick={() => navigate("sports")}
        />

        <button
          className="banner-hotspot category-accessories"
          aria-label="Shop Accessories"
          onClick={() =>
            navigate("/accessories")
          }
        />

        <button
          className="banner-hotspot category-shop-now"
          aria-label="Shop Now"
          onClick={() =>
            document.getElementById("products")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        />
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="container py-5 home-products-section"
      >
        <div className="products-heading mb-4">
          <div>
            <h2 className="fw-bold">
              {searchQuery ? "Search Results" : "Featured Products"}
            </h2>

            <p className="text-secondary">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : "Explore our latest collection"}
            </p>
          </div>

          {!loading && !error && (
            <p className="text-secondary">
              Showing {products.length} of {filteredProducts.length} products
            </p>
          )}
        </div>

        {searchQuery && (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mb-4"
            onClick={clearSearch}
          >
            Clear Search
          </button>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
            />
            <p className="mt-3">Loading products...</p>
          </div>
        )}

        {/* API Error */}
        {!loading && error && (
          <div className="alert alert-danger">
            {error}
            <button
              className="btn btn-outline-danger ms-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <h3>No products found</h3>
            <p>Try another product name or category.</p>
            <button
              className="btn btn-primary"
              onClick={clearSearch}
            >
              View All Products
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="row g-4">
              {products.map((product) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-5">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() =>
                    setVisibleCount((count) =>
                      Math.min(count + 20, filteredProducts.length)
                    )
                  }
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;
