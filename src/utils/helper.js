export function getUniqueId() {
	return (Math.random()*Math.pow(10, 17)).toString(16);
}

export function getRandomArrayElement (array) {
	var randomNumber = Math.floor(Math.random() * (array.length));
	return array[randomNumber];
}