export const getAccentColor = () => {
	const color = localStorage.getItem('accentColor')
	return color ? color : '#051F34'
}
