import { Component } from "react";
import * as API from 'service/imgApi';
import { SearchBar} from "./components/SearchBar/SearchBar";
import { AppStyled } from "./components/App.container";
import { Button } from "./components/Button/Button";
import { Loader } from "./components/Loader/Loader";
import { Modal } from "./components/Modal/Modal";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';


export class App extends Component { 
    state = {
      isLoading: false,
      page: 1,
      data: [],
      total: 0,
      pages: 0,
      error: '',
      query: '',
      showLargePic: false,
      picData: {},
    };
  
    async componentDidUpdate(prevProps, prevState) { 
      const { query, page } = this.state; 
      const { query: prevQuery, page: prevPage } = prevState; 
  
      if (query !== prevQuery || (page !== prevPage && page !== 1)) { 
        API.params.page = query !== prevQuery ? 1 : page;
        API.params.q = query;
        try {
          this.setState({ isLoading: true });
          const data = await API.getData(API.params);
          const { total, hits } = data;
  
          const properStructHits = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
                id,
                largeImageURL,
                webformatURL,
                tags,
              }))
  
          if (query !== prevQuery) {
            this.setState({
              data: [...properStructHits],
              page: API.params.page,
              total: total,
              pages: Math.ceil(total / API.params.per_page),
              isLoading: false,
            });
          } else {
            this.setState(p => ({
              data: [
                ...p.data,
                ...properStructHits,
              ],
              page: API.params.page,
              isLoading: false,
            }));
          }
        } catch (error) {
          this.setState({ error: true, isLoading: false });
          console.log(error);
        }
      }
    }
  
    setQuery = value => {
      this.setState({ query: value });
    };
  
    toggleLargeMode = picData => {
      this.setState(({ showLargePic }) => ({
        showLargePic: !showLargePic,
        picData,
      }));
    };
  
    handleLoadMore = () => {
      this.setState(p => ({ page: p.page + 1 }));
    };
  
    render() {
      const { data, isLoading, page, pages, showLargePic, picData } = this.state;
  
      return (
        <AppStyled>
          <SearchBar onSubmit={this.setQuery} />
          {data.length > 0 && (
            <ImageGallery data={data} toggleLargeMode={this.toggleLargeMode} />
          )}
          {isLoading && <Loader />}
          {data.length > 0 && page < pages && (
            <Button type="button" onClick={this.handleLoadMore}>
              Load more
            </Button>
          )}
          {showLargePic && (
            <Modal onClose={this.toggleLargeMode}>
              <img alt={picData.alt} src={picData.url} />
            </Modal>
          )}
        </AppStyled>
      );
    }
  }
  

