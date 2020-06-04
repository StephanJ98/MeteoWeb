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

    componentDidMount() {
        if (!navigator.geolocation.getCurrentPosition(async (pos) => {
            await this.setState({ latitude: pos.coords.latitude });
            await this.setState({ longitude: pos.coords.longitude });
            await this.getData();
            this.setState({ noGeo: false });
        })) {
            this.setState({ noGeo: true });
        }
    }

    async getData() {
        if (!this.cookies.get('MeteoWebTemporalData') || this.state.latitude === null) {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&appid=${this.APIKEY}`);
            let json = await response.json();
            await this.setState({ data: json });
            await this.cookies.set('MeteoWebTemporalData', this.state.data, { maxAge: '1800' });
        } else {
            this.setState({ data: this.cookies.get('MeteoWebTemporalData') });
            this.updateState();
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
        await console.log('Ok');
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
                    <Col md={{ span: 6, offset: 3 }} xs={12}>
                        <Row>
                            <Col xs={12}><h1>{this.state.nom}</h1></Col>
                        </Row>
                        <Row>
                            <Col sm={4} xs={3}><h4>T.Max</h4></Col>
                            <Col sm={4} xs={6}><h4>Température</h4></Col>
                            <Col sm={4} xs={3}><h4>T.Min</h4></Col>
                        </Row>
                        <Row>
                            <Col xs={4}><p>{this.state.temperature} ºC</p></Col>
                            <Col xs={4}><p>{this.state.TMax} ºC</p></Col>
                            <Col xs={4}><p>{this.state.TMin} ºC</p></Col>
                        </Row>
                        <Row>
                            <Col xs={4}><h4>Humidité</h4></Col>
                            <Col xs={4}><h4>Sensation Thermique</h4></Col>
                            <Col xs={4}><h4>Pression</h4></Col>
                        </Row>
                        <Row>
                            <Col xs={4}><p>{this.state.humidite} %</p></Col>
                            <Col xs={4}><p>{this.state.sensation} ºC</p></Col>
                            <Col xs={4}><p>{this.state.pression} Pa</p></Col>
                        </Row>
                        <Row>
                            <Col xs={6}><h4>Direction du vent</h4></Col>
                            <Col xs={6}><h4>Force du vent</h4></Col>
                        </Row>
                        <Row>
                            <Col xs={6}><p>{this.state.direction} º</p></Col>
                            <Col xs={6}><p>{this.state.force} m/s / {this.state.force * 3.6} Km/h</p></Col>
                        </Row>
                    </Col>
                </Row>
                <Row><Col>{this.state.noGeo ? <h1>La geolocation n'est pas activé</h1> : ''}</Col></Row>
            </>
        );
    }
} export default withCookies(Body);
