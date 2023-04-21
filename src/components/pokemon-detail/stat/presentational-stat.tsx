import classes from './presentational-stat.module.scss';
export interface PresentationalStatProps {
	isTotalStat: boolean;
	statName: string;
	baseStat: number;
	statClassStyle?: string;
}
export const PresentationalStat = ({ statName, baseStat, isTotalStat, statClassStyle }: PresentationalStatProps) => {
	return (
		<div className={classes['stat-container']}>
			<div className={classes['numeric-value']}>
				<div className={classes['stat-name']}>{statName}:</div>
				<div className={classes['base-stat']}>{baseStat}</div>
			</div>
			{!isTotalStat && statClassStyle !== undefined && (
				<div
					className={`${classes['chart']} ${statClassStyle}`}
					style={{ width: `calc(100% * (${baseStat} / 255))` }}
				></div>
			)}
		</div>
	);
};
