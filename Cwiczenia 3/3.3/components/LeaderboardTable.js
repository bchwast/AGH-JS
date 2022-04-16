class LeaderboardTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {;
    }

    render(players) {
        const table = document.createElement("table");
        const tr_header = document.createElement("tr");
        const th_nick = document.createElement("th");
        const th_score = document.createElement("th");
        th_nick.innerText = "Nick";
        th_score.innerText = "Score";
        tr_header.appendChild(th_nick);
        tr_header.appendChild(th_score);
        table.appendChild(tr_header);
        if (players !== null) {
            table.replaceChildren(th_nick, th_score);
            players = new Map([...players.entries()].sort((a, b) => b[1] - a[1]));
            let i = 0;
            for (let key of players.keys()) {
                if (i === 3) break;
                const tr = document.createElement("tr");
                const nick = document.createElement("th");
                const score = document.createElement("th");
                nick.innerText = key;
                score.innerText = players.get(key);
                tr.appendChild(nick);
                tr.appendChild(score)
                table.appendChild(tr);
                i++;
            }
        }

        this.shadowRoot.replaceChildren(table);
    }
}

export {LeaderboardTable};
