'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { TStation } from '@/util/playableStation';

const StationPage = ({ station }: { station: TStation }) => {
	useEffect(() => {
		const hostUrl = new URL(window.location.href);
		const stationurl = `${
			process.env.NODE_ENV === 'production' ? `https://${hostUrl.host}` : `http://localhost:3000`
		}/app/search?name=${encodeURIComponent(station.name)}&language=${station.language.split(',')[0]}&country=${
			station.country
		}`;

		redirect(stationurl);
	}, [station]);
	return <></>;
};

export default StationPage;
