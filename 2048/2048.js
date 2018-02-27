var game = {
  data: null, RN: 4, CN: 4,
  score: 0,
  state: 1,//1运行  0 结束
  RUNNING: 1, //运行中
  GAMEOVER: 0, //结束
  start() {
    this.state = this.RUNNING;
    this.score = 0;
    this.data = [];
    for (var r = 0; r < this.RN; r++) {
      this.data[r] = [];
      for (var c = 0; c < this.CN; c++) {
        this.data[r][c] = 0;
      }
    }
    this.randomNum();
    this.randomNum();
    this.updateView();
    document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 37:
          this.moveLeft();
          break;
        case 38:
          this.moveUp();
          break;
        case 39:
          this.moveRight();
          break;
        case 40:
          this.moveDown();
          break;
      }
    }.bind(this);
  },
  isGameOver() {
    for (var r = 0; r < this.RN; r++) {
      for (var c = 0; c < this.CN; c++) {
        if (this.data[r][c] == 0) {
          return false;
        } else if (c < this.CN - 1 && (this.data[r][c] = this.data[r][c + 1])) {
          return false;
        } else if (r < this.RN - 1 && (this.data[r][c] = this.data[r + 1][c])) {
          return false;
        }
      }
      return true;
    }
  },
  moveRight() {
    var before = String(this.data);
    for (var r = 0; r < 4; r++)
      this.moveRightInRow(r);
    var after = String(this.data);
    if (before != after) {
      this.randomNum();
      this.updateView();
    }
    ;
  },
  moveRightInRow(r) {
    for (var c = this.CN - 1; c > 0; c--) {
      var prevc = this.getPrevcInRow(r, c)
      if (prevc == -1) {
        break;
      } else {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[r][prevc];
          this.data[r][prevc] = 0;
          c++;
        } else if (this.data[r][c] == this.data[r][prevc]) {
          this.data[r][c] *= 2;
          this.score += this.data[r][c];
          this.data[r][prevc] = 0;
        }
      }
    }
  },
  getPrevcInRow(r, c) {
    for (var i = c - 1; i >= 0; i--) {
      if (this.data[r][i] != 0) {
        return i;
      }
    }
    return -1;
  },
  moveLeft() {
    var befor = String(this.data);
    for (var r = 0; r < this.RN; r++) {
      this.moveLeftInRow(r)
    }
    var after = String(this.data);
    if (befor != after) {
      this.randomNum()
      this.updateView()
    }
  },
  moveLeftInRow(r) {
    for (var c = 0; c < this.CN - 1; c++) {
      var nextc = this.getNextInRow(r, c)
      if (nextc == -1) {
        break;
      } else {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[r][nextc];
          this.data[r][nextc] = 0;
          c--;
        } else if (this.data[r][c] == this.data[r][nextc]) {
          this.data[r][c] *= 2;
          this.score += this.data[r][c];
          this.data[r][nextc] = 0;
        }
      }
    }
  },
  getNextInRow(r, c) {
    for (var i = c + 1; i < this.CN; i++) {
      if (this.data[r][i] != 0) {
        return i;
      }
    }
    return -1;
  },
  moveUp() {
    var befor = String(this.data);
    for (var c = 0; c < this.CN; c++) {
      this.moveUpIncol(c)
    }
    var after = String(this.data);
    if (befor != after) {
      this.randomNum()
      this.updateView()
    }
  },
  moveUpIncol(c) {
    for (var r = 0; r < this.CN - 1; r++) {
      var nextr = this.getNextrInCol(r, c)
      if (nextr == -1) {
        break;
      } else {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[nextr][c];
          this.data[nextr][c] = 0;
          r--;
        } else if (this.data[r][c] == this.data[nextr][c]) {
          this.data[r][c] *= 2;
          this.score += this.data[r][c];
          this.data[nextr][c] = 0;
        }
      }
    }
  },
  getNextrInCol(r, c) {
    for (var i = r + 1; i < this.RN; i++) {
      if (this.data[i][c] != 0) {
        return i;
      }
    }
    return -1;
  },
  moveDown() {
    var befor = String(this.data);
    for (var c = 0; c < this.CN; c++) {
      this.moveDownIncol(c)
    }
    var after = String(this.data);
    if (befor != after) {
      this.randomNum()
      this.updateView()
    }
  },
  moveDownIncol(c) {
    for (var r = this.CN - 1; r >= 0; r--) {
      var prevr = this.getPrevrInCol(r, c)
      if (prevr == -1) {
        break;
      } else {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[prevr][c];
          this.data[prevr][c] = 0;
          r++;
        } else if (this.data[r][c] == this.data[prevr][c]) {
          this.data[r][c] *= 2;
          this.score += this.data[r][c];
          this.data[prevr][c] = 0;
        }
      }
    }
  },
  getPrevrInCol(r, c) {
    for (var i = r - 1; i >= 0; i--) {
      if (this.data[i][c] != 0) {
        return i;
      }
    }
    return -1;
  },
  updateView() {//放数进html
    for (var r = 0; r < this.RN; r++) {
      for (var c = 0; c < this.CN; c++) {
        var n = this.data[r][c];
        var div = document.getElementById('c' + r + c);
        if (n != 0) {
          div.innerHTML = n;
          div.className = "cell n" + n;
        } else {
          div.innerHTML = "";
          div.className = "cell";
        }
      }
    }
    document.getElementById("score")
      .innerHTML = this.score;
    document.getElementById("gameOver")
      .style.display =
      this.state == this.GAMEOVER ?
        "block" : "none";
    this.state == this.GAMEOVER && (
      document.getElementById("final")
        .innerHTML = this.score)
  },
  randomNum() {//随机生成
    while (true) {
      var r = Math.floor(Math.random() * 4);
      var c = Math.floor(Math.random() * 4);
      if (this.data[r][c] == 0) {
        this.data[r][c] = Math.random() > 0.5 ? 2 : 4;
        break;
      }
    }
  },
}
game.start();