let canvas;
let ctx;
const tileStaticLocation = [20, 140, 260, 380]
const tileLocation = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false],]
let moved = false
let score = 0
class Tale {
    x = 0
    y = 0
    count = 2
    newTile=true  
    tempCount = 0
    constructor() {
        this.x = Math.floor(Math.random() * 4);
        this.y = Math.floor(Math.random() * 4);
        while (tileLocation[this.x][this.y] != false) {
            this.x = Math.floor(Math.random() * 4);
            this.y = Math.floor(Math.random() * 4);
        }
        this.#drawTail();
    }
    rePaint(xNew, yNew) {
        ctx.beginPath();
        ctx.fillStyle = "rgb(214,205,196)";
        ctx.fillRect(tileStaticLocation[this.y] + 5, tileStaticLocation[this.x] + 5, 90, 90);
        tileLocation[this.x][this.y] = false
        this.x = xNew;
        this.y = yNew;
        this.#drawTail();
    }
    #drawTail() {
        if (this.count == 2 && this.newTile) {
            this.newTile=!this.newTile
            ctx.fillStyle = "rgb(245, 234, 35)";
        }else
        if (this.count == 2) {
            ctx.fillStyle = "rgb(238,228,218)";
        }
        else if (this.count == 4) {
            ctx.fillStyle = "rgb(236,224,200)"
        }
        else if (this.count == 8) {
            ctx.fillStyle = "rgb(242,177,121)"
        }
        else if (this.count == 16) {
            ctx.fillStyle = "rgb(245,149,99)"
        }
        else if (this.count == 32) {
            ctx.fillStyle = "rgb(240,125,94)"
        }
        else if (this.count == 64) {
            ctx.fillStyle = "rgb(246,93,59)"
        }
        else {
            ctx.fillStyle = "rgb(13,13,12)"
        }
        ctx.fillRect(tileStaticLocation[this.y] + 5, tileStaticLocation[this.x] + 5, 90, 90);
        if (this.count > 1000) {
            ctx.font = "35px arial"
            ctx.fillStyle = "white";
            ctx.fillText(this.count, tileStaticLocation[this.y]+10, tileStaticLocation[this.x] + 60);
        }
        else if (this.count > 100) {
            ctx.font = "45px arial"
            ctx.fillStyle = "white";
            ctx.fillText(this.count, tileStaticLocation[this.y] + 12, tileStaticLocation[this.x] + 65);
        }
        else if (this.count > 10) {
            ctx.font = "55px arial"
            ctx.fillStyle = "white";
            ctx.fillText(this.count, tileStaticLocation[this.y] + 20, tileStaticLocation[this.x] + 70);
        }
        else {
            ctx.font = "75px arial"
            ctx.fillStyle = "rgb(13,12,12)";
            ctx.fillText(this.count, tileStaticLocation[this.y] + 30, tileStaticLocation[this.x] + 75);
        }
    }
    static background() {
        ctx.fillStyle = "rgb(187,173,160)";
        ctx.fillRect(0, 0, 500, 500);
        ctx.fillStyle = "rgb(214,205,196)";
        ctx.beginPath();
        for (let i = 0; i < tileStaticLocation.length; i++) {
            for (let j = 0; j < tileStaticLocation.length; j++) {
                ctx.fillRect(tileStaticLocation[i], tileStaticLocation[j], 100, 100)
            }
        }
    }
}
initialize = (id) => {
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");
    startGame();
    userAction();
}
startGame = () => {
    const temp = "score = "
    score = 0
    document.getElementById("score").innerHTML = temp.concat(score);
    Tale.background();
    for (let i = 0; i < tileLocation.length; i++) {
        for (let j = 0; j < tileLocation[i].length; j++) {
            tileLocation[i][j] = false
        }
    }
    tile1 = new Tale();
    tile2 = new Tale();
    tileLocation[tile1.x][tile1.y] = tile1;
    tileLocation[tile2.x][tile2.y] = tile2;
}
userAction = () => {
    document.addEventListener("keydown", function (event) {
        ctx.beginPath();
        switch (event.keyCode) {
            case 37:
                {
                    console.log("left")
                    for (let i = 0; i < tileLocation.length; i++) {
                        for (j = 0; j < tileLocation[i].length; j++) {
                            if (tileLocation[i][j] != false && j > 0) {
                                temp = j - 1
                                while (temp >= 0) {
                                    if (!tileLocation[i][temp]) {
                                        tileLocation[i][temp] = tileLocation[i][temp + 1]
                                        tileLocation[i][temp + 1] = false
                                        tileLocation[i][temp].rePaint(i, temp);
                                    }
                                    else if (tileLocation[i][temp].count == tileLocation[i][temp + 1].count) {
                                        tileLocation[i][temp] = tileLocation[i][temp + 1]
                                        tileLocation[i][temp + 1] = false
                                        tileLocation[i][temp].count = tileLocation[i][temp].count * 2
                                        score += tileLocation[i][temp].count
                                        tileLocation[i][temp].rePaint(i, temp);
                                        break;
                                    }
                                    temp--;
                                }
                                moved = true;
                            }
                        }
                    }
                    break;
                }
            case 38:
                {
                    console.log("up")
                    for (let i = 0; i < tileLocation.length; i++) {
                        for (j = 0; j < tileLocation[i].length; j++) {
                            if (tileLocation[i][j] != false && i > 0) {
                                temp = i - 1
                                while (temp >= 0) {
                                    if (!tileLocation[temp][j]) {
                                        tileLocation[temp][j] = tileLocation[temp + 1][j]
                                        tileLocation[temp + 1][j] = false
                                        tileLocation[temp][j].rePaint(temp, j);
                                    }
                                    else if (tileLocation[temp][j].count == tileLocation[temp + 1][j].count) {
                                        tileLocation[temp][j] = tileLocation[temp + 1][j]
                                        tileLocation[temp + 1][j] = false
                                        tileLocation[temp][j].count = tileLocation[temp][j].count * 2
                                        score += tileLocation[temp][j].count
                                        tileLocation[temp][j].rePaint(temp, j);
                                        break;
                                    }
                                    temp--;
                                }
                                moved = true
                            }
                        }
                    }
                    break;
                }
            case 39:
                {
                    console.log("right")
                    for (let i = tileLocation.length - 1; i >= 0; i--) {
                        for (j = tileLocation[i].length - 1; j >= 0; j--) {
                            if (tileLocation[i][j] != false && j < 3) {
                                temp = j + 1
                                while (temp <= 3) {
                                    if (!tileLocation[i][temp]) {
                                        tileLocation[i][temp] = tileLocation[i][temp - 1]
                                        tileLocation[i][temp - 1] = false
                                        tileLocation[i][temp].rePaint(i, temp);
                                    }
                                    else if (tileLocation[i][temp].count == tileLocation[i][temp - 1].count) {
                                        tileLocation[i][temp] = tileLocation[i][temp - 1]
                                        tileLocation[i][temp - 1] = false
                                        tileLocation[i][temp].count = tileLocation[i][temp].count * 2
                                        score += tileLocation[i][temp].count
                                        tileLocation[i][temp].rePaint(i, temp);
                                        break;
                                    }
                                    temp++;
                                }
                                moved = true
                            }
                        }
                    }
                    break;
                }
            case 40:
                {
                    console.log("down")
                    for (let i = tileLocation.length - 1; i >= 0; i--) {
                        for (j = tileLocation[i].length - 1; j >= 0; j--) {
                            if (tileLocation[i][j] != false && i < 3) {
                                temp = i + 1
                                while (temp <= 3) {
                                    if (!tileLocation[temp][j]) {
                                        tileLocation[temp][j] = tileLocation[temp - 1][j]
                                        tileLocation[temp - 1][j] = false
                                        tileLocation[temp][j].rePaint(temp, j);
                                    }
                                    else if (tileLocation[temp][j].count == tileLocation[temp - 1][j].count) {
                                        tileLocation[temp][j] = tileLocation[temp - 1][j]
                                        tileLocation[temp - 1][j] = false
                                        tileLocation[temp][j].count = tileLocation[temp][j].count * 2
                                        score += tileLocation[temp][j].count
                                        tileLocation[temp][j].rePaint(temp, j);
                                        break;
                                    }
                                    temp++;
                                }
                                moved = true
                            }
                        }
                    }
                    break;
                }
        }
        if (moved) {
            const temp = "score = "
            document.getElementById("score").innerHTML = temp.concat(score);
            moved = false
            const tile = new Tale();
            tileLocation[tile.x][tile.y] = tile
        }
    })
}