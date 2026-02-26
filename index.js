// DOM Elements
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');
const saturationSlider = document.getElementById('saturationSlider');
const saturationText = document.getElementById('saturationText');
const hueSlider = document.getElementById('hueSlider');
const hueText = document.getElementById('hueText');
const copyButton = document.getElementById('copyButton');
const applyButton = document.getElementById('applyButton');
const colorHistory = document.getElementById('colorHistory');

// Add new DOM elements
const colorPicker = document.getElementById('colorPicker');
const inputColorHex = document.getElementById('inputColorHex');
const inputColorRgb = document.getElementById('inputColorRgb');
const inputColorHsl = document.getElementById('inputColorHsl');
const alteredColorHex = document.getElementById('alteredColorHex');
const alteredColorRgb = document.getElementById('alteredColorRgb');
const alteredColorHsl = document.getElementById('alteredColorHsl');
const colorName = document.getElementById('colorName');
const modifiedColorName = document.getElementById('modifiedColorName');
const clearHistoryBtn = document.getElementById('clearHistory');
const complementaryBtn = document.getElementById('complementaryBtn');
const analogousBtn = document.getElementById('analogousBtn');
const triadicBtn = document.getElementById('triadicBtn');
const splitComplementaryBtn = document.getElementById('splitComplementaryBtn');
const squareBtn = document.getElementById('squareBtn');
const compoundBtn = document.getElementById('compoundBtn');
const schemeColors = document.getElementById('schemeColors');
const exportCssBtn = document.getElementById('exportCss');
const exportScssBtn = document.getElementById('exportScss');
const exportJsonBtn = document.getElementById('exportJson');

// Constants
const MAX_HISTORY = 20;

// CSS Variable Helper
const getCSSVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// State
let currentColor = {
    hex: '#c6d5ac',
    rgb: { r: 198, g: 213, b: 172 },
    hsl: { h: 80, s: 33, l: 75 }
};

// Color History
let colorHistoryArray = JSON.parse(localStorage.getItem('colorHistory')) || [];

