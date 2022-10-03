import React, { useState } from 'react'
import './Problem.css'

const Problem = ({lhs,symbol,rhs,answer,possibilities,chosen}) => {
    const [ selectedIndex, setSelectedIndex ] = useState();
    return (
        <>
            <div className={'problem'}>
                <div className={'lhs'}>{lhs}</div>
                <div className={'symbol'}>{symbol}</div>
                <div className={'rhs'}>{rhs}</div>
                <div className={'equals'}>{'='}</div>
                <div className={'answer'}>{'?'}</div>
            </div>
            <div className={'possibilities'}>
                {
                    Array.from({length: possibilities.length}, (v, i) => i)
                    .map(i => (
                        <div 
                            key={'possibility-'+i}
                            className={
                                'possibility' 
                                + (selectedIndex === i ? ' selected' : '')
                                + (selectedIndex === i  && possibilities[i] === answer ? ' correct' : '')
                            }
                            onClick={() => {
                                if (!selectedIndex) {
                                    setSelectedIndex(i)
                                    if (possibilities[i] === answer) {
                                        setTimeout(() => {
                                            setSelectedIndex(undefined)
                                            chosen(true)
                                        }, 200);
                                    } else {
                                        setTimeout(() => {
                                            setSelectedIndex(undefined)
                                        }, 3000)
                                    }
                                }
                            }}
                        >
                            { 
                                `${possibilities[i]}`
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Problem;