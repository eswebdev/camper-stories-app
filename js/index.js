$(function() {

  function getCampNews() {
    $.getJSON("http://www.freecodecamp.com/news/hot") //http://www.freecodecamp.com/stories/hotStories
      .done(function(data) {   
        data.forEach(function(story) {
          var link = story.link,
            headline = story.headline,
            //fix headline to use as url for disscussion link
            headlineOkay = headline.replace(/[^a-zA-Z0-9-_\s]/g, ''),
            headlineOkay = headlineOkay.replace(/[-:,|]/g, ''),
            headlineOkay = headlineOkay.replace(/\s{2,3}/g, " "),
            headlineUrlFormat = headlineOkay.split(" ").join("-").toLowerCase(),

            numUpVotes = story.rank,
            storyImage = story.image,
            authorPicture = story.author.picture;
            

          function isImageGood(img) {
            var image = new Image();
            image.src = img;
            if (img === "") {
              return false;
            }
          }

          if (isImageGood(storyImage) === false) {
            storyImage = authorPicture;
          }

          var entryDiv = "<a href='" + link + "'><div class='article'>";

          var articleImage = "<div class='article-image-div'><img src=" + storyImage + " alt='story image' class='img-responsive article-image'></div>";

          var articleHeadline = "<div class='article-headline'><p>" + headline + "</p></div></a>";

          var articleFooter = "<div class='article-footer'><p class='upvotes pull-right'><a title='click to upvote' href='http://www.freecodecamp.com/news/" + headlineUrlFormat + "'><i class='fa fa-thumbs-o-up'></i> " + numUpVotes + "</a></p></div></div>";

          if (isImageGood(storyImage) === false) {
            $('.container').append(entryDiv + articleHeadline + articleFooter);
          } else {
            $('.container').append(entryDiv + articleImage + articleHeadline + articleFooter);
          }

        });
      }).fail(function(err) {
        console.log(err);
      });
  }

  getCampNews();

});