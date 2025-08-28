import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Award, Users } from 'lucide-react'

const About = () => {
  // 2024-12-19 15:45:00 - 创建 About Us 页面，包含从首页移动过来的内容
  
  const stats = [
    { icon: Star, value: '500+', label: 'Happy Clients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '1000+', label: 'Tattoos Created' }
  ]

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
            About Us
          </h1>
          <p className="text-xl text-accent max-w-3xl mx-auto leading-relaxed">
            Discover the story behind our studio and the passion that drives our artists 
            to create exceptional tattoo experiences.
          </p>
        </motion.div>

        {/* Stats Section */}
        <section className="py-20 bg-dark-light rounded-2xl mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-accent-dark">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-primary mb-6">
                Meet Our Master Artist
              </h2>
              <p className="text-lg text-accent leading-relaxed mb-6">
                With over 15 years of experience in the tattoo industry, our lead artist 
                has mastered the art of creating meaningful, beautiful designs that tell 
                your unique story.
              </p>
              <p className="text-lg text-accent leading-relaxed mb-8">
                Specializing in custom designs, we work closely with each client to 
                ensure their vision becomes reality. From traditional styles to modern 
                techniques, we bring creativity and precision to every piece.
              </p>
              <Link to="/styles" className="btn-primary">
                Explore Our Styles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8">
                <div className="aspect-square bg-dark-light rounded-xl flex items-center justify-center">
                  <div className="text-center text-accent-dark">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-lg">Artist Portfolio</p>
                    <p className="text-sm">Click to view our work</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-4xl font-display font-bold text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p 
              className="text-xl text-accent mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Book your consultation today and let's create something extraordinary together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/booking" className="btn-primary text-lg px-8 py-4">
                Schedule Your Session
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
