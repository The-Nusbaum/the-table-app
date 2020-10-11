import { LOAD_PLAYERS, LOAD_PLAYER, TOGGLE_THINGY } from '../actions/actionTypes'

function playersReducer(state = [], action) {
    console.log('Action:',action);
    console.log('State:',state);
    switch (action.type) {
        case LOAD_PLAYERS:
            return action.players

        case LOAD_PLAYER:
            return {
                ...state,
                player: action.player
            }

        case TOGGLE_THINGY:
            return state.map(player => (player.id === action.index)
                ? { ...player, thingy: !player.thingy }
                : player
            );

        default:
            return state;
    }
}

export default playersReducer