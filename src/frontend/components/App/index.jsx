import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Card,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react';
import {connect} from "react-redux";
import GridLoader from 'react-spinners/GridLoader';
import Masonry from 'react-masonry-component';

class App extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.fetchImages();
    }

    render() {
        let images;

        if (this.props.state.isFetching) {
            images = <GridLoader
                css={`margin-left:auto;margin-right:auto;`}
                sizeUnit={"px"}
                size={130}
                margin={`25px`}
                color={'#e0e0e0'}
                loading={true}
            />;
        } else {
            if (this.props.state.data && this.props.state.data.length > 0) {
                let res = [];
                this.props.state.data.forEach((imageSource, index) => {
                    if (imageSource.endsWith(".mp4")) {
                        // buggy css layout with video content
                        /* res.push(
                             <video controls>
                                 <source src={'https://storage.googleapis.com/shitty-gifs/' + imageSource}
                                         type="video/mp4" key={index}
                                 >
                                 </source>
                             </video>
                             );*/
                    } else {
                        res.push(<Card image={'https://storage.googleapis.com/shitty-gifs/' + imageSource}
                                       style={{margin: '25px'}}/>);
                    }
                });
                images =
                    <div className="masonry-container">
                        <Masonry
                            elementType={'div'}
                            options={{isFitWidth: true, isAnimated: false}} // default {}
                            disableImagesLoaded={false} // default false
                            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                            //  imagesLoadedOptions={''} // default {}
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        >
                            {res}
                        </Masonry>;
                    </div>
            } else {
                images = <Header
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
                {/* <Menu inverted style={{marginBottom: '0', borderBottom: '1px solid #212223'}}>
                    <Menu.Item
                        name='editorials'
                        onClick={this.handleItemClick}
                        position='right'
                    >
                        <i className="sun icon" style={{marginRight: '7px'}}></i> Theme light
                    </Menu.Item>

                    <Menu.Item
                        name='upcomingEvents'
                        onClick={this.handleItemClick}
                    >
                        <i className="cloud upload icon" style={{marginRight: '7px'}}></i> Upload
                    </Menu.Item>
                </Menu>*/}
                <Segment
                    inverted
                    textAlign='center'
                    style={{height: '100%'}}
                    vertical
                    className={"content"}
                >
                    {images}
                </Segment>
            </Responsive>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        state: state
    }
};

export default connect(mapStateToProps)(App);

App.propTypes = {
    fetchImages: PropTypes.func.isRequired
};