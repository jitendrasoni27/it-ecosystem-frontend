import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselItems = [
    {
        id: 1,
        title: "Seamless Tally Integration",
        description: "Effortlessly talk between Tally Prime and Excel, ERP, DMS, or E-commerce. Sync bills, orders, and data across all your business software.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3540&auto=format&fit=crop",
        cta: "Explore Integrations",
        link: "/services"
    },
    {
        id: 2,
        title: "Custom TDL & Add-ons",
        description: "Personalize Tally with custom TDL development and powerful readymade addons for inventory, payroll, and reports.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=3540&auto=format&fit=crop",
        cta: "View Add-ons",
        link: "/tally-addons"
    },
    {
        id: 3,
        title: "Web & Mobile Development",
        description: "Transform your business with premium custom web applications and high-performance mobile apps built for scale.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=3540&auto=format&fit=crop",
        cta: "Start Your Project",
        link: "/services"
    },
    {
        id: 4,
        title: "Authorized Tally Partner",
        description: "Your certified experts for Tally Prime licensing, cloud implementation, and dedicated business support.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=3540&auto=format&fit=crop",
        cta: "Partner With Us",
        link: "/services"
    }
];

const HomeCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.05 // Reduced from 1.1 to prevent over-scaling on 4K screens
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.8 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.95, // Subtle zoom out
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.8 }
            }
        })
    };

    const textVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.3 + (i * 0.1),
                duration: 0.6,
                ease: "easeOut"
            }
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + carouselItems.length) % carouselItems.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 8000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <div className="relative h-[320px] sm:h-[400px] md:h-[450px] lg:h-[550px] w-full overflow-hidden bg-gray-900 font-sans">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear transform scale-100"
                        style={{ backgroundImage: `url(${carouselItems[currentIndex].image})` }}
                    >
                        {/* Stronger overlay for better text contrast on mobile */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent md:from-black/80 md:via-black/30 md:to-transparent" />
                        <div className="absolute inset-0 bg-black/20 md:hidden" /> {/* Extra dim for mobile readability */}
                    </div>

                    <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col justify-center text-white">
                        <div className="max-w-3xl"> {/* Container to limit width on large screens */}
                            <motion.h2
                                variants={textVariants}
                                custom={0}
                                initial="hidden"
                                animate="visible"
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-3 md:mb-5 tracking-tight drop-shadow-2xl leading-[1.1]"
                            >
                                {carouselItems[currentIndex].title}
                            </motion.h2>
                            <motion.p
                                variants={textVariants}
                                custom={1}
                                initial="hidden"
                                animate="visible"
                                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-10 text-gray-100 font-medium leading-relaxed drop-shadow-lg max-w-xl"
                            >
                                {carouselItems[currentIndex].description}
                            </motion.p>
                            <motion.div
                                variants={textVariants}
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-wrap gap-4"
                            >
                                <a
                                    href={carouselItems[currentIndex].link}
                                    className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-sm transition-all duration-300 shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 text-sm sm:text-base md:text-lg uppercase tracking-wider"
                                >
                                    {carouselItems[currentIndex].cta}
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <button
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hidden md:block"
                onClick={() => paginate(-1)}
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hidden md:block"
                onClick={() => paginate(1)}
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className={`h-1.5 transition-all duration-500 rounded-full ${index === currentIndex ? 'w-12 bg-primary' : 'w-6 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeCarousel;
