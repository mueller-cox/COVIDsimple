const Parser = require('rss-parser');


const parser = new Parser();


class News {
  /* Combine resonses from WHO and CDC into a single response converts from xml to json 
  calls the two rss feeds and returns only the fields we use: title->name, link->url, date converted
  to a date rather than a string and sorted in desc order, and source which we add, as well as content 
  which can serve as an abstract */
  static async retrieveNews(callback) {
    try {

      let who_feed = await parser.parseURL('https://www.who.int/rss-feeds/news-english.xml');
      let filtered_who = who_feed.items.filter(function(item) {
        return item.content.includes('COVID');
      });

      let mapped_who = filtered_who.map(function(item) {
        return {
          "url": item.link,
          "name": item.title,
          "source": "World Health Organization",
          "date": new Date(item.pubDate),
          "content": item.content
        };
      });

      let cdc_feed = await parser.parseURL('https://tools.cdc.gov/api/v2/resources/media/403372.rss');
      let mapped_cdc = cdc_feed.items.map(function(item) {
        return {
          "url": item.link,
          "name": item.title,
          "source": "Centers for Disease Control",
          "date": new Date(item.pubDate),
          "content": item.content
        };
      });

      let combined = [...mapped_who, ...mapped_cdc];
  
      let sorted = combined.sort(function(a,b){
         return b.date - a.date;
      });

      callback(sorted);
    }
    catch(err){
     console.error(err);
   }
   return
 }

}

module.exports = News;