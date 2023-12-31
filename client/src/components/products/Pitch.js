import React, { memo, useState } from 'react'
import defaultt from 'assets/default.png'
import { formatMoney } from 'ultils/helper'
import label from 'assets/label.png'
import label2 from 'assets/label2.png'
import { renderStarFromNumber } from 'ultils/helper'
import SelectOption from 'components/search/SelectOption'
import icons from 'ultils/icons'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from 'ultils/path'
import { useDispatch } from 'react-redux';
import { showModal } from 'store/app/appSilice'
import { DetailPitches } from 'pages/public'

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons
const Pitch = ({ pitchData, isNew, normal, navigate, dispatch }) => {
    const [isShowOption, setisShowOption] = useState(false)
    navigate = useNavigate()
    dispatch = useDispatch()
    const handleClickOptions = (e, flag) => {
        e.stopPropagation()
        if (flag === 'MENU') navigate(`/${pitchData?.category?.toLowerCase()}/${pitchData?._id}/${pitchData?.title}`)
        if (flag === 'WISHLIST') console.log('WISHLIST')
        if (flag === 'QUICK_VIEW') {
            dispatch(showModal({
                isShowModal: true, modalChildren: <DetailPitches data={{
                    pid: pitchData?._id,
                    category: pitchData?.category
                }} isQuickView></DetailPitches>
            }))
        }

    }
    return (
        <div className='w-full text-base pr-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'
                onClick={e => navigate(`/${pitchData?.category?.toLowerCase()}/${pitchData?._id}/${pitchData?.title}`)}
                onMouseEnter={e => {
                    e.stopPropagation()
                    setisShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation()
                    setisShowOption(false)
                }}
            >
                <div className='w-full relative'>
                    {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                        <span onClick={(e) => handleClickOptions(e, 'QUICK_VIEW')}><SelectOption icon={<AiFillEye></AiFillEye>}></SelectOption></span>
                        <span onClick={(e) => handleClickOptions(e, 'MENU')}><SelectOption icon={<AiOutlineMenu></AiOutlineMenu>}></SelectOption></span>
                        <span onClick={(e) => handleClickOptions(e, 'WISHLIST')}><SelectOption icon={<BsFillSuitHeartFill></BsFillSuitHeartFill>}></SelectOption></span>
                    </div>}
                    <img src={pitchData?.images[0] || defaultt} alt="" className='w-[450px] h-[250px] object-cover'></img>
                    {!normal && <img src={isNew ? label2 : label} alt='' className={`absolute top-[-20px] left-[-20px] ${isNew ? 'w-[70px]' : 'w-[70px]'} h-[50px] object-cover`}></img>}
                    {!normal && <span className='font-bold  top-[-12px] left-[-10px] text-white absolute'>{isNew ? 'New' : 'Best'}</span>}
                </div>
                <div className='flex flex-col mt-[15px] items-start gap-1 w-full'>
                    <span className='flex h-4'>{renderStarFromNumber(pitchData?.totalRatings)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span className='line-clamp-1'>{pitchData?.title}</span>
                    <span>{`${formatMoney(pitchData?.price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default memo(Pitch)