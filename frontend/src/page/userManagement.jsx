import React, { useState, useEffect, use } from "react";
import styled from "styled-components";
import moment from 'moment';

const Body = styled.div`
    padding: 10px;
    width: 100%;
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

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});
    const getGenderKorean = (gender) => {
        // react i18n -> 다국어 번역으로 하드코딩 하지말자;;
        switch(gender) {
            case 'male':
                return '남성';
            case 'female':
                return '여성';
            case 'other':
                return '기타';
            default:
                return '밝히고싶지않음';
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/userList`);
                if (!res.ok) throw new Error('서버에서 데이터를 가져오지 못했습니다.');
                const data = await res.json();
                setUsers(data);

                const initialSelected = {};
                data.forEach(user => {
                    initialSelected[user.id] = false;
                });
                setSelectedUsers(initialSelected);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const updatedSelections = {};
        users.forEach(user => {
            updatedSelections[user.id] = newSelectAll;
        });
        setSelectedUsers(updatedSelections);
    };

    // 각 체크박스 클릭 시 개별 토글
    const handleUserSelect = (userId) => {
        setSelectedUsers(prev => {
            const updated = { ...prev, [userId]: !prev[userId] };
            const allSelected = Object.values(updated).every(v => v);
            setSelectAll(allSelected);
            return updated;
        });
    };

    return (
        <Body>
            <h1>회원 관리</h1>
            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: 'red' }}>에러: {error}</p>}

            {!loading && !error && (
                <Table>
                    <thead>
                        <tr>
                            <Th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></Th>
                            <Th>ID</Th>
                            <Th>이름</Th>
                            <Th>이메일</Th>
                            <Th>성별</Th>
                            <Th>가입일</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <Td><input type="checkbox" checked={selectedUsers[user.id] || false} onChange={() => handleUserSelect(user.id)} /></Td>
                                <Td>{user.id}</Td>
                                <Td>{user.name}</Td>
                                <Td>{getGenderKorean(user.gender)}</Td>
                                <Td>{user.email}</Td>
                                <Td>{moment(user.created_at).format('YYYY년 MM월 DD일 hh시 mm분 ss초')}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Body>
    );
};

export default UserManagement;
