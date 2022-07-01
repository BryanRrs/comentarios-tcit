import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../commentsList/commentsSlice";

export function CommentForm() {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    function dispatchCreateComment(){
        if (! (nombre && descripcion)) return
        dispatch(createComment({nombre: nombre, descripcion: descripcion}));
        setNombre('')
        setDescripcion('')
    }
    return (
        <div className="d-flex justify-content-evenly">
            <input value={nombre} type="text" placeholder="Nombre" onChange={(event) => { setNombre(event.target.value) }} />
            <input value={descripcion} type="text" placeholder="Descripcion" onChange={(event) => { setDescripcion(event.target.value) }} />
            <button className="btn btn-primary" type="button" onClick={() => {dispatchCreateComment()
            }}>Crear</button>
        </div>
    )
}