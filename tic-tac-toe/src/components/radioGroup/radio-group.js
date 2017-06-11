import React from 'react';
import PropTypes from 'prop-types';


const RadioGroup = (props) => {

    return (
        <div className={'radio-group'}>
            {props.values.map((elem, index) => (
                <div key={index} className={'radio'}>
                    <input type="radio" id={'radio'+index} name={props.name} value={elem} onChange={props.optionChange}/>
                    <label htmlFor={'radio'+index}>{elem}</label>
                </div>
            ))}
        </div>
    )
}

RadioGroup.prototypes = {
    name: PropTypes
}
export default RadioGroup;