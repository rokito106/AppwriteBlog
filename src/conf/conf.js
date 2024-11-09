const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASEID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKETID),
    // TinyMCE_Api:String(import.meta.env.VITE_TINY_MCE_API)
}

console.log(conf);

export default conf