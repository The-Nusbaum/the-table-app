import { LOAD_PLAYERS, LOAD_PLAYER, TOGGLE_THINGY} from './actionTypes';

export function loadPlayers(players) {
    return {type: LOAD_PLAYERS, players: players}
}

export function loadPlayer(player) {
    return {type: LOAD_PLAYER, player: player}
}

export function toggleThingy(index) {
    return { type: TOGGLE_THINGY, index: index }
}