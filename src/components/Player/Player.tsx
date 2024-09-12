'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdOutlinePause, MdOutlinePlayArrow, MdShare } from 'react-icons/md';

import useAudio from '@/app/hooks/useAudio';
import useHistory from '@/app/hooks/useHistory';
import useLikes from '@/app/hooks/useLikes';
import { AudioContext, StationReducerActionType } from '@/app/providers/AudioContext';
import getFlagEmoji from '@/util/getFlagEmoji';

import Button from './Button';

export default function Player() {
	const { state, dispatch } = useContext(AudioContext);
	const [isShared, setShared] = useState(false);

	const { isError, status } = useAudio();
	const [isliked, _stations, like, unlike] = useLikes(state.station.stationId);
	const {} = useHistory();
	const { station, isPlaying } = state;
	const share = () => {
		const hostUrl = new URL(window.location.href);
		const url = new URL(
			`${process.env.NODE_ENV === 'production' ? `https://${hostUrl.host}` : `http://localhost:3000`}/app/station/${
				station.stationId
			}`,
		);
		setShared(true);
		setTimeout(() => {
			setShared(false);
		}, 2000);
		try {
			navigator.clipboard.writeText(url.toString()).then().catch();
		} catch (error) {
			console.log('unable to write to clipboard');
		}
	};

	const handleLikeClick = (_e: React.SyntheticEvent<HTMLButtonElement>) => {
		if (isliked) {
			unlike();
		} else {
			like();
		}
		return;
	};

	if (station.stationId === '') {
		return null;
	}
	const shareNotificationVariants = {
		open: { opacity: 1, y: 0, zIndex: 0, transition: {} },
		closed: { opacity: 0, y: '90%', zIndex: -10 },
	};

	return (
		<motion.div
			className='fixed bottom-[90px] z-20 w-full  text-CustomWhite   sm:sticky sm:bottom-2  place-self-end '
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'easeIn' }}>
			<div className='mx-2  bg-CustomLightBlack/80 backdrop-blur-sm p-3 rounded grid grid-flow-col  sm:grid-cols-[1fr,auto,1fr]  justify-between items-center gap-x-2 sm:ml-3'>
				<div className='grid grid-flow-col auto-cols-min items-center gap-x-2 '>
					<Image
						src={`/api/image?url=${encodeURIComponent(station.favicon)}`}
						alt='music note'
						width={55}
						height={55}
						priority={true}
						className='object-contain min-w-[55px] min-h-[55px] rounded'
						onError={e => {
							e.currentTarget.src = '/musicnote.svg';
						}}
					/>
					<div className='flex flex-col justify-center'>
						<div className='flex gap-x-3'>
							<p className='relative whitespace-nowrap text-ellipsis overflow-hidden max-w-[150px] sm:max-w-[min(100%,200px)]'>
								{station.name}
							</p>
							<button type='button' aria-label='like Channel' onClick={handleLikeClick} className='col-start-2 '>
								<HiOutlineHeart
									className={`w-5 h-5  ${
										isliked ? 'fill-CustomActive' : ''
									} stroke-CustomActive hover:fill-CustomActive c`}
								/>
							</button>
						</div>
						<div className='flex gap-x-4 items-center'>
							<p>{station.countryCode ? getFlagEmoji(station.countryCode) : 'N/A'}</p>
							<p
								className={`${
									isError ? 'text-red-500 border-red-500' : ''
								} uppercase border border-green-500 text-green-500 rounded p-1 text-xs w-auto sm:hidden`}>
								{status}
							</p>
							<span className='sm:hidden'>
								<button
									onClick={() => {
										share();
									}}
									aria-label='Share'
									disabled={isShared}>
									<MdShare />
								</button>
							</span>
						</div>
					</div>
				</div>
				<div className='justify-self-stretch w-full row-span-2'>
					{isPlaying ? (
						<Button
							status='Pause'
							func={() => {
								dispatch({ type: StationReducerActionType.PAUSE });
							}}>
							<MdOutlinePause className='w-12 h-12 fill-CustomActive' />
						</Button>
					) : (
						<Button
							status='Play'
							func={() => {
								dispatch({
									type: StationReducerActionType.PLAY,
									payload: station,
								});
							}}>
							<MdOutlinePlayArrow className='w-12 h-12  fill-CustomActive' />
						</Button>
					)}
				</div>
				{/* <div className='flex justify-end items-center gap-x-2'> */}

				<div className='hidden sm:grid sm:grid-flow-col sm:gap-y-2 sm:text-center sm:items-center sm:justify-end sm:gap-5 pr-5'>
					<p
						className={`${
							isError ? 'text-red-500 border-red-500' : ''
						} uppercase border border-green-500 text-green-500 rounded p-1 text-sm`}>
						{status}
					</p>
					<button
						onClick={() => {
							share();
						}}
						aria-label='Share'>
						<MdShare />
					</button>
				</div>
			</div>

			<motion.div
				className='absolute  p-3 rounded-md right-2  top-0  bg-CustomActive text-CustomBlack pointer-events-none'
				variants={shareNotificationVariants}
				animate={isShared ? 'open' : 'closed'}
				style={{ translateY: '-120%', opacity: 0 }}>
				Copied link
			</motion.div>
		</motion.div>
	);
}
