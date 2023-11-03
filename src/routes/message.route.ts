import { Router } from 'express';
import * as message from '@/controllers/message.controller';

const router = Router();


router.post("/uploade",message.uploade)

router.get("/allmessages",message.getall)

router.put("/edit/:id",message.edit)

router.delete('/deletemessage/:id',message.deletebyId);

router.get("/findbyId/:id", message.findbyId)


export default router;