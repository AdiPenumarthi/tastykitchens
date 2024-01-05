import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {offersList} = props
  const settings = {
    dots: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <ul className="offers-container">
      <Slider {...settings}>
        {offersList.map(offer => (
          <li className="offer-card" key={offer.id}>
            <img src={offer.imageUrl} alt="offer" className="offer-image" />
          </li>
        ))}
      </Slider>
    </ul>
  )
}

export default ReactSlick
