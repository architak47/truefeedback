import { Message } from "@/model/User";

// Creating a new interface for ApiResponse used for the response of the API type or interface
// it is mendatory to have success and message in the response and accept the messages and messages are optional for imported User.ts from model
// we are using Message interface in the ApiResponse interface
export interface ApiResponse {
    success: boolean;
    message: string; 
    isAcceptingMessages?: boolean; 
    messages?: Array<Message>; 
}