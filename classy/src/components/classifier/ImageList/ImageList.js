import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image';
import { Button, Spinner } from 'react-bootstrap';

class ImageList extends Component {
    state = {
        image: [],
        visible: 2,
        isLoading: true,
        newloaded: false,
        status:false,
    }

    componentDidMount() {
        setTimeout(this.getImages, 1000)
    }

    getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(resp => {
            this.setState({ image: resp.data, status:true })
        })
        this.setState({ isLoading: false })
    }

    handleVisible = () => {
        this.setState({ newloaded: true })
        const visible = this.state.visible
        setTimeout(() => {
            this.setState({ visible: visible + 2, newloaded: false })
        }, 300)
    }

    render() {
        const images = this.state.image.slice(0, this.state.visible).map(img => {
            return <Image key={img.id} picture={img.picture} name={img.classified} />
        })
        return (
            <div>
                <h1 style={{textAlign:'center'}}>History</h1>
                {this.state.isLoading
                    ? < Spinner animation="border" role="status"></Spinner>
                    : <React.Fragment>
                        {((this.state.image.length === 0) && (this.state.status)) &&
                            <p>Your history is blank</p>
                        }
                        {images}
                        {this.state.newloaded &&
                            < Spinner animation="border" role="status"></Spinner>
                        }
                        <br />
                        {(this.state.image.length > this.state.visible) && (this.state.image.length > 2) &&
                            <Button className="mb-5" variant="primary" size="lg" onClick={this.handleVisible}>Load More</Button>
                        }
                        {(this.state.image.length <= this.state.visible) && (this.state.image.length > 0) &&
                            <p className="mb-5">No More images to load</p>
                        }
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default ImageList;