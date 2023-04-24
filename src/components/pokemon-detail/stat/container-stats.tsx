import { useCallback } from 'react';
import { Stat } from '../../../models';
import classes from './container-stats.module.scss';
import { PresentationalStat } from './presentational-stat';
export interface ContainerStatsProps {
	stats: Stat[];
	formatString: (str: string) => string;
}
export const ContainerStats = ({ stats, formatString }: ContainerStatsProps) => {
	const getTotalStat = useCallback((stats: Stat[]) => {
		const a: number[] = [];
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
