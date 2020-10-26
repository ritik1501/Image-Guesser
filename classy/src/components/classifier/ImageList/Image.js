import React from 'react';
import {Card} from 'react-bootstrap';

const Image = (props) => {
    return (
        <Card className="mx-auto mb-3" style={{ width: '30rem' }}>
            <Card.Img variant="top" src={props.picture} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default Image;