// Color Names Database - Comprehensive (based on Name That Color algorithm)
// This is a simplified version with ~150 carefully selected color names
const colorNamesData = [
    ["000000", "Black"],
    ["000080", "Navy Blue"],
    ["0000C8", "Dark Blue"],
    ["0000FF", "Blue"],
    ["000741", "Stratos"],
    ["001B1C", "Swamp"],
    ["002387", "Resolution Blue"],
    ["002900", "Deep Fir"],
    ["002E20", "Burnham"],
    ["002FA7", "International Klein Blue"],
    ["003153", "Prussian Blue"],
    ["003366", "Midnight Blue"],
    ["003399", "Smalt"],
    ["003532", "Deep Teal"],
    ["003E40", "Cyprus"],
    ["004620", "Kaitoke Green"],
    ["0047AB", "Cobalt"],
    ["004816", "Crusoe"],
    ["004950", "Sherpa Blue"],
    ["0056A7", "Endeavour"],
    ["00581A", "Camarone"],
    ["0066CC", "Science Blue"],
    ["0066FF", "Blue Ribbon"],
    ["00755E", "Tropical Rain Forest"],
    ["0076A3", "Allports"],
    ["007BA7", "Cerulean"],
    ["007EC7", "Lochmara"],
    ["007FFF", "Azure Radiance"],
    ["008080", "Teal"],
    ["0095B6", "Bondi Blue"],
    ["009DC4", "Pacific Blue"],
    ["00A693", "Persian Green"],
    ["00A86B", "Jade"],
    ["00BFFF", "Deep Sky Blue"],
    ["00CC99", "Caribbean Green"],
    ["00CCCC", "Robin's Egg Blue"],
    ["00FF00", "Green"],
    ["00FF7F", "Spring Green"],
    ["00FFFF", "Cyan / Aqua"],
    ["010D1A", "Blue Charcoal"],
    ["011635", "Midnight"],
    ["013220", "Holly"],
    ["01361C", "Daintree"],
    ["01371A", "Cardin Green"],
    ["014B43", "County Green"],
    ["015E85", "Astronaut Blue"],
    ["016162", "Regal Blue"],
    ["016D39", "Aqua Deep"],
    ["01796F", "Pine Green"],
    ["017987", "Blue Lagoon"],
    ["01826B", "Deep Sea"],
    ["01A368", "Green Haze"],
    ["022D15", "English Holly"],
    ["02402C", "Sherwood Green"],
    ["02478E", "Congress Blue"],
    ["024E46", "Evening Sea"],
    ["026395", "Bahama Blue"],
    ["02866F", "Observatory"],
    ["02A4D3", "Cerulean"],
    ["03163C", "Tangaroa"],
    ["032B52", "Green Vogue"],
    ["036A6E", "Mosque"],
    ["041004", "Midnight Moss"],
    ["041322", "Black Pearl"],
    ["042E4C", "Blue Whale"],
    ["044022", "Zuccini"],
    ["044259", "Teal Blue"],
    ["051040", "Deep Cove"],
    ["051657", "Gulf Blue"],
    ["055989", "Venice Blue"],
    ["056F57", "Watercourse"],
    ["062A78", "Catalina Blue"],
    ["063537", "Tiber"],
    ["069B81", "Gossamer"],
    ["06A189", "Niagara"],
    ["073A50", "Tarawera"],
    ["080110", "Jaguar"],
    ["081910", "Black Bean"],
    ["0A6906", "Deep Forest Green"],
    ["0A6F75", "Atoll"],
    ["0B0B0B", "Cod Gray"],
    ["0B0F08", "Marshland"],
    ["0B1107", "Gordons Green"],
    ["0B1304", "Black Forest"],
    ["0B6207", "San Felix"],
    ["0BDA51", "Malachite"],
    ["0C0B1D", "Ebony"],
    ["0C0D0F", "Woodsmoke"],
    ["0C1911", "Racing Green"],
    ["0C7A79", "Surfie Green"],
    ["0C8990", "Blue Chill"],
    ["0D0332", "Black Rock"],
    ["0D1117", "Bunker"],
    ["0D1C19", "Aztec"],
    ["0D2E1C", "Bush"],
    ["0E0E18", "Cinder"],
    ["0E2A30", "Firefly"],
    ["0F2D9E", "Torea Bay"],
    ["10121D", "Vulcan"],
    ["101405", "Green Waterloo"],
    ["105852", "Eden"],
    ["110C6C", "Arapawa"],
    ["120A8F", "Ultramarine"],
    ["123447", "Elephant"],
    ["126B40", "Jewel"],
    ["130000", "Diesel"],
    ["130A06", "Asphalt"],
    ["13264D", "Blue Zodiac"],
    ["134F19", "Parsley"],
    ["140600", "Nero"],
    ["1450AA", "Tory Blue"],
    ["148B37", "Bunting"],
    ["154406", "Verdun Green"],
    ["191970", "Midnight Blue"],
    ["1B0245", "Violet"],
    ["1B1B1B", "Eerie Black"],
    ["1C1208", "Karaka"],
    ["1C1E13", "El Paso"],
    ["1C39BB", "Persian Blue"],
    ["1C402E", "Burnished Gold"],
    ["1D6142", "Fun Green"],
    ["1E0F04", "Tamarind"],
    ["1E1609", "Creole"],
    ["1E1708", "Karry"],
    ["1E385B", "Prussian Blue"],
    ["1E433C", "Blue Stone"],
    ["1E90FF", "Dodger Blue"],
    ["1E9AB0", "Eastern Blue"],
    ["1F3438", "Aztec"],
    ["1FC2C2", "Turquoise"],
    ["20208D", "Jacksons Purple"],
    ["202E54", "Cloud Burst"],
    ["204852", "Blue Dianne"],
    ["211A0E", "Eternity"],
    ["220878", "Deep Blue"],
    ["228B22", "Forest Green"],
    ["22FFFF", "Bright Turquoise"],
    ["233418", "Pine Tree"],
    ["23297A", "Bay of Many"],
    ["242A1D", "Log Cabin"],
    ["24500F", "Turtle Green"],
    ["251706", "Black Olive"],
    ["25272C", "Outer Space"],
    ["25311C", "Palm Green"],
    ["253529", "Hunter Green"],
    ["263E28", "Everglade"],
    ["26428B", "St Tropaz"],
    ["266696", "Deep Cerulean"],
    ["26A6A6", "Light Sea Green"],
    ["27504B", "Plantation"],
    ["278A5B", "Green Pea"],
    ["281E15", "Wood Bark"],
    ["293432", "Heavy Metal"],
    ["29AB87", "Jungle Green"],
    ["2B3228", "Outer Space"],
    ["2B3F26", "Turtle Green"],
    ["2C3E50", "Tuna"],
    ["2E2D88", "Jacarta"],
    ["2E3F62", "Madison"],
    ["2E8B57", "Sea Green"],
    ["2F270E", "Olive"],
    ["2F4F4F", "Dark Slate Gray"],
    ["2F6168", "Blue Bayoux"],
    ["2F847C", "Ming"],
    ["306030", "Fern Green"],
    ["312A29", "Jon"],
    ["313C45", "Outer Space"],
    ["318CE7", "Bleu De France"],
    ["32127A", "Persian Indigo"],
    ["32174D", "Russian Violet"],
    ["324AB2", "Cerulean Blue"],
    ["325D52", "Eden"],
    ["327C14", "La Palma"],
    ["328327", "Forest Green"],
    ["32CD32", "Lime Green"],
    ["341515", "Aubergine"],
    ["343434", "Mine Shaft"],
    ["350036", "Plum"],
    ["351C75", "Paua"],
    ["353542", "Martinique"],
    ["354E8C", "St Tropaz"],
    ["360079", "Indigo"],
    ["363050", "Revolver"],
    ["365C5D", "Oracle"],
    ["37290E", "Bronze Olive"],
    ["373021", "Black Olive"],
    ["377475", "Half Baked"],
    ["382C1E", "Dark Rum"],
    ["382E1C", "Woodrush"],
    ["3834A0", "Governor Bay"],
    ["386150", "Viridian"],
    ["38978D", "Lochinvar"],
    ["39403E", "Tundora"],
    ["396413", "Bilbao"],
    ["3980C6", "Curious Blue"],
    ["39AD48", "Shamrock Green"],
    ["3A3A38", "Tuatara"],
    ["3A4B47", "Heavy Metal"],
    ["3B3910", "Saratoga"],
    ["3B5323", "Hunter Green"],
    ["3B7A57", "Amazon"],
    ["3C0878", "Pigment Indigo"],
    ["3C3910", "Bronze"],
    ["3C4151", "River Bed"],
    ["3CB371", "Medium Sea Green"],
    ["3D0C02", "Black Bean"],
    ["3D2B1F", "Bistre"],
    ["3E2B23", "Treehouse"],
    ["3E3A44", "Shark"],
    ["3EB489", "Mint"],
    ["3F2109", "Milk Chocolate"],
    ["3F2500", "Deep Bronze"],
    ["3F3002", "Deep Bronze"],
    ["3F307F", "Meteorite"],
    ["3FC1AA", "Sea Green"],
    ["40826D", "Viridian"],
    ["40A860", "Chateau Green"],
    ["410056", "Imperial Purple"],
    ["4169E1", "Royal Blue"],
    ["417DC1", "San Marino"],
    ["420303", "Temptress"],
    ["423921", "Mikado"],
    ["427977", "Ming"],
    ["431560", "Scarlet Gum"],
    ["433120", "Deep Oak"],
    ["43464B", "Arsenic"],
    ["43B3AE", "Keppel"],
    ["43C6DB", "Turquoise Blue"],
    ["44012D", "Claret"],
    ["441099", "Indigo"],
    ["44111F", "Heath"],
    ["442D25", "Cocoa Bean"],
    ["444954", "Mako"],
    ["454936", "Kelp"],
    ["456CAC", "San Marino"],
    ["45B1E8", "Summer Sky"],
    ["465945", "Nandor"],
    ["465D87", "Wedgewood"],
    ["466CAB", "Havelock Blue"],
    ["467979", "Cutty Sark"],
    ["47456D", "Martinique"],
    ["483C32", "Taupe"],
    ["48531F", "Verdun Green"],
    ["49170C", "Persian Plum"],
    ["4A2D5D", "Bossanova"],
    ["4A3004", "Dark Rum"],
    ["4A3324", "Brown Bramble"],
    ["4A444B", "Gravel"],
    ["4A4A4A", "Tundora"],
    ["4A4E5A", "Trout"],
    ["4A766E", "Cutty Sark"],
    ["4A90E2", "Curious Blue"],
    ["4B0082", "Indigo"],
    ["4B3621", "Deep Coffee"],
    ["4B5D52", "Feldgrau"],
    ["4C3024", "Saddle Brown"],
    ["4C4F56", "Mako"],
    ["4D0135", "Bordeaux"],
    ["4D0A18", "Cab Sav"],
    ["4D2410", "Saddle"],
    ["4D3E3F", "Woody Brown"],
    ["4E2A5A", "Purple Taupe"],
    ["4E420C", "Bronze Olive"],
    ["4F1C70", "Honey Flower"],
    ["4F2398", "Purple Heart"],
    ["4F4244", "Liver"],
    ["4F9D5D", "Fern"],
    ["500000", "Black Maroon"],
    ["501199", "Blue Gem"],
    ["503451", "Affair"],
    ["507096", "Kashmir Blue"],
    ["50C878", "Emerald"],
    ["514649", "Woody Brown"],
    ["516E3D", "Glade Green"],
    ["517C63", "Viridian Green"],
    ["520C17", "Black Rose"],
    ["524D50", "Chicago"],
    ["534491", "Daisy Bush"],
    ["536895", "Wedgewood"],
    ["537050", "Finlandia"],
    ["53824B", "Fern"],
    ["541012", "Black Rose"],
    ["544333", "Deep Bronze"],
    ["54534D", "Chicago"],
    ["549019", "Sushi"],
    ["551B8C", "Seance"],
    ["554545", "Emperor"],
    ["555B10", "Verdun Green"],
    ["556600", "Avocado"],
    ["556B2F", "Dark Olive Green"],
    ["55DDE0", "Turquoise"],
    ["564B47", "Emperor"],
    ["565551", "Chicago"],
    ["566555", "Finlandia"],
    ["567572", "Sirocco"],
    ["569D79", "Aqua Forest"],
    ["56B4BE", "Fountain Blue"],
    ["578363", "Hippie Green"],
    ["583401", "Dark Goldenrod"],
    ["583580", "Daisy Bush"],
    ["588199", "Gothic"],
    ["58E73F", "Screamin Green"],
    ["5946B2", "Gigas"],
    ["597368", "Como"],
    ["5A0E15", "Rosewood"],
    ["5A4FCF", "Slate Blue"],
    ["5A5F68", "Shuttle Gray"],
    ["5A6351", "Finlandia"],
    ["5B3013", "Bracken"],
    ["5B5348", "Flint"],
    ["5B5D5E", "Chicago"],
    ["5B8930", "Bilbao"],
    ["5BA5A5", "Fountain Blue"],
    ["5C0120", "Black Rose"],
    ["5C0536", "Claret"],
    ["5C5D5A", "Chicago"],
    ["5C9291", "Half Baked"],
    ["5D1E0F", "Brown Bramble"],
    ["5D57AA", "Gigas"],
    ["5D5C51", "Flint"],
    ["5D89BA", "Steel Blue"],
    ["5DA19F", "Fountain Blue"],
    ["5DA2AC", "Fountain Blue"],
    ["5E483E", "Cork"],
    ["5E5D3B", "Woodland"],
    ["5F3D26", "Jambalaya"],
    ["5F5F6E", "Scarpa Flow"],
    ["5F8A8B", "Gothic"],
    ["5FA778", "Aqua Forest"],
    ["5FB3AC", "Tradewind"],
    ["604913", "Horses Neck"],
    ["605B73", "Smoky"],
    ["606E68", "Pale Sky"],
    ["6093D1", "Danube"],
    ["612718", "Hairy Heath"],
    ["614051", "Eggplant"],
    ["615C4F", "Flint"],
    ["618F90", "Gumbo"],
    ["619292", "Smalt Blue"],
    ["61845F", "Hippie Green"],
    ["622F30", "Sanguine Brown"],
    ["623F2D", "Jambalaya"],
    ["624E9A", "Butterfly Bush"],
    ["625119", "Bronze"],
    ["626649", "Woodland"],
    ["627C63", "Camouflage Green"],
    ["62B1F6", "Malibu"],
    ["6318C9", "Grape"],
    ["633C2B", "Dark Oak"],
    ["636F22", "Pacifika"],
    ["63B76C", "Fern"],
    ["6456B7", "Blue Marguerite"],
    ["646077", "Scarpa Flow"],
    ["648C66", "Highland"],
    ["64A5A5", "Tradewind"],
    ["653D54", "Cosmic"],
    ["660045", "Tyrian Purple"],
    ["66023C", "Tyrian Purple"],
    ["661010", "Rosewood"],
    ["66424D", "Woody Brown"],
    ["664228", "Bracken"],
    ["6651A2", "Blue Marguerite"],
    ["669999", "Ziggurat"],
    ["66B58F", "Keppel"],
    ["66CDAA", "Medium Aquamarine"],
    ["66FF00", "Bright Green"],
    ["670706", "Mahogany"],
    ["678975", "Patina"],
    ["67A712", "Apple"],
    ["67D53D", "Mantis"],
    ["681C23", "Tamarind"],
    ["682860", "Finn"],
    ["685558", "Falcon"],
    ["6867A7", "Scampi"],
    ["689D71", "Highland"],
    ["68A829", "Lima"],
    ["68838B", "Cadet Blue"],
    ["6897BB", "Air Force Blue"],
    ["6913E5", "Electric Violet"],
    ["693E6B", "Finn"],
    ["693F2B", "Pickled Bean"],
    ["6960EC", "Slate Blue"],
    ["696268", "Dove Gray"],
    ["696969", "Dim Gray"],
    ["69D84F", "Mantis"],
    ["6A442E", "Pickled Bean"],
    ["6A5ACD", "Slate Blue"],
    ["6A6051", "Flint"],
    ["6B2A14", "Mahogany"],
    ["6B3FA0", "Vivid Violet"],
    ["6B4423", "Dark Brown"],
    ["6B4E31", "Umber"],
    ["6B5755", "Falcon"],
    ["6B8BA2", "Gothic"],
    ["6B8E23", "Olive Drab"],
    ["6C3461", "Affair"],
    ["6C541E", "West Coast"],
    ["6CDAE7", "Turquoise Blue"],
    ["6D0101", "Rosewood"],
    ["6D5E54", "Stormy Weather"],
    ["6D6C6C", "Dove Gray"],
    ["6D8D5F", "Highland"],
    ["6D9292", "Ziggurat"],
    ["6E0902", "Dark Tan"],
    ["6E1D14", "Mahogany"],
    ["6E4826", "Dark Brown"],
    ["6E4B26", "Dark Brown"],
    ["6E6D57", "Arrowtown"],
    ["6E7783", "Pale Sky"],
    ["6EAEA1", "Gulf Stream"],
    ["6F440C", "Nutmeg"],
    ["6F6A61", "Flint"],
    ["6F6B58", "Arrowtown"],
    ["6F7874", "Rolling Stone"],
    ["6F8E63", "Hippie Green"],
    ["6FD0C5", "Monte Carlo"],
    ["701C1C", "Moccaccino"],
    ["703642", "Tawny Port"],
    ["704214", "Sepia"],
    ["704A07", "Antique Bronze"],
    ["705859", "Ferra"],
    ["707070", "Gray"],
    ["708090", "Slate Gray"],
    ["70DB93", "Aquamarine"],
    ["711A00", "Kenyan Copper"],
    ["714693", "Eminence"],
    ["71B5D8", "Half Baked"],
    ["7231D8", "Blue Violet"],
    ["7233A3", "Studio"],
    ["724A2F", "Semi Sweet"],
    ["726D4E", "Arrowtown"],
    ["727B89", "Pale Sky"],
    ["72A8BC", "Neptune"],
    ["731E8F", "Vivid Violet"],
    ["734A12", "Antique Bronze"],
    ["736C9F", "Deluge"],
    ["736D58", "Pablo"],
    ["737829", "Pacifika"],
    ["738678", "Xanadu"],
    ["73C2FB", "Maya Blue"],
    ["7400DC", "Electric Violet"],
    ["7400F4", "Violet"],
    ["742A04", "Cinnamon"],
    ["746CC0", "Blue Marguerite"],
    ["747D63", "Axolotl"],
    ["747D83", "Rolling Stone"],
    ["74C365", "Mantis"],
    ["755A57", "Russett"],
    ["758000", "Pacifika"],
    ["759596", "Gumbo"],
    ["75AADB", "Cornflower"],
    ["75B412", "Lima"],
    ["762422", "Persian Plum"],
    ["764F1F", "Sepia"],
    ["766EC8", "Blue Marguerite"],
    ["770737", "Claret"],
    ["778099", "Pigeon Post"],
    ["778120", "Pacifika"],
    ["779E86", "Padua"],
    ["77DD77", "Pastel Green"],
    ["780109", "Rosewood"],
    ["782D19", "Cumin"],
    ["782F16", "Cumin"],
    ["783D49", "Cosmic"],
    ["78866B", "Camouflage Green"],
    ["788A25", "Trendy Green"],
    ["789B73", "Amulet"],
    ["7914FF", "Electric Violet"],
    ["793D52", "Finn"],
    ["795D4C", "Quincy"],
    ["796878", "Rum"],
    ["796989", "Mountbatten Pink"],
    ["796A78", "Fedora"],
    ["7977A5", "Deluge"],
    ["79A5A1", "Acapulco"],
    ["79DEEC", "Turquoise Blue"],
    ["7A013A", "Camelot"],
    ["7A0D2B", "Claret"],
    ["7A0F0B", "Mahogany"],
    ["7A5B3F", "Quincy"],
    ["7A7A7A", "Gray"],
    ["7A89B8", "Ship Cove"],
    ["7AB1CC", "Danube"],
    ["7AC5CD", "Cadet Blue"],
    ["7AE7BF", "Aquamarine"],
    ["7B1113", "Merlot"],
    ["7B3F00", "Cinnamon"],
    ["7B6660", "Ferra"],
    ["7BA05B", "Asparagus"],
    ["7C0A02", "Kenyan Copper"],
    ["7C1C05", "Kenyan Copper"],
    ["7C7631", "Pacifika"],
    ["7C778A", "Lavender Gray"],
    ["7C7B7A", "Ironside Gray"],
    ["7C7B82", "Fedora"],
    ["7C8531", "Trendy Green"],
    ["7C9ED9", "Vista Blue"],
    ["7CB0A1", "Gulf Stream"],
    ["7CB7BB", "Ziggurat"],
    ["7D2C14", "Paarl"],
    ["7D7462", "Flax Smoke"],
    ["7D7C72", "Lemon Grass"],
    ["7DD8C6", "Bermuda"],
    ["7E1E9C", "Purple Heart"],
    ["7E3A15", "Bracken"],
    ["7E3D38", "Nutwood"],
    ["7E5E60", "Russett"],
    ["7E6A57", "Cement"],
    ["7E7694", "Amethyst Smoke"],
    ["7ED4E6", "Sky Blue"],
    ["7F00FF", "Violet"],
    ["7F1734", "Paprika"],
    ["7F3A02", "Antique Bronze"],
    ["7F626D", "Empress"],
    ["7F7E65", "Olive Haze"],
    ["7F76D3", "Slate Blue"],
    ["7F7F7F", "Gray"],
    ["7FFF00", "Chartreuse"],
    ["7FFFD4", "Aquamarine"],
    ["800000", "Maroon"],
    ["800020", "Burgundy"],
    ["800B47", "Rose Bud Cherry"],
    ["800E2D", "Monarch"],
    ["801818", "Falu Red"],
    ["80341F", "Cumin"],
    ["803F62", "Cosmic"],
    ["80461B", "Russet"],
    ["805B87", "Trendy Pink"],
    ["808000", "Olive"],
    ["808080", "Gray"],
    ["80B3AE", "Gulf Stream"],
    ["80B3C4", "Neptune"],
    ["80CCEA", "Sky Blue"],
    ["81422C", "Paarl"],
    ["816E71", "Empress"],
    ["817377", "Bazaar"],
    ["819885", "Envy"],
    ["81D7D8", "Turquoise Blue"],
    ["820000", "Maroon"],
    ["828685", "Gunsmoke"],
    ["828F72", "Xanadu"],
    ["82983D", "Sushi"],
    ["82A4F2", "Cornflower"],
    ["830303", "Mahogany"],
    ["831923", "Paprika"],
    ["836141", "Semi Sweet"],
    ["836FFF", "Slate Blue"],
    ["838996", "Waterloo"],
    ["83AA5D", "Chelsea Cucumber"],
    ["83D0C6", "Monte Carlo"],
    ["843179", "Plum"],
    ["84DE02", "Green Yellow"],
    ["855E42", "Dark Wood"],
    ["8581D9", "Chetwode Blue"],
    ["858470", "Green Spring"],
    ["859FAF", "Submarine"],
    ["85B3D1", "Glacier"],
    ["860111", "Rosewood"],
    ["863C3C", "Stiletto"],
    ["86483C", "Au Chico"],
    ["864D1E", "Russet"],
    ["8671B8", "Deluge"],
    ["868974", "Xanadu"],
    ["86949F", "Regent Gray"],
    ["871550", "Flirt"],
    ["87421F", "Russet"],
    ["877C7B", "Hurricane"],
    ["878D91", "Oslo Gray"],
    ["87AB39", "Sushi"],
    ["87CEEB", "Sky Blue"],
    ["87CEFA", "Light Sky Blue"],
    ["880085", "Dark Magenta"],
    ["893456", "Camelot"],
    ["893843", "Solid Pink"],
    ["894367", "Cannon Pink"],
    ["895B44", "Spicy Mix"],
    ["8959A8", "Trendy Pink"],
    ["8A0324", "Pohutukawa"],
    ["8A3324", "Falu Red"],
    ["8A496B", "Cannon Pink"],
    ["8A6F30", "Bronze"],
    ["8A6F64", "Leather"],
    ["8A7F8D", "Amethyst Smoke"],
    ["8A8360", "Gurkha"],
    ["8A8389", "Taupe Gray"],
    ["8A8F8A", "Stack"],
    ["8AB9F1", "Jordy Blue"],
    ["8B008B", "Dark Magenta"],
    ["8B0723", "Pohutukawa"],
    ["8B1D1C", "Merlot"],
    ["8B3103", "Cinnamon"],
    ["8B4513", "Saddle Brown"],
    ["8B4726", "Nutmeg"],
    ["8B4789", "Plum"],
    ["8B658B", "Plum"],
    ["8B7500", "Dark Goldenrod"],
    ["8B7E66", "Sand Dune"],
    ["8B8470", "Spring Wood"],
    ["8B847E", "Schooner"],
    ["8B8680", "Concord"],
    ["8B8989", "Suva Gray"],
    ["8C472F", "Red Robin"],
    ["8C5738", "Rope"],
    ["8C6495", "Amethyst Smoke"],
    ["8D0226", "Pohutukawa"],
    ["8D3226", "Brown Rust"],
    ["8D3D38", "Nutwood"],
    ["8D4F42", "Ironside"],
    ["8D7662", "Sand Dune"],
    ["8DA8CC", "Polo Blue"],
    ["8DB600", "Apple"],
    ["8DD9CC", "Bermuda"],
    ["8E0000", "Dark Red"],
    ["8E4D1E", "Dark Tan"],
    ["8E6F70", "Pharlap"],
    ["8E7F61", "Flax Smoke"],
    ["8E8B82", "Stone"],
    ["8F021C", "Pohutukawa"],
    ["8F3E33", "Spicy Mix"],
    ["8F4B0E", "Dark Goldenrod"],
    ["8F54B1", "Deluge"],
    ["8F8176", "Squirrel"],
    ["8F8CE7", "Portage"],
    ["8F9779", "Artichoke"],
    ["8FBC8F", "Dark Sea Green"],
    ["8FD6B4", "Bermuda"],
    ["8FF2C8", "Bermuda"],
    ["900020", "Burgundy"],
    ["907874", "Opium"],
    ["907B71", "Squirrel"],
    ["908D39", "Sycamore"],
    ["90E4C1", "Bermuda"],
    ["912D2B", "Old Brick"],
    ["9131AF", "Violet"],
    ["916E99", "Amethyst Smoke"],
    ["917319", "Bronze"],
    ["91A3B0", "Cadet Blue"],
    ["9260C5", "Medium Purple"],
    ["92B1B6", "Submarine"],
    ["93CCEA", "Light Blue"],
    ["9400D3", "Dark Violet"],
    ["940073", "Plum"],
    ["948771", "Arrowtown"],
    ["950015", "Pohutukawa"],
    ["954535", "Cinnamon"],
    ["956387", "Trendy Pink"],
    ["959396", "Suva Gray"],
    ["95C8D8", "Light Blue"],
    ["960018", "Carmine"],
    ["964B00", "Brown"],
    ["967059", "Leather"],
    ["967117", "Sandy Brown"],
    ["967B68", "Sand Dune"],
    ["969696", "Dusty Gray"],
    ["96BBAB", "Summer Green"],
    ["97605D", "Rose Taupe"],
    ["978A84", "Zorba"],
    ["982900", "Totem Pole"],
    ["983D61", "Rose Dust"],
    ["9874D3", "Amethyst"],
    ["98777B", "Bazaar"],
    ["98BF64", "Olivine"],
    ["98D98E", "Dark Sea Green"],
    ["98FF98", "Mint Green"],
    ["990066", "Eggplant"],
    ["991199", "Dark Magenta"],
    ["9932CC", "Dark Orchid"],
    ["99362A", "Cognac"],
    ["994E41", "Sepia Skin"],
    ["9958BB", "Amethyst"],
    ["996515", "Golden Brown"],
    ["996633", "Kumera"],
    ["996666", "Copper Rose"],
    ["9973D5", "Amethyst"],
    ["99917B", "Pale Oyster"],
    ["9999CC", "Blue Bell"],
    ["99AA6D", "Green Yellow"],
    ["99EE90", "Pale Green"],
    ["9A0200", "Sangria"],
    ["9A3820", "Totem Pole"],
    ["9A6E61", "Leather"],
    ["9AA0A8", "Nobel"],
    ["9AB973", "Chelsea Cucumber"],
    ["9ACD32", "Yellow Green"],
    ["9AFF9A", "Mint Green"],
    ["9B111E", "Ruby Red"],
    ["9B2D30", "Stiletto"],
    ["9B4703", "Orange Roughy"],
    ["9B6B5F", "Pharlap"],
    ["9B7653", "Dark Tan"],
    ["9B8F02", "Olive"],
    ["9BB38B", "Dark Sea Green"],
    ["9BC4E2", "Sail"],
    ["9C2542", "Big Dip O'ruby"],
    ["9D5616", "Golden Brown"],
    ["9D6B64", "Pharlap"],
    ["9D9167", "Sycamore"],
    ["9DC209", "Citrus"],
    ["9DE5FF", "Fresh Air"],
    ["9E1B32", "Old Brick"],
    ["9E5302", "Orange Roughy"],
    ["9E5B40", "Sepia Skin"],
    ["9EA587", "Artichoke"],
    ["9EA91F", "Citron"],
    ["9EB1CD", "Rock Blue"],
    ["9EDEE0", "Powder Blue"],
    ["9F00C5", "Dark Violet"],
    ["9F381D", "Cognac"],
    ["9F5B2B", "Pumpkin Spice"],
    ["9F5F9F", "Violet"],
    ["9F8170", "Pale Chestnut"],
    ["9FA0B1", "Manatee"],
    ["9FD7D3", "Sinbad"],
    ["9FDD8C", "Feijoa"],
    ["A02712", "Totem Pole"],
    ["A0522D", "Sienna"],
    ["A05837", "Sepia Skin"],
    ["A0785A", "Leather"],
    ["A0D6B4", "Bermuda"],
    ["A14F00", "Ginger"],
    ["A15F3B", "Semi Sweet"],
    ["A1ADB5", "Casper"],
    ["A1C50A", "Citrus"],
    ["A1DAD7", "Aqua Island"],
    ["A1E9DE", "Water Leaf"],
    ["A20070", "Red Violet"],
    ["A23B6C", "Rouge"],
    ["A25F2A", "Semi Sweet"],
    ["A2A415", "Bahia"],
    ["A2AAB3", "Manatee"],
    ["A2AEAB", "Edward"],
    ["A2C275", "Olivine"],
    ["A2D9CE", "Turquoise Blue"],
    ["A35A00", "Tawny"],
    ["A36395", "Violet"],
    ["A3807B", "Thatch"],
    ["A3E3ED", "Blizzard Blue"],
    ["A4A49D", "Dawn"],
    ["A4A6D3", "Blue Bell"],
    ["A4AF6E", "Moss Green"],
    ["A4D7D1", "Turquoise Blue"],
    ["A4DDED", "Powder Blue"],
    ["A4F4F9", "Light Blue"],
    ["A50B5E", "Lipstick"],
    ["A5260A", "Carnelian"],
    ["A52A2A", "Brown"],
    ["A5F2F3", "Celeste"],
    ["A62F20", "Cognac"],
    ["A63A79", "Fuchsia"],
    ["A65529", "Pumpkin Spice"],
    ["A68B5B", "Sandal"],
    ["A69279", "Sandal"],
    ["A6A29A", "Cloudy"],
    ["A6CA55", "Conifer"],
    ["A6E7FF", "Fresh Air"],
    ["A76BCF", "Amethyst"],
    ["A7882C", "Luxor Gold"],
    ["A7A07D", "Locust"],
    ["A7FC00", "Green Yellow"],
    ["A80B51", "Lipstick"],
    ["A81C07", "Carnelian"],
    ["A83731", "Stiletto"],
    ["A84549", "Stiletto"],
    ["A86515", "Bronze"],
    ["A86B6B", "Copper Rose"],
    ["A87878", "Thatch"],
    ["A8989B", "Thatch"],
    ["A899E6", "Wisteria"],
    ["A8A589", "Neutral Green"],
    ["A8A9AD", "Quick Silver"],
    ["A8AE9C", "Bud"],
    ["A8BFCA", "Nepal"],
    ["A8C589", "Olivine"],
    ["A8E3BD", "Magic Mint"],
    ["A9227A", "Jazzberry Jam"],
    ["A9A9A9", "Dark Gray"],
    ["A9ACB6", "Bombay"],
    ["A9B2C3", "Link Water"],
    ["A9BA9D", "Bud"],
    ["A9BE70", "Olivine"],
    ["A9C6C2", "Opal"],
    ["AA00CC", "Dark Violet"],
    ["AA375A", "Rouge"],
    ["AA4069", "Rouge"],
    ["AA4203", "Rust"],
    ["AA8B5B", "Sandal"],
    ["AA8D6F", "Sandal"],
    ["AAA5A9", "Edward"],
    ["AAA9CD", "Blue Bell"],
    ["AAAF8C", "Green Mist"],
    ["AAB05D", "Celery"],
    ["AAE0FA", "Light Blue"],
    ["AB0563", "Lipstick"],
    ["AB3472", "Rouge"],
    ["AB4B52", "English Rose"],
    ["AB9C66", "Sandal"],
    ["ABA196", "Zorba"],
    ["ABADAF", "Nobel"],
    ["ABB1AF", "Nobel"],
    ["ABBFC8", "Casper"],
    ["AC1E44", "Cardinal"],
    ["AC4034", "Mojo"],
    ["AC91CE", "Wisteria"],
    ["AC9E22", "Lucky"],
    ["ACB78E", "Sage"],
    ["ACCBB1", "Surf"],
    ["ACDD4D", "Yellow Green"],
    ["ACE1AF", "Celadon"],
    ["AD781B", "Golden Brown"],
    ["ADD8E6", "Light Blue"],
    ["ADDFAD", "Moss Green"],
    ["ADE6C4", "Turquoise Blue"],
    ["ADFF2F", "Green Yellow"],
    ["AE0C00", "Fire Brick"],
    ["AE4560", "Hippie Pink"],
    ["AE6020", "Pumpkin Spice"],
    ["AE6C35", "Mai Tai"],
    ["AE9F17", "Lucky"],
    ["AEA04B", "Olive Green"],
    ["AECFCF", "Iceberg"],
    ["AEDBF4", "Columbia Blue"],
    ["AEE1EC", "Powder Blue"],
    ["AEEE9E", "Light Green"],
    ["AF3F6F", "Violet Red"],
    ["AF4035", "Mojo"],
    ["AF4D43", "Mojo"],
    ["AF593E", "Orange Roughy"],
    ["AF6F09", "Golden Brown"],
    ["AF8751", "Mai Tai"],
    ["AF8F2C", "Lucky"],
    ["AF9F1C", "Lucky"],
    ["AFA09E", "Nobel"],
    ["AFEEEE", "Pale Turquoise"],
    ["B00149", "Lipstick"],
    ["B01B2E", "Cardinal"],
    ["B04C6A", "Hippie Pink"],
    ["B05D54", "Moderate Red"],
    ["B05E81", "Cannon Pink"],
    ["B06608", "Mai Tai"],
    ["B09A95", "Martini"],
    ["B0AC94", "Bud"],
    ["B0B7C6", "Casper"],
    ["B0C4DE", "Light Steel Blue"],
    ["B0E0E6", "Powder Blue"],
    ["B0E313", "Lime"],
    ["B10000", "Bright Red"],
    ["B14A0B", "Rust"],
    ["B16D52", "Moderate Red"],
    ["B19461", "Sandal"],
    ["B1A8A1", "Nobel"],
    ["B1E2C1", "Aqua Spring"],
    ["B1F4E7", "Aqua Spring"],
    ["B22222", "Fire Brick"],
    ["B23E72", "Mulberry"],
    ["B2A1EA", "Wisteria"],
    ["B2B0AE", "Bombay"],
    ["B2DAEA", "Light Blue"],
    ["B2EC5D", "Yellow Green"],
    ["B3446C", "Cerise"],
    ["B35213", "Rust"],
    ["B3AB9A", "Sisal"],
    ["B3AF95", "Sisal"],
    ["B3C110", "Lime"],
    ["B3C4A1", "Sage"],
    ["B3CDAF", "Sprout"],
    ["B42041", "Lipstick"],
    ["B44668", "Cerise"],
    ["B4B4B4", "Silver"],
    ["B4CFD3", "Opal"],
    ["B5651D", "Light Brown"],
    ["B57281", "English Rose"],
    ["B57EDC", "Lavender"],
    ["B5A27F", "Sandal"],
    ["B5AEB0", "Nobel"],
    ["B5B35C", "Olive Green"],
    ["B5D2CE", "Jet Stream"],
    ["B5ECDF", "Water Leaf"],
    ["B6316C", "Rouge"],
    ["B64533", "Mojo"],
    ["B6B095", "Sisal"],
    ["B6BAA4", "Bud"],
    ["B7410E", "Rust"],
    ["B78727", "Buttered Rum"],
    ["B78958", "Mai Tai"],
    ["B79480", "Sandal"],
    ["B7A458", "Olive Green"],
    ["B7F0BE", "Turquoise Blue"],
    ["B81104", "Bright Red"],
    ["B87333", "Copper"],
    ["B8860B", "Dark Goldenrod"],
    ["B8989A", "Martini"],
    ["B8A36D", "Sandal"],
    ["B8B56A", "Olive Green"],
    ["B8B799", "Bud"],
    ["B8C1B1", "Bud"],
    ["B8C25D", "Olive Green"],
    ["B8E0F9", "Light Blue"],
    ["B91B73", "Red Violet"],
    ["B94E48", "Chestnut"],
    ["B98D28", "Lucky"],
    ["B99685", "Quicksand"],
    ["B9B9B9", "Silver"],
    ["B9C46A", "Olive Green"],
    ["B9C8AC", "Bud"],
    ["BA0101", "Bright Red"],
    ["BA0C2F", "Crimson"],
    ["BA450C", "Rust"],
    ["BA55D3", "Medium Orchid"],
    ["BA6F1E", "Buttered Rum"],
    ["BA7F03", "Golden Brown"],
    ["BAB1A2", "Sisal"],
    ["BAC7C9", "Opal"],
    ["BADA55", "Lime"],
    ["BADBE5", "Light Blue"],
    ["BAF1A1", "Celadon"],
    ["BB3385", "Red Violet"],
    ["BB8983", "Quicksand"],
    ["BBD0C9", "Surf"],
    ["BBD2E9", "Light Blue"],
    ["BC5D58", "Chestnut"],
    ["BC987E", "Cashmere"],
    ["BCC7CD", "Opal"],
    ["BCBDAC", "Bud"],
    ["BCD4E6", "Periwinkle"],
    ["BCF5A6", "Yellow Green"],
    ["BD33A4", "Fuchsia"],
    ["BD5D35", "Pumpkin Spice"],
    ["BD9C85", "Quicksand"],
    ["BDB0B0", "Nobel"],
    ["BDB1A8", "Sisal"],
    ["BDB2A1", "Sisal"],
    ["BDB76B", "Dark Khaki"],
    ["BDBBD7", "Blue Bell"],
    ["BDBDC6", "Blue Bell"],
    ["BDC8B3", "Bud"],
    ["BDC9CE", "Opal"],
    ["BDD6DB", "Light Blue"],
    ["BDE8DC", "Aqua Spring"],
    ["BDF6E6", "Aqua Spring"],
    ["BE4F62", "Chestnut"],
    ["BE5F33", "Pumpkin Spice"],
    ["BE896F", "Quicksand"],
    ["BE9494", "Quicksand"],
    ["BEA413", "Lucky"],
    ["BEA6C3", "Pastel Purple"],
    ["BEB5A7", "Sisal"],
    ["BEC0B4", "Tasman"],
    ["BEC8D3", "Casper"],
    ["BED0B1", "Surf"],
    ["BEE64B", "Conifer"],
    ["BEEBE9", "Powder Blue"],
    ["BEEDBE", "Light Green"],
    ["BF4F51", "Chestnut"],
    ["BF5500", "Rust"],
    ["BFB8B0", "Sisal"],
    ["BFBED8", "Blue Bell"],
    ["BFC1C2", "Casper"],
    ["BFC7D7", "Casper"],
    ["BFFF00", "Lime"],
    ["C02942", "Crimson"],
    ["C09B99", "Quicksand"],
    ["C0C0C0", "Silver"],
    ["C0D3B9", "Surf"],
    ["C0D8B6", "Surf"],
    ["C0E8D5", "Surf"],
    ["C154C1", "Fuchsia"],
    ["C1A004", "Lucky"],
    ["C1B7A4", "Sisal"],
    ["C1BAB0", "Sisal"],
    ["C1BECD", "Blue Bell"],
    ["C1C6C8", "Casper"],
    ["C1D7B0", "Surf"],
    ["C1DF21", "Lime"],
    ["C1F07C", "Yellow Green"],
    ["C27B35", "Copper"],
    ["C2955D", "Cashmere"],
    ["C2BDB6", "Sisal"],
    ["C2CAC4", "Edward"],
    ["C2D4B5", "Surf"],
    ["C2E8E5", "Powder Blue"],
    ["C32148", "Maroon Flush"],
    ["C3B091", "Sisal"],
    ["C3BFC1", "Sisal"],
    ["C3C3BD", "Tasman"],
    ["C3CDE6", "Periwinkle"],
    ["C3D1D1", "Opal"],
    ["C41E3A", "Cardinal"],
    ["C45655", "Chestnut"],
    ["C45719", "Rust"],
    ["C46210", "Rust"],
    ["C48379", "Quicksand"],
    ["C4A16B", "Cashmere"],
    ["C4C4BC", "Tasman"],
    ["C4C8D5", "Casper"],
    ["C4D0B0", "Surf"],
    ["C4DFE6", "Powder Blue"],
    ["C4F4EB", "Aqua Spring"],
    ["C54B8C", "Cerise"],
    ["C59922", "Lucky"],
    ["C5994B", "Cashmere"],
    ["C5DBCA", "Surf"],
    ["C5E17A", "Yellow Green"],
    ["C62D42", "Crimson"],
    ["C6726B", "English Rose"],
    ["C69191", "Quicksand"],
    ["C6A84B", "Lucky"],
    ["C6C3B5", "Sisal"],
    ["C6C8BD", "Tasman"],
    ["C6E610", "Lime"],
    ["C71585", "Medium Violet Red"],
    ["C7158D", "Magenta"],
    ["C72E5F", "Cerise"],
    ["C7372D", "Mojo"],
    ["C74375", "Cerise"],
    ["C7A488", "Cashmere"],
    ["C7B5A6", "Sisal"],
    ["C7BCA2", "Sisal"],
    ["C7C1FF", "Pale Blue"],
    ["C7C4BF", "Sisal"],
    ["C7C9D5", "Casper"],
    ["C7CD90", "Sage"],
    ["C7DDE5", "Powder Blue"],
    ["C889D0", "Light Purple"],
    ["C8A2C8", "Lilac"],
    ["C8A528", "Lucky"],
    ["C8AABF", "Lily"],
    ["C8B568", "Lucky"],
    ["C8C8C8", "Silver"],
    ["C8D458", "Yellow Green"],
    ["C8D77D", "Yellow Green"],
    ["C8E3D7", "Surf"],
    ["C96323", "Tenn"],
    ["C99415", "Golden Brown"],
    ["C9A0DC", "Wisteria"],
    ["C9B29B", "Sisal"],
    ["C9B35B", "Roti"],
    ["C9B93B", "Roti"],
    ["C9C0BB", "Sisal"],
    ["C9D9D2", "Surf"],
    ["C9DE00", "Lime"],
    ["C9DEFF", "Tropical Blue"],
    ["C9FFE5", "Mint Green"],
    ["CA3435", "Crimson"],
    ["CAA885", "Cashmere"],
    ["CABB48", "Roti"],
    ["CABDBF", "Sisal"],
    ["CADCD4", "Surf"],
    ["CADET2", "Robin's Egg"],
    ["CAFE1E", "Yellow Green"],
    ["CAF4FF", "Light Cyan"],
    ["CB6D51", "Red"],
    ["CB8FA9", "Lily"],
    ["CBCAB6", "Tasman"],
    ["CBD3B0", "Surf"],
    ["CBDBD6", "Surf"],
    ["CC0000", "Red"],
    ["CC3333", "Persian Red"],
    ["CC3399", "Fuchsia Pink"],
    ["CC4E5C", "Chestnut"],
    ["CC5500", "Burnt Orange"],
    ["CC7722", "Ochre"],
    ["CC8899", "Puce"],
    ["CCCCCC", "Very Light Gray"],
    ["CCCFF8", "Lavender Blue"],
    ["CCFF00", "Electric Lime"],
    ["CD5C5C", "Indian Red"],
    ["CD6090", "Hot Pink"],
    ["CD853F", "Peru"],
    ["CDA4DE", "Pastel Violet"],
    ["CDAF95", "Cashmere"],
    ["CDD5D5", "Silver Sand"],
    ["CDF4FF", "Oyster Bay"],
    ["CE3E9A", "Medium Orchid"],
    ["CE7928", "Ochre"],
    ["CEBABA", "Quicksand"],
    ["CEC291", "Roti"],
    ["CEC7A7", "Sisal"],
    ["CED1C7", "Silver Sand"],
    ["CEE0DA", "Surf"],
    ["CEE8E7", "Powder Blue"],
    ["CFA0E9", "Wisteria"],
    ["CFB53B", "Old Gold"],
    ["CFCFC4", "Silver Sand"],
    ["CFE5D2", "Surf"],
    ["CFF9F3", "Clear Day"],
    ["D05F04", "Pumpkin"],
    ["D06DA1", "Orchid Pink"],
    ["D07D12", "Ochre"],
    ["D0A5C3", "Lily"],
    ["D0BEF8", "Mauve"],
    ["D0C0E5", "Fog"],
    ["D0F0C0", "Tea Green"],
    ["D18A29", "Ochre"],
    ["D19275", "Copper"],
    ["D19D51", "Cashmere"],
    ["D1BEA8", "Sisal"],
    ["D1C6B4", "Sisal"],
    ["D1D2CA", "Silver Sand"],
    ["D1D2DD", "Casper"],
    ["D1E231", "Lime"],
    ["D2691E", "Chocolate"],
    ["D27D46", "Copper"],
    ["D29EAA", "English Rose"],
    ["D2B48C", "Tan"],
    ["D2C3A5", "Sisal"],
    ["D2D1CD", "Silver Sand"],
    ["D2DA97", "Deco"],
    ["D2F6DE", "Mint"],
    ["D3CBBA", "Sisal"],
    ["D3CDC5", "Silver Sand"],
    ["D3DBCB", "Surf"],
    ["D4002A", "Lava"],
    ["D40E35", "Crimson"],
    ["D470A2", "Orchid"],
    ["D4BF8D", "Sisal"],
    ["D4C4A8", "Sisal"],
    ["D4CD16", "Pear"],
    ["D4D7D9", "Alto"],
    ["D4DFE2", "Casper"],
    ["D4E2FC", "Tropical Blue"],
    ["D50032", "Crimson"],
    ["D54600", "Tenne"],
    ["D591A4", "Lily"],
    ["D59A6F", "Copper"],
    ["D5D195", "Deco"],
    ["D5F6E3", "Mint"],
    ["D69188", "Quicksand"],
    ["D6BF9F", "Cashmere"],
    ["D6C562", "Roti"],
    ["D6CEF6", "Fog"],
    ["D6D6D1", "Silver Sand"],
    ["D6E4E0", "Powder Blue"],
    ["D6FFDB", "Mint"],
    ["D7660D", "Tangerine"],
    ["D773D8", "Orchid"],
    ["D7837F", "English Rose"],
    ["D7C498", "Roti"],
    ["D7D0FF", "Fog"],
    ["D7D7D7", "Alto"],
    ["D8BFD8", "Thistle"],
    ["D8C2D5", "Thistle"],
    ["D8CAFA", "Fog"],
    ["D8D8D8", "Alto"],
    ["D8DADA", "Silver Sand"],
    ["D8DCDB", "Silver Sand"],
    ["D8E4F2", "Alice Blue"],
    ["D9381E", "Vermillion"],
    ["D94972", "Cerise"],
    ["D95030", "Vermillion"],
    ["D98695", "Puce"],
    ["D99A6C", "Copper"],
    ["D9B99B", "Cashmere"],
    ["D9D6CF", "Silver Sand"],
    ["D9DCC1", "Celery"],
    ["D9E4F5", "Alice Blue"],
    ["D9EEE1", "Mint"],
    ["D9F7FF", "Oyster Bay"],
    ["DA0017", "Lava"],
    ["DA3287", "Cerise"],
    ["DA5B38", "Orange Red"],
    ["DA70D6", "Orchid"],
    ["DA8A67", "Copper"],
    ["DAA520", "Goldenrod"],
    ["DAECD6", "Mint"],
    ["DAF4F0", "Foam"],
    ["DAFAFF", "Oyster Bay"],
    ["DB5079", "English Rose"],
    ["DB7093", "Pale Violet Red"],
    ["DB9690", "Quicksand"],
    ["DBDBDB", "Alto"],
    ["DBFFF8", "Foam"],
    ["DC0000", "Lava"],
    ["DC143C", "Crimson"],
    ["DCDCDC", "Gainsboro"],
    ["DCE5DD", "Mint"],
    ["DCF0EA", "Mint"],
    ["DD4132", "Flame"],
    ["DD9475", "Copper"],
    ["DDA0DD", "Plum"],
    ["DDADAF", "English Rose"],
    ["DDEAE3", "Mint"],
    ["DDR1E7", "Mint"],
    ["DE3163", "Cerise"],
    ["DE6360", "Froly"],
    ["DE6FA1", "Orchid Pink"],
    ["DEA681", "Cashmere"],
    ["DEB887", "Burlywood"],
    ["DEC196", "Chamois"],
    ["DECBC6", "Sisal"],
    ["DEE5C0", "Deco"],
    ["DEF5FF", "Oyster Bay"],
    ["DF73FF", "Heliotrope"],
    ["DFBE6F", "Roti"],
    ["DFCD6F", "Roti"],
    ["DFCFDB", "Alto"],
    ["DFECDA", "Mint"],
    ["DFFF00", "Chartreuse Yellow"],
    ["E03C31", "Vermillion"],
    ["E0B0FF", "Mauve"],
    ["E0B974", "Roti"],
    ["E0C095", "Cashmere"],
    ["E0D8E8", "Lavender Gray"],
    ["E0DFDB", "Alto"],
    ["E0E4CC", "Celery"],
    ["E0E6F4", "Alice Blue"],
    ["E0EEE8", "Mint"],
    ["E0FFFF", "Light Cyan"],
    ["E16865", "Froly"],
    ["E1A95F", "Earth Yellow"],
    ["E1AD01", "Gold"],
    ["E1C16E", "Roti"],
    ["E1DACB", "Sisal"],
    ["E1E6D6", "Deco"],
    ["E1E6E6", "Alto"],
    ["E1EAD4", "Deco"],
    ["E1F6E8", "Mint"],
    ["E25098", "Orchid Pink"],
    ["E25822", "Flame"],
    ["E2725B", "Terra Cotta"],
    ["E28913", "Saffron"],
    ["E295C3", "Lily"],
    ["E2D8ED", "Lavender Gray"],
    ["E2EBED", "Alto"],
    ["E2F3EC", "Mint"],
    ["E30022", "Red"],
    ["E32636", "Alizarin Crimson"],
    ["E34234", "Vermillion"],
    ["E3BEBE", "Quicksand"],
    ["E3D4D6", "Pearl Lavender"],
    ["E3F5E1", "Mint"],
    ["E3F988", "Honeysuckle"],
    ["E47833", "Tangerine"],
    ["E4A0A4", "Pale English Rose"],
    ["E4C2D5", "Thistle"],
    ["E4CFD5", "Pearl Lavender"],
    ["E4D1C0", "Pearl Bush"],
    ["E4D422", "Bird Flower"],
    ["E4D5B7", "Pearl Bush"],
    ["E4D69B", "Roti"],
    ["E4E0D8", "Blanc"],
    ["E4F6EB", "Mint"],
    ["E52B50", "Amaranth"],
    ["E5841B", "Tangerine"],
    ["E5A97F", "Cashmere"],
    ["E5AA70", "Pale Ochre"],
    ["E5B73B", "Gold"],
    ["E5C5AA", "Pearl Bush"],
    ["E5CCC9", "Pearl Lavender"],
    ["E5D7BD", "Pearl Bush"],
    ["E5D8AF", "Roti"],
    ["E5E0E1", "Alto"],
    ["E5E5E5", "Alto"],
    ["E5E7E9", "Mercury"],
    ["E5F9F6", "Foam"],
    ["E64078", "Magenta"],
    ["E6B800", "Selective Yellow"],
    ["E6BEA5", "Pearl Bush"],
    ["E6BE8A", "Gold Sand"],
    ["E6D7B9", "Pearl Bush"],
    ["E6E200", "Bird Flower"],
    ["E6E4D4", "Blanc"],
    ["E6E6FA", "Lavender"],
    ["E6F2EA", "Mint"],
    ["E6F8F3", "Foam"],
    ["E6FFE9", "Honeydew"],
    ["E73B3F", "Alizarin"],
    ["E79F8C", "Copper"],
    ["E79FC4", "Orchid Pink"],
    ["E7BCB4", "Quicksand"],
    ["E7BF05", "Gold"],
    ["E7CD8C", "Roti"],
    ["E7ECE2", "Blanc"],
    ["E7F1ED", "Mint"],
    ["E7F5FE", "Hawkes Blue"],
    ["E7F8FF", "Oyster Bay"],
    ["E84D60", "Alizarin"],
    ["E88E5A", "Tangerine"],
    ["E896A8", "Orchid Pink"],
    ["E8B9B3", "Quicksand"],
    ["E8E0D5", "Blanc"],
    ["E8E6CF", "Blanc"],
    ["E8EBE0", "Blanc"],
    ["E8F1D4", "Pear"],
    ["E8F2EB", "Mint"],
    ["E8F5E9", "Honeydew"],
    ["E93F33", "Alizarin"],
    ["E96E00", "Tangerine"],
    ["E97451", "Burnt Sienna"],
    ["E9967A", "Dark Salmon"],
    ["E9CECD", "Pearl Lavender"],
    ["E9D66B", "Roti"],
    ["E9D7AB", "Pearl Bush"],
    ["E9E3E3", "Alto"],
    ["E9E5CE", "Blanc"],
    ["E9ECEF", "Alto"],
    ["E9F8ED", "Honeydew"],
    ["EA1234", "Red"],
    ["EA7E5D", "Burnt Sienna"],
    ["EA88A8", "Orchid Pink"],
    ["EAB33B", "Gold"],
    ["EACB1E", "Gold"],
    ["EAD98B", "Flax"],
    ["EAE3CD", "Blanc"],
    ["EAE8D4", "Blanc"],
    ["EAEDED", "Alto"],
    ["EAF0F5", "Mercury"],
    ["EAF6EE", "Honeydew"],
    ["EAF6FF", "Hawkes Blue"],
    ["EB9E9F", "Rose"],
    ["EBC2AF", "Apricot"],
    ["EBDED9", "Pearl Lavender"],
    ["EBECEF", "Mercury"],
    ["EC5800", "Persimmon"],
    ["ECC54E", "Gold"],
    ["ECEBBD", "Pale Olive"],
    ["ECE7E4", "Mercury"],
    ["ECE9DB", "Blanc"],
    ["ECEBCE", "Mint Julep"],
    ["ECF245", "Yellow Green"],
    ["ECFFDC", "Honeydew"],
    ["ED0A3F", "Red"],
    ["ED1C24", "Red"],
    ["ED2939", "Imperial Red"],
    ["ED7A1C", "Tangerine"],
    ["EDB381", "Gold Sand"],
    ["EDBC64", "Gold"],
    ["EDC9AF", "Desert Sand"],
    ["EDCDAB", "Desert Sand"],
    ["EDDCB1", "Pearl Bush"],
    ["EDEA99", "Deco"],
    ["EDEFE3", "Mercury"],
    ["EDF6ED", "Honeydew"],
    ["EE1293", "Deep Pink"],
    ["EE204D", "Red"],
    ["EE4B2B", "Red Orange"],
    ["EE7600", "Safety Orange"],
    ["EE7F2D", "California"],
    ["EE82EE", "Violet"],
    ["EE9A4D", "Tan"],
    ["EEB4B4", "Rose"],
    ["EEC1BE", "Rose"],
    ["EECA97", "Gold Sand"],
    ["EECD9A", "Gold Sand"],
    ["EED9C4", "Almond"],
    ["EEDC82", "Flax"],
    ["EEDEDA", "Pearl Lavender"],
    ["EEEEE0", "Ivory"],
    ["EEEEF0", "Mercury"],
    ["EEF0C8", "Mint Julep"],
    ["EEF0F3", "Mercury"],
    ["EEF3E2", "Honeydew"],
    ["EF8E38", "Tangerine"],
    ["EF9A53", "Tangerine"],
    ["EFAF8C", "Apricot"],
    ["EFB435", "Gold"],
    ["EFC0C0", "Rose"],
    ["EFD6DB", "Pearl Lavender"],
    ["EFDFCC", "Pearl Bush"],
    ["EFEBD8", "Blanc"],
    ["EFEEF5", "Mercury"],
    ["EFF2F3", "Mercury"],
    ["F07427", "Tangerine"],
    ["F0DC82", "Buff"],
    ["F0E2EC", "Lavender Blush"],
    ["F0E68C", "Khaki"],
    ["F0E891", "Flax"],
    ["F0EAD6", "Eggshell"],
    ["F0EEFD", "Lavender"],
    ["F0F0F0", "White Smoke"],
    ["F0F8FF", "Alice Blue"],
    ["F0FFF0", "Honeydew"],
    ["F0FFFF", "Azure"],
    ["F18200", "Orange"],
    ["F19CBB", "Amaranth Pink"],
    ["F1A7FE", "Pale Magenta"],
    ["F1E9D2", "Blanc"],
    ["F1E9FF", "Lavender"],
    ["F1EADB", "Blanc"],
    ["F1EBC0", "Mint Julep"],
    ["F1EFE6", "Blanc"],
    ["F1F1F1", "White Smoke"],
    ["F1F7F2", "Honeydew"],
    ["F2552A", "Orange Red"],
    ["F2B4D6", "Orchid Pink"],
    ["F2C3B2", "Apricot"],
    ["F2C8ED", "Pink Lace"],
    ["F2CDCA", "Rose"],
    ["F2D2BD", "Apricot"],
    ["F2E2CE", "Pearl Bush"],
    ["F2E5DC", "Pearl Lavender"],
    ["F2E6E6", "Pearl Lavender"],
    ["F2EDDC", "Blanc"],
    ["F2EECB", "Mint Julep"],
    ["F2F0E6", "Blanc"],
    ["F2F1F4", "White Smoke"],
    ["F2F2F2", "White Smoke"],
    ["F2F4F6", "White Smoke"],
    ["F2FAFA", "Mint"],
    ["F3AD16", "Gold"],
    ["F3D69D", "Gold Sand"],
    ["F3D9DF", "Rose"],
    ["F3E0E2", "Pearl Lavender"],
    ["F3E5AB", "Jasmine"],
    ["F3E7BB", "Colonial White"],
    ["F3E9E5", "Pearl Lavender"],
    ["F3EDCF", "Blanc"],
    ["F3F2F1", "White Smoke"],
    ["F3F4F5", "White Smoke"],
    ["F3FB62", "Laser Lemon"],
    ["F400A1", "Fashion Fuchsia"],
    ["F4A460", "Sandy Brown"],
    ["F4C430", "Saffron"],
    ["F4D81C", "Broom"],
    ["F4E1C1", "Pearl Bush"],
    ["F4E4C9", "Pearl Bush"],
    ["F4E6DC", "Pearl Bush"],
    ["F4EBD3", "Pearl Bush"],
    ["F4EEDF", "Pearl Bush"],
    ["F4F2EE", "White Smoke"],
    ["F4F4F4", "White Smoke"],
    ["F4F4F9", "White Smoke"],
    ["F4F5F0", "White Smoke"],
    ["F4F8FF", "Zircon"],
    ["F5554A", "Red Orange"],
    ["F56991", "Hot Pink"],
    ["F5785A", "Coral"],
    ["F5785A", "Terra Cotta"],
    ["F57584", "Rose"],
    ["F57A5B", "Coral"],
    ["F5C85C", "Gold"],
    ["F5C999", "Gold Sand"],
    ["F5D5A0", "Gold Sand"],
    ["F5DEB3", "Wheat"],
    ["F5E1A4", "Flax"],
    ["F5E5DC", "Pearl Bush"],
    ["F5E7E2", "Pearl Lavender"],
    ["F5EDEF", "Pearl Lavender"],
    ["F5EEDC", "Pearl Bush"],
    ["F5F0E7", "Pearl Bush"],
    ["F5F5DC", "Beige"],
    ["F5F5F0", "White Smoke"],
    ["F5F5F5", "White Smoke"],
    ["F5FFFA", "Mint Cream"],
    ["F64A8A", "French Rose"],
    ["F67019", "Tangerine"],
    ["F6A4C9", "Carnation Pink"],
    ["F6E9D7", "Pearl Bush"],
    ["F6EABE", "Champagne"],
    ["F6EDDB", "Pearl Bush"],
    ["F6F0E6", "Pearl Bush"],
    ["F6F3F3", "White Smoke"],
    ["F6F6F6", "White Smoke"],
    ["F6F7F7", "White Smoke"],
    ["F6FFDC", "Pear"],
    ["F7468A", "French Rose"],
    ["F76087", "French Rose"],
    ["F78FA7", "Pink Sherbet"],
    ["F79B5E", "Tangerine"],
    ["F7B668", "Golden Fizz"],
    ["F7B7B4", "Rose"],
    ["F7D7C4", "Apricot"],
    ["F7E7CE", "Champagne"],
    ["F7E98E", "Flax"],
    ["F7F2E1", "Pearl Bush"],
    ["F7F4E5", "Pearl Bush"],
    ["F7F5E4", "Pearl Bush"],
    ["F7F5FA", "White"],
    ["F7F7F7", "White Smoke"],
    ["F7F8F8", "White"],
    ["F7FBE6", "Pear"],
    ["F80000", "Red"],
    ["F87117", "Orange"],
    ["F88379", "Coral Pink"],
    ["F89880", "Melon"],
    ["F8B500", "Selective Yellow"],
    ["F8B878", "Rajah"],
    ["F8C3DF", "Pink Lace"],
    ["F8D568", "Golden Fizz"],
    ["F8DB9D", "Gold Sand"],
    ["F8DD5C", "Golden Fizz"],
    ["F8DE7E", "Jasmine"],
    ["F8DFA1", "Chalky"],
    ["F8E4BF", "Champagne"],
    ["F8EAEC", "Pearl Lavender"],
    ["F8EEE7", "Pearl Bush"],
    ["F8F0E8", "Pearl Bush"],
    ["F8F3F1", "White Smoke"],
    ["F8F4F1", "White Smoke"],
    ["F8F4FF", "Lavender"],
    ["F8F6F1", "White Smoke"],
    ["F8F7F9", "White"],
    ["F8F7FC", "White"],
    ["F8F8F8", "White Smoke"],
    ["F8F8FF", "Ghost White"],
    ["F8FAFA", "White"],
    ["F91DA9", "Hot Magenta"],
    ["F9350E", "Red"],
    ["F94D00", "Vermillion"],
    ["F98379", "Coral"],
    ["F9A602", "Gold"],
    ["F9A600", "Goldenrod"],
    ["F9BF58", "Golden Fizz"],
    ["F9D423", "Cyber Yellow"],
    ["F9E0ED", "Pink Lace"],
    ["F9E4BC", "Champagne"],
    ["F9E663", "Mustard"],
    ["F9E6F4", "Pink Lace"],
    ["F9EAF3", "Pink Lace"],
    ["F9EEEB", "Pearl Lavender"],
    ["F9F0DA", "Pearl Bush"],
    ["F9F2E7", "Pearl Bush"],
    ["F9F4DC", "Pearl Bush"],
    ["F9F7E4", "Pearl Bush"],
    ["F9F8F5", "White"],
    ["F9F8F7", "White"],
    ["F9F9F9", "White Smoke"],
    ["F9FBE7", "Pear"],
    ["F9FBF2", "White"],
    ["FA0072", "Ruby"],
    ["FA7814", "Orange"],
    ["FA8072", "Salmon"],
    ["FA9D5A", "Amber"],
    ["FAA76C", "Rajah"],
    ["FAAFBA", "Pink"],
    ["FAAFBE", "Pink"],
    ["FAC205", "Gold"],
    ["FAD6A5", "Pale Gold"],
    ["FAD7A0", "Pale Gold"],
    ["FAE199", "Chalky"],
    ["FAE3D9", "Peach"],
    ["FAE7B5", "Banana Mania"],
    ["FAEBD7", "Antique White"],
    ["FAECCC", "Champagne"],
    ["FAEDF8", "Lavender Blush"],
    ["FAF0BE", "Beeswax"],
    ["FAF0DC", "Pearl Bush"],
    ["FAF0E6", "Linen"],
    ["FAF3D4", "Pearl Bush"],
    ["FAF3E0", "Pearl Bush"],
    ["FAF5F0", "Pearl Bush"],
    ["FAF5F6", "White"],
    ["FAF9D6", "Mimosa"],
    ["FAF9F6", "White"],
    ["FAFAD2", "Light Goldenrod Yellow"],
    ["FAFAFA", "White Smoke"],
    ["FAFDFF", "White"],
    ["FB4F14", "Orange Red"],
    ["FBA129", "Saffron"],
    ["FBA4D6", "Pale Magenta"],
    ["FBB917", "Gold"],
    ["FBBF95", "Rajah"],
    ["FBBFB2", "Peach"],
    ["FBCCE7", "Pink Lace"],
    ["FBCEB1", "Apricot"],
    ["FBD7C1", "Apricot"],
    ["FBE7B2", "Pale Gold"],
    ["FBE870", "Mustard"],
    ["FBEA8C", "Mustard"],
    ["FBEAC5", "Champagne"],
    ["FBEC5D", "Mustard"],
    ["FBEDDB", "Pearl Bush"],
    ["FBF0A2", "Pale Gold"],
    ["FBF6EB", "Pearl Bush"],
    ["FBF9F9", "White"],
    ["FBFAF0", "Pearl Bush"],
    ["FBFBFB", "White"],
    ["FBFFE1", "Rice Cake"],
    ["FC0FC0", "Shocking Pink"],
    ["FC1501", "Red"],
    ["FC5A8D", "Hot Pink"],
    ["FC74FD", "Pale Magenta"],
    ["FC80A5", "Pink"],
    ["FC8EAC", "Pink Sherbet"],
    ["FCA3B7", "Pink"],
    ["FCAE1E", "Saffron"],
    ["FCBDB8", "Melon"],
    ["FCCB4D", "Gold"],
    ["FCDA98", "Pale Gold"],
    ["FCDCDF", "Pink"],
    ["FCE053", "Mustard"],
    ["FCE883", "Canary"],
    ["FCEEF5", "Lavender Blush"],
    ["FCEFE8", "Linen"],
    ["FCF4D0", "Cream"],
    ["FCF4DC", "Cream"],
    ["FCF8DB", "Cream"],
    ["FCF9F1", "White"],
    ["FCFAF7", "White"],
    ["FCFBF3", "White"],
    ["FCFC81", "Canary"],
    ["FCFEDA", "Cream"],
    ["FCFFE7", "Cream"],
    ["FCFFF9", "White"],
    ["FD0E35", "Scarlet"],
    ["FD3C99", "Magenta"],
    ["FD3F92", "Brilliant Rose"],
    ["FD4C7E", "Strawberry"],
    ["FD4659", "Coral Red"],
    ["FD5240", "Red Orange"],
    ["FD5B78", "Wild Watermelon"],
    ["FD6C9E", "Hot Pink"],
    ["FD7B33", "Orange"],
    ["FD8D49", "Tangerine"],
    ["FD9FA2", "Sweet Pink"],
    ["FDA50F", "Amber"],
    ["FDAA48", "Yellow Orange"],
    ["FDB515", "Amber"],
    ["FDB8C8", "Carnation Pink"],
    ["FDBA63", "Butterscotch"],
    ["FDBB52", "Selective Yellow"],
    ["FDC4BD", "Sweet Pink"],
    ["FDD0A2", "Peach"],
    ["FDD5B1", "Peach"],
    ["FDE1DC", "Peach"],
    ["FDE4BF", "Peach"],
    ["FDECC8", "Champagne"],
    ["FDF0D5", "Cream"],
    ["FDF4E3", "Cream"],
    ["FDF5E6", "Old Lace"],
    ["FDF6E3", "Cream"],
    ["FDF7AD", "Canary"],
    ["FDFCDC", "Cream"],
    ["FDFD96", "Canary"],
    ["FDFDF0", "Cream"],
    ["FDFDFE", "White"],
    ["FDFEFF", "White"],
    ["FDFF52", "Lemon Yellow"],
    ["FE0000", "Red"],
    ["FE0002", "Red"],
    ["FE2712", "Red"],
    ["FE28A2", "Magenta"],
    ["FE4365", "Coral Red"],
    ["FE4C40", "Coral Red"],
    ["FE4EDA", "Hot Pink"],
    ["FE5A1D", "Orange Red"],
    ["FE6F5E", "Bittersweet"],
    ["FE7F9C", "Begonia Pink"],
    ["FE840E", "Orange"],
    ["FEA3AA", "Sweet Pink"],
    ["FEAEC9", "Pink"],
    ["FEBAAD", "Melon"],
    ["FEC09F", "Apricot"],
    ["FECACA", "Melon"],
    ["FECBCD", "Sweet Pink"],
    ["FED33C", "Sunglow"],
    ["FEDBB7", "Peach"],
    ["FEDC56", "Mustard"],
    ["FEE08B", "Pale Gold"],
    ["FEE12B", "Cyber Yellow"],
    ["FEE5AC", "Pale Gold"],
    ["FEEB77", "Canary"],
    ["FEECC7", "Peach"],
    ["FEEFCE", "Peach"],
    ["FEF0C9", "Peach"],
    ["FEF200", "Yellow"],
    ["FEF2C7", "Peach"],
    ["FEF3D8", "Peach"],
    ["FEF4CC", "Peach"],
    ["FEF5EB", "Linen"],
    ["FEF5F1", "Linen"],
    ["FEF6E9", "Peach"],
    ["FEF8E2", "Cream"],
    ["FEF9E3", "Cream"],
    ["FEFCED", "Cream"],
    ["FEFCFF", "White"],
    ["FEFDFA", "White"],
    ["FF0000", "Red"],
    ["FF003F", "Scarlet"],
    ["FF004F", "Red"],
    ["FF0080", "Magenta"],
    ["FF00FF", "Magenta"],
    ["FF0800", "Candy Apple Red"],
    ["FF1493", "Deep Pink"],
    ["FF2052", "Red"],
    ["FF2400", "Scarlet"],
    ["FF3333", "Red Orange"],
    ["FF3366", "Cerise"],
    ["FF355E", "Radical Red"],
    ["FF3800", "Orange Red"],
    ["FF3855", "Sizzling Red"],
    ["FF4040", "Coral Red"],
    ["FF4500", "Orange Red"],
    ["FF4681", "Strawberry"],
    ["FF47CA", "Magenta"],
    ["FF4D00", "Orange"],
    ["FF5349", "Red Orange"],
    ["FF5470", "Wild Watermelon"],
    ["FF5722", "Deep Orange"],
    ["FF6347", "Tomato"],
    ["FF6600", "Orange"],
    ["FF6666", "Bittersweet"],
    ["FF6700", "Safety Orange"],
    ["FF681F", "Orange"],
    ["FF69B4", "Hot Pink"],
    ["FF6B53", "Outrageous Orange"],
    ["FF6D3A", "Orange"],
    ["FF6E4A", "Orange"],
    ["FF6F61", "Living Coral"],
    ["FF6FFF", "Ultra Pink"],
    ["FF7034", "Burning Orange"],
    ["FF7417", "Orange"],
    ["FF7518", "Pumpkin"],
    ["FF7538", "Orange"],
    ["FF757F", "Begonia Pink"],
    ["FF7681", "Wild Watermelon"],
    ["FF7800", "Safety Orange"],
    ["FF78D7", "Pink Flamingo"],
    ["FF79BC", "Pink"],
    ["FF7A00", "Orange"],
    ["FF7C2B", "Orange"],
    ["FF7E00", "Orange"],
    ["FF7F00", "Orange"],
    ["FF7F24", "Orange"],
    ["FF7F50", "Coral"],
    ["FF8000", "Orange"],
    ["FF8243", "Mango Tango"],
    ["FF851B", "Orange"],
    ["FF85CF", "Pink Sherbet"],
    ["FF878D", "Wild Watermelon"],
    ["FF8911", "Orange"],
    ["FF8C00", "Dark Orange"],
    ["FF8C69", "Salmon"],
    ["FF9100", "Vivid Orange"],
    ["FF91A4", "Salmon Pink"],
    ["FF91AF", "Baker Miller Pink"],
    ["FF9380", "Melon"],
    ["FF9500", "Orange"],
    ["FF9505", "Yellow Orange"],
    ["FF9800", "Orange"],
    ["FF9900", "Orange"],
    ["FF9933", "Deep Saffron"],
    ["FF9966", "Atomic Tangerine"],
    ["FF9980", "Peach"],
    ["FF9999", "Melon"],
    ["FF9A8B", "Melon"],
    ["FF9A8C", "Salmon"],
    ["FF9DA4", "Sweet Pink"],
    ["FF9E2A", "Orange"],
    ["FF9EB5", "Pink"],
    ["FF9F00", "Orange"],
    ["FFA000", "Orange"],
    ["FFA07A", "Light Salmon"],
    ["FFA000", "Orange"],
    ["FFA089", "Salmon"],
    ["FFA300", "Tangerine"],
    ["FFA343", "Saffron"],
    ["FFA420", "Orange"],
    ["FFA500", "Orange"],
    ["FFA600", "Orange"],
    ["FFA62F", "Yellow Orange"],
    ["FFA700", "Orange"],
    ["FFA812", "Yellow Orange"],
    ["FFAA1D", "Bright Yellow"],
    ["FFAE42", "Yellow Orange"],
    ["FFAF00", "UCLA Gold"],
    ["FFB000", "Selective Yellow"],
    ["FFB02E", "Yellow Orange"],
    ["FFB200", "Selective Yellow"],
    ["FFB347", "Pastel Orange"],
    ["FFB366", "Rajah"],
    ["FFB3DE", "Lavender Pink"],
    ["FFB6C1", "Light Pink"],
    ["FFB7C5", "Cherry Blossom Pink"],
    ["FFB7D5", "Cotton Candy"],
    ["FFB90F", "Yellow"],
    ["FFBA00", "Selective Yellow"],
    ["FFBB00", "Selective Yellow"],
    ["FFBD00", "Golden Yellow"],
    ["FFBDBD", "Light Pink"],
    ["FFBF00", "Amber"],
    ["FFC000", "Amber"],
    ["FFC0A8", "Melon"],
    ["FFC0CB", "Pink"],
    ["FFC125", "Goldenrod"],
    ["FFC200", "Golden Yellow"],
    ["FFC3C0", "Sweet Pink"],
    ["FFC40C", "Tangerine Yellow"],
    ["FFC67D", "Rajah"],
    ["FFC800", "Golden Yellow"],
    ["FFCAD4", "Pink"],
    ["FFCB99", "Peach Puff"],
    ["FFCC00", "Tangerine Yellow"],
    ["FFCC33", "Sunglow"],
    ["FFCD00", "Golden Yellow"],
    ["FFCE54", "Golden Fizz"],
    ["FFD1D1", "Misty Rose"],
    ["FFD300", "Cyber Yellow"],
    ["FFD324", "Golden Yellow"],
    ["FFD59A", "Navajo White"],
    ["FFD700", "Gold"],
    ["FFD800", "School Bus Yellow"],
    ["FFDAB9", "Peach Puff"],
    ["FFDB00", "Cyber Yellow"],
    ["FFDBE5", "Lavender Blush"],
    ["FFDCD5", "Peach"],
    ["FFDDF4", "Pink Lace"],
    ["FFDE00", "Cyber Yellow"],
    ["FFDEAD", "Navajo White"],
    ["FFDF00", "Golden Yellow"],
    ["FFDF22", "Golden Yellow"],
    ["FFE135", "Banana Yellow"],
    ["FFE180", "Rajah"],
    ["FFE28A", "Vis Vis"],
    ["FFE333", "Sunglow"],
    ["FFE384", "Sunset"],
    ["FFE4B2", "Caramel"],
    ["FFE4B5", "Moccasin"],
    ["FFE4C4", "Bisque"],
    ["FFE4E1", "Misty Rose"],
    ["FFE4E4", "Misty Rose"],
    ["FFE553", "Mustard"],
    ["FFE5B4", "Peach"],
    ["FFE6A7", "Buttermilk"],
    ["FFE600", "Cadmium Yellow"],
    ["FFE66D", "Mustard"],
    ["FFE6FF", "Lavender Blush"],
    ["FFE7BA", "Navajo White"],
    ["FFE8C8", "Champagne"],
    ["FFE8D6", "Champagne"],
    ["FFEB00", "Cadmium Yellow"],
    ["FFEBB8", "Buttermilk"],
    ["FFEBC6", "Buttermilk"],
    ["FFEBCD", "Blanched Almond"],
    ["FFEBEB", "Misty Rose"],
    ["FFEC8B", "Light Goldenrod"],
    ["FFED00", "Cadmium Yellow"],
    ["FFEDBC", "Buttermilk"],
    ["FFEEBC", "Buttermilk"],
    ["FFEEDD", "Seashell"],
    ["FFEF00", "Canary Yellow"],
    ["FFEFC1", "Buttermilk"],
    ["FFF0D4", "Champagne"],
    ["FFF0DB", "Champagne"],
    ["FFF0F5", "Lavender Blush"],
    ["FFF2BA", "Buttermilk"],
    ["FFF2C8", "Buttermilk"],
    ["FFF2CC", "Buttermilk"],
    ["FFF2D6", "Champagne"],
    ["FFF2E2", "Champagne"],
    ["FFF380", "Pastel Yellow"],
    ["FFF3D8", "Champagne"],
    ["FFF3E1", "Champagne"],
    ["FFF4DD", "Champagne"],
    ["FFF4E0", "Champagne"],
    ["FFF4F3", "Seashell"],
    ["FFF5BE", "Buttermilk"],
    ["FFF5C3", "Cream"],
    ["FFF5D7", "Champagne"],
    ["FFF5E1", "Lemon Chiffon"],
    ["FFF5EE", "Seashell"],
    ["FFF5F5", "Snow"],
    ["FFF5F7", "Snow"],
    ["FFF6D5", "Buttermilk"],
    ["FFF6E5", "Cornsilk"],
    ["FFF7D4", "Cream"],
    ["FFF7E5", "Champagne"],
    ["FFF8D1", "Cream"],
    ["FFF8DC", "Cornsilk"],
    ["FFF8E7", "Cornsilk"],
    ["FFF9E3", "Cream"],
    ["FFFACD", "Lemon Chiffon"],
    ["FFFAF0", "Floral White"],
    ["FFFAFC", "Snow"],
    ["FFFAF7", "Snow"],
    ["FFFBF0", "Floral White"],
    ["FFFBF9", "Snow"],
    ["FFFC00", "Yellow"],
    ["FFFC99", "Canary"],
    ["FFFCC4", "Cream"],
    ["FFFDD0", "Cream"],
    ["FFFE00", "Yellow"],
    ["FFFEF0", "Ivory"],
    ["FFFEF6", "Ivory"],
    ["FFFF00", "Yellow"],
    ["FFFF31", "Daffodil"],
    ["FFFF66", "Laser Lemon"],
    ["FFFF99", "Canary"],
    ["FFFFB5", "Cream"],
    ["FFFFCC", "Cream"],
    ["FFFFE0", "Light Yellow"],
    ["FFFFF0", "Ivory"],
    ["FFFFF5", "Ivory"],
    ["FFFFFF", "White"]
];

