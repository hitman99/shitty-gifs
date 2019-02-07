import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Header,
    Card,
    Button,
    Icon,
    Responsive,
    Segment,
} from 'semantic-ui-react';
import SyncLoader from 'react-spinners/SyncLoader';
import Masonry from 'react-masonry-component';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            content: 'img',
            images: [],
            scroll: true
        };
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    static getDerivedStateFromProps(props, state) {
        const {images, fetchImages, error, loading} = props;
        if (!images.length && !loading && !error) {
            fetchImages();
        }
        return state;
    }

    handleScroll(event) {
        if ((document.body.scrollHeight - 100) < (window.innerHeight + document.documentElement.scrollTop)) {
            this.renderImages();
        }
    }

    renderImages() {
        let images = this.props.images;
        if (images && images.length > 0 && this.state.scroll) {
            this.setState({
                images: this.state.images.concat(images.splice(0, (images.length >= 30) ? 30 : images.length))
            });
            if (images.length === 0) {
                this.setState({
                    scroll: false
                });
            }
        }
    }

    changeContent() {
        this.setState({
            ready: (this.state.content === 'mp4') ? false : true,
            content: (this.state.content === 'img') ? 'mp4' : 'img'
        });
    }

    render() {
        let imageList, loader;
        const {loading, error} = this.props;
        const images = this.state.images;
        const {ready} = this.state;
        if (loading || !ready) {
            loader = <SyncLoader
                sizeUnit={"px"}
                size={30}
                margin={`25px`}
                color={'#e0e0e0'}
                loading={true}
            />;
        }
        if (images.length === 0 && this.props.images.length > 0) {
            this.renderImages();
        }
        if (!loading && images && images.length > 0) {
            switch (this.state.content) {
                case 'mp4':
                    imageList = images.filter(img => img.endsWith(".mp4")).map(
                        (img, idx) =>
                            <div style={{margin: '25px'}}
                                 key={idx}>
                                <video controls>
                                    <source src={'https://storage.googleapis.com/shitty-gifs/' + img} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                    );
                    break;
                case 'img':
                    imageList =
                        <div className={`masonry-container ${!ready ? 'hidden' : '' }`}>
                            <Masonry
                                elementType={'div'}
                                options={{transitionDuration: 1, isFitWidth: true}} // default {}
                                onLayoutComplete={() => {
                                    this.setState({ready: true})
                                }}
                                updateOnEachImageLoad={false}
                                style={{
                                    marginLeft: 'auto',
                                    marginRight: 'auto'
                                }}
                            >
                                {
                                    images.filter(img => !img.endsWith(".mp4")).map(
                                        (img, idx) =>
                                            <Card image={'https://storage.googleapis.com/shitty-gifs/' + img}
                                                  style={{margin: '25px'}}
                                                  key={idx}>
                                            </Card>
                                    )
                                }
                            </Masonry>
                        </div>
                    break;
                default:
                    break;
            }
        } else {
            if (!loading) {
                imageList = <Header
                    as='h1'
                    content='Ooops no shitty gifs found'
                    inverted
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '3em',
                    }}

                />
            }

        }
        return (
            <Responsive style={{height: '100%'}}>
                <Segment
                    inverted
                    textAlign='center'>
                    <Header
                        as='h1'
                        content='Shitty gifs'
                        inverted
                        style={{
                            fontSize: '4em',
                            fontWeight: 'normal',
                            marginBottom: '10px',
                            marginTop: '10px',
                        }}
                    />
                    <Button icon onClick={this.changeContent.bind(this)}>
                        <Icon name={(this.state.content === 'mp4') ? 'images' : 'video'}/>
                    </Button>
                </Segment>
                <Segment
                    inverted
                    textAlign='center'
                    style={{height: '100%'}}
                    vertical
                    className={"content"}
                >
                    {loader}
                    {imageList}
                </Segment>
            </Responsive>
        );
    }
}

App.propTypes = {
    fetchImages: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired
};