import { Router } from 'express';
import * as user from '@/controllers/users.controller';


const router = Router();

/**
 * Sign Up User
 */

router.post('/user/register', user.signUp);

router.post('/user/login', user.signIn);

router.get('/user',user.getAllUsers);

router.put('/user/update/:userId',user.updatedetails);

router.delete('/user/:id',user.deletebyId);

router.post('/user/forgot-password',user.forgotPassword);
router.post('/user/reset-password/',user.resetPassword),
router.get('/user/emailuser/:email',user.getUserById)

export default router;
