import React, { useState } from 'react';
import '../App.css';
import { Row, Col } from 'react-bootstrap';

export default function Body() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    navigator.geolocation.getCurrentPosition(location);
    function location(pos) {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        if (latitude !== null && longitude !== null){
            console.log(latitude, longitude);
        }
    };
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }} xs={12}>
                <Row>
                    <Col xs={6}>
                        <p>Titres</p>
                    </Col>
                    <Col xs={6}>
                        <p>Données</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
