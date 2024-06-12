import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formdata, Vacancy } from '@/entities/Vacancy';
import useVacancyStore from '@/store/useVacancyStore';
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert';

interface ApplicationModalProps {
  show: boolean;
  handleClose: () => void;
  vacancy: Vacancy;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ show, handleClose, vacancy }) => {
  const [File, setFile] = useState<File | null>(null);
  const t = useTranslations('Blogs');
  const { VacancyResponse } = useVacancyStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!File) return;
    const data: Formdata = {
      File
    };
    const status = await VacancyResponse(vacancy.id, data);
    SuccessAlert("Успешно")
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Apply for: ')}{vacancy.position}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding:20}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>{t('Upload file')}</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Button style={{marginTop:20}} variant="primary" type="submit">
            {t('Send')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplicationModal;