// Convert to Map for faster lookup
const colorNamesMap = new Map(colorNamesData.map(([hex, name]) => [hex.toLowerCase(), name]));

// Name That Color algorithm - find closest color name
function getColorName(hex) {
    hex = hex.replace('#', '').toLowerCase();

    // Expand 3-digit hex to 6-digit
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // Exact match
    if (colorNamesMap.has(hex)) {
        return colorNamesMap.get(hex);
    }

    // Find closest color using LAB color space approximation
    const rgb = hexToRGB('#' + hex);
    let minDistance = Infinity;
    let closestName = hex;

    for (const [colorHex, name] of colorNamesData) {
        const colorRgb = hexToRGB('#' + colorHex);

        // Weighted Euclidean distance (approximates perceptual difference)
        const rMean = (rgb.r + colorRgb.r) / 2;
        const dR = rgb.r - colorRgb.r;
        const dG = rgb.g - colorRgb.g;
        const dB = rgb.b - colorRgb.b;

        // Redmean color distance formula
        const distance = Math.sqrt(
            (2 + rMean / 256) * dR * dR +
            4 * dG * dG +
            (2 + (255 - rMean) / 256) * dB * dB
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestName = name;
        }
    }

    return closestName;
}

// Event Listeners
toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('toggled');
    lightenText.classList.toggle('unselected');
    darkenText.classList.toggle('unselected');
    updateOutputColor();
});

