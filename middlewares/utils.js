/*******************************************************************************
utils

Various helper functions
********************************************************************************/
var tagPersistentID = "http://waisda.beeldengeluid.nl/tag/";
var notFountDefaultThumbnail = "/static/img/BenG_testbeeld.jpg";

module.exports = {
  normalizeEntry: function (entry) {
    // transform to lowercase
    entry = entry.toLowerCase();

    // remove all characters that are not digits and alpha characters".
    entry = entry.replace(/[^0-9a-z]/g, '');

    return entry;
  },

  // Desired format for the ISO 8601 date: YYYY-MM-DDThh:mm:ss
  checkISO_8601_date: function (datetime) {
    var ISO_8601_FULL = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

    return ISO_8601_FULL.test(datetime);
  },

  getThumbnail: function (imageUrl) {
    return (imageUrl === notFountDefaultThumbnail ? null : imageUrl);
  },

  writeElement: function (element) {
    var item = {};

    item.video_id = element.video_id;
    item.title = element.title;
    item.duration = element.duration;
    item.imageUrl = this.getThumbnail(element.imageUrl);
    item.sourceUrl = element.sourceUrl;
    item.attribute = element.attribute;
    item.value = element.value;
    item.tags = [];
    item.tags.push({"tag_pid": `${tagPersistentID}${element.id}`, "tag": `${element.tag}`, "creationDate": `${element.creationDate}`});

    return item;
  },

  writeResponse: function (data) {
    var items = [];
    var previousVideoId = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i].video_id != previousVideoId) {
        var current = this.writeElement(data[i]);
        items.push(current);
        previousVideoId = current.video_id;
      } else {
        items[items.length-1].tags.push({"tag_pid": `${tagPersistentID}${data[i].id}`, "tag": `${data[i].tag}`, "creationDate": `${data[i].creationDate}`});
      }
    }

    return items;
  }
};
