import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const homeProducts = [
    {
        name: 'Tally Prime Single User',
        description: 'Ideal for small businesses with a single computer/license.',
        price: '₹18,000',
        category: 'Tally software',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2011'
    },
    {
        name: 'Tally Prime Gold User',
        description: 'Multi-user license for unlimited users on a local network.',
        price: '₹54,000',
        category: 'Tally software',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070'
    },
    {
        name: 'E-commerce Addon',
        description: 'Sync your Tally data with your online shop automatically.',
        price: '₹4,999',
        category: 'Tally Addons',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=2070'
    }
];

const ProductsSummary = () => {
    return (
        <section className="bg-background dark:bg-slate-950 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-left">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Premium <span className="text-primary">Ecosystem</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl leading-relaxed">
                            Empowering your business with high-performance software and seamlessly integrated addons.
                        </p>
                    </div>
                    <Link to="/tally-products" className="flex items-center text-primary font-bold hover:gap-2 transition-all">
                        View All Products <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {homeProducts.map((product, index) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group card-material overflow-hidden"
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={product.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop';
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>
                            <div className="p-6">
                                <span className="text-xs font-extrabold text-secondary uppercase tracking-[0.2em] mb-2 block">{product.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{product.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                                    <button className="p-2 rounded-full bg-primary text-white shadow-md hover:bg-blue-600 transition-colors">
                                        <ShoppingBag className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsSummary;
