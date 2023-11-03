import Message from "@/models/message.model";

export const uploade = async(req,res)=>{
    try{
        const {title,description,url } = req.body;

        if(!title || !description||!url){
            return res.status(400).json({msg:"Please fill all fields"})
        }
       
        const message = await Message.create({
            title:title,
            description:description,
            url:url
        })
        message.save();
        res.status(200).json(message)

    }catch(error){
        res.status(500).json("error")
    }
}

export const getall = async(req,res) =>{
    try{
        const messages=  await Message.find();
        res.status(200).json(messages)

    }catch(error){
        res.status(500).json("error")
    }

}

export const edit = async(req,res) => {
    try{
        const {id} = req.params;
        const {title,description,url } = req.body;
        const message = await Message.findByIdAndUpdate({_id: id},{$set:{title,description,url}, new:true})
        res.status(200).json(message);
    }catch(error){
        res.status(500).json("error")
    }
}

export const findbyId =async (req,res) => {
    try{
        const {id}=req.params;
        const message =await Message.findById(id);
        res.status(200).json(message);
    }catch(error){
        res.status(500).json("error")
    }
}

export const deletebyId = async(req,res) => {
    try{
        const {id} = req.params;
        const message = await Message.deleteOne({_id: id});
        res.status(200).json("Message deleted successfully");
    }catch(error){
        res.status(500).json("error")
    }
}