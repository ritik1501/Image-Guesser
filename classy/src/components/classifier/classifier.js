import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './classifier.css';
import { Alert, Button, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';

class Classifier extends Component {
    state = {
        files: [],
        isloading: false,
        recentImage: null,
    }

    onDrop = (files) => {
        this.setState({
            isloading: true,
            files: [],
            recentImage: null
        })
        this.loadImage(files)
    }

    loadImage = (files) => {
        setTimeout(() => {
            this.setState({
                files, isloading: false
            }, () => {
                console.log(this.state.files[0].name)
            })
        }, 1000)
    }

    activateSpinner = () => {
        this.setState({
            files: [],
            isloading: true
        })
    }

    deactivateSpinner = () => {
        this.setState({ isloading: false })
    }

    sendImage = () => {
        let formData = new FormData()
        this.activateSpinner();
        formData.append('picture', this.state.files[0], this.state.files[0].name)
        axios.post('http://127.0.0.1:8000/api/images/', formData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart-form-data'
            }
        }).then(resp => {
            this.getImageClass(resp);
            console.log(resp.data.id);
        }).catch(err => {
            console.log('Error is : ' + err);
        })
    }

    getImageClass = (obj) => {
        axios.get(`http://127.0.0.1:8000/api/images/${obj.data.id}/`, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart-form-data'
            }
        }).then(resp => {
            this.setState({ recentImage: resp })
            console.log(resp);
        }).catch(err => {
            console.log('Error is : ' + err);
        })
        this.deactivateSpinner()
    }

    render() {

        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        return (
            <Dropzone onDrop={this.onDrop} accept='image/png, image/jpg, image/jpeg'>
                {({ isDragActive, getRootProps, getInputProps }) => (
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone my-5 back' })}>
                            <input className="text-muted" {...getInputProps()} />
                            <i className="far fa-image mb-2 text-muted" style={{ fontSize: 100 }}></i>
                            <p>{isDragActive ? 'Drop Some Image' : 'Drag & drop some Images here, or click to select files'}</p>
                        </div>
                        <aside>
                            {files}
                        </aside>
                        {this.state.files.length > 0 &&
                            <Button variant="info mt-3" size="lg" onClick={this.sendImage}>Submit Image</Button>
                        }

                        {this.state.isloading &&
                            < Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        }
                        {this.state.recentImage &&
                            <React.Fragment>
                                <Alert variant="success">{this.state.recentImage.classified}</Alert>
                                <Image className="justify-content-center" src={this.state.recentImage.data.picture} height='200' rounded/>
                            </React.Fragment>
                        }

                    </section>
                )
                }
            </Dropzone>
        );
    }
}

export default Classifier;