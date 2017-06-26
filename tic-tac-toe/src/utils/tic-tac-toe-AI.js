const playerList = {
    player:'',
    opponent:''
}

const initializePlayerList = (player) => {
    playerList.player = player?'o':'x'
    playerList.opponent = !player?'o':'x' 
}


const miniMax = (board, depth, isMax) => {
    let result = evaluteBoard(board);
    if (result.value === 10)
        return result.value;
    if (result.value === -10)
        return result.value;
    if (isComplete(board)){
        return 0;
    }

    if (isMax) {
        let best = -10000;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = playerList.player;
                best = Math.max(best, miniMax(board, depth+1, !isMax));
                board[i] = null;
            }


        }
        return best;
    } else {
        let best = 10000;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = playerList.opponent;
                best = Math.min(best, miniMax(board, depth+1, !isMax));
                board[i] = null;
            }


        }
        return best;
    }

}

 export const isComplete = (board) => {
    for (let i = 0; i < 9; i++) {
        if (board[i] === null)
            return false;
    }
    return true;
}
const evaluteBoard = (board) => {
    for (let i = 0; i < 9; i += 3) {
        if (board[i] !== null && board[i] === board[i + 1] && board[i] === board[i + 2]) {
            return {
                value : board[i] === playerList.player ? 10 : -10,
                indices: [i,i+1,i+2]
            };
        }
    }
    for (let i = 0; i < 3; i += 1) {
        if (board[i] !== null && board[i] === board[i + 3] && board[i] === board[i + 6]) {
            return {
                value : board[i] === playerList.player ? 10 : -10,
                indices: [i,i+3,i+6]
            };
        }
    }
    if (board[0] !== null
        && board[0] === board[4]
        && board[0] === board[8]) {
        return {
                value : board[0] === playerList.player ? 10 : -10,
                indices: [0,4,8]
        };
    }
    if (board[2] !== null
        && board[2] === board[4]
        && board[2] === board[6]) {
        return {
                value : board[2] === playerList.player ? 10 : -10,
                indices: [2,4,6]
        };
    }

    return {
                value : 0,
                indices: []
        };
}

export const evaluateBoard = (board, player) => {
    initializePlayerList(player);
    return evaluteBoard(board);
}

 export const findBestMove = (board, player) => {

    initializePlayerList(player);
    let bestval = -10000;
    let bestMove = -1;
    let val;
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = playerList.player;
            val = miniMax(board, 0, false);
            board[i] = null;
            if (val > bestval) {
                bestval = val;
                bestMove = i
            }
        }
    }
     console.log(board);
    console.log(bestMove, 'player: '+player);
    return bestMove;

}


const test = () => {
    const board = ['o',null,null,
                   null,null,null,
                   null,null,null];
    console.log(findBestMove(board, false));
}

//test();