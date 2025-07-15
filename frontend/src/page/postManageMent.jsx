import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from 'moment';

const Body = styled.div`
    padding: 10px;
    width: ${(props) => (props.isOpen ? "calc(100% - 250px)" : "calc(100% - 100px)")};
    height: 100vh;
    background: #eee;
    overflow-y: scroll;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: #fff;
`;

const Th = styled.th`
    padding: 10px;
    border: 1px solid #ccc;
    background: #f5f5f5;
`;

const Td = styled.td`
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
`;

const PostManagement = ({isOpen}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const detailPost = () => {
        
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/postList`);
                if (!res.ok) throw new Error('서버에서 데이터를 가져오지 못했습니다.');
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Body isOpen={isOpen}>
            <h1>게시글 관리</h1>
            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: 'red' }}>에러: {error}</p>}

            {!loading && !error && (
                <Table>
                    <thead>
                        <tr>
                            <Th>게시글 관리 번호</Th>
                            <Th>작성자</Th>
                            <Th>제목</Th>
                            <Th>내용</Th>
                            <Th>작성일</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.idx} onClick={detailPost}>
                                <Td>{post.idx}</Td>
                                <Td>{post.id}</Td>
                                <Td>{post.title}</Td>
                                <Td>{post.post_text}</Td>
                                <Td>{moment(post.created_at).format('YYYY-MM-DD hh:mm')}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Body>
        
    );
};

export default PostManagement;
