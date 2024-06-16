'use client'
import React, { useEffect, useState } from 'react';
import useArticleStore from '@/store/useArticleStore';
import useDoctorStore from '@/store/useDoctorStore';
import { ArticleRequestModel } from '@/entities/Article';
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Create = () => {
  const router = useRouter();
  const t = useTranslations('Services')

  const { CreateArticle } = useArticleStore();
  const { doctors, FetchDoctors } = useDoctorStore();

  const [title, setTitle] = useState<string>('');
  const [File, setFile] = useState<File | null>(null);
  const [authorName, setAuthorName] = useState<string>(''); // Store selected author id

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !File || !authorName) {
      ErrorAlert('Please fill in all required fields.');
      return;
    }

    const data: ArticleRequestModel = {
      title,
      File,
      authorName, 
    };

    const status = await CreateArticle(data);

    if (status === 200) {
      SuccessAlert('Успешно');
      router.push('/doctor/articles');
    } else {
      ErrorAlert('Произошла ошибка!');
    }
  };

  useEffect(() => {
    FetchDoctors(); 
  }, []);

  return (
    <div>
      <div className="Article-details-area pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="Article-details-item">
              <div className="Article-details-right">
                <div className="container pb-1 my-5">
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        {t('Name')}
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder={t('Name')}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="File">
                      {t('File')}
                      </label>
                      <input
                        className="form-control"
                        id="File"
                        type="file"
                        placeholder={t('File')}
                        accept="application/pdf"
                        onChange={(event) =>
                          setFile(
                            event.target.files && event.target.files[0]
                          )
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="author">
                      {t('Author')}
                      </label>
                      <select
                        className="form-select"
                        id="author"
                        value={authorName}
                        onChange={(event) =>
                          setAuthorName(event.target.value)
                        }
                      >
                        <option value="">{t('Select author')}</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.name}>
                            {doctor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="d-grid">
                      <input
                        className="btn btn-primary"
                        type="submit"
                        value={t('Save')}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