// Add event listeners for preset colors
document.querySelectorAll('.preset-color').forEach(btn => {
    btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        hexInput.value = color;
        colorPicker.value = color;
        updateInputColor(color);
        resetSliders(); // Reset sliders to default positions
        updateOutputColor();
    });
});

hexInput.addEventListener('keyup', (e) => {
    const hex = hexInput.value;
    
    // Add # if it's missing
    if (hex.length > 0 && !hex.startsWith('#')) {
        hexInput.value = '#' + hex;
    }
    
    // Auto-apply if Enter is pressed
    if (e.key === 'Enter' && isValidHex(hexInput.value)) {
        applyColor();
    }
    
    // Visual feedback on input validity
    if (isValidHex(hexInput.value)) {
        hexInput.style.borderColor = getCSSVar('--success-color');
    } else {
        hexInput.style.borderColor = hex.length > 0 ? getCSSVar('--error-color') : getCSSVar('--border-color');
    }
});

applyButton.addEventListener('click', applyColor);

function applyColor() {
    const hex = hexInput.value;

    if(!isValidHex(hex)) {
        hexInput.style.borderColor = getCSSVar('--error-color');
        return;
    }

    const strippedHex = hex.startsWith('#') ? hex : '#' + hex;

    updateInputColor(strippedHex);
    updateOutputColor();
    hexInput.style.borderColor = getCSSVar('--success-color');
}

