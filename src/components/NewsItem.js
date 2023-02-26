import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, mode, author, date, source} = this.props;
    return (
      <div className='d-flex justify-content-center'>
        <div className="card" style={{backgroundColor: `${mode==='dark'?'black':'white'}`,color: `${mode==='dark'?'white':'black'}`}}>
          <div style={{display: 'flex', justifyContent: 'flex-end',position: 'absolute', right: 0}}>
        <span className=" badge rounded-pill bg-danger">
          {source}
  </span>
  </div>
  <img src={imageUrl? imageUrl : 'https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png'} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small  style={{color: `${mode==='dark'?'white':'black'}`}}>By {author? author: "Unknown"} on {new Date(date).toGMTString()} </small></p>
    <a href={newsUrl} rel="noreferrer"  target="_blank" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem