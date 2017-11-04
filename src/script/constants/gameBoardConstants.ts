import { PLAYER } from './playerConstants';

export const GAME_BOARD_INITIAL_STATE = [
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.ONE, PLAYER.TWO, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.TWO, PLAYER.ONE, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
    [PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER, PLAYER.INVALID_PLAYER],
];

export enum VECTOR_DIRECTION {
    NORTH_WEST,
    NORTH,
    NORTH_EAST,
    EAST,
    SOUTH_EAST,
    SOUTH,
    SOUTH_WEST,
}

// should be used with VECTOR_DIRECTION to access values here by index
export const VECTOR_FROM_POSITION = [
    [-1, -1], // NORTH_WEST
    [0, -1], // NORTH
    [1, -1], // NORTH_EAST
    [1, 0], // EAST
    [1, 1], // SOUTH_EAST
    [0, 1], // SOUTH
    [-1, 1], // SOUTH_WEST
];
