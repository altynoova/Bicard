'use client'
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// @ts-ignore
import { Navigation } from 'swiper'
import useFeedbackStore from '@/store/useFeedbackStore'

const TestimonialSlider = () => {
  const { GetAllFeedbacks, feedbacks } = useFeedbackStore()

  useEffect(() => {
    GetAllFeedbacks()
  }, [])

  return (
    <>
      <div className="review-area ptb-100">
        <div className="container">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="feedback-slider"
          >
            {feedbacks.map((feedback, index) => (
              <SwiperSlide key={index}>
                <div className="feedback-item">
                  <div className="client-img">
                    <img src="#" alt={feedback.userName} />
                    <h3>{feedback.userName}</h3>
                  </div>
                  <p>{feedback.message}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default TestimonialSlider
