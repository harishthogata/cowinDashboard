import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  isInprogress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {coWinDataList: {}, apiStatus: apiStatusConstants.isInprogress}

  componentDidMount() {
    this.getCoWinData()
  }

  getCoWinData = async () => {
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    const data = await response.json()

    if (response.ok === true) {
      this.renderFetchedData(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInprogressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFetchedData = data => {
    const snakeToCamel = {
      last7DaysVaccination: data.last_7_days_vaccination.map(dayCount => ({
        vaccineDate: dayCount.vaccine_date,
        dose1: dayCount.dose_1,
        dose2: dayCount.dose_2,
      })),
      vaccinationByAge: data.vaccination_by_age.map(byAge => ({
        age: byAge.age,
        count: byAge.count,
      })),
      vaccinationByGender: data.vaccination_by_gender.map(byGender => ({
        count: byGender.count,
        gender: byGender.gender,
      })),
    }

    this.setState({
      apiStatus: apiStatusConstants.success,
      coWinDataList: snakeToCamel,
    })
  }

  renderSuccessView = () => {
    const {coWinDataList} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = coWinDataList

    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderDashBoard = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.isInprogress:
        return this.renderInprogressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="logo-dashboard">
          <div className="logo-container">
            <img
              className="coWin-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            />
            <p className="co-WIN-title">Co-WIN</p>
          </div>
          <h1 className="co-WIN-heading">CoWIN Vaccination in India</h1>
          <div className="dashBoard-container">{this.renderDashBoard()}</div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
