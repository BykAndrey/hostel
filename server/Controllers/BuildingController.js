const BuildingModel=require('./../Models/Base.js').Building;
class Building{
    constructor(db){
        this.db=db;
    }
    getList(req,res){
       /* BuildingModel.find({},function(error,data){
            if(error){
                return res.send(error);
            }
            return res.send(data);
        })*/
        BuildingModel.find({})
        .skip(2)
        .limit(2)
        .exec(function(error,data){
            if(error){
                return res.send(error);
            }
            BuildingModel.count({},function(er2,d2){
                if(er2){
                    return res.send(er2);
                }
                console.log('building')
                res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                res.header("Pragma", "no-cache");
                res.header("Expires", 0);
                res.header("Access-Control-Allow-Origin", '*');
                return res.status(200).send({
                    data:data,
                    count:d2
                });
            })
            
        })
        //return res.status(200).send('Get List')
    }
    create(req,res){
        res.header("Access-Control-Allow-Origin", '*');
        var user_id=req.session.user_id;
        console.log(1);
        if(user_id===undefined){
            console.log(2);
            return res.send('нужно авторизоваться')
        }
        console.log(3);
        var b=new BuildingModel({
            user_id:user_id,
            address:'Минск Притыцкого 41',
            desc:'Описание объекта ',
            chords:[52.123,12.132]
        })
        console.log(4);
        b.save(function(er){
            console.log(5);
            if(er){
                console.log(6);
                return res.send(er)
            }
            console.log(7);
            return  res.send(b)
        })
        console.log(8);
       // return res.status(200).send('Create')
    }
    edit(req,res){
        return res.status(200).send('Edit')
    }
    delete(req,res){
        return res.status(200).send('Delete')
    }
    
}
module.exports=Building;