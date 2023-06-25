const top = [
	'Eyepatch',
	'NoHair',
	'Hat',
	'Hijab',
	'Turban',
	'WinterHat1',
	'WinterHat2',
	'WinterHat3',
	'WinterHat4',
	'LongHairBigHair',
	'LongHairBob',
	'LongHairBun',
	'LongHairCurly',
	'LongHairCurvy',
	'LongHairDreads',
	'LongHairFrida',
	'LongHairFro',
	'LongHairFroBand',
	'LongHairNotTooLong',
	'LongHairShavedSides',
	'LongHairMiaWallace',
	'LongHairStraight',
	'LongHairStraight2',
	'LongHairStraightStrand',
	'ShortHairDreads01',
	'ShortHairDreads02',
	'ShortHairFrizzle',
	'ShortHairShaggyMullet',
	'ShortHairShortCurly',
	'ShortHairShortFlat',
	'ShortHairShortRound',
	'ShortHairShortWaved',
	'ShortHairSides',
	'ShortHairTheCaesar',
	'ShortHairTheCaesarSidePart'
];
const accessories = [
	'Blank',
	'Kurt',
	'Prescription01',
	'Prescription02',
	'Round',
	'Sunglasses',
	'Wayfarers'
];
const hairColor = [
	'Auburn',
	'Black',
	'Blonde',
	'BlondeGolden',
	'Brown',
	'BrownDark',
	'PastelPink',
	'Platinum',
	'Red',
	'SilverGray'
];
const facialHair = [
	'Blank',
	'BeardMedium',
	'BeardLight',
	'BeardMagestic',
	'MoustacheFancy',
	'MoustacheMagnum'
];
const facialHairColor = [
	'Auburn',
	'Black',
	'Blonde',
	'BlondeGolden',
	'Brown',
	'BrownDark',
	'Platinum',
	'Red'
];
const clothes = [
	'BlazerShirt',
	'BlazerSweater',
	'CollarSweater',
	'GraphicShirt',
	'Hoodie',
	'Overall',
	'ShirtCrewNeck',
	'ShirtScoopNeck',
	'ShirtVNeck'
];
const clothesColor = [
	'Black',
	'Blue01',
	'Blue02',
	'Blue03',
	'Gray01',
	'Gray02',
	'Heather',
	'PastelBlue',
	'PastelGreen',
	'PastelOrange',
	'PastelRed',
	'PastelYellow',
	'Pink',
	'Red',
	'White'
];
const eyes = [
	'Close',
	'Cry',
	'Default',
	'Dizzy',
	'EyeRoll',
	'Happy',
	'Hearts',
	'Side',
	'Squint',
	'Surprised',
	'Wink',
	'WinkWacky'
];
const eyebrows = [
	'Angry',
	'AngryNatural',
	'Default',
	'DefaultNatural',
	'FlatNatural',
	'RaisedExcited',
	'RaisedExcitedNatural',
	'SadConcerned',
	'SadConcernedNatural',
	'UnibrowNatural',
	'UpDown',
	'UpDownNatural'
];
const mouth = ['Smile', 'Tongue', 'Twinkle'];
const skin = [
	'Tanned',
	'Yellow',
	'Pale',
	'Light',
	'Brown',
	'DarkBrown',
	'Black'
];

const profilePicURL = () => {
	return `https://avataaars.io/?avatarStyle=Circle&topType=${
		top[Math.floor(Math.random() * top.length)]
	}&accessoriesType=${
		accessories[Math.floor(Math.random() * accessories.length)]
	}&hairColor=${
		hairColor[Math.floor(Math.random() * hairColor.length)]
	}&facialHairType=${
		facialHair[Math.floor(Math.random() * facialHair.length)]
	}&facialHairColor=${
		facialHairColor[Math.floor(Math.random() * facialHairColor.length)]
	}&clotheType=${
		clothes[Math.floor(Math.random() * clothes.length)]
	}&clotheColor=${
		clothesColor[Math.floor(Math.random() * clothesColor.length)]
	}&eyeType=${eyes[Math.floor(Math.random() * eyes.length)]}&eyebrowType=${
		eyebrows[Math.floor(Math.random() * eyebrows.length)]
	}&mouthType=${mouth[Math.floor(Math.random() * mouth.length)]}&skinColor=${
		skin[Math.floor(Math.random() * skin.length)]
	}`;
};

module.exports = profilePicURL;
