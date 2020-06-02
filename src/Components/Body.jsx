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
            direction: 0,
            APIKEY: 'fb228059cd79a2e758028fcd08f5d067'
        };
        this.getData = this.getData.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            await this.setState({ latitude: pos.coords.latitude });
            await this.setState({ longitude: pos.coords.longitude });
            await this.getData();
            await console.log(this.state.nom);
        });
    }

    async getData() {
        var response = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=' + this.state.APIKEY);
        var json = await response.json();
        this.setState({ data: json });
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
                        <Col xs={6}>
                            <p>Ville</p>
                            <p>Force du vent</p>
                            <p>Direction du vent</p>
                            <p>Sensation Thermique</p>
                            <p>Humudite</p>
                            <p>Pression</p>
                            <p>Temperature</p>
                            <p>Temperature Max</p>
                            <p>Temperature Min</p>
                        </Col>
                        <Col xs={6}>
                            <p>{this.state.nom}</p>
                            <p>{this.state.force} m/s</p>
                            <p>{this.state.direction} º</p>
                            <p>{this.state.sensation} ºC</p>
                            <p>{this.state.humidite} %</p>
                            <p>{this.state.pression} Pa</p>
                            <p>{this.state.temperature} ºC</p>
                            <p>{this.state.TMax} ºC</p>
                            <p>{this.state.TMin} ºC</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}
