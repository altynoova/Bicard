'use client'
import React, { useEffect } from 'react';
import useCertificateStore from '@/store/useCertificateStore';
import { useTranslations } from 'next-intl';
import { url } from '@/config';

const CertificatesGallery: React.FC = () => {
  const { GetAllCertificates, Certificates } = useCertificateStore()
  const t = useTranslations('About');


  useEffect(() => {
    GetAllCertificates()
  }, [GetAllCertificates]);

  return (
    <div className="blog-area-two pb-70">
      <div className="container">
        <div className="section-title">
          <h2>{t('Certificates')}</h2>
        </div>

        <div className="row">
          <div className="certificates-gallery">
            {Certificates.map((certificate) => (
              <div className="certificate-card" key={certificate.id}>
                <img
                  src={`${url}/TempFileStorage/${certificate.photoPath}`}
                  alt="Certificate"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="certificate-card-title">{certificate.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesGallery;
