import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from 'moment';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Body = styled.div`
    padding: 10px;
    width: ${(props) => (props.isOpen ? "calc(100% - 250px)" : "calc(100% - 100px)")};
    height: 100vh;
    background: #eee;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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

const FixBar = styled.div`
    position: absolute;
    bottom: 30px;
    width: ${(props) => (props.isOpen ? "80%" : "90%")};
    height: 150px;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: ${(props) => (props.visible ? 'flex' : 'none')};
    flex-direction: column;
    z-index: 10;
    overflow: hidden;
`;

const FixBarUserInfoCon = styled.ul`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: start;
    gap: 20px;
    align-items: center;
    padding: 0 20px;
    font-size: 20px;
    color: #fff;
    background: #111;
    overflow-x: hidden;
`;

const UserPermitControlContainer = styled.ul`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: start;
    gap: 20px;
    align-items: center;
    padding: 0 20px;
    background: #fff;
`;

const UserPermitControlBtn = styled.li`
    width: 200px;
    height: 50px;
    border: 1px solid #111;
    text-align: center;
    align-content: center;
    border-radius: 5px;
    background: #fff;
    color: #111;

    &:hover {
        background: #111;
        color: #fff;
        cursor: pointer;
    }
`;

const Pagination = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    button {
        border: none;
        color: #111;
        cursor: pointer;
        font-size: 18px;
        &:disabled {
            color: #aaa;
            cursor: not-allowed;
        }
    }
`;

