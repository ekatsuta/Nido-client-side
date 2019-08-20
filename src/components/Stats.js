import React from 'react'
import {Bar, Line, Pie, Scatter} from 'react-chartjs-2'
import {connect} from 'react-redux'
import {generateMSP} from '../actions/msp_template'

class Stats extends React.Component {

  state = {
    chartData: {
      labels: this.props.userType === 'host' ? ['Approved', 'Pending', 'Cancelled'] : ['Approved', 'Pending', 'Cancelled', 'Need Placement'],
      datasets: [
        {
          label: 'Number of Cases',
          data: this.props.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(240, 192, 192, 0.6)'
          ]
        }
      ]
    },
    guestData: {
      labels: (this.props.guestData ? this.props.guestData.labelArr : null),
      datasets: [
        {
          label: 'Number of Cases',
          data: (this.props.guestData ? this.props.guestData.dataArr : null),
          backgroundColor: "blue"
        }
      ]
    },
    creationData: {
      labels: (this.props.creationData ? this.props.creationData.labelArr.map(date => new Date(date)) : null),
      datasets: [
        {
          label: 'Number of Cases',
          fill: false,
          data: (this.props.creationData ?this.props.creationData.dataArr : null),
          backgroundColor: "blue"
        }
      ]
    }
  }

  renderChartGuest(){
    return (
      <div>
      <Pie
        data={this.state.guestData}
        options={{
          title: {
            display: true,
            text: "Guest Types"
          }
        }}
      />
      </div>
    )
  }


  render(){

    return(
      <div className="stats-container">
        <Bar
          data={this.state.chartData}
          width={70}
          height={30}
          options={{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        precision:0
                    }
                }],
                xAxes: [{
                    barPercentage: 0.4
                }]
            },
            title: {
              display: true,
              text: "Placement Status"
            }
          }}
        />
        {this.props.charttype === 'cases' ? this.renderChartGuest() : null}
      </div>
    )
  }
}

export default connect(generateMSP(["userType"]))(Stats)
