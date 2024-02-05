import React from 'react'

interface IDoctorSearchPanel {
  search: string
  setSearch: (value: string) => void
}

const DoctorSearchPanel = ({ search, setSearch }: IDoctorSearchPanel) => {
  return (
    <div className="doctor-search-area">
      <div className="container">
        <form>
          <div className="row doctor-search-wrap">
            <div className="col-sm-6 col-lg-6">
              <div className="doctor-search-item">
                <div className="form-group">
                  <i className="icofont-doctor-alt"></i>
                  <label>Поиск</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Имя доктора"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                <button type="submit" className="btn doctor-search-btn">
                  <i className="icofont-search-1"></i>
                </button>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6">
              <div className="doctor-search-item">
                <div className="form-group">
                  <i className="icofont-hospital"></i>
                  <label>Специальность</label>
                  <select className="form-control">
                    <option>Кардиохирург</option>
                    <option>Кардиолог</option>
                    <option>Сосудистый хирург (ангиолог)</option>
                    <option>Кардиолог-аритмолог</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DoctorSearchPanel