export const capitalize = (name: string) => {
	return name.at(0)?.toUpperCase() + name.slice(1);
};

export const format = (name: string) => {
	let str = '';
	return name
		.split('-')
		.map((s) => capitalize(s))
		.join(' ');
};
