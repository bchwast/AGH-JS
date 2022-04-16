let gameBoard = document.getElementsByTagName("game-board")[0];
let gameTable = document.getElementsByTagName("game-table")[0];
let leaderboardTable = document.getElementsByTagName("leaderboard-table")[0];
const game = document.getElementById("game");

const players = new Map();

document.getElementById("start").addEventListener("click", () => {
    const level1 = [
        document.getElementById("squares1").value,
        document.getElementById("speed1").value,
        document.getElementById("counterSpeed1").value,
    ];

    const level2 = [
        document.getElementById("squares2").value,
        document.getElementById("speed2").value,
        document.getElementById("counterSpeed2").value,
    ];

    const level3 = [
        document.getElementById("squares3").value,
        document.getElementById("speed3").value,
        document.getElementById("counterSpeed3").value,
    ];
    gameTable = document.createElement("game-table");
    gameBoard = document.createElement("game-board")
    gameTable.score = 0;
    gameTable.time = 180;
    gameBoard.width = window.innerWidth * 0.95;
    gameBoard.height = window.innerWidth >= 768 ? gameBoard.width * 0.5 : gameBoard.width * 1.5;
    gameBoard.elementSize = window.innerWidth >= 768 ? gameBoard.width * 0.05 : gameBoard.height * 0.05;
    game.replaceChildren(gameTable, leaderboardTable, gameBoard);

    gameBoard.addEventListener(
        "score",
        e => {
            gameTable.score = Number(gameTable.score) + Number(e.detail.points);
            players.set(document.getElementById("nick").value, Number(gameTable.score));
        }
    );
    gameTable.addEventListener("stop", () => {
        gameBoard.dispatchEvent(new CustomEvent("stop"));
        gameBoard.stopped = 1   ;
        leaderboardTable.render(players);
    });
    gameBoard.start([level1, level2, level3]);
    gameTable.start();
});

document.getElementById("stop").addEventListener("click", () => {
    gameTable.dispatchEvent(new CustomEvent("stop"));
});
