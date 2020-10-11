// PlayerItemList.js
import React, { Component } from 'react'
import axios from 'axios'
import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider'
import { API_WS_ROOT } from '../../constants'
// import { API_WS_ROOT, API_ROOT, HEADERS } from '../../constants'
import { connect } from 'react-redux'
import { loadPlayer, toggleThingy } from '../../actions/actionCreators'

class PlayerItem extends Component {
    // constructor() {
    //     super(props)
    //     this.props = props
    // }
    toggleThingy(e, id) {
        axios.put(`/api/v1/players/${id}`, { player: { thingy: e.target.checked } })
            .then(response => {
                this.props.dispatch(toggleThingy(id))
                this.forceUpdate();
            })
            .catch(error => console.log(error))
    }

    handleReceivedPlayerdata = response => {
        console.log("got data");
        console.log(response);
        console.log('old props', this.props);
        this.props.dispatch(loadPlayer(response))
        // this.props.thingy = response.player.thingy;
        console.log('new props',this.props);
        // this.forceUpdate();
        
    }
    

    // componentDidMount() {
    //     console.log('items props',this.props);
    //     this.props.dispatch(loadPlayer(this.props));

    // }

    render() {
        console.log('render called:item with props', this.props);
        let player = this.props
        console.log("Player is now",player);
        const channel = "playerdata_channel" + player
        return (
            <ActionCableProvider url={API_WS_ROOT}>
                <ActionCableConsumer
                    channel={{ channel: 'PlayerdataChannel', character: player.id}}
                    onReceived={this.handleReceivedPlayerdata}
                >
                    <li className="player" key={player.id} id={player.id}>
                        <input className="playerCheckbox" type="checkbox"
                            checked={player.thingy} onChange={(e) => this.toggleThingy(e, player.id)} />
                        <label className="playerLabel">{player.id}</label>
                        <span className="deletePlayerBtn" onClick={(e) => this.deletePlayer(player.id)}>
                            x
                        </span>
                    </li>
                </ActionCableConsumer>
            </ActionCableProvider>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        player: state.player
    }
}

export default connect(mapStateToProps)(PlayerItem);