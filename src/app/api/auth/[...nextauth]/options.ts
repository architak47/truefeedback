import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credential: any): Promise<any>  {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or:[
                            {email: credential.identifier},
                            {username: credential.identifier}
                        ]
                    })
                    if(!user) throw new Error('No user found with this email or username');
                    
                    if(!user.isVerified){
                        throw new Error('User is not verified, Please verify your email');
                    }
                    const isPasswordCorrect = await bcrypt.compare(credential.password, user.password);
                    if(!isPasswordCorrect) {
                        throw new Error('Password is incorrect');
                    }
                    else{
                        return user;
                    }
                } catch (error: any) {
                    throw new Error('Error in authorize', error);
                }
            }
        })
    ]
}