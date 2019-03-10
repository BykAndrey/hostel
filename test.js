const valid=require('./server/lib/Validaror')
const log=console.log;





log(1);


var er=valid([
    {
        value:"2g1@g.a",
        pattern:/\w\d@\w.\w$/,
        error:'Должно быть число'
    },{
        value:'+375(25 )25- 12- 12',
        pattern:/\+375(25|44|29)\d{7}?/ig,
        error:'phone',
        preload(value){
            return value.replace(/\(*\)*\-*\s*/ig,'');
        }
    }
])
log(er)
var phone = "JavaSCRIPT";
//log(phone);
//phone=phone.replace(/\(*\)*\-*\s*/ig,'');
log(phone);
log((phone).match(/Java[^script]/));
//log( "Hello, Java!".match(/\bJava\b/) ); 
