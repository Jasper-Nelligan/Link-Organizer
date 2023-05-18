/**
* Returns a hex code for each course color option.
* @param {String} color 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
* @return {String} The hex code associated with each color according to the
* color scheme of this web app.
*/
function getColorCode(color) {
    switch (color) {
        case 'red':
            return '#fe7b7b';
        case 'green':
            return '#75d073';
        case 'blue':
            return '#74a3ff';
        case 'yellow':
            return '#ffe977';
        case 'orange':
            return '#fbb143';
        case 'purple':
            return '#c17ed9';
        default:
            console.log(`${color} is not a valid color`);
    }
}

export default getColorCode;