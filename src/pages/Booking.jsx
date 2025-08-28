import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, MessageSquare, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

const Booking = () => {
  // 2024-12-19 15:30:00 - 创建预约页面，集成日历 UI 和预约表单，预留 Google Calendar API 对接功能
  
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    tattooStyle: '',
    estimatedDuration: '',
    placement: ''
  })

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ]

  const tattooStyles = [
    'Blackwork', 'Realism', 'Minimalist', 'Japanese (Irezumi)',
    'Watercolor', 'Traditional (American)', 'Custom Design'
  ]

  const estimatedDurations = [
    '1-2 hours', '2-4 hours', '4-6 hours', '6-8 hours', '8+ hours'
  ]

  const bodyPlacements = [
    'Arm', 'Leg', 'Back', 'Chest', 'Shoulder', 'Rib', 'Ankle', 'Wrist', 'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // TODO: 集成 Google Calendar API
    // 这里预留 Google Calendar 集成逻辑
    console.log('Booking submitted:', {
      date: selectedDate,
      time: selectedTime,
      ...formData
    })
    
    // 模拟提交成功
    alert('Booking request submitted successfully! We will contact you soon.')
  }

  const isDateDisabled = (date) => {
    // 禁用过去的日期和周日
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0
  }

  // 自定义日历组件
  const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    
    const getDaysInMonth = (date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startingDay = firstDay.getDay()
      
      const days = []
      
      // 添加前一个月的天数
      for (let i = 0; i < startingDay; i++) {
        const prevDate = new Date(year, month, -startingDay + i + 1)
        days.push({ date: prevDate, isCurrentMonth: false, isDisabled: isDateDisabled(prevDate) })
      }
      
      // 添加当前月的天数
      for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month, i)
        days.push({ date: currentDate, isCurrentMonth: true, isDisabled: isDateDisabled(currentDate) })
      }
      
      // 添加下一个月的天数
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(year, month + 1, i)
        days.push({ date: nextDate, isCurrentMonth: false, isDisabled: isDateDisabled(nextDate) })
      }
      
      return days
    }
    
    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    }
    
    const goToNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }
    
    const formatMonth = (date) => {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    }
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const days = getDaysInMonth(currentMonth)
    
    return (
      <div className="bg-dark-light rounded-xl p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </button>
          
          <h3 className="text-xl font-display font-bold text-primary">
            {formatMonth(currentMonth)}
          </h3>
          
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </button>
        </div>
        
        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-primary py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => !day.isDisabled && setSelectedDate(day.date)}
              disabled={day.isDisabled}
              className={`
                p-3 text-sm rounded-lg transition-all duration-300
                ${day.isDisabled 
                  ? 'text-accent-dark opacity-30 cursor-not-allowed' 
                  : day.date.toDateString() === selectedDate.toDateString()
                    ? 'bg-primary text-dark font-semibold'
                    : day.isCurrentMonth
                      ? 'text-accent hover:bg-primary/20 hover:text-primary'
                      : 'text-accent-dark'
                }
              `}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>
      </div>
    )
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
            Book Your Session
          </h1>
          <p className="text-xl text-accent max-w-3xl mx-auto leading-relaxed">
            Ready to start your tattoo journey? Book a consultation or session with our 
            expert artists. We'll work together to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card">
              <div className="flex items-center mb-6">
                <CalendarIcon className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-display font-bold text-primary">
                  Select Date & Time
                </h2>
              </div>
              
                             {/* Calendar */}
               <div className="mb-6">
                 <CustomCalendar />
               </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Available Time Slots
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 text-sm rounded-lg transition-all duration-300 ${
                        selectedTime === time
                          ? 'bg-primary text-dark font-semibold'
                          : 'bg-dark-light text-accent hover:bg-primary/20 hover:text-primary'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="card">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-display font-bold text-primary">
                  Your Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-accent mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark border border-dark-lighter rounded-lg text-accent placeholder-accent-dark focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-accent mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark border border-dark-lighter rounded-lg text-accent placeholder-accent-dark focus:outline-none focus:border-primary transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark border border-dark-lighter rounded-lg text-accent placeholder-accent-dark focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Tattoo Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-accent mb-2">
                      Preferred Style
                    </label>
                    <select
                      name="tattooStyle"
                      value={formData.tattooStyle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark border border-dark-lighter rounded-lg text-accent focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select a style</option>
                      {tattooStyles.map((style) => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-accent mb-2">
                      Estimated Duration
                    </label>
                    <select
                      name="estimatedDuration"
                      value={formData.estimatedDuration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark border border-dark-lighter rounded-lg text-accent focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select duration</option>
                      {estimatedDurations.map((duration) => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Body Placement
                  </label>
                  <select
                    name="placement"
                    value={formData.placement}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark border border-dark-lighter rounded-lg text-accent focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Select placement</option>
                    {bodyPlacements.map((placement) => (
                      <option key={placement} value={placement}>{placement}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-accent mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark border border-dark-lighter rounded-lg text-accent placeholder-accent-dark focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your design idea, any specific requirements, or questions..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Booking Request
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-2">
                Flexible Scheduling
              </h3>
              <p className="text-accent-dark">
                We offer flexible appointment times to accommodate your schedule.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-2">
                Free Consultation
              </h3>
              <p className="text-accent-dark">
                Get a free consultation to discuss your design and requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-primary mb-2">
                Studio Location
              </h3>
              <p className="text-accent-dark">
                Conveniently located in the heart of the city with easy access.
              </p>
            </div>
          </div>
        </motion.div>
      </div>


    </div>
  )
}

export default Booking
