import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';
import { Accordion } from 'react-accessible-accordion';
import AccordionItem from '@/components/Common/Accordion/AccordionItem';
import Image from 'next/image';
import useFAQStore from '@/store/useFAQStore';
import { useTranslations } from 'next-intl';

const FaqSection = () => {
  const [isOpen, setOpen] = useState(false);
  const fetchFAQs = useFAQStore().fetchFAQs;
  const { FAQList } = useFAQStore();
  const t = useTranslations('Blogs');
  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <>
      <div className="faq-content">
        {FAQList.map((faq) => (
          <><h2></h2><div className="faq-area-two ptb-100">
            <div className="faq-shape">
              <img src="/images/faq-shape1.png" alt="Faq" />
            </div>

            <div className="container">
              <div className="section-title">
                <h2>{faq.type}</h2>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="faq-img">
                    <Image src="/images/faq-main.jpg" alt="Faq" width={100} height={100} />

                    <div onClick={() => setOpen(true)} className="popup-youtube">
                      <i className="icofont-ui-play"></i>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <Accordion allowZeroExpanded preExpanded={['a']}>
                    {faq.faqs.map((item) => (
                      <AccordionItem
                        key={item.id}
                        id={item.id.toString()}
                        heading={item.question}
                        text={item.answer} />
                    ))}
                  </Accordion>

                </div>
              </div>
            </div>
          </div></>
        ))}

      </div>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="bk7McNUjWgw"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default FaqSection;
