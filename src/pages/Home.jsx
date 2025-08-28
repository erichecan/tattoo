import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User, Heart } from 'lucide-react'
import { tattooImages, availableStyles } from '../data/tattooImages'

const Home = () => {
  // 2024-12-19 15:45:00 - 修改首页，缩小预约模块高度，添加 Profile 展示
  
  const [selectedStyle, setSelectedStyle] = useState('all')

  const tattooStyles = [
    { key: 'all', label: 'All Styles', color: 'primary' },
    ...availableStyles.map(style => ({
      key: style.toLowerCase(),
      label: tattooImages[style]?.name || style,
      color: 'primary'
    }))
  ]

  const profiles = [
    {
      id: 1,
      name: 'Sarah Chen',
      style: 'realism',
      experience: '8 years',
      specialties: ['Portraits', 'Nature', 'Animals'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      style: 'blackwork',
      experience: '12 years',
      specialties: ['Geometric', 'Minimalist', 'Tribal'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      name: 'Emma Thompson',
      style: 'watercolor',
      experience: '6 years',
      specialties: ['Floral', 'Abstract', 'Dreamy'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: 'Alex Kim',
      style: 'japanese',
      experience: '15 years',
      specialties: ['Irezumi', 'Traditional', 'Cultural'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      rating: 5.0,
      reviews: 203
    },
    {
      id: 5,
      name: 'Lisa Park',
      style: 'minimalist',
      experience: '5 years',
      specialties: ['Simple Lines', 'Clean Design', 'Modern'],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      rating: 4.6,
      reviews: 78
    },
    {
      id: 6,
      name: 'David Wilson',
      style: 'traditional',
      experience: '18 years',
      specialties: ['American Traditional', 'Bold Colors', 'Classic'],
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      reviews: 234
    }
  ]

  const filteredProfiles = selectedStyle === 'all' 
    ? profiles 
    : profiles.filter(profile => profile.style === selectedStyle)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark opacity-90" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Art on Skin
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-accent mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where creativity meets craftsmanship. Transform your ideas into 
            permanent masterpieces with our expert tattoo artists.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/booking" className="btn-primary">
              Book Your Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Style Showcase Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-primary mb-6">
              Explore Our Styles
            </h2>
            <p className="text-xl text-accent max-w-3xl mx-auto leading-relaxed">
              Discover the diverse range of tattoo styles we specialize in, 
              each with its own unique artistic approach and techniques.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {availableStyles.map((style, index) => {
              const styleImages = tattooImages[style]?.images || [];
              const previewImage = styleImages[0] || '/images/placeholder.jpg';
              
              return (
                <motion.div
                  key={style}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-dark-light">
                    {/* Style Image */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                      <img 
                        src={previewImage}
                        alt={tattooImages[style]?.name || style}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-display font-bold text-primary mb-2">
                          {tattooImages[style]?.name || style}
                        </h3>
                        <p className="text-accent text-sm">
                          {tattooImages[style]?.description || `Explore ${style} designs`}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Style Tags Section */}
      <section className="py-16 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Choose Your Style
            </h2>
            <p className="text-accent-dark">
              Filter our artists by their specializations
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {tattooStyles.map((style) => (
              <button
                key={style.key}
                onClick={() => setSelectedStyle(style.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedStyle === style.key
                    ? 'bg-primary text-dark shadow-lg'
                    : 'bg-dark text-accent hover:bg-primary/20 hover:text-primary'
                }`}
              >
                {style.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Artists Profile Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-primary mb-6">
              Meet Our Artists
            </h2>
            <p className="text-xl text-accent max-w-3xl mx-auto leading-relaxed">
              Each artist brings their unique style and expertise to create 
              the perfect tattoo for you.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                className="card group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                {/* Artist Image */}
                <div className="relative mb-6">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl overflow-hidden">
                    <img 
                      src={profile.image} 
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-primary/90 text-dark px-2 py-1 rounded-full text-xs font-semibold">
                    {profile.style}
                  </div>
                </div>

                {/* Artist Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">
                    {profile.name}
                  </h3>
                  <p className="text-accent-dark mb-3">{profile.experience} experience</p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Heart 
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(profile.rating) 
                              ? 'text-primary fill-current' 
                              : 'text-accent-dark'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-accent-dark">
                      {profile.rating} ({profile.reviews} reviews)
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-dark text-accent-dark text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <Link to="/booking" className="btn-secondary w-full">
                    Book with {profile.name.split(' ')[0]}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
