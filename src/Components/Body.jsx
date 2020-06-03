import React, { Component } from 'react';
import '../App.css';
import { Row, Col } from 'react-bootstrap';

export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
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
            direction: 0
        };
        this.APIKEY = 'fb228059cd79a2e758028fcd08f5d067';
        this.getData = this.getData.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            await this.setState({ latitude: pos.coords.latitude });
            await this.setState({ longitude: pos.coords.longitude });
            await this.getData();
        });
    }

    async getData() {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&appid=${this.APIKEY}`);
        let json = await response.json();
        await this.setState({ data: json });
        this.updateState();
    };

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
        this.setState({ direction: this.state.Vent.deg });
    }

    render() {
        return (
            <Row>
                <Col md={{ span: 6, offset: 3 }} xs={12}>
                    <Row>
                        <Col xs={12}><h1>{this.state.nom}</h1></Col>
                    </Row>
                    <Row>
                        <Col xs={4}><h4>T. Max</h4></Col>
                        <Col xs={4}><h4>Temperature</h4></Col>
                        <Col xs={4}><h4>T. Min</h4></Col>
                    </Row>
                    <Row>
                        <Col xs={4}><p>{this.state.temperature} ºC</p></Col>
                        <Col xs={4}><p>{this.state.TMax} ºC</p></Col>
                        <Col xs={4}><p>{this.state.TMin} ºC</p></Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={6} xs={7}><h4>Sensation Thermique</h4></Col>
                        <Col md={6} sm={6} xs={5}><p>{this.state.sensation} ºC</p></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><h4>Humidite</h4></Col>
                        <Col xs={6}><p>{this.state.humidite} %</p></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><h4>Pression</h4></Col>
                        <Col xs={6}><p>{this.state.pression} Pa</p></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><h4>Force du vent</h4></Col>
                        <Col xs={6}><p>{this.state.force} m/s</p></Col>
                    </Row>
                    <Row>
                        <Col xs={6}><h4>Direction du vent</h4></Col>
                        <Col xs={6}><p>{this.state.direction} º</p></Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
