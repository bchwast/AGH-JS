import {GameBoard} from "./components/GameBoard.js";
import {GameTable} from "./components/GameTable.js";
import {LeaderboardTable} from "./components/LeaderboardTable.js";

customElements.define("game-table", GameTable);
customElements.define("game-board", GameBoard);
customElements.define("leaderboard-table", LeaderboardTable);
