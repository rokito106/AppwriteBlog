import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
    const user = useSelector(state => state.auth.userData);
    const allpost = useSelector(state => state.post.posts);
    console.log(allpost);
    console.log(user);
    const posts = allpost.filter((post) => {
        return post.userId === user?.$id;
    })

    console.log(posts);
    

    return (
        <div className='w-full py-8'>
            <Container>
                {
                    posts.length === 0 ? (
                        <>
                            <h1 className='text-2xl font-bold text-center'>You have not posted anything yet</h1>
                        </>
                    ) : (
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    )
                }

            </Container>
        </div>
    )
}

export default AllPosts