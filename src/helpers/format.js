export const format = (number) => {
	let reverse = number.toString().split('').reverse().join(''),
		ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join(',').split('').reverse().join('');
	return ribuan;
};
