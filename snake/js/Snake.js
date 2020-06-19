function Snake(pic_obj) {
	//存放蛇的身体
	this.arr = [{
			row: 4,
			col: 4
		},
		{
			row: 4,
			col: 5
		},
		{
			row: 4,
			col: 6
		},
		{
			row: 4,
			col: 7
		},
	];
	//方向属性
	this.direction = 39; //left 37,top 38,right 39,down 40
	//定义锁
	this.lock = true;
	//定义头部图片
	this.head_pic = pic_obj.head_pic;
	//定义身体图片
	this.body_pic = pic_obj.body_pic;
	//定义尾部图片
	this.tail_pic = pic_obj.tail_pic;
	//头部索引
	this.head_idx = 2;
	//尾部索引
	this.tail_idx = 2;
	console.log(pic_obj)
}

//添加移动方法
Snake.prototype.move = function() {
	//创建新的头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	//判断蛇的移动方向
	if (this.direction === 37) {
		//表示向左,新的头部出现左边,行不变,列--
		newHead.col--;
	}else if(this.direction === 38){
		//表示向上,新的头出现在上面,列不变,行--
		newHead.row--;
	}else if(this.direction === 39){
		//表示向右,新的头出现在右边,行不变,列++
		newHead.col++;
	}else if(this.direction === 40){
		//表示向下,新的头出现在下面,列不变,行++
		newHead.row++;
	}
	//将新的头部添加
	this.arr.push(newHead);
	//去掉尾部
	this.arr.shift();
	//开锁
	this.lock = true;
	
	//在move的时候改变尾部图片
	var tail = this.arr[0];
	//获取尾部的上一个
	var ass = this.arr[1];
	//判断尾巴与屁股的关系
	if(tail.row === ass.row){
		//此时在同一行,对列进行比较
		this.tail_idx = tail.col > ass.col ? 2 : 0;
	}else{
		//此时在同一列,对行比较
		this.tail_idx = tail.row > ass.row ? 3 : 1;
	}
}


//转向方法
Snake.prototype.change = function(direction){
	if(!this.lock){
		return;
	}
	//关闭锁
	this.lock = false;
	//当用户按下预设运动方向相同或相反时不做任何操作
	var result = Math.abs(direction - this.direction);
	//缓存this
	var _this = this;
	if(result === 0 || result === 2 ){
		return;
	}else{
		//传入值有效
		_this.direction = direction;
	}
	//在change的时候改变头部图片
	if (direction === 37 ){
		this.head_idx = 1
	}else if(direction === 38 ){
		this.head_idx = 3
	}else if(direction === 39 ){
		this.head_idx = 2
	}else if(direction === 40 ){
		this.head_idx = 0
	}
}

//蛇长长的方法
Snake.prototype.growUp = function(){
	//获取蛇的尾部
	var tail = this.arr[0];
	// 添加到蛇的头部
	this.arr.unshift(tail);
	
}