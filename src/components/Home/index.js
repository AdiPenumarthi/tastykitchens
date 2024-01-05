import {Component} from 'react'
import Cookies from 'js-cookie'

import ReactSlick from '../ReactSlick'
import Header from '../Header'

const apiOffersConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

const apiListConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    apiListStatus: apiListConstant.initial,
    apiOffersConstant: apiOffersConstant.initial,
    offersList: [],
    restaurantList: [],
  }

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({apiOffersConstant: apiOffersConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const data = await response.json()
    console.log(data.offers)

    if (response.status === 200) {
      const updatedList = data.offers.map(item => ({
        id: item.id,
        imageUrl: item.image_url,
      }))
      this.setState({offersList: updatedList})
    }
  }

  render() {
    const {offersList} = this.state
    return (
      <div className="home-container">
        <Header tab="HOME" />
        <ReactSlick offersList={offersList} />
      </div>
    )
  }
}

export default Home
