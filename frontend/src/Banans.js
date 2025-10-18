import React, {Component, useState} from 'react';
import axios from "axios";

class Banans extends Component {
    state = {
        banans: []
    }

    async componentDidMount() {
        const response = await axios.get('/banans', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const body = await response.json();
        this.setState({banans: body});
    }


    render() {
        const { banans } = this.state;
        return (
            <div>
                <h1>Banans</h1>
                {banans.map((banan) =>
                    <div>
                        {banan.name} {banan.color}
                    </div>)}
            </div>

        )
    }
}
export default Banans;