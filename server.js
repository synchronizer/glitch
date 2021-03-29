const fetch = require("node-fetch");
const { Telegraf } = require('telegraf')
const bot = new Telegraf('1718018217:AAEW0LvVpGPzfVNiD4eTwHS4GuLNat0MECY')
bot.launch()
bot.on('text',ctx => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + ctx.update.message.text.replace('/',''))
      .then(resp => resp.json())
      .then(data =>{
        console.log(data);
        data.drinks.forEach((item) => {
          var caption = '<b>' + item.strDrink + '</b>\r\n\r\n'

          for (var i = 1; i < 16; i++) {
            (item['strIngredient' + i]) && (caption += '<b>' + item['strIngredient' + i] + '</b>');
            (item['strMeasure' + i])  && (caption += '<b>: </b>' + item['strMeasure' + i] + '\r\n')
          }

          caption += '\r\n' + item.strInstructions

          ctx.replyWithPhoto(
            item.strDrinkThumb,
            {
              caption: caption,
              parse_mode: 'HTML'
            }
          )


        });

      })
})
