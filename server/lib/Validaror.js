function Validator(data){
    /**
     * {
     *  value:
     *  pattern:reg
     *  error:string
     *  preload:
     * }
     */
    var Errors=[];
    for(element of data){
        if(element.preload!==undefined){
            if(typeof(preload)==="function"){
                element.value=element.preload(element.value);
            }
        }
        var reg=new RegExp(element.pattern);
        if(!reg.test(element.value)){
            Errors.push(element.error);
            console.log(element.value)
        }
    }
    
    return Errors;
}
module.exports=Validator;