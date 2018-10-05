import
  PropTypes
  from
    'prop-types'
import React, {Component} from 'react'
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
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

export default class App extends React.Component {
  render() {
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth} style={{height: '100%'}}>
        <Visibility
          once={false}
          style={{height: '100%'}}
        >
          <Segment
            inverted
            textAlign='center'
            style={{height: '100%', padding: '1em 0em'}}
            vertical
            className={"content"}
          >
            <Container text>
              <Header
                as='h1'
                content='Shitty gifs'
                inverted
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '3em',
                }}
              />
              <Header
                as='h2'
                content='Yep, just another GIF collection'
                inverted
                style={{
                  fontSize: '1.7em',
                  fontWeight: 'normal',
                  marginTop: '1.5em',
                }}
              />
            </Container>
          </Segment>
        </Visibility>
      </Responsive>
  );
  }
}