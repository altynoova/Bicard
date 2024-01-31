import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'
import {
  Accordion,
} from 'react-accessible-accordion'
import AccordionItem from '@/components/Common/Accordion/AccordionItem'
import Image from 'next/image'

const FaqSection = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <div className="faq-area-two ptb-100">
        <div className="faq-shape">
          <img src="/images/faq-shape1.png" alt="Faq" />
          <img src="/images/faq-shape2.png" alt="Faq" />
        </div>

        <div className="container">
          <div className="section-title">
            <h2>Frequently Asked & Questions</h2>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="faq-img">
                <Image src="/images/faq-main.jpg" alt="Faq" />

                <div onClick={() => setOpen(true)} className="popup-youtube">
                  <i className="icofont-ui-play"></i>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <Accordion allowZeroExpanded preExpanded={['a']}>
                <AccordionItem
                  id={'a'}
                  heading={'What is the source of the virus?'}
                  text={`Coronaviruses are a large family of viruses. Some cause 
                                            illness in people, and others, such as canine and feline 
                                            coronaviruses, only infect animals. Rarely, animal 
                                            coronaviruses that infect animals have emerged to infect 
                                            people and can spread between people`}
                />

                <AccordionItem
                  id={'b'}
                  heading={'How does the virus spread?'}
                  text={`Coronaviruses are a large family of viruses. Some cause
                                            illness in people, and others, such as canine and feline
                                            coronaviruses, only infect animals. Rarely, animal
                                            coronaviruses that infect animals have emerged to infect
                                            people and can spread between people`}
                />

                <AccordionItem
                  id={'c'}
                  heading={'Who has had COVID-19 spread the illness to others?'}
                  text={`Coronaviruses are a large family of viruses. Some cause
                                            illness in people, and others, such as canine and feline
                                            coronaviruses, only infect animals. Rarely, animal
                                            coronaviruses that infect animals have emerged to infect
                                            people and can spread between people`}
                />

                <AccordionItem
                  id={'d'}
                  heading={'Will warm weather stop the outbreak of COVID-19?'}
                  text={`Coronaviruses are a large family of viruses. Some cause
                                            illness in people, and others, such as canine and feline
                                            coronaviruses, only infect animals. Rarely, animal
                                            coronaviruses that infect animals have emerged to infect
                                            people and can spread between people`}
                />

                <AccordionItem
                  id={'e'}
                  heading={'What is community spread?'}
                  text={`Coronaviruses are a large family of viruses. Some cause
                                            illness in people, and others, such as canine and feline
                                            coronaviruses, only infect animals. Rarely, animal
                                            coronaviruses that infect animals have emerged to infect
                                            people and can spread between people`}
                />
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="bk7McNUjWgw"
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default FaqSection
