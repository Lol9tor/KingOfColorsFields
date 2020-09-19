import { shadeColor } from '../utils/helper';

const BLURRED_PERCENT = -75;

export const colors = {
  inactiveColor: '#000',
  gameField: [
    { name: '1', main: '#815355', blurred: shadeColor('#815355', BLURRED_PERCENT) },
    { name: '2', main: '#aa7dce', blurred: shadeColor('#aa7dce', BLURRED_PERCENT) },
    { name: '3', main: '#71c57a', blurred: shadeColor('#71c57a', BLURRED_PERCENT) },
    { name: '4', main: '#ffe29a', blurred: shadeColor('#ffe29a', BLURRED_PERCENT) },
    { name: '5', main: '#c9ddff', blurred: shadeColor('#c9ddff', BLURRED_PERCENT) },
    { name: '6', main: '#ecb0e1', blurred: shadeColor('#ecb0e1', BLURRED_PERCENT) },
    { name: '7', main: '#5e5768', blurred: shadeColor('#5e5768', BLURRED_PERCENT) },
  ],
  // gameField: ['#815355', '#aa7dce', '#71c57a', '#ffe29a', '#c9ddff', '#ecb0e1', '#5e5768']
}
export const bonuses = ['bomb', 'freeze', 'mixCells', 'newCells', 'night']