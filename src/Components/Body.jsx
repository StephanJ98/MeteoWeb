import React, { Component } from 'react';
import '../App.css';
import { withCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            data: 0,
            nom: ' ',
            Main: 0,
            sensation: 0,
            humidite: 0,
            pression: 0,
            temperature: 0,
            TMax: 0,
            TMin: 0,
            ciel: 0,
            Vent: 0,
            force: 0,
            direction: 0,
            noGeo: false,
            ville: ''
        };
        this.cookies = this.props.cookies;
        this.APIKEY = 'fb228059cd79a2e758028fcd08f5d067';
        this.getData = this.getData.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (!navigator.geolocation.getCurrentPosition(async (pos) => {
            await this.setState({ latitude: pos.coords.latitude });
            await this.setState({ longitude: pos.coords.longitude });
            await this.getData();
            this.setState({ noGeo: false });
        })) {
            await this.getData();
            this.setState({ noGeo: true });
        }
    }

    async getData() {
        if (!this.cookies.get('MeteoWebTemporalData')) {
            if (this.state.latitude !== null) {
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&appid=${this.APIKEY}`);
                let json = await response.json();
                await this.setState({ data: json });
                await this.cookies.set('MeteoWebTemporalData', this.state.data, { maxAge: '1800' });
            }
        } else {
            await this.setState({ data: this.cookies.get('MeteoWebTemporalData') });
            await this.updateState();
        }
    };

    handleChange() {
        this.setState({ ville: document.getElementById('input').value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.ville}&units=metric&appid=${this.APIKEY}`);
        let json = await response.json();
        await this.setState({ data: json });
        await this.cookies.remove('MeteoWebTemporalData');
        await this.cookies.set('MeteoWebTemporalData', this.state.data, { maxAge: '1800' });
        await this.updateState();
    }

    updateState() {
        this.setState({ nom: this.state.data.name });
        this.setState({ Main: this.state.data.main });
        this.setState({ Vent: this.state.data.wind });
        this.setState({ sensation: this.state.Main.feels_like });
        this.setState({ humidite: this.state.Main.humidity });
        this.setState({ pression: this.state.Main.pressure });
        this.setState({ temperature: this.state.Main.temp });
        this.setState({ TMax: this.state.Main.temp_max });
        this.setState({ TMin: this.state.Main.temp_min });
        this.setState({ force: this.state.Vent.speed });
        this.setState({ direction: (this.state.Vent.deg === undefined) ? 0 : this.state.Vent.deg });
    };

    render() {
        return (
            <>
                <Row>
                    <Col>
                        <form onSubmit={this.handleSubmit}>
                            <input id='input' type='text' placeholder='Nom de la ville' onChange={this.handleChange} />
                            <button id='cherche' type='submit'><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }} xs={12}>
                        <Row className='interligne'>
                            <Col className='box' xs={12}><h1>{this.state.nom}</h1></Col>
                        </Row>
                        <Row className='interligne'>
                            <Col className='box' md={12} sm={12} xs={12}>
                                <Row>
                                    <Col xs={12}><h4>Température</h4></Col>
                                    <Col xs={12}><p>{this.state.temperature} ºC</p></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='interligne'>
                            <Col md={12} sm={12} xs={12}>
                                <Row>
                                    <Col className='boxG' md={6} sm={6} xs={12}>
                                        <Row>
                                            <Col xs={12}><h4>T.Max</h4></Col>
                                            <Col xs={12}><p>{this.state.TMax} ºC</p></Col>
                                        </Row>
                                    </Col>
                                    <Col className='boxD' md={6} sm={6} xs={12}>
                                        <Row>
                                            <Col xs={12}><h4>T.Min</h4></Col>
                                            <Col xs={12}><p>{this.state.TMin} ºC</p></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='interligne'>
                            <Col className='box' md={12} sm={12} xs={12}>
                                <Row>
                                    <Col xs={12}><h4>Sensation Thermique</h4></Col>
                                    <Col xs={12}><p>{this.state.sensation} ºC</p></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='interligne'>
                            <Col md={12} sm={12} xs={12}>
                                <Row>
                                    <Col className='boxG' md={6} sm={6} xs={12}>
                                        <Row>
                                            <Col xs={12}><h4>Humidité</h4></Col>
                                            <Col xs={12}><p>{this.state.humidite} %</p></Col>
                                        </Row>
                                    </Col>
                                    <Col className='boxD' md={6} sm={6} xs={12}>
                                        <Row>
                                            <Col xs={12}><h4>Pression</h4></Col>
                                            <Col xs={12}><p>{this.state.pression} Pa</p></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='interligne'>
                            <Col md={12} sm={12} xs={12}>
                                <Row>
                                    <Col className='boxG' md={6} sm={6} xs={12}>
                                        <Row>
                                            <Col xs={12}><h4>Direction du vent</h4></Col>
                                            <Col xs={12}><p>{this.state.direction} º</p></Col>
                                        </Row>
                                    </Col>
                                    <Col className='boxD' md={6} sm={6} xs={12}>
                                        <Row>
                                            <Col xs={12}><h4>Force du vent</h4></Col>
                                            <Col xs={12}><p>{this.state.force} m/s - {(this.state.force * 3.6).toFixed(2)} Km/h</p></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='interligne'><Col>{this.state.noGeo ? <h1>La geolocation n'est pas activé</h1> : ''}</Col></Row>
            </>
        );
    }
} export default withCookies(Body);
