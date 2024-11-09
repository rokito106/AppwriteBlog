import { Client, Databases,Query,Storage,ID } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf. appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title,content,slug,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.log("Appwrite Service error in create post",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                 {
                title,
                content,
                featuredImage,
                status,
        })
        } catch (error) {
            console.log("Appwrite Service error in update post",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
    )
    return true;
        } catch (error) {
            console.log("Appwrite Service error in delete post",error);
            return false;
        }
    }

    async getDocument(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service error in getDocument",error);
            return false;
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("Appwrite Service error in getPosts",error);
            return false;
        }
    }

    // File uplaod Service

    async uploadFile(file){
        try {
            return await this.bucket.createFile( // It return the file id
                conf.appwriteBucketId,
                ID.unique(),
               file
            )
        } catch (error) {
            console.log("Appwrite Service error in uploadFile",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service error in deleteFile",error);
            return false;
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service error in deleteFile",error);
            return false;
        }
    }
}


const service=new Service();
export default service;