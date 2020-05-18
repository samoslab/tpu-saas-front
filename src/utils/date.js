export function formatDateFn(date,str){
    if(/(y+)/i.test(str)){
        str=str.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length))
    }


    let o={
        "M+":date.getMonth()+1,
        "d+":date.getDate(),
        "h+":date.getHours(),
        "m+":date.getMinutes(),
        "s+":date.getSeconds(),
    };
    for(let i in o){
        if(new RegExp(`(${i})`).test(str)){
            let tempStr=o[i]+"";
            str=str.replace(
                RegExp.$1,
                (RegExp.$1.length===1)?
                tempStr:
                // padLeftZero(tempStr)
                tempStr.padStart(tempStr.length,"0")
                // str.padStart(长度,补齐数据) 这个方法 更简便
            );
        }
    }

    return str;
};



function padLeftZero(str){
    return ("00"+str).substr(str.length);
}