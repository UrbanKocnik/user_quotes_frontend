import { Link } from 'react-router-dom'
import DisplayQuotoes from '../../images/display_quotes.png'

const WelcomeGuest = () => {
      
  return (
    <div className='welcome-page'>
      <div className="welcome-first-row">
        <div className='welcome-text'>
          <h1 className='text-xlg'>Welcome <br />to <span>Quotastic</span></h1>
          <h3 className='text-md'>Quotastic is free online platform for you <br />to explore the quips, quotes, and proverbs. Sign <br />up and express yourself</h3>
          <Link to={'/register'} className="register_button_nav">Sign up</Link>
        </div>
        <div>
          <img className='display-image' src={DisplayQuotoes}/>
        </div>
      </div>

      <div className='explore-text'>
          <h1>Explore the world of <span>fantastic quotes</span></h1>
      </div>
    </div>
  )
}

export default WelcomeGuest