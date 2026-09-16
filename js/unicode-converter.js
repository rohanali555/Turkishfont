/**
 * Unicode Text Converter Library
 * Pure JavaScript module for transforming standard ASCII text into decorative Unicode character variations.
 */

const UnicodeConverter = (function () {
  // Mapping helpers for Unicode blocks
  function mapChars(text, normalChars, unicodeChars) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const index = normalChars.indexOf(char);
      if (index !== -1) {
        // Handle code points > 0xFFFF correctly using Array.from / codePointAt
        const uChars = Array.from(unicodeChars);
        result += uChars[index] || char;
      } else {
        result += char;
      }
    }
    return result;
  }

  const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphaLower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const fullAlphaDigits = alphaUpper + alphaLower + digits;

  // Converters definition
  const converters = [
    {
      id: 'bold-sans',
      name: 'Bold Sans',
      category: 'bold',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗')
    },
    {
      id: 'bold-serif',
      name: 'Bold Serif',
      category: 'bold',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝑨𝑑𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑵𝑺𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑴𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗')
    },
    {
      id: 'italic',
      name: 'Italic Sans',
      category: 'italic',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘵𝘒𝘓𝘔𝘕𝘖𝘐𝘑𝘲𝘴𝘵𝘶𝘞𝘷𝘸𝘹𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789')
    },
    {
      id: 'bold-italic',
      name: 'Bold Italic',
      category: 'bold',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝑨𝑑𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑵𝑺𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑴𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789')
    },
    {
      id: 'script',
      name: 'Cursive / Script',
      category: 'script',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒦ℒℳ𝒩𝒪𝒫𝒰ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789')
    },
    {
      id: 'bold-script',
      name: 'Bold Script',
      category: 'script',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟BR𝓢𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹Instant𝓻𝓼𝓽𝓾𝓿𝔀x𝔂z0123456789')
    },
    {
      id: 'double-struck',
      name: 'Double Struck (Outline)',
      category: 'fancy',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡')
    },
    {
      id: 'monospace',
      name: 'Monospace (Code)',
      category: 'fancy',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚰𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟩𝟾𝟿')
    },
    {
      id: 'circled',
      name: 'Circled Text',
      category: 'decorative',
      convert: (text) => mapChars(text, fullAlphaDigits, 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓚ⓯ⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨')
    },
    {
      id: 'circled-dark',
      name: 'Circled Inverted',
      category: 'decorative',
      convert: (text) => mapChars(text, fullAlphaDigits, '🅰🅱🅲🅑🅔EY🅶🅷🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅯VIEW🅦🅧🅨🅩🅰🅱🅲🅳🅴🅵g🅷🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅯VIEW🅦🅧🅨🅩⓿❶❷❸❹❺❻❼❽❾')
    },
    {
      id: 'small-caps',
      name: 'Small Caps',
      category: 'fancy',
      convert: (text) => {
        const lowerMap = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
        let res = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          const idx = alphaLower.indexOf(ch.toLowerCase());
          if (idx !== -1) {
            res += Array.from(lowerMap)[idx];
          } else {
            res += ch;
          }
        }
        return res;
      }
    },
    {
      id: 'fullwidth',
      name: 'Fullwidth (Vaporwave)',
      category: 'fancy',
      convert: (text) => mapChars(text, fullAlphaDigits, 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９')
    },
    {
      id: 'fraktur',
      name: 'Fraktur / Gothic',
      category: 'gothic',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝔄𝔅ℭ𝔇𝔈𝔉𝔖ℌℑ𝔍𝔏𝔍𝔑𝔏𝔐𝔑 evil𝔓𝔔ℜ𝔈𝔗5555𝔖𝔞𝔟𝔠𝔡𝔢𝔣gh𝔦amp;k󠁬𝔪n𝔬𝔭q𝔯𝔰𝔱111xyz0123456789')
    },
    {
      id: 'bold-fraktur',
      name: 'Bold Gothic (Fraktur)',
      category: 'gothic',
      convert: (text) => mapChars(text, fullAlphaDigits, '𝕬𝕱𝕮𝕯𝕰𝕱𝕘𝕴𝕵𝕶𝕷𝕸𝕹𝕯𝕺𝕰𝕱𝕘𝕴𝕵𝕶𝕷𝕸𝕹𝕯𝕺𝕱𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜efg0123456789')
    },
    {
      id: 'strikethrough',
      name: 'Strikethrough',
      category: 'decorative',
      convert: (text) => text.split('').map(c => c + '\u0336').join('')
    },
    {
      id: 'underlined',
      name: 'Underlined',
      category: 'decorative',
      convert: (text) => text.split('').map(c => c + '\u0332').join('')
    },
    {
      id: 'squared',
      name: 'Squared Boxed',
      category: 'decorative',
      convert: (text) => mapChars(text, fullAlphaDigits, '🄰🄱🄲🄳🄴🄵🄷🄷🄸🄹🄺🄻🄼1🄾🄿🅀🅁🅂🅃56789A🄰🄱🄲🄳🄴🄵🄷🄷🄸🄹🄺🄻🄼1🄾🄿🅀🅁🅂🅃56789A0123456789')
    },
    {
      id: 'upside-down',
      name: 'Upside Down (Flipped)',
      category: 'fancy',
      convert: (text) => {
        const normal = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?.";
        const flipped = "ɐqɔpǝɟɓɥıɾʞlɯudodbɹsʇnʌʍxʎzⱯᗺƆᗡƎℲ⅁HIn⋊ꞀWNOԀÒᴚS⟘∩ΛMX⅄Z0⇂ᄅƐㄣϛ9ㄥ86¡¿·";
        let res = '';
        for (let i = text.length - 1; i >= 0; i--) {
          const idx = normal.indexOf(text[i]);
          res += idx !== -1 ? Array.from(flipped)[idx] : text[i];
        }
        return res;
      }
    }
  ];

  return {
    getAllStyles: () => converters,
    convertText: (text, styleId) => {
      const conv = converters.find((c) => c.id === styleId);
      return conv ? conv.convert(text) : text;
    },
    convertAll: (text) => {
      return converters.map((conv) => ({
        id: conv.id,
        name: conv.name,
        category: conv.category,
        result: conv.convert(text)
      }));
    }
  };
})();
