import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={last7DaysVaccination}
          margin={{top: 5}}
          width={1000}
          height={300}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 0}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: 'gray', strokeWidth: 0}}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="rect"
            layout="horizontal"
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            className="bar"
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            barSize="16%"
          />
          <Bar
            className="bar"
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            barSize="16%"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
