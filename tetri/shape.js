function Cell(r,c,src) {
  this.r = r;this.c=c;this.src=src;
}
function Stape(r0,c0,r1,c1,r2,c2,r3,c3,src,states,orgi){
  this.cells=[
      new Cell(r0,c0,src),
      new Cell(r1,c1,src),
      new Cell(r2,c2,src),
      new Cell(r3,c3,src)
    ];
  this.states = states;
  this.orgCell = this.cells[orgi];
  this.statei=0;
}
Stape.prototype={
  moveDown(){
    for(var i=0;i<this.cells.length;i++)
      this.cells[i].r++;
  },
  moveLeft(){
    for(var i=0;i<this.cells.length;i++)
      this.cells[i].c--;
  },
  moveRight(){
    for(var i=0;i<this.cells.length;i++)
      this.cells[i].c++;
  },
  rotateR(){//顺时针旋转
    //将当前图形的statei+1
    this.statei++;
    //如果statei>=当前图形的states的length,就改回0
    if(this.statei==this.states.length){
      this.statei=0;
    }
    this.rotate();
  },
  rotate(){
    //获得当前对象states数组中statei位置的对象，保存在state中
    var state=this.states[this.statei];
    //遍历当前图形的cells //i=0
    for(var i=0;i<this.cells.length;i++){
      //将当前cell保存在cell中
      var cell=this.cells[i];
      //修改cell的r为orgCell.r+state的ri
      cell.r=this.orgCell.r+state['r'+i];
      //修改cell的c为orgCell.c+state的ci
      cell.c=this.orgCell.c+state['c'+i];
    }
  },
  rotateL(){//逆时针旋转
    this.statei--;//将当前图形的statei-1
    //如果statei<0,就改回states的length-1
    if(this.statei<0){
      this.statei=this.states.length-1;
    }
    this.rotate();
  },
}
//描述状态对象的数据结构
function State(r0,c0,r1,c1,r2,c2,r3,c3){
  this.r0=r0; this.c0=c0;
  this.r1=r1; this.c1=c1;
  this.r2=r2; this.c2=c2;
  this.r3=r3; this.c3=c3;
}
function T() {
  Stape.call(this,0,3,0,4,0,5,1,4,"img/T.png",
      [
        new State(0,-1, 0,0, 0,+1, +1,0),
        new State(-1,0, 0,0, +1,0, 0,-1),
        new State(0,+1, 0,0, 0,-1, -1,0),
        new State(+1,0, 0,0, -1,0, 0,+1),
      ],1
    );
}
function O() {
  Stape.call(this,0,4,0,5,1,4,1,5,"img/O.png",
    [
      new State(0,-1, 0,0, +1,-1, +1,0)
    ],1
    );
}
function I() {
  Stape.call(this,0,3,0,4,0,5,0,6,"img/I.png",
    [
      new State(0,-1, 0,0, 0,+1, 0,+2),
      new State(-1,0, 0,0, +1,0, +2,0)
    ],1
    );
}
function Z() {
  Stape.call(this,0,3,0,4,1,4,1,5,"img/Z.png",
    [
      new State(0,-1, 0,0, +1,0, +1,+1),
      new State(+1,0, 0,0, +1,+1, -1,+1)
    ],1
    );
}
function S() {
  Stape.call(this,0,4,0,5,1,3,1,4,"img/S.png");
}
function L() {
  Stape.call(this,0,3,0,4,0,5,1,3,"img/L.png");
}
function J() {
  Stape.call(this,0,3,0,4,0,5,1,5,"img/J.png");
}
Object.setPrototypeOf(T.prototype,Stape.prototype);
Object.setPrototypeOf(O.prototype,Stape.prototype);
Object.setPrototypeOf(I.prototype,Stape.prototype);
Object.setPrototypeOf(Z.prototype,Stape.prototype);
Object.setPrototypeOf(S.prototype,Stape.prototype);
Object.setPrototypeOf(L.prototype,Stape.prototype);
Object.setPrototypeOf(J.prototype,Stape.prototype);