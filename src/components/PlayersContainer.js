import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadPlayers,toggleThingy} from '../actions/actionCreators'
import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider'
import { API_WS_ROOT, API_ROOT, HEADERS } from '../constants'
import PlayerItem from './Players/PlayersItem'


class PlayersContainer extends Component {
    getPlayers() {
        axios.get('/api/v1/players')
            .then(response => {
                this.props.dispatch(loadPlayers(response.data));
            })
            .catch(error => console.log(error))
    }

    // handleReceivedPlayerdata = response => {
    //     console.log("got data");
    //     console.log(response);
    //     let player = response.player;
    //     let pindex = this.props.players.findIndex((obj => obj.id = player.id));
    //     console.log(pindex);
    //     console.log(this.props.players[pindex]);
    //     //this.props.players[pindex] = player;
        
    //     //this.props.dispatch(loadPlayers(this.props.players))
    // };

    // createPlayer = (e) => {
    //     if (e.key === 'Enter' && !(this.getTitle.value === '')) {
    //         axios.post('/api/v1/todos', { todo: { title: this.getTitle.value } })
    //             .then(response => {
    //                 this.props.dispatch(addTodo(response.data.id, response.data.title))
    //                 this.getTitle.value = '';
    //             })
    //             .catch(error => console.log(error))
    //     }
    // }

    componentDidMount() {
        this.getPlayers()
    }

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
        this.getPlayers()
        // this.props.thingy = response.player.thingy;
        console.log('new props', this.props);
        // this.forceUpdate();

    }

    createPlayer() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Props:", this.props,nextProps);
        console.log("State:", this.state,nextState);
        return true;
    }

    render() {
        console.log("Render called:Container with items", this.props)
        if(this.props.players.length) {
            return (
                <div className="listWrapper">
                    <ul className="playersList">
                        <ActionCableProvider url={API_WS_ROOT}>
                        {this.props.players.map((player,i) => {
                            return (
                                    <ActionCableConsumer
                                        channel={{ channel: 'PlayerdataChannel', character: player.id }}
                                        onReceived={this.handleReceivedPlayerdata}
                                        key={"AC" + player.id}
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
                            )
                        })}
                        </ActionCableProvider>
                    </ul>
                </div>
            )
        } else {
            return (<div>Loading...</div>);
        }
    }
}

const mapStateToProps = (state) => {
    return state
    
}

export default connect(mapStateToProps)(PlayersContainer)
















// import React, { Component } from 'react'

// class PlayersContainer extends Component {
//     render() {
//         return (
//             <div>
//                 <div className="inputContainer">
//                     <input className="playerInput" type="number"
//                         placeholder="Add a player" maxLength="50" />
//                 </div>
//                 <div className="listWrapper">
//                     <ul className="playerList">
//                     </ul>
//                 </div>
//             </div>
//         )
//     }
// }

// export default PlayersContainer