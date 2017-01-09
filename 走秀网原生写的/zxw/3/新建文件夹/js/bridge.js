
var Action = {
    on: function (name, fn) {
        this[name] = fn
    },
    emit: function (name, data) {
        this[name](data)
    }
};


(function () {
    var obj1 = {
        num:10,
        allowChange:function () {
            // 绑定一个事件，来改变自己的num
            Action.on("changeNum",function (num) {
                this.num = num;
                console.log(this)
            }.bind(this))
        }
    };
    obj1.allowChange()

}());


(function () {
    var obj2 = {};

    //触发"changeNum"事件来修改obj1的num
    Action.emit("changeNum",1000)
}());