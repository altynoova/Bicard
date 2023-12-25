import React from "react";

const AboutContent = () => {
  return (
    <>
      <div className="about-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-item">
                <div className="about-left">
                  <img src="/images/about1.png" alt="About" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-item about-right">
                <img src="/images/about-shape1.png" alt="About" />
                <h2>О нас</h2>
                <p>
                Клиника международного стандарта «Бикард» — это новейшие методы лечения и высококвалифицированные
специалисты, доброжелательный и заботливый персонал, приемлемые цены.

<p>ДИАГНОСТИКА</p>
<p>ПОЛИКЛИНИКА</p>
<p>СТАЦИОНАРНОЕ ЛЕЧЕНИЕ КАРДИОЛОГИЧЕСКИХ И КАРДИОХИРУРГИЧЕСКИХ ЗАБОЛЕВАНИЙ </p>
<p>РЕАНИМАЦИЯ</p>
<p>ОПЕРАЦИОННЫЙ БЛОК</p>
<p>ВЫСОКОТЕХНОЛОГИЧЕСКАЯ ЛАБОРАТОРИЯ</p>
<p>АНГИОГРАФИЯ ВСЕХ СОСУДОВ (КОРОНАРОГРАФИЯ)</p>{" "}
                </p>
                <ul>
                  <li>
                    <i className="icofont-check-circled"></i>
                    Просмотрите наш сайт
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i>
                    Выберите услугу
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i>
                    Отправьте сообщение
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