// Reset sliders to default positions
function resetSliders() {
    // Set more moderate default values
    slider.value = 20; // Reduced from 50 to 20 for less extreme brightness change
    saturationSlider.value = 0; // Keep same saturation
    hueSlider.value = 0; // Keep same hue
    
    // Update slider labels
    sliderText.textContent = `Brightness: ${slider.value}%`;
    saturationText.textContent = `Saturation: ${saturationSlider.value}%`;
    hueText.textContent = `Hue: ${hueSlider.value}°`;
    
    // Make sure the toggle is set to lighten by default
    if (toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        lightenText.classList.remove('unselected');
        darkenText.classList.add('unselected');
    }
}

// Update slider event listeners to use immediate feedback
slider.addEventListener('input', () => {
    const value = slider.value;
    sliderText.textContent = `Brightness: ${value}%`;
    updateOutputColor();
});

saturationSlider.addEventListener('input', () => {
    const value = saturationSlider.value;
    saturationText.textContent = `Saturation: ${value}%`;
    updateOutputColor();
});

hueSlider.addEventListener('input', () => {
    const value = hueSlider.value;
    hueText.textContent = `Hue: ${value}°`;
    updateOutputColor();
});

copyButton.addEventListener('click', () => {
    const colorToCopy = alteredColor.style.backgroundColor;
    const tempInput = document.createElement('input');
    tempInput.value = rgbToHex(colorToCopy);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy Color';
    }, 1500);
});

// Color Conversion Functions
function hexToRGB(hex) {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Handle both short and long form hex codes
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return { r, g, b };
}

function convertRGBToHex(r, g, b) {
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert CSS rgb() string to hex
function rgbToHex(rgbString) {
    // Handle both "rgb(r, g, b)" format and already hex format
    if (rgbString.startsWith('#')) {
        return rgbString;
    }

    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        return convertRGBToHex(r, g, b);
    }
    return rgbString;
}

