function Map(row, col, width, height) {
	this.arr = [];
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	//渲染页面 创建元素
	this.dom = document.createElement('div');

}

//添加填充方法
Map.prototype.fill = function() {
	for (var j = 0; j < this.row; j++) {
		//每行创建 创建行容器
		var row_dom = document.createElement("div");
		//狗日每一行添加一个类名
		row_dom.className = 'row';
		//创建行数组
		var row_arr = [];
		//循环 将每一行填充满
		for (var i = 0; i < this.col; i++) {
			//创建没给他方格元素
			var col_dom = document.createElement('span');
			//每个小方格添加类名
			col_dom.className = 'grid';
			//追加到行容器
			row_dom.appendChild(col_dom);
			//追加到行数组中
			row_arr.push(col_dom);
		}
		//每创建一行要追加到dom
		this.dom.appendChild(row_dom);
		//将行数组放入数组中
		this.arr.push(row_arr);
	}
	//给dom添加类名
	this.dom.className = 'box';
	//上树
	document.body.appendChild(this.dom);
}

//清屏
Map.prototype.clear = function(){
	for(var i = 0 ; i < this.arr.length; i++){
		for(var j =0; j < this.arr[i].length;j++){
			//改变每个小方格的背景颜色
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}
