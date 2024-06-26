import React, { useState } from 'react'
import Swal from 'sweetalert2'

const MySwal = withReactContent(Swal)
import withReactContent from 'sweetalert2-react-content'
import { SendContactInfo } from '@/libs/requests/ContactRequests'
import { useTranslations } from 'next-intl'

const alertContent = () => {
  MySwal.fire({
    title: 'Congratulations!',
    text: 'Your message was successfully send and will back to you soon',
    icon: 'success',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  })
}

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [text, setText] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = { name, email, number, subject, text }
    const response = await SendContactInfo(data)

    alertContent()
  }
  const t = useTranslations('Contact');
  return (
    <>
      <div className="drop-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 p-0">
              <div className="drop-item drop-img">
                <div className="drop-left">
                  <h2>
                  {t('Your message')}
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Ваша почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="number"
                            className="form-control"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Ваш номер"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="subject"
                            className="form-control"
                            placeholder="Ваш пол"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <textarea
                            name="text"
                            cols={30}
                            rows={6}
                            className="form-control"
                            placeholder="Ваше сообщение..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <button type="submit" className="drop-btn">
                        {t('Send')}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactForm
