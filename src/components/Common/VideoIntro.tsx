'use client'
import { url } from '@/config'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const VideoIntro = () => {
  const [isOpen, setOpen] = useState(false)
  const t = useTranslations('About');

  const openModal = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="video-wrap">
        <Tabs>
          <TabPanel>
            <div className="video-area">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="video-item">
                      <div className="video-wrapper">
                        <video controls autoPlay loop muted
                          src={`${url}/TempFileStorage/video/1.mov`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="video-area">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="video-item">
                      <div className="video-wrapper">
                        <video controls autoPlay loop muted
                          src={`${url}/TempFileStorage/video/2.mov`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="video-area">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="video-item">
                      <div className="video-wrapper">
                        <video controls autoPlay loop muted
                          src={`${url}/TempFileStorage/video/3.mov`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="video-area">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="video-item">
                      <div className="video-wrapper">
                        <video controls autoPlay loop muted
                          src={`${url}/TempFileStorage/video/4.mov`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="video-area">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="video-item">
                      <div className="video-wrapper">
                        <video controls autoPlay loop muted
                          src={`${url}/TempFileStorage/video/5.mov`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabList>
            <Tab>{t('Hospital Introduction')}</Tab>
            <Tab>{t('Reception')}</Tab>
            <Tab>{t('Treatment')}</Tab>
            <Tab>{t('Patients')}</Tab>
            <Tab>{t('Apparatuses')}</Tab>
          </TabList>
        </Tabs>
      </div>

      {/* If you want to change the video need to update videoID */}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="bk7McNUjWgw"
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default VideoIntro
