import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/catalog/ProductCard';
import { products } from '../data/products';
import SEO from '../components/SEO';
import { Search } from 'lucide-react';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const filteredProducts = useMemo(() => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
    }, [query]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-200">
            <SEO title={`Search results for "${query}"`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-8 flex items-center space-x-4">
                    <div className="p-3 bg-primary rounded-full text-white">
                        <Search className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Search Results
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Showing results for <span className="font-bold text-primary">"{query}"</span>
                        </p>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <Search className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            No results found
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            We couldn't find any products matching your search. Please try different keywords.
                        </p>
                        <div className="flex justify-center space-x-4">
                            {['Tally', 'Web', 'Mobile', 'SMS'].map(suggestion => (
                                <button
                                    key={suggestion}
                                    onClick={() => window.location.href = `/search?q=${suggestion}`}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white rounded-full transition-colors text-sm font-medium"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
