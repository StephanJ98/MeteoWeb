import React, { Component } from 'react';
import '../App.css';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faAdjust } from '@fortawesome/free-solid-svg-icons';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dark: false
        }
    }

    goDark = () => {
        this.setState({ dark: !this.state.dark });
        if (!this.state.dark) {
            document.body.classList.add("bg-secondary");
        } else {
            document.body.classList.remove("bg-secondary");
        }
    }


    render() {
        return (
            <Row>
                <Col md={11} sm={10} xs={10}>
                    <p className="headerIcon"><FontAwesomeIcon icon={faCloudSun} /><strong>MeteoWeb</strong></p>
                </Col>
                <Col md={1} sm={2} xs={2}>
                    <button id='btnDarkMode' className='btn' onClick={this.goDark}>
                        <FontAwesomeIcon icon={faAdjust} />
                    </button>
                </Col>
            </Row>
        )
    }
}
