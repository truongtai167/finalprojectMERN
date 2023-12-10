import React, { useCallback, useEffect, useState } from 'react'
import { InputForm, Pagination } from 'components'
import { useForm } from 'react-hook-form'
import { apiGetBrands, apiDeletePitch } from 'apis'
import defaultt from 'assets/default.png'
import moment from 'moment'
import icons from 'ultils/icons'
import { useSearchParams, createSearchParams, useNavigate, useLocation } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import UpdatePitch from 'pages/admin/UpdatePitch'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const { AiFillStar } = icons

const ManageBrands = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [params] = useSearchParams()
    const { register, formState: { errors }, watch } = useForm()
    const [pitches, setPitches] = useState(null)
    const [counts, setCounts] = useState(0)
    const [editPitch, setEditPitch] = useState(null)
    const [update, setUpdate] = useState(false)
    const render = useCallback(() => {
        setUpdate(!update)
    })
    const fetchPitches = async (params) => {
        const response = await apiGetBrands({ ...params, limit: process.env.REACT_APP_PITCH_LIMIT })
        if (response.success) {
            setPitches(response.pitches)
            setCounts(response.counts)
        }
    }

    const queryDecounce = useDebounce(watch('q'), 800)
    // const queryDecounce = useDebounce(queries.q, 500)

    useEffect(() => {
        if (queryDecounce) {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({ q: queryDecounce }).toString()
            })
        } else {
            navigate({
                pathname: location.pathname,
            })
        }
    }, [queryDecounce])

    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchPitches(searchParams)
    }, [params, update])

    const handleDeletePitch = (pid) => {
        Swal.fire({
            title: 'Are you sure',
            text: 'Sure friends ?',
            icon: 'warning',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeletePitch(pid)
                if (response.success) toast.success(response.mes)
                else toast.error(response.mes)
                render()
            }

        })
    }
    return (
        <div className='w-full flex flex-col gap-4 px-4 relative'>
            {editPitch &&
                <div className='absolute inset-0 win-h-screen bg-gray-100 z-50'>
                    <UpdatePitch
                        editPitch={editPitch}
                        render={render}
                        setEditPitch={setEditPitch}
                    />
                </div>
            }
            <div className='p-4 border-b w-full  flex justify-between items-center '>
                <h1 className='text-3xl font-bold tracking-tight'>Manage Pitches</h1>
            </div>
            <div className='flex w-full justify-end items-center px-1'>
                {/* <form className='w-[45%]' onSubmit={handleSubmit(handleManagePitch)}> */}
                <form className='w-[45%]' >
                    <InputForm
                        id='q'
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder='Search products by title, description ...' />
                </form>
            </div>
            <table className='table-auto w-full '>
                <thead className='text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr className='bg-sky-900 text-white  py-2'>
                        <th className='px-4 py-2 text-center h-[60px] rounded-tl-lg'>#</th>
                        <th className='px-4 py-2 text-center h-[60px] '>Thumb</th>
                        <th className='px-4 py-2 text-center h-[60px] '>Title</th>
                        <th className='px-4 py-2 text-center h-[60px] '>Address</th>
                        <th className='px-4 py-2 text-center h-[60px] '>Brand</th>
                        <th className='px-4 py-2 text-center h-[60px] '>Category</th>
                        <th className='px-4 py-2 text-center h-[60px] '>Price</th>
                        <th className='px-4 py-2 text-center h-[60px] '>Ratings</th>
                        <th className='px-4 py-2 text-center h-[60px] '>CreateAt</th>
                        <th className='px-4 py-2 text-center  h-[60px] rounded-tr-lg'>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        pitches?.map((el, index) => (
                            <tr className='odd:bg-white odd:dark:bg-gray-300 even:bg-gray-50 even:dark:bg-white border-b dark:border-gray-700"' key={el._id}>
                                <td className='text-center px-6 py-5 '>
                                    {((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_PITCH_LIMIT) + index + 1}
                                </td>
                                <td className='text-center py-2'>
                                    {el.thumb ? <img src={el.thumb} alt='thumb' className='w-20 h-13 ml-5 object-cover' /> : <img src={defaultt} alt='thumb' className='w-20 h-13 ml-5 object-cover' />}
                                </td>
                                <td className='text-center py-2'>{el.title}</td>
                                <td className='text-center py-2'>{el.address}</td>
                                <td className='text-center py-2'>{el.brand}</td>
                                <td className='text-center py-2'>{el.category}</td>
                                <td className='text-center py-2'>{el.price}</td>
                                <td className='flex items-center justify-center py-9'>{el.totalRatings}<AiFillStar className='ml-1' /></td>
                                <td className='text-center py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='text-center py-2'>
                                    <span
                                        className='text-blue-500 hover:underline cursor-pointer px-1'
                                        onClick={() => setEditPitch(el)}>
                                        Edit
                                    </span>
                                    <span
                                        onClick={() => handleDeletePitch(el._id)}
                                        className='text-blue-500 hover:underline cursor-pointer px-1'>
                                        Remove
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end my-8'>
                <Pagination totalCount={counts} />
            </div>
        </div>
    )
}

export default ManageBrands