// Convert hex to RGB object (for JSON export compatibility)
function convertHexToRGB(hex) {
    const rgb = hexToRGB(hex);
    return { r: rgb.r, g: rgb.g, b: rgb.b };
}

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToRGB(h, s, l) {
    // Normalize values
    h = ((h % 360) + 360) % 360; // Ensure h is between 0 and 360
    s = Math.min(100, Math.max(0, s)) / 100; // Convert to decimal and clamp between 0 and 1
    l = Math.min(100, Math.max(0, l)) / 100; // Convert to decimal and clamp between 0 and 1

    let r, g, b;

    if (s === 0) {
        // Achromatic (gray)
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        const hueToRGB = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const h1 = h / 360; // Convert hue to decimal
        r = hueToRGB(p, q, h1 + 1/3);
        g = hueToRGB(p, q, h1);
        b = hueToRGB(p, q, h1 - 1/3);
    }

    // Convert to 0-255 range and round
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// Color Manipulation Functions
function alterBrightness(rgb, percentage) {
    const factor = 1 + (percentage / 100);
    return {
        r: Math.min(255, Math.max(0, Math.round(rgb.r * factor))),
        g: Math.min(255, Math.max(0, Math.round(rgb.g * factor))),
        b: Math.min(255, Math.max(0, Math.round(rgb.b * factor)))
    };
}

function alterSaturation(hsl, percentage) {
    const newSaturation = Math.min(100, Math.max(0, hsl.s + percentage));
    return {
        h: hsl.h,
        s: newSaturation,
        l: hsl.l
    };
}

function alterHue(hsl, amount) {
    return {
        h: ((hsl.h + amount) % 360 + 360) % 360, // Ensure hue stays between 0-360
        s: hsl.s,
        l: hsl.l
    };
}

// Color Scheme Functions
function getComplementaryColor(hsl) {
    const complementaryHue = (hsl.h + 180) % 360;
    const rgb = hslToRGB(complementaryHue, hsl.s, hsl.l);
    return convertRGBToHex(rgb.r, rgb.g, rgb.b);
}

function getAnalogousColors(hsl) {
    const hues = [(hsl.h - 30 + 360) % 360, (hsl.h + 30) % 360];
    return hues.map(h => {
        const rgb = hslToRGB(h, hsl.s, hsl.l);
        return convertRGBToHex(rgb.r, rgb.g, rgb.b);
    });
}

function getTriadicColors(hsl) {
    const hues = [(hsl.h + 120) % 360, (hsl.h + 240) % 360];
    return hues.map(h => {
        const rgb = hslToRGB(h, hsl.s, hsl.l);
        return convertRGBToHex(rgb.r, rgb.g, rgb.b);
    });
}

// Split-complementary: base + two colors adjacent to the complement (150° and 210° from base)
function getSplitComplementaryColors(hsl) {
    const hues = [(hsl.h + 150) % 360, (hsl.h + 210) % 360];
    return hues.map(h => {
        const rgb = hslToRGB(h, hsl.s, hsl.l);
        return convertRGBToHex(rgb.r, rgb.g, rgb.b);
    });
}

// Square: four colors evenly spaced (90° apart)
function getSquareColors(hsl) {
    const hues = [(hsl.h + 90) % 360, (hsl.h + 180) % 360, (hsl.h + 270) % 360];
    return hues.map(h => {
        const rgb = hslToRGB(h, hsl.s, hsl.l);
        return convertRGBToHex(rgb.r, rgb.g, rgb.b);
    });
}

// Compound (double-complementary): two pairs of complementary colors (base, base+30, complement, complement+30)
function getCompoundColors(hsl) {
    const hues = [(hsl.h + 30) % 360, (hsl.h + 180) % 360, (hsl.h + 210) % 360];
    return hues.map(h => {
        const rgb = hslToRGB(h, hsl.s, hsl.l);
        return convertRGBToHex(rgb.r, rgb.g, rgb.b);
    });
}

function displayColorScheme(colors) {
    schemeColors.innerHTML = '';
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'history-color';
        colorBox.style.backgroundColor = color;
        colorBox.title = color;
        colorBox.addEventListener('click', () => {
            hexInput.value = color;
            colorPicker.value = color;
            updateInputColor(color);
            updateOutputColor();
        });
        schemeColors.appendChild(colorBox);
    });
}

// Export Functions
function generateCssExport() {
    return `:root {
    --color-base: ${currentColor.hex};
    --color-modified: ${alteredColor.style.backgroundColor};
    --color-rgb: ${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b};
    --color-hsl: ${currentColor.hsl.h}, ${currentColor.hsl.s}%, ${currentColor.hsl.l}%;
}`;
}

function generateScssExport() {
    return `$color-base: ${currentColor.hex};
$color-modified: ${alteredColor.style.backgroundColor};
$color-rgb: (
    r: ${currentColor.rgb.r},
    g: ${currentColor.rgb.g},
    b: ${currentColor.rgb.b}
);
$color-hsl: (
    h: ${currentColor.hsl.h},
    s: ${currentColor.hsl.s}%,
    l: ${currentColor.hsl.l}%
);`;
}

function generateJsonExport() {
    const colorData = {
        base: {
            hex: currentColor.hex,
            rgb: currentColor.rgb,
            hsl: currentColor.hsl
        },
        modified: {
            hex: rgbToHex(alteredColor.style.backgroundColor),
            rgb: convertHexToRGB(rgbToHex(alteredColor.style.backgroundColor))
        }
    };
    return JSON.stringify(colorData, null, 2);
}

// Utility Functions
function copyToClipboard(text, message, buttonElement) {
    // Use modern clipboard API with fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(buttonElement, message);
        }).catch(() => {
            fallbackCopyToClipboard(text, buttonElement, message);
        });
    } else {
        fallbackCopyToClipboard(text, buttonElement, message);
    }
}

function fallbackCopyToClipboard(text, buttonElement, message) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showCopyFeedback(buttonElement, message);
}

function showCopyFeedback(buttonElement, message) {
    if (!buttonElement) return;
    const originalText = buttonElement.textContent;
    buttonElement.textContent = message;
    setTimeout(() => {
        buttonElement.textContent = originalText;
    }, 1500);
}

// Update Functions
function updateInputColor(hex) {
    if (!isValidHex(hex)) return;

    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);

    currentColor = {
        hex: hex,
        rgb: rgb,
        hsl: hsl
    };

    // Update displays
    inputColor.style.backgroundColor = hex;
    colorPicker.value = hex;
    hexInput.value = hex;
    inputColorHex.textContent = hex;
    inputColorRgb.textContent = `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    inputColorHsl.textContent = `HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`;

    // Use enhanced color naming
    colorName.textContent = getColorName(hex);
}

function updateOutputColor() {
    if (!currentColor) return;

    // Get the current values from sliders
    const brightnessValue = parseInt(slider.value);
    const saturationValue = parseInt(saturationSlider.value);
    const hueValue = parseInt(hueSlider.value);

    // Start with current color's HSL values
    let modifiedHsl = {...currentColor.hsl};

    // Apply hue change first
    modifiedHsl = alterHue(modifiedHsl, hueValue);

    // Apply saturation change
    modifiedHsl.s = Math.min(100, Math.max(0, modifiedHsl.s + saturationValue));

    // Apply brightness change based on toggle state
    const isToggled = toggleBtn.classList.contains('toggled');

    if (isToggled) {
        // Darken mode
        modifiedHsl.l = Math.max(0, modifiedHsl.l - brightnessValue);
    } else {
        // Lighten mode
        modifiedHsl.l = Math.min(100, modifiedHsl.l + brightnessValue);
    }

    // Convert modified HSL to RGB
    let modifiedRgb = hslToRGB(modifiedHsl.h, modifiedHsl.s, modifiedHsl.l);

    // Convert to hex for display
    const finalHex = convertRGBToHex(modifiedRgb.r, modifiedRgb.g, modifiedRgb.b);
    
    // Update the altered color display
    alteredColor.style.backgroundColor = finalHex;
    alteredColorHex.textContent = finalHex;
    alteredColorRgb.textContent = `RGB(${modifiedRgb.r}, ${modifiedRgb.g}, ${modifiedRgb.b})`;
    alteredColorHsl.textContent = `HSL(${modifiedHsl.h}°, ${modifiedHsl.s}%, ${modifiedHsl.l}%)`;
    
    // Calculate and show contrast ratio
    const contrast = calculateContrastRatio(currentColor.rgb, modifiedRgb);
    alteredColorText.textContent = `Contrast Ratio: ${contrast.toFixed(2)}:1`;

    // Update WCAG badge
    updateWCAGBadge(contrast);

    // Update modified color name
    if (modifiedColorName) {
        modifiedColorName.textContent = getColorName(finalHex);
    }

    // Update UI preview if function exists
    if (typeof updateUIPreview === 'function') {
        updateUIPreview();
    }
}

// Helper function to calculate relative luminance
function calculateLuminance(r, g, b) {
    let [rs, gs, bs] = [r / 255, g / 255, b / 255].map(val => {
        return val <= 0.03928
            ? val / 12.92
            : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
function calculateContrastRatio(color1, color2) {
    const l1 = calculateLuminance(color1.r, color1.g, color1.b);
    const l2 = calculateLuminance(color2.r, color2.g, color2.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

// Color History Functions
const addToHistory = (hex) => {
    if (!colorHistoryArray.includes(hex)) {
        colorHistoryArray.unshift(hex);
        if (colorHistoryArray.length > MAX_HISTORY) {
            colorHistoryArray.pop();
        }
        localStorage.setItem('colorHistory', JSON.stringify(colorHistoryArray));
        updateColorHistory();
    }
}

const updateColorHistory = () => {
    const historyEmpty = document.getElementById('historyEmpty');
    colorHistory.innerHTML = '';

    if (colorHistoryArray.length === 0) {
        // Show empty state
        const emptyState = document.createElement('p');
        emptyState.id = 'historyEmpty';
        emptyState.className = 'history-empty';
        emptyState.textContent = 'No colors saved yet. Pick a color to get started.';
        colorHistory.appendChild(emptyState);
    } else {
        // Show color history
        colorHistoryArray.forEach(hex => {
            const colorBox = document.createElement('div');
            colorBox.className = 'history-color';
            colorBox.style.backgroundColor = hex;
            colorBox.title = hex;
            colorBox.addEventListener('click', () => {
                hexInput.value = hex;
                updateInputColor(hex);
                updateOutputColor();
            });
            colorHistory.appendChild(colorBox);
        });
    }
}

// Event Listeners for new features
colorPicker.addEventListener('input', (e) => {
    const color = e.target.value;
    hexInput.value = color;
    updateInputColor(color);
    updateOutputColor();
});

clearHistoryBtn.addEventListener('click', () => {
    colorHistoryArray = [];
    localStorage.removeItem('colorHistory');
    updateColorHistory();
});

// Color Scheme Generators
complementaryBtn.addEventListener('click', () => {
    const complementary = getComplementaryColor(currentColor.hsl);
    displayColorScheme([currentColor.hex, complementary]);
});

analogousBtn.addEventListener('click', () => {
    const analogous = getAnalogousColors(currentColor.hsl);
    displayColorScheme([currentColor.hex, ...analogous]);
});

triadicBtn.addEventListener('click', () => {
    const triadic = getTriadicColors(currentColor.hsl);
    displayColorScheme([currentColor.hex, ...triadic]);
});

splitComplementaryBtn.addEventListener('click', () => {
    const splitComp = getSplitComplementaryColors(currentColor.hsl);
    displayColorScheme([currentColor.hex, ...splitComp]);
});

squareBtn.addEventListener('click', () => {
    const square = getSquareColors(currentColor.hsl);
    displayColorScheme([currentColor.hex, ...square]);
});

compoundBtn.addEventListener('click', () => {
    const compound = getCompoundColors(currentColor.hsl);
    displayColorScheme([currentColor.hex, ...compound]);
});

// Export Buttons
exportCssBtn.addEventListener('click', (e) => {
    const css = generateCssExport();
    copyToClipboard(css, 'Copied!', e.target);
});

exportScssBtn.addEventListener('click', (e) => {
    const scss = generateScssExport();
    copyToClipboard(scss, 'Copied!', e.target);
});

exportJsonBtn.addEventListener('click', (e) => {
    const json = generateJsonExport();
    copyToClipboard(json, 'Copied!', e.target);
});

// Tailwind Export Button
const exportTailwindBtn = document.getElementById('exportTailwind');
if (exportTailwindBtn) {
    exportTailwindBtn.addEventListener('click', (e) => {
        const tailwind = generateTailwindExport();
        copyToClipboard(tailwind, 'Copied!', e.target);
    });
}

// shadcn/ui Export Button
const exportShadcnBtn = document.getElementById('exportShadcn');
if (exportShadcnBtn) {
    exportShadcnBtn.addEventListener('click', (e) => {
        const shadcn = generateShadcnExport();
        copyToClipboard(shadcn, 'Copied!', e.target);
    });
}

// DaisyUI Export Button
const exportDaisyuiBtn = document.getElementById('exportDaisyui');
if (exportDaisyuiBtn) {
    exportDaisyuiBtn.addEventListener('click', (e) => {
        const daisyui = generateDaisyUIExport();
        copyToClipboard(daisyui, 'Copied!', e.target);
    });
}

// Bootstrap Export Button
const exportBootstrapBtn = document.getElementById('exportBootstrap');
if (exportBootstrapBtn) {
    exportBootstrapBtn.addEventListener('click', (e) => {
        const bootstrap = generateBootstrapExport();
        copyToClipboard(bootstrap, 'Copied!', e.target);
    });
}

// ==========================================
// GRADIENT GENERATOR
// ==========================================

// Gradient state
let gradientState = {
    type: 'linear', // 'linear' or 'radial'
    angle: 90
};

// Get gradient colors from current state
function getGradientColors() {
    // Get scheme colors if available
    const schemeColorsEl = document.getElementById('schemeColors');
    const schemeColorDivs = schemeColorsEl ? schemeColorsEl.querySelectorAll('.history-color') : [];

    if (schemeColorDivs.length >= 2) {
        // Use first and last scheme colors for gradient
        const colors = Array.from(schemeColorDivs).map(div => {
            const bgColor = div.style.backgroundColor;
            return rgbToHex(bgColor);
        });
        return colors;
    }

    // Fall back to current color and modified color
    const baseColor = currentColor.hex;
    const modifiedColor = rgbToHex(alteredColor.style.backgroundColor);

    return [baseColor, modifiedColor];
}

// Generate gradient CSS string
function generateGradientCSS() {
    const colors = getGradientColors();
    const colorStops = colors.join(', ');

    if (gradientState.type === 'linear') {
        return `linear-gradient(${gradientState.angle}deg, ${colorStops})`;
    } else {
        return `radial-gradient(circle, ${colorStops})`;
    }
}

// Update gradient preview and code display
function updateGradientPreview() {
    const gradientPreview = document.getElementById('gradientPreview');
    const gradientCode = document.getElementById('gradientCode');

    if (!gradientPreview || !gradientCode) return;

    const gradientCSS = generateGradientCSS();
    gradientPreview.style.background = gradientCSS;
    gradientCode.textContent = gradientCSS;
}

// Initialize gradient generator
function initGradientGenerator() {
    const linearBtn = document.getElementById('linearGradientBtn');
    const radialBtn = document.getElementById('radialGradientBtn');
    const angleSlider = document.getElementById('gradientAngle');
    const angleText = document.getElementById('gradientAngleText');
    const angleControl = document.getElementById('gradientAngleControl');
    const copyGradientBtn = document.getElementById('copyGradientBtn');

    if (!linearBtn || !radialBtn || !angleSlider) return;

    // Type toggle buttons
    linearBtn.addEventListener('click', () => {
        gradientState.type = 'linear';
        linearBtn.classList.add('active');
        radialBtn.classList.remove('active');
        if (angleControl) angleControl.classList.remove('hidden');
        updateGradientPreview();
    });

    radialBtn.addEventListener('click', () => {
        gradientState.type = 'radial';
        radialBtn.classList.add('active');
        linearBtn.classList.remove('active');
        if (angleControl) angleControl.classList.add('hidden');
        updateGradientPreview();
    });

    // Angle slider
    angleSlider.addEventListener('input', () => {
        gradientState.angle = parseInt(angleSlider.value);
        if (angleText) {
            angleText.textContent = `Angle: ${gradientState.angle}deg`;
        }
        updateGradientPreview();
    });

    // Copy button
    if (copyGradientBtn) {
        copyGradientBtn.addEventListener('click', (e) => {
            const gradientCSS = generateGradientCSS();
            copyToClipboard(gradientCSS, 'Copied!', e.target);
        });
    }

    // Initial preview
    updateGradientPreview();
}

// Hook gradient update to color changes
const originalUpdateOutputColor = updateOutputColor;
updateOutputColor = function() {
    originalUpdateOutputColor.apply(this, arguments);
    updateGradientPreview();
};

// Hook gradient update to scheme color changes
const originalDisplayColorScheme = displayColorScheme;
displayColorScheme = function(colors) {
    originalDisplayColorScheme.apply(this, arguments);
    updateGradientPreview();
};

// Random Palette Button
const randomPaletteBtn = document.getElementById('randomPaletteBtn');
if (randomPaletteBtn) {
    randomPaletteBtn.addEventListener('click', generateRandomPalette);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial color
    const initialColor = currentColor.hex;
    hexInput.value = initialColor;
    colorPicker.value = initialColor;

    // Initialize displays
    updateInputColor(initialColor);
    resetSliders(); // This will set default modifications
    updateOutputColor();
    updateColorHistory();

    // Initialize keyboard shortcuts
    initKeyboardShortcuts();

    // Initialize gradient generator
    initGradientGenerator();
});

// ==========================================
// FEATURE 1: Keyboard Shortcuts
// ==========================================
let isColorLocked = false;

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        const activeElement = document.activeElement;
        const isTyping = activeElement.tagName === 'INPUT' ||
                         activeElement.tagName === 'TEXTAREA' ||
                         activeElement.isContentEditable;

        if (isTyping) return;

        switch (e.key.toLowerCase()) {
            case ' ': // Space = Generate random palette
                e.preventDefault();
                generateRandomPalette();
                break;
            case 'l': // L = Lock/unlock current color
                e.preventDefault();
                toggleColorLock();
                break;
            case 'c': // C = Copy current modified color
                e.preventDefault();
                copyModifiedColor();
                break;
        }
    });
}

function toggleColorLock() {
    isColorLocked = !isColorLocked;
    const lockIndicator = document.getElementById('lockIndicator');
    if (lockIndicator) {
        lockIndicator.classList.toggle('active', isColorLocked);
        lockIndicator.textContent = isColorLocked ? 'Locked' : 'Unlocked';
    }

    // Disable/enable input controls
    hexInput.disabled = isColorLocked;
    colorPicker.disabled = isColorLocked;
    applyButton.disabled = isColorLocked;

    // Visual feedback
    if (isColorLocked) {
        showToast('Color locked');
    } else {
        showToast('Color unlocked');
    }
}

function copyModifiedColor() {
    const hex = rgbToHex(alteredColor.style.backgroundColor);
    navigator.clipboard.writeText(hex).then(() => {
        showToast(`Copied ${hex}`);
    }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = hex;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied ${hex}`);
    });
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}

// ==========================================
// FEATURE 2: WCAG Compliance Badges
// ==========================================
function getWCAGBadge(contrastRatio) {
    if (contrastRatio >= 7.0) {
        return { level: 'AAA', class: 'wcag-aaa', label: 'AAA' };
    } else if (contrastRatio >= 4.5) {
        return { level: 'AA', class: 'wcag-aa', label: 'AA' };
    } else if (contrastRatio >= 3.0) {
        return { level: 'AA Large', class: 'wcag-aa-large', label: 'AA Large' };
    } else {
        return { level: 'Fail', class: 'wcag-fail', label: 'Fail' };
    }
}

