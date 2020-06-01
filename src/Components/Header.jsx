import React, { Component } from 'react';
import '../App.css';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
    render() {
        return (
            <Row>
                <Col md={12}>
                    <p className="headerIcon"><FontAwesomeIcon icon={faCloudSun} /><strong>MeteoWeb</strong></p>
                </Col>
            </Row>
        )
    }
}
