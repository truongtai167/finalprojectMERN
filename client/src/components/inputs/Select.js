import React, { memo } from 'react'
import clsx from 'clsx'
const Select = ({ label, options = [], register, errors, id, validate, style, fullWidth }) => {
    return (
        <div className={clsx('flex flex-col gap-2', style)}>
            {label && <label htmlFor={id}>{label}</label>}
            <select className={clsx('form-select', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
                <option value="" >...</option>
                {options?.map(el => (
                    <option value={el.code}>{el.value}</option>
                ))}
            </select>
            {errors[id] && <small className='text-sx text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(Select)