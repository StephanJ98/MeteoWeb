import React from 'react';
import '../App.css';
import { Row, Col } from 'react-bootstrap';

export default function Body() {
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