function updateWCAGBadge(contrastRatio) {
    const badge = getWCAGBadge(contrastRatio);
    let wcagBadge = document.getElementById('wcagBadge');

    if (!wcagBadge) {
        wcagBadge = document.createElement('span');
        wcagBadge.id = 'wcagBadge';
        wcagBadge.className = 'wcag-badge';
        alteredColorText.parentNode.insertBefore(wcagBadge, alteredColorText.nextSibling);
    }

    wcagBadge.className = `wcag-badge ${badge.class}`;
    wcagBadge.textContent = badge.label;
    wcagBadge.title = `WCAG ${badge.level} - Contrast ratio: ${contrastRatio.toFixed(2)}:1`;
}

// ==========================================
// FEATURE 3: Random Palette Generator
// ==========================================
function generateRandomPalette() {
    if (isColorLocked) {
        showToast('Color is locked');
        return;
    }

    // Generate random base hue
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = 50 + Math.floor(Math.random() * 40); // 50-90%
    const randomLightness = 40 + Math.floor(Math.random() * 30);  // 40-70%

    // Convert to RGB then to HEX
    const rgb = hslToRGB(randomHue, randomSaturation, randomLightness);
    const hex = convertRGBToHex(rgb.r, rgb.g, rgb.b);

    // Update the color
    hexInput.value = hex;
    colorPicker.value = hex;
    updateInputColor(hex);
    resetSliders();
    updateOutputColor();

    // Generate a 5-color palette using analogous scheme
    const palette = generateHarmoniousPalette(randomHue, randomSaturation, randomLightness);
    displayColorScheme(palette);

    showToast('Random palette generated');
}

function generateHarmoniousPalette(baseHue, baseSat, baseLight) {
    const palette = [];

    // Base color
    const baseRgb = hslToRGB(baseHue, baseSat, baseLight);
    palette.push(convertRGBToHex(baseRgb.r, baseRgb.g, baseRgb.b));

    // Analogous colors (-30, +30)
    const analog1Rgb = hslToRGB((baseHue - 30 + 360) % 360, baseSat, baseLight);
    palette.push(convertRGBToHex(analog1Rgb.r, analog1Rgb.g, analog1Rgb.b));

    const analog2Rgb = hslToRGB((baseHue + 30) % 360, baseSat, baseLight);
    palette.push(convertRGBToHex(analog2Rgb.r, analog2Rgb.g, analog2Rgb.b));

    // Lighter variation
    const lightRgb = hslToRGB(baseHue, baseSat - 10, Math.min(baseLight + 20, 90));
    palette.push(convertRGBToHex(lightRgb.r, lightRgb.g, lightRgb.b));

    // Darker variation
    const darkRgb = hslToRGB(baseHue, baseSat + 10, Math.max(baseLight - 20, 20));
    palette.push(convertRGBToHex(darkRgb.r, darkRgb.g, darkRgb.b));

    return palette;
}

// ==========================================
// FEATURE 4: Tailwind Export
// ==========================================
function generateTailwindExport() {
    const modifiedHex = rgbToHex(alteredColor.style.backgroundColor);
    const baseHsl = currentColor.hsl;

    // Generate a full color scale (50-950)
    const shades = generateColorScale(currentColor.hex);

    const colorName = getColorName(currentColor.hex).toLowerCase().replace(/\s+/g, '-');

    let tailwindConfig = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        '${colorName}': {
          50: '${shades[50]}',
          100: '${shades[100]}',
          200: '${shades[200]}',
          300: '${shades[300]}',
          400: '${shades[400]}',
          500: '${shades[500]}',
          600: '${shades[600]}',
          700: '${shades[700]}',
          800: '${shades[800]}',
          900: '${shades[900]}',
          950: '${shades[950]}',
        },
        'modified': '${modifiedHex}',
      },
    },
  },
}`;

    return tailwindConfig;
}

function generateColorScale(hex) {
    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);

    const shades = {};
    const lightnessValues = {
        50: 97,
        100: 94,
        200: 86,
        300: 77,
        400: 66,
        500: 55,
        600: 45,
        700: 37,
        800: 29,
        900: 21,
        950: 13
    };

    for (const [shade, lightness] of Object.entries(lightnessValues)) {
        // Adjust saturation slightly for better visual results
        let adjustedSat = hsl.s;
        if (lightness > 70) {
            adjustedSat = Math.max(hsl.s - 10, 0);
        } else if (lightness < 30) {
            adjustedSat = Math.min(hsl.s + 10, 100);
        }

        const shadeRgb = hslToRGB(hsl.h, adjustedSat, lightness);
        shades[shade] = convertRGBToHex(shadeRgb.r, shadeRgb.g, shadeRgb.b);
    }

    return shades;
}

// ==========================================
// FEATURE: shadcn/ui Export
// ==========================================
function generateShadcnExport() {
    const modifiedHex = rgbToHex(alteredColor.style.backgroundColor);

    // Get scheme colors from DOM if available
    const schemeColorElements = document.querySelectorAll('#schemeColors .history-color');
    const schemeColors = [];
    schemeColorElements.forEach(el => {
        const hex = el.dataset.originalHex || rgbToHex(el.style.backgroundColor);
        schemeColors.push(hex);
    });

    // Generate HSL values for shadcn format (without deg/%)
    const baseHsl = currentColor.hsl;
    const modifiedRgb = hexToRGB(modifiedHex);
    const modifiedHsl = rgbToHSL(modifiedRgb.r, modifiedRgb.g, modifiedRgb.b);

    // Use scheme colors for secondary/accent if available, otherwise derive from base
    let secondaryHex = schemeColors[1] || generateDerivedColor(currentColor.hex, 30, -10, 5);
    let accentHex = schemeColors[2] || generateDerivedColor(currentColor.hex, 60, 5, -5);

    const secondaryRgb = hexToRGB(secondaryHex);
    const secondaryHsl = rgbToHSL(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);

    const accentRgb = hexToRGB(accentHex);
    const accentHsl = rgbToHSL(accentRgb.r, accentRgb.g, accentRgb.b);

    // Generate foreground colors (contrasting)
    const primaryFgHsl = baseHsl.l > 50 ? { h: baseHsl.h, s: baseHsl.s, l: 10 } : { h: baseHsl.h, s: baseHsl.s, l: 98 };
    const secondaryFgHsl = secondaryHsl.l > 50 ? { h: secondaryHsl.h, s: secondaryHsl.s, l: 10 } : { h: secondaryHsl.h, s: secondaryHsl.s, l: 98 };
    const accentFgHsl = accentHsl.l > 50 ? { h: accentHsl.h, s: accentHsl.s, l: 10 } : { h: accentHsl.h, s: accentHsl.s, l: 98 };

    // Background and foreground
    const bgHsl = { h: baseHsl.h, s: Math.max(baseHsl.s - 30, 5), l: 98 };
    const fgHsl = { h: baseHsl.h, s: Math.max(baseHsl.s - 30, 5), l: 4 };

    // Card, popover, muted colors
    const cardHsl = { h: baseHsl.h, s: Math.max(baseHsl.s - 25, 5), l: 100 };
    const mutedHsl = { h: baseHsl.h, s: Math.max(baseHsl.s - 20, 5), l: 96 };
    const mutedFgHsl = { h: baseHsl.h, s: Math.max(baseHsl.s - 30, 5), l: 45 };

    // Border and input colors
    const borderHsl = { h: baseHsl.h, s: Math.max(baseHsl.s - 25, 5), l: 90 };
    const inputHsl = { h: baseHsl.h, s: Math.max(baseHsl.s - 25, 5), l: 90 };
    const ringHsl = { h: baseHsl.h, s: baseHsl.s, l: baseHsl.l };

    // Destructive color (red-based)
    const destructiveHsl = { h: 0, s: 84, l: 60 };
    const destructiveFgHsl = { h: 0, s: 0, l: 98 };

    return `/* shadcn/ui CSS Variables */
/* Add to your globals.css */

