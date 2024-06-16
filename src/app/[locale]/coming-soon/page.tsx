'use client'
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react'

const ComingSoon = () => {
  const t = useTranslations('Contact');
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60 * 1000) // Initial time left in milliseconds (1 hour)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft <= 1000) {
          clearInterval(interval)
          return 0
        }
        return prevTimeLeft - 1000
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString()
  const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString()

  return (
    <div>
      <div className="coming-area">
        <div className="coming-item">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="coming-text">
                  <h2>{t('Check your email')}</h2>
                  <p>
                  {t('Check your email and get link')}
                  </p>

                  <div className="row coming-wrap" id="timer">
                    <div className="col-6 col-sm-6 col-lg-6">
                      <div className="coming-inner">
                        <div id="minutes">
                          {minutesStr} <span>{t('Minutes')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-6 col-lg-6">
                      <div className="coming-inner">
                        <div id="seconds">
                          {secondsStr} <span>{t('Seconds')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