const UserManagement = ({ isOpen }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const selectedCount = Object.values(selectedUsers).filter(Boolean).length;

    const getGenderKorean = (gender) => {
        switch (gender) {
            case 'male':
                return '남성';
            case 'female':
                return '여성';
            case 'other':
                return '기타';
            default:
                return '밝히고싶지않음';
        }
    };

    const changeEtoK = (v) => {
        switch (v) {
            case 'admin':
                return '관리자';
            default:
                return '일반';
        }
    };

    const handleGrantAdmin = async () => {
        const userIdsToUpdate = Object.entries(selectedUsers)
            .filter(([userIdx, isSelected]) => isSelected)
            .map(([userIdx]) => Number(userIdx)); // idx 기반

        console.log("보내는 userIdsToUpdate: ", userIdsToUpdate);

        if (userIdsToUpdate.length === 0) {
            alert('선택된 사용자가 없습니다.');
            return;
        }

        const selectedUserInfo = users.filter(user => userIdsToUpdate.includes(user.idx));
        const alreadyAdmins = selectedUserInfo.filter(user => user.role === 'admin');

        if(alreadyAdmins.length === userIdsToUpdate.length) {
            alert('이미 관리자로 지정된 사용자입니다.');
            return;
        }

        const nonAdminUserIds = selectedUserInfo
            .filter(user => user.role !== 'admin')
            .map(user => user.idx)

        if (!window.confirm(`${userIdsToUpdate.length}명의 사용자에게 관리자 권한을 부여하시겠습니까?`)) {
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/updateUserRole`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userIds: nonAdminUserIds,
                    newRole: 'admin',
                }),
            });

            if (!res.ok) throw new Error( '서버 응답 오류');

            // 업데이트 성공 후 프론트 상태 반영
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    userIdsToUpdate.includes(user.idx)
                        ? { ...user, role: 'admin' }
                        : user
                )
            );

            alert('관리자 권한이 성공적으로 부여되었습니다.');
        } catch (err) {
            console.error(err);
            alert('권한 부여 중 오류가 발생했습니다.');
        } finally {
            const clearedSelected = {};
            users.forEach(user => {
                clearedSelected[user.idx] = false;
            });
            setSelectedUsers(clearedSelected);
            setSelectAll(false);
        }
    };

    const handleRevokeAdmin = async () => {
        const userIdsToUpdate = Object.entries(selectedUsers)
            .filter(([userIdx, isSelected]) => isSelected)
            .map(([userIdx]) => Number(userIdx)); // idx 기반

        console.log("회수 대상 userIdsToUpdate: ", userIdsToUpdate);

        if (userIdsToUpdate.length === 0) {
            alert('선택된 사용자가 없습니다.');
            return;
        }

        const selectedUserInfo = users.filter(user => userIdsToUpdate.includes(user.idx));
        const notAdmins = selectedUserInfo.filter(user => user.role !== 'admin');

        if (notAdmins.length > 0) {
            alert('관리자가 아닌 사용자가 선택되어 있습니다.');
            return;
        }

        if (!window.confirm(`${userIdsToUpdate.length}명의 사용자에게서 관리자 권한을 회수하시겠습니까?`)) {
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/updateUserRole`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userIds: userIdsToUpdate,
                    newRole: 'user',
                }),
            });

            if (!res.ok) throw new Error('서버 응답 오류');

            // 업데이트 성공 후 프론트 상태 반영
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    userIdsToUpdate.includes(user.idx)
                        ? { ...user, role: 'user' }
                        : user
                )
            );

            alert('관리자 권한이 성공적으로 회수되었습니다.');
        } catch (err) {
            console.error(err);
            alert('권한 회수 중 오류가 발생했습니다.');
        } finally {
            const clearedSelected = {};
            users.forEach(user => {
                clearedSelected[user.idx] = false;
            });
            setSelectedUsers(clearedSelected);
            setSelectAll(false);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/userList`);
                if (!res.ok) throw new Error('서버에서 데이터를 가져오지 못했습니다.');
                const data = await res.json();
                setUsers(data);

                const initialSelected = {};
                data.forEach(user => {
                    initialSelected[user.idx] = false; // idx 기반
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
            updatedSelections[user.idx] = newSelectAll;
        });
        setSelectedUsers(updatedSelections);
    };

    const handleUserSelect = (userIdx) => {
        setSelectedUsers(prev => {
            const updated = { ...prev, [userIdx]: !prev[userIdx] };
            const allSelected = Object.values(updated).every(v => v);
            setSelectAll(allSelected);
            return updated;
        });
    };

    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    return (
        <Body isOpen={isOpen}>
            <h1>회원 관리</h1>
            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: 'red' }}>에러: {error}</p>}

            {!loading && !error && (
                <Table>
                    <thead>
                        <tr>
                            <Th>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </Th>
                            <Th>ID</Th>
                            <Th>이름</Th>
                            <Th>권한</Th>
                            <Th>이메일</Th>
                            <Th>성별</Th>
                            <Th>가입일</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.idx}>
                                <Td>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers[user.idx] || false}
                                        onChange={() => handleUserSelect(user.idx)}
                                    />
                                </Td>
                                <Td>{user.id}</Td>
                                <Td>{user.name}</Td>
                                <Td>{changeEtoK(user.role)}</Td>
                                <Td>{user.email}</Td>
                                <Td>{getGenderKorean(user.gender)}</Td>
                                <Td>{moment(user.created_at).format('YYYY-MM-DD HH:mm')}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {totalPages > 1 && (
                <Pagination>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <GrFormPrevious />
                    </button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <GrFormNext />
                    </button>
                </Pagination>
            )}

            <FixBar visible={selectedCount > 0} isOpen={isOpen}>
                <FixBarUserInfoCon>
                    <li>{selectedCount}명</li> |
                    {users
                        .filter(user => selectedUsers[user.idx])
                        .map(user => (
                            <li key={user.idx}>
                                <p>{user.id}</p>
                            </li>
                        ))
                    }
                </FixBarUserInfoCon>
                <UserPermitControlContainer>
                    <UserPermitControlBtn onClick={handleGrantAdmin}>관리자 권한 부여</UserPermitControlBtn>
                    <UserPermitControlBtn onClick={handleRevokeAdmin}>관리자 권한 회수</UserPermitControlBtn>
                </UserPermitControlContainer>
            </FixBar>
        </Body>
    );
};

export default UserManagement;