@layer base {
  :root {
    --background: ${bgHsl.h} ${bgHsl.s}% ${bgHsl.l}%;
    --foreground: ${fgHsl.h} ${fgHsl.s}% ${fgHsl.l}%;

    --card: ${cardHsl.h} ${cardHsl.s}% ${cardHsl.l}%;
    --card-foreground: ${fgHsl.h} ${fgHsl.s}% ${fgHsl.l}%;

    --popover: ${cardHsl.h} ${cardHsl.s}% ${cardHsl.l}%;
    --popover-foreground: ${fgHsl.h} ${fgHsl.s}% ${fgHsl.l}%;

    --primary: ${baseHsl.h} ${baseHsl.s}% ${baseHsl.l}%;
    --primary-foreground: ${primaryFgHsl.h} ${primaryFgHsl.s}% ${primaryFgHsl.l}%;

    --secondary: ${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%;
    --secondary-foreground: ${secondaryFgHsl.h} ${secondaryFgHsl.s}% ${secondaryFgHsl.l}%;

    --muted: ${mutedHsl.h} ${mutedHsl.s}% ${mutedHsl.l}%;
    --muted-foreground: ${mutedFgHsl.h} ${mutedFgHsl.s}% ${mutedFgHsl.l}%;

    --accent: ${accentHsl.h} ${accentHsl.s}% ${accentHsl.l}%;
    --accent-foreground: ${accentFgHsl.h} ${accentFgHsl.s}% ${accentFgHsl.l}%;

    --destructive: ${destructiveHsl.h} ${destructiveHsl.s}% ${destructiveHsl.l}%;
    --destructive-foreground: ${destructiveFgHsl.h} ${destructiveFgHsl.s}% ${destructiveFgHsl.l}%;

    --border: ${borderHsl.h} ${borderHsl.s}% ${borderHsl.l}%;
    --input: ${inputHsl.h} ${inputHsl.s}% ${inputHsl.l}%;
    --ring: ${ringHsl.h} ${ringHsl.s}% ${ringHsl.l}%;

    --radius: 0.5rem;
  }
}`;
}

// ==========================================
// FEATURE: DaisyUI Export
// ==========================================
function generateDaisyUIExport() {
    const modifiedHex = rgbToHex(alteredColor.style.backgroundColor);

    // Get scheme colors from DOM if available
    const schemeColorElements = document.querySelectorAll('#schemeColors .history-color');
    const schemeColors = [];
    schemeColorElements.forEach(el => {
        const hex = el.dataset.originalHex || rgbToHex(el.style.backgroundColor);
        schemeColors.push(hex);
    });

    // Primary is the current color
    const primaryHex = currentColor.hex;

    // Secondary and accent from scheme or derived
    const secondaryHex = schemeColors[1] || generateDerivedColor(currentColor.hex, 30, -10, 5);
    const accentHex = schemeColors[2] || generateDerivedColor(currentColor.hex, 180, 10, 0);

    // Neutral colors (desaturated, darker version)
    const neutralHex = generateDerivedColor(currentColor.hex, 0, -40, -30);

    // Base colors for content backgrounds
    const baseHsl = currentColor.hsl;
    const base100Hex = hslToHex(baseHsl.h, Math.max(baseHsl.s - 30, 5), 98);
    const base200Hex = hslToHex(baseHsl.h, Math.max(baseHsl.s - 30, 5), 94);
    const base300Hex = hslToHex(baseHsl.h, Math.max(baseHsl.s - 30, 5), 88);
    const baseContentHex = hslToHex(baseHsl.h, Math.max(baseHsl.s - 30, 5), 15);

    // State colors
    const infoHex = '#3ABFF8';
    const successHex = '#36D399';
    const warningHex = '#FBBD23';
    const errorHex = '#F87272';

    return `/* DaisyUI Theme Configuration */
/* Add to your tailwind.config.js */

module.exports = {
  daisyui: {
    themes: [
      {
        "color-studio": {
          "primary": "${primaryHex}",
          "primary-content": "${getContrastColor(primaryHex)}",

          "secondary": "${secondaryHex}",
          "secondary-content": "${getContrastColor(secondaryHex)}",

          "accent": "${accentHex}",
          "accent-content": "${getContrastColor(accentHex)}",

          "neutral": "${neutralHex}",
          "neutral-content": "${getContrastColor(neutralHex)}",

          "base-100": "${base100Hex}",
          "base-200": "${base200Hex}",
          "base-300": "${base300Hex}",
          "base-content": "${baseContentHex}",

          "info": "${infoHex}",
          "info-content": "${getContrastColor(infoHex)}",

          "success": "${successHex}",
          "success-content": "${getContrastColor(successHex)}",

          "warning": "${warningHex}",
          "warning-content": "${getContrastColor(warningHex)}",

          "error": "${errorHex}",
          "error-content": "${getContrastColor(errorHex)}",
        },
      },
    ],
  },
}`;
}

// ==========================================
// FEATURE: Bootstrap Export
// ==========================================
function generateBootstrapExport() {
    const modifiedHex = rgbToHex(alteredColor.style.backgroundColor);

    // Get scheme colors from DOM if available
    const schemeColorElements = document.querySelectorAll('#schemeColors .history-color');
    const schemeColors = [];
    schemeColorElements.forEach(el => {
        const hex = el.dataset.originalHex || rgbToHex(el.style.backgroundColor);
        schemeColors.push(hex);
    });

    // Primary is the current color
    const primaryHex = currentColor.hex;

    // Secondary from scheme or derived (typically a gray/neutral)
    const secondaryHex = schemeColors[1] || generateDerivedColor(currentColor.hex, 0, -50, 20);

    // Generate full shade scale for primary
    const shades = generateColorScale(primaryHex);

    // Derive other Bootstrap colors
    const baseHsl = currentColor.hsl;

    // Success (green-based, can be influenced by primary hue)
    const successHex = '#198754';

    // Info (cyan-based)
    const infoHex = '#0dcaf0';

    // Warning (yellow-based)
    const warningHex = '#ffc107';

    // Danger (red-based)
    const dangerHex = '#dc3545';

    // Light and dark
    const lightHex = hslToHex(baseHsl.h, Math.max(baseHsl.s - 30, 5), 98);
    const darkHex = hslToHex(baseHsl.h, Math.max(baseHsl.s - 30, 10), 15);

    // Body colors
    const bodyBgHex = '#ffffff';
    const bodyColorHex = '#212529';

    // Link color (often same as primary)
    const linkColorHex = primaryHex;

    return `// Bootstrap SCSS Variables
// Add to your _variables.scss or before importing Bootstrap

// Theme Colors
$primary: ${primaryHex};
$secondary: ${secondaryHex};
$success: ${successHex};
$info: ${infoHex};
$warning: ${warningHex};
$danger: ${dangerHex};
$light: ${lightHex};
$dark: ${darkHex};

// Primary color shades (for utilities)
$primary-100: ${shades[100]};
$primary-200: ${shades[200]};
$primary-300: ${shades[300]};
$primary-400: ${shades[400]};
$primary-500: ${shades[500]};
$primary-600: ${shades[600]};
$primary-700: ${shades[700]};
$primary-800: ${shades[800]};
$primary-900: ${shades[900]};

// Body
$body-bg: ${bodyBgHex};
$body-color: ${bodyColorHex};

// Links
$link-color: ${linkColorHex};
$link-hover-color: ${shades[700]};

// Border
$border-color: ${hslToHex(baseHsl.h, Math.max(baseHsl.s - 30, 5), 88)};

// Component colors (derived from primary)
$component-active-bg: $primary;
$component-active-color: ${getContrastColor(primaryHex)};

// Theme colors map (optional override)
$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  "success": $success,
  "info": $info,
  "warning": $warning,
  "danger": $danger,
  "light": $light,
  "dark": $dark
);`;
}

// Helper function to generate a derived color from base
function generateDerivedColor(hex, hueShift, satShift, lightShift) {
    const rgb = hexToRGB(hex);
    const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);

    const newH = (hsl.h + hueShift + 360) % 360;
    const newS = Math.max(0, Math.min(100, hsl.s + satShift));
    const newL = Math.max(0, Math.min(100, hsl.l + lightShift));

    const newRgb = hslToRGB(newH, newS, newL);
    return convertRGBToHex(newRgb.r, newRgb.g, newRgb.b);
}

// Helper function to convert HSL to hex
function hslToHex(h, s, l) {
    const rgb = hslToRGB(h, s, l);
    return convertRGBToHex(rgb.r, rgb.g, rgb.b);
}

// Helper function to get contrasting text color
function getContrastColor(hex) {
    const rgb = hexToRGB(hex);
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Validation Functions
function isValidHex(hex) {
    if (!hex) return false;

    // Remove # if present
    const strippedHex = hex.replace('#', '');

    // Check if it's a 3 or 6 character hex code
    return /^([0-9A-Fa-f]{3}){1,2}$/.test(strippedHex);
}

// ==========================================
// FEATURE 5: Image Color Extraction
// ==========================================
const imageDropZone = document.getElementById('imageDropZone');
const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
const imageCanvas = document.getElementById('imageCanvas');
const extractedColors = document.getElementById('extractedColors');

// Initialize Image Color Extraction
function initImageColorExtraction() {
    if (!imageDropZone || !imageInput || !uploadBtn) return;

    // Click to upload
    uploadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        imageInput.click();
    });

    imageDropZone.addEventListener('click', () => {
        imageInput.click();
    });

    // File input change
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            processImageFile(file);
        }
    });

    // Drag and drop handlers
    imageDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageDropZone.classList.add('drag-over');
    });

    imageDropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        imageDropZone.classList.remove('drag-over');
    });

    imageDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        imageDropZone.classList.remove('drag-over');

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processImageFile(file);
        } else {
            showToast('Please drop an image file');
        }
    });
}

// Process the uploaded image file
function processImageFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            extractColorsFromImage(img);
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

// Extract dominant colors from image using median-cut quantization
function extractColorsFromImage(img) {
    const canvas = imageCanvas;
    const ctx = canvas.getContext('2d');

    // Scale down large images for performance
    const maxSize = 200;
    let width = img.width;
    let height = img.height;

    if (width > maxSize || height > maxSize) {
        if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
        } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
        }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    // Sample pixels (every 4th pixel for performance)
    const sampledPixels = [];
    const sampleStep = 4;

    for (let i = 0; i < pixels.length; i += 4 * sampleStep) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];

        // Skip transparent pixels
        if (a < 128) continue;

        // Skip near-white and near-black pixels for more interesting colors
        const brightness = (r + g + b) / 3;
        if (brightness > 245 || brightness < 10) continue;

        sampledPixels.push([r, g, b]);
    }

    // Use median-cut algorithm to find dominant colors
    const dominantColors = medianCutQuantize(sampledPixels, 6);

    // Display extracted colors
    displayExtractedColors(dominantColors);

    showToast(`Extracted ${dominantColors.length} colors`);
}

// Median-cut color quantization algorithm
function medianCutQuantize(pixels, numColors) {
    if (pixels.length === 0) return [];
    if (pixels.length <= numColors) {
        return pixels.map(p => convertRGBToHex(p[0], p[1], p[2]));
    }

    // Start with all pixels in one bucket
    let buckets = [pixels];

    // Keep splitting buckets until we have enough
    while (buckets.length < numColors) {
        // Find the bucket with the largest range
        let maxRange = -1;
        let maxRangeIndex = 0;
        let maxRangeChannel = 0;

        buckets.forEach((bucket, index) => {
            if (bucket.length < 2) return;

            // Find the range for each color channel
            for (let channel = 0; channel < 3; channel++) {
                const values = bucket.map(p => p[channel]);
                const min = Math.min(...values);
                const max = Math.max(...values);
                const range = max - min;

                if (range > maxRange) {
                    maxRange = range;
                    maxRangeIndex = index;
                    maxRangeChannel = channel;
                }
            }
        });

        // If no bucket can be split, stop
        if (maxRange <= 0) break;

        // Split the bucket with the largest range
        const bucketToSplit = buckets[maxRangeIndex];
        bucketToSplit.sort((a, b) => a[maxRangeChannel] - b[maxRangeChannel]);

        const median = Math.floor(bucketToSplit.length / 2);
        const bucket1 = bucketToSplit.slice(0, median);
        const bucket2 = bucketToSplit.slice(median);

        buckets.splice(maxRangeIndex, 1, bucket1, bucket2);
    }

    // Calculate average color for each bucket
    const colors = buckets.map(bucket => {
        if (bucket.length === 0) return null;

        const avg = [0, 0, 0];
        bucket.forEach(pixel => {
            avg[0] += pixel[0];
            avg[1] += pixel[1];
            avg[2] += pixel[2];
        });

        return convertRGBToHex(
            Math.round(avg[0] / bucket.length),
            Math.round(avg[1] / bucket.length),
            Math.round(avg[2] / bucket.length)
        );
    }).filter(c => c !== null);

    // Sort colors by brightness for better visual display
    colors.sort((a, b) => {
        const rgbA = hexToRGB(a);
        const rgbB = hexToRGB(b);
        const brightnessA = (rgbA.r + rgbA.g + rgbA.b) / 3;
        const brightnessB = (rgbB.r + rgbB.g + rgbB.b) / 3;
        return brightnessB - brightnessA;
    });

    return colors;
}

// Display extracted colors as clickable swatches
function displayExtractedColors(colors) {
    extractedColors.innerHTML = '';

    colors.forEach(hex => {
        const colorSwatch = document.createElement('div');
        colorSwatch.className = 'extracted-color';
        colorSwatch.style.backgroundColor = hex;
        colorSwatch.setAttribute('data-hex', hex);
        colorSwatch.title = `Click to use ${hex}`;

        colorSwatch.addEventListener('click', () => {
            // Set as current color
            hexInput.value = hex;
            colorPicker.value = hex;
            updateInputColor(hex);
            updateOutputColor();
            addToHistory(hex);
            showToast(`Selected ${hex}`);
        });

        extractedColors.appendChild(colorSwatch);
    });
}

// ==========================================
// FEATURE 6: Real-time UI Preview
// ==========================================
const previewCard = document.getElementById('previewCard');
const previewButton = document.getElementById('previewButton');
const previewNav = document.getElementById('previewNav');

// Calculate readable text color (white or black) based on background
function getReadableTextColor(hex) {
    const rgb = hexToRGB(hex);
    const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.179 ? '#1a1a1a' : '#ffffff';
}

// Update UI preview with current colors
function updateUIPreview() {
    if (!previewCard || !previewButton || !previewNav) return;

    const originalHex = currentColor.hex;
    const modifiedHex = rgbToHex(alteredColor.style.backgroundColor) || originalHex;

    // Get readable text colors
    const originalTextColor = getReadableTextColor(originalHex);
    const modifiedTextColor = getReadableTextColor(modifiedHex);

    // Update preview card
    previewCard.style.backgroundColor = originalHex;

    // Update card header
    const previewHeader = previewCard.querySelector('.preview-header');
    if (previewHeader) {
        previewHeader.style.color = originalTextColor;
        previewHeader.style.borderBottomColor = modifiedHex;
    }

    // Update card text
    const previewText = previewCard.querySelector('.preview-text');
    if (previewText) {
        previewText.style.color = originalTextColor;
        previewText.style.opacity = '0.9';
    }

    // Update button
    previewButton.style.backgroundColor = modifiedHex;
    previewButton.style.color = modifiedTextColor;

    // Update navigation
    const navItems = previewNav.querySelectorAll('.preview-nav-item');
    navItems.forEach((item, index) => {
        if (item.classList.contains('active')) {
            item.style.backgroundColor = modifiedHex;
            item.style.color = modifiedTextColor;
        } else {
            item.style.backgroundColor = 'transparent';
            item.style.color = getComputedStyle(document.documentElement)
                .getPropertyValue('--text-secondary').trim();
        }
    });

    // Update nav background with subtle tint
    const originalRgb = hexToRGB(originalHex);
    previewNav.style.backgroundColor = `rgba(${originalRgb.r}, ${originalRgb.g}, ${originalRgb.b}, 0.1)`;
}

// Initialize image extraction feature when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize image extraction
    initImageColorExtraction();

    // Initial preview update (after a slight delay to ensure colors are set)
    setTimeout(() => {
        updateUIPreview();
    }, 100);
});

// ==========================================
// FEATURE: Colorblind Simulation
// ==========================================

// Colorblind transformation matrices
const colorblindMatrices = {
    normal: null, // No transformation
    protanopia: [
        [0.567, 0.433, 0],
        [0.558, 0.442, 0],
        [0, 0.242, 0.758]
    ],
    deuteranopia: [
        [0.625, 0.375, 0],
        [0.7, 0.3, 0],
        [0, 0.3, 0.7]
    ],
    tritanopia: [
        [0.95, 0.05, 0],
        [0, 0.433, 0.567],
        [0, 0.475, 0.525]
    ]
};

let currentColorblindMode = 'normal';

// Apply colorblind transformation to RGB values
function applyColorblindTransform(rgb, matrix) {
    if (!matrix) return rgb;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const newR = Math.round(Math.min(255, Math.max(0, (matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b) * 255)));
    const newG = Math.round(Math.min(255, Math.max(0, (matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b) * 255)));
    const newB = Math.round(Math.min(255, Math.max(0, (matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b) * 255)));

    return { r: newR, g: newG, b: newB };
}

// Get simulated hex color for colorblind mode
function getColorblindHex(hex) {
    if (currentColorblindMode === 'normal') return hex;

    const rgb = hexToRGB(hex);
    const transformedRgb = applyColorblindTransform(rgb, colorblindMatrices[currentColorblindMode]);
    return convertRGBToHex(transformedRgb.r, transformedRgb.g, transformedRgb.b);
}

// Update all color displays with colorblind simulation
function updateColorblindSimulation() {
    const matrix = colorblindMatrices[currentColorblindMode];

    // Update original color box
    if (currentColor && currentColor.hex) {
        const simHex = getColorblindHex(currentColor.hex);
        inputColor.style.backgroundColor = simHex;
    }

    // Update altered color box
    const alteredHex = rgbToHex(alteredColor.style.backgroundColor);
    if (alteredHex && alteredHex !== 'transparent') {
        const simAlteredHex = getColorblindHex(alteredHex);
        alteredColor.style.backgroundColor = simAlteredHex;
    }

    // Update scheme colors
    const schemeColorElements = document.querySelectorAll('#schemeColors .history-color');
    schemeColorElements.forEach(el => {
        const originalHex = el.dataset.originalHex || rgbToHex(el.style.backgroundColor);
        if (!el.dataset.originalHex) {
            el.dataset.originalHex = originalHex;
        }
        const simHex = getColorblindHex(originalHex);
        el.style.backgroundColor = simHex;
    });

    // Update preset colors
    const presetColors = document.querySelectorAll('.preset-color');
    presetColors.forEach(el => {
        const originalHex = el.dataset.color;
        const simHex = getColorblindHex(originalHex);
        el.style.backgroundColor = simHex;
    });

    // Update history colors
    const historyColors = document.querySelectorAll('#colorHistory .history-color');
    historyColors.forEach(el => {
        const originalHex = el.title || el.dataset.originalHex;
        if (!el.dataset.originalHex && originalHex) {
            el.dataset.originalHex = originalHex;
        }
        if (originalHex) {
            const simHex = getColorblindHex(originalHex);
            el.style.backgroundColor = simHex;
        }
    });

    // Update extracted colors
    const extractedColors = document.querySelectorAll('.extracted-color');
    extractedColors.forEach(el => {
        const originalHex = el.dataset.hex;
        if (originalHex) {
            const simHex = getColorblindHex(originalHex);
            el.style.backgroundColor = simHex;
        }
    });

    // Update UI preview
    if (typeof updateUIPreview === 'function') {
        updateUIPreviewWithColorblind();
    }
}

// Update UI preview with colorblind simulation
function updateUIPreviewWithColorblind() {
    const previewCard = document.getElementById('previewCard');
    const previewButton = document.getElementById('previewButton');
    const previewNav = document.getElementById('previewNav');

    if (!previewCard || !previewButton || !previewNav || !currentColor) return;

    // Get modified color
    const modifiedHex = rgbToHex(alteredColor.style.backgroundColor);
    const modifiedRgb = hexToRGB(modifiedHex);
    const originalRgb = hexToRGB(currentColor.hex);

    // Apply colorblind transformation
    const simModifiedRgb = applyColorblindTransform(modifiedRgb, colorblindMatrices[currentColorblindMode]);
    const simOriginalRgb = applyColorblindTransform(originalRgb, colorblindMatrices[currentColorblindMode]);

    // Update preview elements
    previewButton.style.backgroundColor = `rgb(${simModifiedRgb.r}, ${simModifiedRgb.g}, ${simModifiedRgb.b})`;

    const activeNavItem = previewNav.querySelector('.preview-nav-item.active');
    if (activeNavItem) {
        activeNavItem.style.backgroundColor = `rgb(${simModifiedRgb.r}, ${simModifiedRgb.g}, ${simModifiedRgb.b})`;
    }

    previewNav.style.backgroundColor = `rgba(${simOriginalRgb.r}, ${simOriginalRgb.g}, ${simOriginalRgb.b}, 0.1)`;
}

// Initialize colorblind buttons
function initColorblindSimulation() {
    const buttons = document.querySelectorAll('.colorblind-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set mode and update display
            currentColorblindMode = btn.dataset.mode;

            // If switching back to normal, restore original colors
            if (currentColorblindMode === 'normal') {
                // Restore original colors
                if (currentColor && currentColor.hex) {
                    inputColor.style.backgroundColor = currentColor.hex;
                }
                updateOutputColor();

                // Restore preset colors
                const presetColors = document.querySelectorAll('.preset-color');
                presetColors.forEach(el => {
                    el.style.backgroundColor = el.dataset.color;
                });

                // Restore scheme colors
                const schemeColorElements = document.querySelectorAll('#schemeColors .history-color');
                schemeColorElements.forEach(el => {
                    if (el.dataset.originalHex) {
                        el.style.backgroundColor = el.dataset.originalHex;
                    }
                });

                // Restore history colors
                const historyColors = document.querySelectorAll('#colorHistory .history-color');
                historyColors.forEach(el => {
                    if (el.dataset.originalHex) {
                        el.style.backgroundColor = el.dataset.originalHex;
                    }
                });

                // Restore extracted colors
                const extractedColors = document.querySelectorAll('.extracted-color');
                extractedColors.forEach(el => {
                    if (el.dataset.hex) {
                        el.style.backgroundColor = el.dataset.hex;
                    }
                });

                // Update UI preview
                if (typeof updateUIPreview === 'function') {
                    updateUIPreview();
                }
            } else {
                updateColorblindSimulation();
            }

            showToast(`Colorblind mode: ${btn.textContent}`);
        });
    });
}

// ==========================================
// FEATURE: URL State for Sharing
// ==========================================

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update URL with current state
function updateURL() {
    const params = new URLSearchParams();

    // Add current color (without #)
    params.set('color', currentColor.hex.replace('#', ''));

    // Add slider values
    params.set('brightness', slider.value);
    params.set('saturation', saturationSlider.value);
    params.set('hue', hueSlider.value);

    // Add toggle state (lighten/darken)
    const isDarken = toggleBtn.classList.contains('toggled');
    if (isDarken) {
        params.set('mode', 'darken');
    }

    // Update URL without reload
    history.replaceState(null, '', '?' + params.toString());
}

// Debounced version of updateURL
const debouncedUpdateURL = debounce(updateURL, 300);

// Load state from URL
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('color')) {
        const colorParam = params.get('color');
        const hex = colorParam.startsWith('#') ? colorParam : '#' + colorParam;

        if (isValidHex(hex)) {
            // Update hex input and color picker
            hexInput.value = hex;
            colorPicker.value = hex;

            // Update current color
            updateInputColor(hex);

            // Restore brightness/saturation/hue if present
            if (params.has('brightness')) {
                const brightness = parseInt(params.get('brightness'));
                if (!isNaN(brightness) && brightness >= 0 && brightness <= 100) {
                    slider.value = brightness;
                    sliderText.textContent = `Brightness: ${brightness}%`;
                }
            }

            if (params.has('saturation')) {
                const saturation = parseInt(params.get('saturation'));
                if (!isNaN(saturation) && saturation >= -100 && saturation <= 100) {
                    saturationSlider.value = saturation;
                    saturationText.textContent = `Saturation: ${saturation}%`;
                }
            }

            if (params.has('hue')) {
                const hue = parseInt(params.get('hue'));
                if (!isNaN(hue) && hue >= 0 && hue <= 360) {
                    hueSlider.value = hue;
                    hueText.textContent = `Hue: ${hue}°`;
                }
            }

            // Restore darken mode if present
            if (params.get('mode') === 'darken') {
                toggleBtn.classList.add('toggled');
                lightenText.classList.add('unselected');
                darkenText.classList.remove('unselected');
            }

            // Update output color with restored settings
            updateOutputColor();

            return true; // Indicates state was loaded from URL
        }
    }

    return false; // No state loaded from URL
}

// Copy link to clipboard
function copyShareLink() {
    // Ensure URL is up to date
    updateURL();

    const url = window.location.href;

    navigator.clipboard.writeText(url).then(() => {
        showToast('Link copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Link copied to clipboard!');
    });
}

// Hook into existing functions to update URL on changes
function hookURLUpdates() {
    // Store original updateOutputColor
    const originalUpdateOutputColor = window.updateOutputColor || updateOutputColor;

    // Create wrapped version
    const wrappedUpdateOutputColor = function() {
        originalUpdateOutputColor();
        debouncedUpdateURL();
    };

    // Replace slider event listeners to include URL update
    slider.addEventListener('input', debouncedUpdateURL);
    saturationSlider.addEventListener('input', debouncedUpdateURL);
    hueSlider.addEventListener('input', debouncedUpdateURL);

    // Hook into toggle button
    toggleBtn.addEventListener('click', () => {
        setTimeout(debouncedUpdateURL, 50);
    });

    // Hook into color picker
    colorPicker.addEventListener('input', debouncedUpdateURL);

    // Hook into apply button
    applyButton.addEventListener('click', () => {
        setTimeout(debouncedUpdateURL, 50);
    });

    // Hook into preset colors
    const presetColors = document.querySelectorAll('.preset-color');
    presetColors.forEach(preset => {
        preset.addEventListener('click', () => {
            setTimeout(debouncedUpdateURL, 50);
        });
    });
}

// Initialize Copy Link button
function initCopyLinkButton() {
    const copyLinkBtn = document.getElementById('copyLink');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyShareLink);
    }
}

// Initialize URL state features
document.addEventListener('DOMContentLoaded', () => {
    // Try to load state from URL first
    const loadedFromURL = loadFromURL();

    // Initialize colorblind simulation
    initColorblindSimulation();

    // Initialize Copy Link button
    initCopyLinkButton();

    // Hook URL updates to existing controls
    hookURLUpdates();

    // If loaded from URL, show a toast
    if (loadedFromURL) {
        showToast('Palette loaded from shared link');
    }
});

// =============================================================================
// SERVICE WORKER REGISTRATION (PWA Support)
// =============================================================================

/**
 * Register service worker for PWA functionality
 * Enables offline support and app installation
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('[PWA] Service Worker registered:', registration.scope);

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New content available, show update notification
                                    showToast('New version available! Refresh to update.');
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    console.error('[PWA] Service Worker registration failed:', error);
                });
        });

        // Handle controller change (when new service worker takes over)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('[PWA] New service worker activated');
        });
    }
}

// Initialize PWA
registerServiceWorker();

