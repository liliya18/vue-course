const LOGO_URL = 'http://pics.avs.io';

export default {
    getLogo({width, height, iata}) {
        return `${LOGO_URL}/${width}/${height}/${iata}.png`;
    },
}
