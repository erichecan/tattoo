import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, Heart, Share2 } from 'lucide-react'
import { getAllImages, availableStyles, tattooImages } from '../data/tattooImages'

const Portfolio = () => {
  // 2024-12-19 15:30:00 - 创建作品集页面，使用 Grid 布局展示作品图片，带 hover 效果
  
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')

  const portfolioItems = getAllImages()

  const filters = [
    { key: 'all', label: 'All Styles' },
    ...availableStyles.map(style => ({
      key: style.toLowerCase(),
      label: tattooImages[style]?.name || style
    }))
  ]

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.style.toLowerCase() === filter)

  const openModal = (item) => {
    setSelectedImage(item)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setSelectedImage(filteredItems[nextIndex])
  }

  const prevImage = () => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1
    setSelectedImage(filteredItems[prevIndex])
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-accent max-w-3xl mx-auto leading-relaxed">
            Explore our collection of stunning tattoo artwork. Each piece tells a unique story 
            and showcases our artists' dedication to craftsmanship and creativity.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filterItem) => (
            <button
              key={filterItem.key}
              onClick={() => setFilter(filterItem.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === filterItem.key
                  ? 'bg-primary text-dark shadow-lg'
                  : 'bg-dark-light text-accent hover:bg-primary/20 hover:text-primary'
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              onClick={() => openModal(item)}
            >
              <div className="relative overflow-hidden rounded-xl bg-dark-light">
                                 {/* Image */}
                 <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                   <img 
                     src={item.src} 
                     alt={item.alt}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                 </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-display font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-accent text-sm mb-3">
                      {tattooImages[item.style]?.description || `Beautiful ${item.style} design`}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary font-medium uppercase tracking-wide">
                        {item.style}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-primary/20 rounded-full text-primary hover:bg-primary/30 transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-primary/20 rounded-full text-primary hover:bg-primary/30 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-display font-bold text-primary mb-4">
              No items found
            </h3>
            <p className="text-accent-dark">
              Try selecting a different filter or check back later for new additions.
            </p>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-dark/90 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-dark-light border border-dark-lighter"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-dark/50 rounded-full text-accent hover:text-primary transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-dark/50 rounded-full text-accent hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-dark/50 rounded-full text-accent hover:text-primary transition-colors"
              >
                <ArrowRight className="h-6 w-6" />
              </button>

                             {/* Image */}
               <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                 <img 
                   src={selectedImage.src} 
                   alt={selectedImage.alt}
                   className="w-full h-full object-cover"
                 />
               </div>

              {/* Image Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-display font-bold text-primary">
                    {selectedImage.title}
                  </h3>
                  <span className="px-4 py-2 bg-primary/20 rounded-full text-primary font-medium text-sm">
                    {selectedImage.style}
                  </span>
                </div>
                <p className="text-accent leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Portfolio
