const optionsMapper = [
  ['cafe', 'café|cafe|coffee|latte|ᴄᴏғғᴇᴇ|caffe'],
  ['postre', 'postre|crepa|cupcake|brownie|chocolate|dessert|rebanada|pastel|repostería|reposteria|galleta|cookie|dessert|pay|croissant|chocolat|pastry'],
  ['panaderia', 'bollería|bolleria|panaderia'],
  ['churros', 'churro|ᴄʜᴜʀʀᴇʀɪᴀ|𝒄𝒉𝒖𝒓𝒓𝒐'],
  ['pastel', 'cake|pastel'],
  ['desayuno', 'desayuno|breakfast|yogurt|granola'],
  ['omelette', 'omelette'],
  ['poke', 'poke'],
  ['tostada', 'tostada'],
  ['sushi', 'sushi'],
  ['teriyaki', 'teriyaki'],
  ['ramen', 'ramen'],
  ['hamburguesa', 'burguer|hamburguesa|burger'],
  ['mariscos', 'mariscos|marlin|jaiba|camaron|camarón|atún|atun'],
  ['aguachile', 'aguachile'],
  ['salmon', 'salmon|samón'],
  ['clamato', 'clamato'],
  ['burro', 'burro|burrito'],
  ['tacos', 'taco|taqueria|taquería|suadero|taquero'],
  ['smoothies', 'smoothies'],
  ['chilaquiles', 'chilaquiles'],
  ['pasta', 'pasta|lasagna|fettuccine'],
  ['pizza', 'pizza'],
  ['torta', 'torta'],
  ['sandwich', 'sandwich'],
  ['ensalada', 'ensalada|salad'],
  ['aguacate', 'aguacate'],
  ['veggie', 'setas|vegan|plantbased|vegiee|veggie'],
  ['menudo', 'menudito|menudo|menuderia'],
  ['carne asada', 'carne asada', 'carnita asada'],
  ['alitas', 'wings|alitas'],
  ['costillas', 'rib|costilla'],
  ['carnitas', 'carnitas'],
  ['birria', 'birria'],
  ['antojitos', 'gorditas|champurrado|elote'],
  ['salsas', 'salsas'],
  ['papas fritas', 'papas fritas'],
  ['queso', 'queso'],
  ['cortes', 'filete'],
  ['pollo asado', 'pollo asado'],
  ['lomo de puerco', 'pollo asado'],
  ['prosciutto', 'prosciutto'],
  ['quesos', 'cheese'],
  ['asiáticos', 'asiátic|asiatic'],
  ['paella', 'paella'],
  ['italiano', 'italian'],
  ['a la leña', 'la leña'],
  ['orgánico', 'ᴏʀɢᴀɴɪᴄᴀ|organica'],

  ['jugos', 'jugo'],
  ['bebidas', 'limonada|aguas frescas|agua fresca'],
  ['cerveza', 'beer|cerveza|cheve'],
];

function getOptions(caption) {
  const options = [];

  optionsMapper.forEach(([category, regex]) => {
    const regexExpresion = new RegExp(regex, 'i');
    if (regexExpresion.exec(caption)) {
      options.push(category);
    }
  });

  return options;
}

function getPhones(caption) {
  const onlyNumbers = caption.replace(/\D/g, '-').replace(/--/g, '-');
  const phones = onlyNumbers.match(/(\d{1,2}-)?(\d{3}-)?\d{3}-\d{4,7}|(\d{3}-)\d{2}-\d{2}|\d{7,10}/g);

  if (Array.isArray(phones) && phones.length) {
    return phones.map(phone => phone.replace(/\D/g, ''));
  }

  return [];
}

module.exports = {
  getOptions,
  getPhones,
};
