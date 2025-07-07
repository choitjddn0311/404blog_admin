// import React, {useState, useEffect, use} from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";

// const DetailPost = () => {
//     const {idx} = useParams();
//     const [post, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/postList/${idx}`);
//                 const data = await res.json();
//                 setPost(data)
//             } catch(err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPost();
//     } , [idx]);

//     if(loading) return <p>로딩중...</p>;
//     if(!post) return <p>게시글 없다...</p>;

//     return(
//         <>
//             <h1>디테일 포스트</h1>
//             <p><strong>제목:</strong> {post.title}</p>
//             <p><strong>작성자:</strong> {post.id}</p>
//             <p><strong>내용:</strong> {post.post_text}</p>
//             <p><strong>작성일:</strong> {post.created_at}</p>
//         </>
//     )
// }

// export default DetailPost;