import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../commentsList/commentsSlice';

export function Comment(props) {
  const dispatch = useDispatch()
  return (
    <tr>
      <td>
        {props.nombre}
      </td>
      <td>
        {props.descripcion}
      </td>
      <td>
        <button  className="btn btn-danger" type='button' onClick={()=>{
          dispatch(deleteComment({id: props.id}))
        }}>Eliminar</button>
      </td>
    </tr>
  );
}
