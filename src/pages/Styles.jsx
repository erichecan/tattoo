import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Brush, Sparkles, Zap } from 'lucide-react'
import { tattooImages, availableStyles } from '../data/tattooImages'

const Styles = () => {
  // 2024-12-19 15:30:00 - 创建风格介绍页面，使用 Card 组件展示不同 Tattoo 风格
  
  const tattooStyles = availableStyles.map((style, index) => {
    const styleData = tattooImages[style];
    const iconMap = {
      'Japanese': Zap,
      'Realism': Brush,
      'Traditional': Palette,
      'Chicano': Brush,
      'Geometric': Sparkles,
      'Dark': Palette,
      'Blackwork': Palette,
      'Tribal': Zap,
      'Watercolor': Brush,
      'Minimalist': Sparkles
    };
    
    return {
      id: index + 1,
      name: styleData?.name || style,
      description: styleData?.description || `Beautiful ${style} tattoo designs`,
      icon: iconMap[style] || Palette,
      features: ['High quality', 'Professional work', 'Unique designs', 'Artistic excellence'],
      difficulty: 'Intermediate',
      duration: '2-6 hours',
      previewImage: styleData?.images?.[0] || null
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            Tattoo Styles
          </h1>
          <p className="text-xl text-accent max-w-3xl mx-auto leading-relaxed">
            Explore our diverse range of tattoo styles, each with its own unique characteristics 
            and artistic approach. From minimalist designs to complex realism, we bring your 
            vision to life.
          </p>
        </motion.div>

        {/* Styles Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tattooStyles.map((style) => (
            <motion.div
              key={style.id}
              className="card group cursor-pointer"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                <style.icon className="h-8 w-8 text-primary" />
              </div>

              {/* Preview Image */}
              {style.previewImage && (
                <div className="mb-6">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl overflow-hidden">
                    <img 
                      src={style.previewImage}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <h3 className="text-2xl font-display font-bold text-primary mb-4">
                {style.name}
              </h3>

              {/* Description */}
              <p className="text-accent leading-relaxed mb-6">
                {style.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {style.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-accent-dark">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Difficulty & Duration */}
              <div className="flex justify-between items-center pt-4 border-t border-dark-lighter">
                <div className="text-sm">
                  <span className="text-accent-dark">Difficulty: </span>
                  <span className={`font-semibold ${
                    style.difficulty === 'Beginner' ? 'text-green-400' :
                    style.difficulty === 'Intermediate' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {style.difficulty}
                  </span>
                </div>
                <div className="text-sm text-accent-dark">
                  <span>Duration: </span>
                  <span className="font-semibold text-accent">{style.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-display font-bold text-primary mb-6">
            Ready to Choose Your Style?
          </h2>
          <p className="text-lg text-accent mb-8 max-w-2xl mx-auto">
            Not sure which style is right for you? Book a consultation and we'll help you 
            choose the perfect style for your design.
          </p>
          <motion.button 
            className="btn-primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Consultation
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Styles
