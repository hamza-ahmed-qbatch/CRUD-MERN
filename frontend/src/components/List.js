import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetListUser, SetSelected } from '../store/userSlice';
import Card from 'react-bootstrap/Card';

export default function ListUser() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(GetListUser({ token: user.token }));
      if (response.payload.status === 200)
        setUserList(response.payload.data.users);
      else
        alert('Please try later!');
    }
    fetchData();
  }, [dispatch, user]);

  return <Container className='p-5'>
    <Card className='m-5 p-3'>
      <h3 className='text-center'>List User</h3>
      <Card.Body
        className='m-3 p-3'>
        <Table striped bordered hover className=' shadow p-5 mb-2 bg-white rounded'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>

            {userList.length && userList.map(item => {
              return <tr onClick={() => {
                dispatch(SetSelected(item))
                navigate('/user/' + item._id)
              }}
                key={item.email}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.admin ? 'True' : 'False'}</td>

              </tr>
            })}


          </tbody>
        </Table>
      </Card.Body>
    </Card>
  </Container>
}

