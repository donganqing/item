/**
 * Created by hasee on 2016/11/25.
 */
var Action = {
    on:function(name,fn){
        if(this[name]) {
            console.warn(name+" is used");
            return
        } //融错警告
        this[name] = fn
    },
    emit:function(name,data){
        if(!this[name]) {
            console.warn(name+"is not defined");
            return
        }//融错,警告
        this[name](data)
    },
    regList:function (name,fn) {
        name="ActionListFn"+name;
        this[name]||(this[name]=[]);
        this[name].push(fn)
        //this[name]=fn
    },
    useList:function (name,data) {
        name="ActionListFn"+name;
        if(!this[name]) {
            console.warn(name+" is not defined");
            return
        }
        this[name].forEach(function(fn,i){
            fn(data);
            console.log(name+i);
        })
    },

};