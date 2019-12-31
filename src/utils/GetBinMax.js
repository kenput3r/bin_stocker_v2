/**
 * @function GetBinMax - Determines the max capacity for a bin
 * @param {string} sku 
 * @param {string} name 
 * @param {string} bin 
 */
const GetBinMax = (sku, name, bin) => {
  let max_qty = 0;
  sku = sku.toLowerCase();
  name = name.toLowerCase();
  bin = bin.toLowerCase();

  if(bin.includes('apparel')) {
    if(name.includes('windbreaker') || name.includes('crewneck')) {
      if(sku.includes('xxxxl') || sku.includes('xxxxxl') || sku.includes('5xl') || sku.includes('4xl')) {
        max_qty = 6;
      }else if(sku.includes('xxxl') || sku.includes('3xl')) {
        max_qty = 15;
      }else if(sku.includes('xxl') || sku.includes('2xl')) {
        max_qty = 18;
      }else if(sku.includes('xl')) {
        max_qty = 20;
      }else{
        max_qty = 23;
      }
    }else if(name.includes('hoodie')) {
      if(sku.includes('xxxxl') || sku.includes('xxxxxl') || sku.includes('5xl') || sku.includes('4xl')) {
        max_qty = 4;
      }else if(sku.includes('xxxl') || sku.includes('3xl')) {
        max_qty = 12;
      }else if(sku.includes('xxl') || sku.includes('2xl')) {
        max_qty = 12;
      }else if(sku.includes('xl')) {
        max_qty = 13;
      }else{
        max_qty = 15;
      }
    }else if(name.includes('long sleeve')) {
      if(sku.includes('xxxxl') || sku.includes('xxxxxl') || sku.includes('5xl') || sku.includes('4xl')) {
        max_qty = 15;
      }else if(sku.includes('xxxl') || sku.includes('3xl')) {
        max_qty = 30;
      }else if(sku.includes('xxl') || sku.includes('2xl')) {
        max_qty = 40;
      }else if(sku.includes('xl')) {
        max_qty = 40;
      }else{
        max_qty = 50;
      }
    }else if(name.includes('panel jacket')) {
      if(sku.includes('xxxxl') || sku.includes('xxxxxl') || sku.includes('5xl') || sku.includes('4xl')) {
        max_qty = 3;
      }else if(sku.includes('xxxl') || sku.includes('3xl')) {
        max_qty = 6;
      }else if(sku.includes('xxl') || sku.includes('2xl')) {
        max_qty = 8;
      }else if(sku.includes('xl')) {
        max_qty = 8;
      }else{
        max_qty = 10;
      }
    }else if(name.includes('sweater')) {
      if(sku.includes('xxxxl') || sku.includes('xxxxxl') || sku.includes('5xl') || sku.includes('4xl')) {
        max_qty = 3;
      }else if(sku.includes('xxxl') || sku.includes('3xl')) {
        max_qty = 18;
      }else if(sku.includes('xxl') || sku.includes('2xl')) {
        max_qty = 20;
      }else if(sku.includes('xl')) {
        max_qty = 25;
      }else{
        max_qty = 25;
      }
    }else if(name.includes('poncho')) {
      max_qty = 10;
    }else{
      if(sku.includes('xxxxl') || sku.includes('xxxxxl') || sku.includes('5xl') || sku.includes('4xl')) {
        max_qty = 15;
      }else if(sku.includes('xxxl') || sku.includes('3xl')) {
        max_qty = 30;
      }else if(sku.includes('xxl') || sku.includes('2xl')) {
        max_qty = 40;
      }else if(sku.includes('xl')) {
        max_qty = 45;
      }else{
        max_qty = 50;
      }
    }
  /***************************
  ** if restocking merch racks
  ***************************/
  }else if(bin.includes('merch')) {
    if(name.includes('barber mat')) {
      max_qty = 30;
    }else if(name.includes('pancho')) {
      max_qty = 10;
    }else if(name.includes('beard brush')) {
      max_qty = 40;
    }else if(name.includes('shave mug')) {
      max_qty = 23;
    }else if(name.includes('barber cape')) {
      max_qty = 35;
    }else if(name.includes('wrist wraps')) {
      max_qty = 40;
    }else if(name.includes('mug')) {
      max_qty = 30;
    }else if(name.includes('work apron')) {
      max_qty = 22;
    }else if(name.includes('double handle mirror')) {
      max_qty = 10;
    }else if(sku.includes('m105bn')) {
      max_qty = 15;
    }else if(name.includes('lip grips')) {
      max_qty = 315;
    }else if(name.includes('snow globe')) {
      max_qty = 10;
    }else if(name.includes('standing toiletry bag')) {
      max_qty = 16;
    }else if(name.includes('bleach proof black towel')) {
      max_qty = 35;
    }else if(name.includes('parasol')) {
      max_qty = 24;
    }else if(name.includes('classic shaving kit')) {
      max_qty = 35;
    }else if(name.includes('fine mist spray bottle')) {
      max_qty = 35;
    }else if(name.includes('rubber floor mat')) {
      max_qty = 9;
    }else if(name.includes('bobble head')) {
      max_qty = 16;
    }else if(name.includes('dancing hula')) {
      max_qty = 16;
    }else if(name.includes('mustache mug')) {
      max_qty = 15;
    }else if(name.includes('brush tip eyeliner pen')) {
      max_qty = 250;
    }else if(name.includes('beach towel')) {
      max_qty = 20;
    }else if(name.includes('wet brush')) {
      max_qty = 40;
    }else if(name.includes('mascot coffee mug')) {
      max_qty = 10;
    }else if(name.includes('shop thermometer')) {
      max_qty = 35;
    }else if(name.includes('pint glass')) {
      max_qty = 24;
    }else if(name.includes('travel bag')) {
      max_qty = 14;
    }else if(name.includes('tiki mug')) {
      max_qty = 16;
    }else {
      max_qty = 30;
    }
  /*****************************
  ** if restocking picking racks
  *****************************/
  }else if(bin.includes('picking')) {
    if(sku === 'p003nn') {
      max_qty =	600
    }else if(sku === 'p004nn') {
      max_qty =	600
    }else if(sku === 'p005nn') {
      max_qty =	432
    }else if(sku === 'p006nn') {
      max_qty =	432
    }else if(sku === 'p007nn') {
      max_qty =	810
    }else if(sku === 'p008nn') {
      max_qty =	1728
    }else if(sku === 'p037nn') {
      max_qty =	1620
    }else if(sku === 'p038nn') {
      max_qty =	384
    }else if(sku === 'p039nn') {
      max_qty =	1152
    }else if(sku === 'p040nn') {
      max_qty =	576
    }else if(sku === 'p041nn') {
      max_qty =	576
    }else if(sku === 'p059nn') {
      max_qty =	2160
    }else if(sku === 'p060nn') {
      max_qty =	420
    }else if(sku === 'p063nn') {
      max_qty =	864
    }else if(sku === 'p067nn') {
      max_qty =	480
    }else if(sku === 'p068nn') {
      max_qty =	2808
    }else if(sku === 'p088nn') {
      max_qty =	330
    }else if(sku === 'p089nn') {
      max_qty =	232
    }else if(sku === 'p091nn') {
      max_qty =	96
    }else if(sku === 'p106nn') {
      max_qty =	846
    }else if(sku === 'p106nn') {
      max_qty =	846
    }else if(sku === 'p107nn') {
      max_qty =	846
    }else if(sku === 'p108nn') {
      max_qty =	846
    }else if(sku === 'p111nn') {
      max_qty =	1260
    }else if(sku === 'p112nn') {
      max_qty =	1260
    }else if(sku === 'p130nn') {
      max_qty =	756
    }else if(sku === 'p131nn') {
      max_qty =	756
    }else if(sku === 'p132nn') {
      max_qty =	1120
    }else if(sku === 'p134gn') {
      max_qty =	1120
    }else if(sku === 'p135gn') {
      max_qty =	1120
    }else if(sku === 'p136pn') {
      max_qty =	1120
    }else if(sku === 'p137pn') {
      max_qty =	1120
    }else if(sku === 'p138rn') {
      max_qty =	1120
    }else if(sku === 'p148nn') {
      max_qty =	504
    }else if(sku === 'p155nn') {
      max_qty =	1260
    }else if(sku === 'p169nn') {
      max_qty =	165
    }else if(sku === 'p170nn') {
      max_qty =	165
    }else if(sku === 'p171nn') {
      max_qty =	165
    }else if(sku === 'p172nn') {
      max_qty =	165
    }else if(sku === 'p175nn') {
      max_qty =	1120
    }else if(sku === 'p180nn') {
      max_qty =	960
    }else if(sku === 'p181nn') {
      max_qty =	960
    }else if(sku === 'p182nn') {
      max_qty =	960
    }else if(sku === 'p187nn') {
      max_qty =	1400
    }else if(sku === 'p190nn') {
      max_qty =	300
    }else if(sku === 'p196nn') {
      max_qty =	756
    }else if(sku === 'p200nn') {
      max_qty =	420
    }else if(sku === 'p202nn') {
      max_qty =	1380
    }else if(sku === 'p206nn') {
      max_qty =	1176
    }else if(sku === 'p207nn') {
      max_qty =	864
    }else if(sku === 'p208nn') {
      max_qty =	864
    }else if(sku === 'p213nn') {
      max_qty =	576
    }else if(sku === 'p220nn') {
      max_qty =	480
    }else if(sku === 'p221nn') {
      max_qty =	1920
    }
  /*****************************
  ** if restocking retail store
  *****************************/
  }else if(bin.includes('retail store')) {
    if(sku.includes('xxxxl') || sku.includes('xxxxxl') || sku.includes('5xl') || sku.includes('4xl')) {
      max_qty = 1;
    }else if(sku.includes('xxxl') || sku.includes('3xl')) {
      max_qty = 2;
    }else if(sku.includes('xxl') || sku.includes('2xl')) {
      max_qty = 3;
    }else if(sku.includes('xl')) {
      max_qty = 4;
    }else if(sku.includes('l')) {
      max_qty = 4;
    }else if(sku.includes('m')) {
      max_qty = 3;
    }else if(sku.includes('s')) {
      max_qty = 3;
    }else{
      max_qty = 5;
    }
  }
  return max_qty;
}

export default GetBinMax;