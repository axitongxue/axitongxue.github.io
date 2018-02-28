var game = {
  CSIZE: 26,//格子大小
  OFFSET: 15,//内边距
  pg: null,//容器元素
  shape: null,//主角图形——正在下落的图形
  nextShape: null,//备胎图形
  interval: 500,//下落的时间间隔——游戏速度
  timer: null,//定时器序号
  wall: null,//保存停止下落的方块的墙
  RN: 20, CN: 10,//保存总行数和总列数
  lines: 0,//保存总行数
  score: 0,//保存得分
  SCORES: [0, 10, 30, 60, 120],
  state: 1,//保存游戏状态
  GAMEOVER: 0,//游戏结束
  RUNNING: 1,//运行
  PAUSE: 2,//暂停
  start() {
    this.state = this.RUNNING;
    this.score = this.lines = 0;
    this.wall = [];
    for (var r = 0; r < this.RN; r++) {
      this.wall[r] = new Array(this.CN);
    }
    this.pg = document.querySelector(".playground");
    this.shape = this.randomShape();
    this.nextShape = this.randomShape();
    this.paint();
    this.timer = setInterval(this.moveDown.bind(this), this.interval);
    document.onkeydown = function (e) {
      switch (e.keyCode) {//判断按键号
        case 37: //是37: 就左移
          this.state == this.RUNNING &&
          this.moveLeft();
          break;
        case 39: //是39: 就右移
          this.state == this.RUNNING &&
          this.moveRight();
          break;
        case 40: //是40: 就下落
          this.state == this.RUNNING &&
          this.moveDown();
          break;
        case 32: //是32(空格): 就一落到底
          this.state == this.RUNNING &&
          this.hardDrop();
          break;
        case 38: //是38: 顺时针旋转
          this.state == this.RUNNING &&
          this.rotateR();
          break;
        case 90: //是90(Z): 逆时针旋转
          this.state == this.RUNNING &&
          this.rotateL();
          break;
        case 83: //是83(S): 重启
          this.state == this.GAMEOVER &&
          this.start();
          break;
        case 81: //是81(Q): 放弃
          this.state != this.GAMEOVER &&
          (this.gameOver(), this.paint());
          break;
        case 80: //是80(P): 暂停
          this.state == this.RUNNING &&
          this.pause();
          break;
        case 67: //是67(C): 继续
          this.state == this.PAUSE &&
          this.myContinue();
      }
    }.bind(this);
  },
  pause() {//暂停
    clearInterval(this.timer);
    this.state = this.PAUSE;
    this.paint();
  },
  gameOver(){
    //停止定时器,清除timer,修改状态为结束
    clearInterval(this.timer);
    this.timer=null;
    this.state=this.GAMEOVER;
  },
  myContinue(){//继续
    this.timer=setInterval(
      this.moveDown.bind(this),this.interval
    );
    this.state=this.RUNNING;
    this.paint();
  },
  randomShape() {//随机生成图形
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        return new O();
      case 1:
        return new I();
      case 2:
        return new T();
    }
  },
  canRotate() {
    //遍历shape的每个格子
    for (var i = 0; i < this.shape.cells.length; i++) {
      //将当前格保存在cell中
      var cell = this.shape.cells[i];
      //如果cell的c<0或cell的c>=CN
      if (cell.c < 0 || cell.c >= this.CN
        //或cell的r<0或cell的r>=RN
        || cell.r < 0 || cell.r >= this.RN
        //或wall中和cell相同位置不是undefined
        || this.wall[cell.r][cell.c] !== undefined
      ) {
        return false;//返回false
      }
    }//(遍历结束)
    return true;//返回true
  },
  rotateR() {
    this.shape.rotateR();
    if (!this.canRotate()) {
      this.shape.rotateL();
    }
  },
  rotateL() {
    this.shape.rotateL();
    if (!this.canRotate()) {
      this.shape.rotateR();
    }
  },
  hardDrop() {
    if (this.canDown())
      this.moveDown()
  },
  canRight() {
    for (var i = 0; i < this.shape.cells.length; i++) {
      var cell = this.shape.cells[i];
      if (cell.c == 9 || this.wall[cell.r][cell.c + 1] !== undefined)
        return false;
    }
    return true;
  },
  moveRight() {
    if (this.canRight()) {
      for (var i = 0; i < this.shape.cells.length; i++) {
        this.shape.cells[i].c++;
      }
    }
    this.paint();
  },
  canLeft() {
    for (var i = 0; i < this.shape.cells.length; i++) {
      var cell = this.shape.cells[i];
      if (cell.c == 0 || this.wall[cell.r][cell.c - 1] !== undefined)
        return false;
    }
    return true;
  },
  moveLeft() {
    if (this.canLeft()) {
      for (var i = 0; i < this.shape.cells.length; i++) {
        this.shape.cells[i].c--;
      }
    }
    this.paint();
  },
  canDown() {//判断下落
    for (var i = 0; i < this.shape.cells.length; i++) {
      var cell = this.shape.cells[i];
      if (cell.r == this.RN - 1)
        return false;
      else if (this.wall[cell.r + 1][cell.c] !== undefined)
        return false;
    }
    return true;
  },
  landIntoWall() {//主角图形落入墙中
    for (var i = 0; i < this.shape.cells.length; i++) {
      var cell = this.shape.cells[i];
      this.wall[cell.r][cell.c] = cell;
    }
  },
  moveDown(){//下落一步
    if(this.canDown()){//如果可以下落
      this.shape.moveDown();//调用shape的moveDown
    }else{//否则,停止下落
      this.landIntoWall();//落到墙里
      var ln=this.deleteRows()//删除满格行
      this.lines+=ln;
      this.score+=this.SCORES[ln];
      //如果游戏结束
      if(this.isGameOver()){
        this.gameOver();
      }else{//否则
        this.shape=this.nextShape;//备胎转正
        this.nextShape=this.randomShape();//生成新备胎
      }
    }
    this.paint();//重绘主角
  },
  isGameOver(){//判断游戏结束
    for(var i=0;i<this.nextShape.cells.length;i++){
      var cell=this.nextShape.cells[i];
      if(this.wall[cell.r][cell.c])
        return true;
    }
    return false;//返回false
  },
  deleteRows() {//删除满格行
    for (var r = this.RN - 1, ln = 0; r >= 0 && ln < 4; r--) {
      if (this.wall[r].join("") == "") break;
      if (this.isFullRow(r)) {
        this.deleteRow(r);
        r++;
        ln++;
      }
    }
    return ln;
  },
  deleteRow(r) {//删除当前行
    for (; r >= 0; r--) {
      this.wall[r] = this.wall[r - 1];
      this.wall[r - 1] = new Array(this.CN);//改的数组
      for (var c = 0; c < this.CN; c++) {
        if (this.wall[r][c] !== undefined)
          this.wall[r][c].r++;
      }
      if (this.wall[r - 2].join("") == "")
        break;
    }
  },
  isFullRow(r) {//判断是否满格
    return String(this.wall[r]).search(/^,|,,|,$/) == -1
  },
  paintScore() {
    document.getElementById("score").innerHTML = this.score;
    document.getElementById("lines").innerHTML = this.lines;
  },
  paintState() {//重绘状态
    if (this.state != this.RUNNING) {
      var img = new Image();
      img.src = this.state == this.GAMEOVER ?
        "img/game-over.png" :
        "img/pause.png";
      img.className = "state";
      this.pg.appendChild(img);
    }
  },
  paint() {//重绘一切
    var reg = /<img [^>]+>/g;
    this.pg.innerHTML = this.pg.innerHTML.replace(reg, "");
    this.paintShape();
    this.paintWall();
    this.paintNext();
    this.paintScore();
    this.paintState();
  },
  paintNext() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < this.nextShape.cells.length; i++) {
      var cell = this.nextShape.cells[i];
      var img = this.paintCell(cell, frag);
      img.style.left = parseFloat(img.style.left) + 10 * this.CSIZE + "px";
      img.style.top = parseFloat(img.style.top) + this.CSIZE + "px";
    }
    this.pg.appendChild(frag);
  },
  paintWall() {//绘制墙
    var frag = document.createDocumentFragment();
    for (var r = this.RN - 1; r >= 0; r--) {
      if (this.wall[r].join("") == "") break;//如果当前行是空行
      else
        for (var c = 0; c < this.CN; c++) {
          var cell = this.wall[r][c];
          if (cell != undefined)
            this.paintCell(cell, frag);
        }
    }
    this.pg.appendChild(frag);
  },
  paintCell(cell, frag) {
    var img = new Image();
    img.style.left = this.OFFSET + this.CSIZE * cell.c + "px"
    img.style.top = this.OFFSET + this.CSIZE * cell.r + "px"
    img.src = cell.src;
    frag.appendChild(img)
    return img; //给备胎加的
  },
  paintShape() {//绘制主角图形
    var frag = document.createDocumentFragment();
    for (var i = 0; i < this.shape.cells.length; i++) {
      var cell = this.shape.cells[i];
      this.paintCell(cell, frag);
    }
    this.pg.appendChild(frag);
  }
}
game.start()