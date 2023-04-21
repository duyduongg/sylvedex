import { useCallback } from 'react';
import { Stat } from '../../../models';
import { PresentationalStat } from './presentational-stat';
import classes from './container-stats.module.scss';
export interface ContainerStatsProps {
	stats: Stat[];
	formatString: (str: string) => string;
}
export const ContainerStats = ({ stats, formatString }: ContainerStatsProps) => {
	const getTotalStat = useCallback((stats: Stat[]) => {
		let a: number[] = [];
		stats.forEach((stat) => {
			a.push(stat.base_stat);
		});
		return a.reduce((acc, cur) => {
			return acc + cur;
		}, 0);
	}, []);

	return (
		<div className={classes['stats-container']}>
			{stats.map((stat, idx) => (
				<PresentationalStat
					key={idx}
					statName={formatString(stat.stat.name)}
					baseStat={stat.base_stat}
					isTotalStat={false}
					statClassStyle={`stat-${stat.stat.name}`}
				/>
			))}
			<PresentationalStat key={0} statName="Total" baseStat={getTotalStat(stats)} isTotalStat={true} />
		</div>
	);
};
