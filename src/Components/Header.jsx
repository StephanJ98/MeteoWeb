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
            document.getElementById('btnDarkMode').style.color = 'white';
        } else {
            document.body.classList.remove("bg-secondary");
            document.getElementById('btnDarkMode').style.color = '';
        }
    }

    render() {
        return (
            <Row>
                <Col md={{ span: 10, offset: 1 }} sm={{ span: 9, offset: 1 }} xs={11}>
                    <p className="headerIcon"><FontAwesomeIcon icon={faCloudSun} /><strong>MeteoWeb</strong></p>
                </Col>
                <Col md={1} sm={2} xs={1}>
                    <div id='btnDarkMode'>
                        <FontAwesomeIcon onClick={this.goDark} icon={faAdjust} />
                    </div>
                </Col>
            </Row>
        )
    }
}
