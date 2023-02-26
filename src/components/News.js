import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize: 8,
    mode: 'light',
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize : PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }
 
    constructor(){
        super();
        // console.log("News Constructor")
        this.state={
            articles: [],
            loading: true,
            page : 1,
            totalPage : 0
        }
    }

  //   updateNews= async()=>{
  //     const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=596b78b2c7a54ec2b27c6388ebbeb04e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  // this.setState({
  //   loading: true
  // })
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // this.setState({articles: parsedData.articles, page: 1, totalPage: parsedData.totalResults, loading: false})
  // // this.updateNews()
  //   }

async componentDidMount(){
  this.props.setProgress(10)
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
  this.setState({
    loading: true
  })
  let data = await fetch(url);
  this.props.setProgress(30)
  let parsedData = await data.json();
  this.props.setProgress(70)
  this.setState({articles: parsedData.articles, page: 1, totalPage: parsedData.totalResults, loading: false})
  // this.updateNews()
  this.props.setProgress(100)

}

// handlePrevClick= async()=>{
//   console.log("Prev")
//   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=596b78b2c7a54ec2b27c6388ebbeb04e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//   this.setState({
//     loading: true
//   })
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   this.setState({articles: parsedData.articles, page: this.state.page - 1, totalPage: parsedData.totalResults, loading: false })
  
//   // this.setState({
//   //   page: this.state.page - 1
//   // });
//   // console.log(this.state.page)
//   // this.updateNews();
// }
// handleNextClick= async()=>{
//   if(!(this.state.page + 1 > Math.ceil(this.state.totalPage/this.props.pageSize) )){
//     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=596b78b2c7a54ec2b27c6388ebbeb04e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//     this.setState({
//       loading: true
//     })
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   // console.log(this.state)
//   this.setState({articles: parsedData.articles, page: this.state.page + 1, totalPage: parsedData.totalResults,loading: false })
//   }
// }

fetchMoreData = async() => {
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  // this.setState({
  //   loading: true
  // })
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({articles: this.state.articles.concat(parsedData.articles),page: this.state.page + 1, totalPage: parsedData.totalResults})
  
};
 
  // this.setState({
  //   page: this.state.page + 1
  // });
  // console.log(this.state.page)
  // this.updateNews();
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let mode = this.props.mode
    return (
      <>
      {/* <div className='container my-3'> */}
       <h2 className={`text-${mode === 'dark' ? 'white' : 'black'}`} style={{textAlign: 'center', marginTop: '80px', marginBottom: '40px'}}>NewsMonkey - Top {`${this.capitalizeFirstLetter(this.props.category)}`} Headlines</h2> 
       {this.state.loading && <Spinner/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalPage}
          loader={<Spinner/>}
        >
          <div className="container">
       <div className="row"> 
       {this.state.articles.map((e)=>{
        return <div className="col-md-4 my-2" key= {e.url}>
        <NewsItem title={e.title?e.title:""} description= {e.description?e.description:''} imageUrl= {e.urlToImage} newsUrl= {e.url} mode={mode} author= {e.author} date={e.publishedAt} source={e.source.name} />
        </div>
       })}
       </div> 
       </div>
       </InfiniteScroll>
      </>
    )
  }
}

export default News