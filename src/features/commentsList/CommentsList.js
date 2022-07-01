import React, {useEffect, useState, useMemo} from 'react';
import { Comment } from '../comment/Comment';
import { selectComments, fetchComments } from './commentsSlice';
import { useSelector } from 'react-redux';
import { CommentForm } from '../commentForm/CommentForm';
import { useDispatch } from 'react-redux';

export function CommentsList() {
  const comentarios = useSelector(selectComments)
  const dispatch = useDispatch()
  const commentStatus = useSelector(state => state.comments.status)
  const [filter, setFilter] = useState("")
  const filteredComentarios = useMemo(() => comentarios.filter(comentario => comentario.nombre.includes(filter), [filter]))
  
  useEffect(() => {
    if (commentStatus === 'idle') {
      dispatch(fetchComments())
    }
  }, [commentStatus, dispatch])


  function filterBar() {
    return (<div className='d-flex justify-content-center p-2'><input placeholder='Buscar nombre' type='text' onChange={(event) => setFilter(event.target.value)}/></div>)
  }

  function tbody () {
      return filteredComentarios.map((comentario) => <Comment key={comentario.id} nombre={comentario.nombre} descripcion={comentario.descripcion} id={comentario.id}/>)
  }

  return (
      <div className='container'>
        {filterBar()}
        <table className="table table-striped table-bordered table-secondary">
          <thead>
        <tr>
           <th>
               Nombre
           </th> 
           <th>
               Descripcion
           </th>
           <th>
               Accion
           </th>
        </tr>
        </thead>
        <tbody>
            {tbody()}
        </tbody>
    </table>
    <CommentForm />
    </div>
   
  );
}