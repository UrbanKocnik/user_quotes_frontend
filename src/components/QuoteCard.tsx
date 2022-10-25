
const QuoteCard = (props: any) => {
  return (
    <div className="quoteCard">
        <div className='rating'>
            <button>Like</button>
            <h4>{props.quote.rating}</h4>
            <button>Like</button>
        </div>
        <div className='quote'>
            <p>{props.quote.quote}</p>
        </div>
        <div className='author'>
            <p>{props.quote.user.image}</p>
            <p>{props.quote.user.first_name} {props.quote.user.last_name}</p>
        </div>
    </div>
    
  )
}

export default QuoteCard