import React, { PureComponent } from 'react'
import OwlCarousel from 'react-owl-carousel'
import image1 from './images/1.jpeg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg'
import image4 from './images/4.jpg'
import image5 from './images/5.jpg'

export default class Home extends PureComponent {

    render() {
        return (
            <div>
                <section>
                    <OwlCarousel className="owl-carousel owl-height carousel-height" margin={0} smartSpeed={4500} navSpeed={4000}autoplay={true} 
                    items={2} loop={true} dots={false}>
                            <img className="homepage-image-slider" alt="Dnd 1" src={image1} />
                            <img className="homepage-image-slider" alt="Dnd 2" src={image2} />
                            <img className="homepage-image-slider" alt="Dnd 3" src={image3} />
                            <img className="homepage-image-slider" alt="Dnd 4" src={image4} />
                            <img className="homepage-image-slider" alt="Dnd 5" src={image5} />
                    </OwlCarousel>
                </section>
                <section>

                </section>
            </div>
        )
    }
}