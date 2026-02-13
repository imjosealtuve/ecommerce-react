import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import { fetchProducts } from '../services/api';
import './CategoryPage.css';

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const loadCategoryProducts = async () => {
            setLoading(true);
            setError(null);
            // Reset to page 1 when category changes
            setCurrentPage(1);
            try {
                const data = await fetchProducts(category);
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };
        loadCategoryProducts();
    }, [category]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="category-page-container">
            <h1 className="category-title">{category}</h1>
            {loading ? (
                <div className="category-product-grid">
                    {[...Array(6)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : error ? (
                <div>{error}</div>
            ) : products.length === 0 ? (
                <div className="no-products-message" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem', color: '#666' }}>
                    Sorry, there are no products available in this category at the moment.
                </div>
            ) : (
                <>
                    <div className="category-product-grid">
                        {currentProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button
                                className="pagination-button"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                aria-label="Previous Page"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="pagination-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="pagination-button"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                aria-label="Next Page"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
