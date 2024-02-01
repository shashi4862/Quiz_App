import React, { useEffect, useState } from 'react'
import Questions from './Questions';

import { useSelector, useDispatch } from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/fetchQuestions';
import { PushAnswer } from '../hooks/setResult';
import { Navigate } from 'react-router-dom'


const Quiz = () => {
    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result)
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    function onNext() {
        // console.log("on next btn");
        if (trace < queue.length) {
            dispatch(MoveNextQuestion())
            if (result.length <= trace) {
                dispatch(PushAnswer(check))
            }
        }
        setChecked(undefined)
    }
    function onPrev() {
        // console.log("on prev btn");
        if (trace > 0) {
            dispatch(MovePrevQuestion())
        }
    }

    function onChecked(check) {
        // console.log(check)
        setChecked(check)
    }

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            <Questions onChecked={onChecked} />

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>
        </div>

    )
}

export default Quiz