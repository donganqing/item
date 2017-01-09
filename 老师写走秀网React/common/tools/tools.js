/**
 * Created by hasee on 2016/12/29.
 */


let Tools = {
    getUserID:function () {
        let id =  window.sessionStorage.getItem("userID")||window.localStorage.getItem("userID");

        if(!id){
            alert("请先登录");
            window.location.hash = "#/login"
        }
        return id
    },
    getTime:function (num) {
        //num  140506969433
        
        //2017-01-04
    },
    filterUsername:function (str) {
       // "lihongsheng1980"
        //"li***80"

    }
};

export  {Tools}
