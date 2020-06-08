import React, { Component } from 'react';
import '../App.css';
import { withCookies } from 'react-cookie';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faAdjust } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dark: false
        }
        this.cookies = this.props.cookies;
        this.changeColor = this.changeColor.bind(this);
        this.goDark = this.goDark.bind(this);
    }

    async componentDidMount() {
        if (this.cookies.get('MeteoWebDarkmode')) {
            await this.setState({ dark: this.cookies.get('MeteoWebDarkmode') })
            await this.changeColor();
        }
    }

    changeColor = () => {
        if (this.state.dark) {
            document.body.classList.add("bg-secondary");
            document.getElementById('btnDarkMode').style.color = 'white';
        } else {
            document.body.classList.remove("bg-secondary");
            document.getElementById('btnDarkMode').style.color = '';
        }
    }

    goDark = async () => {
        await this.setState({ dark: !this.state.dark });
        await this.changeColor();
        await this.cookies.remove('MeteoWebDarkmode', this.state.dark, { maxAge: '1800' });
        await this.cookies.set('MeteoWebDarkmode', this.state.dark, { maxAge: '1800' });
    }

    render() {
        return (
            <Row>
                <Col md={{ span: 8, offset: 2 }} sm={{ span: 7, offset: 2 }} xs={12}>
                    <p className="headerIcon"><FontAwesomeIcon icon={faCloudSun} /><strong>MeteoWeb</strong></p>
                </Col>
                <Col md={{ span: 1, offset: 1 }} sm={{ span: 2, offset: 1 }} xs={12}>
                    <div id='btnDarkMode'>
                        <FontAwesomeIcon onClick={this.goDark} icon={faAdjust} />
                    </div>
                </Col>
            </Row>
        )
    }
} export default withCookies(Header);
