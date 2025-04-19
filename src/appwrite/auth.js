import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const user= await this.account.create(ID.unique(), email, password, name)
            if (user) {
                return this.login({email, password})
            } else {
                return user
            }
        } catch (error) {
            console.log("create account error",error);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("login",error);
            throw error
        }
    }

    async logout() {
      return await this.account.deleteSessions()
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("get current user",error);
            throw error
        }
    }

    //email verification 

    async verifyEmail(){
        try {
             await this.account.createVerification(
                 `${import.meta.env.VITE_FRONTEND_URL}/confirm-email`
            )
        } catch (error) {
            console.log("email verification error", error);     
        }
    }

    async confirmVerification({userId,secret}) {
        try {
            return await this.account.updateVerification(userId, secret)
        } catch (error) {
            console.log("verification onfirmation error", error);
            
        }
    }
}

const authService = new AuthService()

export default authService