const Parser = require('rss-parser');
const parser = new Parser();

class News {
  static async retrieveWhoNews(callback) {

    try{
      let feed = await parser.parseURL('https://www.who.int/rss-feeds/news-english.xml');
      console.log(feed.title);
      let filtered_items = feed.items.filter(function(item) {
        return item.content.includes('COVID');
      });
      callback(filtered_items);
    }
    catch (error){
       console.error(error);
    }
    return 
  }
  static async retrieveCdcNews(callback) {
    try{
      let feed = await parser.parseURL('https://tools.cdc.gov/api/v2/resources/media/403372.rss');
      console.log(feed.title);
      callback(feed.items);
    }
    catch (error){
       console.error(error);
    }
    return 
  }

}

module.exports = News;