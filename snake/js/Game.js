/**
 * @param {Object} map
 * @param {Object} food
 * @param {Object} snake
 * @param {Object} block
 */

function Game(map, food, snake, block) {
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	this.timer = null;
	this.flag = null;
	this.init();

}
//初始化方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.bindEvent();
	this.start();
}
//渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();

}

//渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	//渲染食物就是渲染食物在地图中的坐标系的背景图案
	//		  行   列		渲染颜色   地图中的数组就是用来简化代码书写的
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = 'cover';
}


//渲染蛇
Game.prototype.renderSnake = function() {
	//获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";

	//渲染蛇就是在地图中渲染蛇的每一节身体坐标
	for (var i = 1; i < this.snake.arr.length - 1; i++) {
		//提取变量简化书写
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
	}
	//获取蛇的尾部
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}

//游戏开始
Game.prototype.start = function() {
	this.flag = true;
	//缓存this
	var _this = this;
	this.timer = setInterval(function() {

		//移动
		_this.snake.move();
		//检测是否出界
		_this.checkMap();
		//检测是否吃到食物
		_this.checkFood();
		//检测是否碰到自己
		_this.checkSnake();
		//检测是否撞到隆隆岩
		_this.checkBlock();
		//判断是否在运行
		if (_this.flag) {
			//清屏
			_this.map.clear();
		}
		//渲染食物
		_this.renderFood();
		//渲染蛇
		_this.renderSnake();
		//渲染隆隆岩
		_this.renderBlock();
	}, 400)
}

//绑定事件
Game.prototype.bindEvent = function() {
	//缓存this
	var _this = this;
	//给document添加onkeydown事件
	document.onkeydown = function(e) {
		//获取用户按下的数字
		var code = e.keyCode;
		//console.log(code)
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			//调用蛇的转向方法
			_this.snake.change(code);
		}
	}
}

//游戏结束
Game.prototype.gameOver = function() {
	this.flag = false;
	//停止定时器
	clearInterval(this.timer);
}

//检测是否出界
Game.prototype.checkMap = function() {
	//获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	//与地图的row col 判定
	if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		alert('碰墙了')
		this.gameOver();
	}
}

//吃到食物
Game.prototype.checkFood = function() {
	//获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	//获取食物坐标
	var food = this.food;
	//判断蛇的头部是否与食物重合
	if (head.row === food.row && head.col === food.col) {
		//console.log(2)
		this.snake.growUp();
		//重置食物
		this.resetFood();
	}
}

//重置食物方法
Game.prototype.resetFood = function() {
	//生成随机row col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	//检测食物合法性
	//与蛇的身体作比较
	for (var i = 0; i < this.snake.arr.length; i++) {
		//提取变量简化书写
		var newfood = this.snake.arr[i];
		if (newfood.row === row && newfood.col === col) {
			this.resetFood();
			return;
		}
	}
	//检测食物与隆隆岩的关系
	for (var i = 0; i < this.block.arr.length; i++) {
		//提取变量简化书写
		var newfood = this.block.arr[i];
		if (newfood.row === row && newfood.col === col) {
			this.resetFood();
			return;
		}
	}
	this.food.reset(row, col);
}

//检测蛇是否吃到自己
Game.prototype.checkSnake = function() {
	//获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	//循环与蛇的每一节身体
	for (var i = 0; i < snake.arr.length - 1; i++) {
		var snakelong = this.snake.arr[i];
		if (head.row === snakelong.row && head.col === snakelong.col) {
			//console.log(3)
			alert('碰到自己了')
			this.gameOver();
		}
	}
}

//渲染障碍物
Game.prototype.renderBlock = function() {
	for (var i = 0; i < this.block.arr.length; i++) {
		//定义变量简化书写
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
	}
}

//检测蛇与隆隆岩
Game.prototype.checkBlock = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	//循环与每一个隆隆岩做对比
	for (var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if (one.row === head.row && one.col === head.col) {
			alert('碰到隆隆岩了')
			//结束游戏
			this.gameOver();
		}
	}
}
