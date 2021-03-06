const Clarifai= require('clarifai');

const app = new Clarifai.App({
    apiKey: '83952c0d299d40a3aea7ff933b42e805'
   });
const handleapicall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>{
        res.json(data);
    })
}
 

const handleImage=(req,res,db)=>{
    const {id}= req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err=> res.status(404).json('unable to get entries'))
}
module.exports={
    handleImage,
     handleapicall
  
}