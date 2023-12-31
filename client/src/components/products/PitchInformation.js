import React, { memo, useState } from 'react'
import { pitchInforTabs } from 'ultils/constant'
import { renderStarFromNumber } from 'ultils/helper'
import { apiRatings } from 'apis'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from 'store/app/appSilice'
import { useNavigate } from 'react-router-dom'
import { Button, Votebar, VoteOption, Comment } from 'components'
import Swal from 'sweetalert2'
import path from 'ultils/path'

const PitchInformation = ({ totalRatings, ratings, namePitch, pid, rerender }) => {
    const [activedTab, setactivedTab] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.user)
    const handleSubmitVoteOption = async ({ comment, score }) => {
        console.log({ comment, score, pid })
        if (!comment || !pid || !score) {
            alert('Please vote when click submit')
            return
        }
        // await apiRatings({ star: score, comment, pid, updatedAt: Date.now() })
        // dispatch(showModal({
        //     isShowModal: false,
        //     modalChildren: null
        // }))
        // rerender()
        await apiRatings({ star: score, comment, pid, updatedAt: Date.now() })
        dispatch(showModal({
            isShowModal: false,
            modalChildren: null
        }))
        rerender()
    }

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go login',
                title: 'Oops!',
                showCancelButton: true,

            }).then((rs) => {
                if (rs.isConfirmed) {
                    navigate(`/${path.LOGIN}`)
                }
            })
        }
        else {
            dispatch(showModal({
                isShowModal: true,
                modalChildren: <VoteOption namePitch={namePitch} handleSubmitVoteOption={handleSubmitVoteOption} />
            }))
        }
    }

    return (
        <div>
            <div className='flex items-center gap-2 relative bottom-[-1px]'>
                {pitchInforTabs.map(el => (
                    <span
                        className={`py-2 px-4 cursor-pointer ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'} `}
                        key={el.id}
                        onClick={() => setactivedTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}

            </div>
            <div className='w-full border p-4'>
                {pitchInforTabs.some(el => el.id === activedTab) && pitchInforTabs.find(el => el.id === activedTab)?.content}


            </div>
            <div className='flex flex-col w-main py-8 '>
                <div className='flex border border-red-500'>
                    <div className='flex-4 flex-col flex items-center justify-center '>
                        <span className='font-semibold text-3xl'>{`${totalRatings}/5`}</span>
                        <span className='flex items-center gap-1'>
                            {renderStarFromNumber(totalRatings)?.map((el, index) => (
                                <span key={index}>{el}</span>
                            ))}
                        </span>
                        <span className='text-sm'>{`${ratings?.length} reviewers and commentors`}</span>
                    </div>
                    <div className='flex-6  flex gap-2 flex-col p-4'>
                        {Array.from(Array(5).keys()).reverse().map(el => (
                            <Votebar
                                key={el}
                                number={el + 1}
                                ratingTotal={ratings?.length}
                                ratingCount={ratings?.filter(i => i.star === el + 1)?.length}
                            ></Votebar>
                        ))}
                    </div>
                </div>
                <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                    <span>Do you review this pitch?</span>
                    <Button handleOnClick={handleVoteNow}>Rating now !</Button>
                </div>
                <div className='flex flex-col gap-4'>
                    {ratings?.map(el => (
                        <Comment
                            key={el._id}
                            star={el.star}
                            updatedAt={el.updatedAt}
                            comment={el.comment}
                            name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
                        >
                        </Comment>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default memo(PitchInformation)