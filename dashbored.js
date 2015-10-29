
    $(document).ready(function () {

        var loading = $("#myModal");

        var cleanBox = function () {
            $('#result_box table tbody').empty();
        };

        function parseRSS(url) {
            return $.ajax({
                url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=20&callback=?&q=' + encodeURIComponent(url),
                dataType: 'json',
            });
        }

        var getURL = function (url) {
            return $.ajax({
                type: "GET",
                dataType: "JSON",
                url: url,
                cache: true
            });
        };

        var updateProgressBar = function (i) {
          $("#modal_progress_bar").attr("aria-valuenow",i*5);
          $("#modal_progress_bar").css("width", i*5+"%");
        };


        $('#hackerNews').click(function () {
            $("#feed_name").text("Hacker News");
            $(loading).modal('show');
            $(loading).modal({ keyboard: false });
            cleanBox();
            var urlTop = $("#hackerNews a").attr('urlTop'),
                    urlDetail = $("#hackerNews a").attr('urlDetail'),
                    nbStories = parseInt($("#hackerNews a").attr('nbStories'), 10),
                    topstories,
                    storieDetails;

            var getTopStories = (function () {
                getURL(urlTop).success(function (data) {
                    topstories = data;
                    for (var i = 0; i < nbStories; i++) {
                        getStoriesDetails(i);
                    }
                });
            })();

            var getStoriesDetails = function (i) {
                var url = urlDetail.concat(topstories[i]).concat(".json");
                getURL(url).success(function (data) {
                    storieDetails = data;
                    if (i === nbStories - 1) {
                        var callback = function () {
                          $(loading).modal('hide').delay(100);
                        };
                    } else {
                      updateProgressBar(i+1);
                    }
                    showTopStories(storieDetails.url, storieDetails.title, storieDetails.by, "#result_box table tbody", i, callback);
                });
            };
            updateProgressBar(0);
        });

        $('#dzoneJava').click(function(){
            $("#feed_name").text("Dzone Java");
            $(loading).modal('show');
            cleanBox();
            var url=$('#dzoneJava a').attr('url');

            var getTopStories = (function () {
                parseRSS(url).success(function (data) {
                    topstories = data.responseData.feed.entries;

                    for (var i = 0; i < topstories.length; i++) {
                        if (i === topstories.length - 1) {
                            var callback = function () {
                              $(loading).modal('hide').delay(100);
                            };
                        } else {
                          updateProgressBar(i+1);
                        }
                        showTopStories(topstories[i].link, topstories[i].title, topstories[i].author, "#result_box table tbody", i, callback);
                    }
                });
            })();

            updateProgressBar(0);
        });

        $('#dzoneWebDev').click(function(){
            $("#feed_name").text("Dzone WebDev");
            $(loading).modal('show');
            cleanBox();
            var url=$('#dzoneWebDev a').attr('url');

            var getTopStories = (function () {
                parseRSS(url).success(function (data) {
                topstories = data.responseData.feed.entries;

                    for (var i = 0; i < topstories.length; i++) {
                      if (i === topstories.length - 1) {
                          var callback = function () {
                            $(loading).modal('hide').delay(100);
                          };
                      } else {
                        updateProgressBar(i+1);
                      }

                        showTopStories(topstories[i].link, topstories[i].title, topstories[i].author, "#result_box table tbody", i, callback);
                    }
                });
            })();
          updateProgressBar(0);
        });

        $('#stackOverflow').click(function () {
            $("#feed_name").text("Stack Overflow");
            $(loading).modal('show');
            cleanBox();

            var nbquestions = parseInt($("#stackOverflow a").attr('nbquestions'), 10),
                    urlTop = $("#stackOverflow a").attr('urlTop'),
                    url = urlTop.concat("&pagesize=").concat(nbquestions),
                    topstories;

            var getTopStories = (function () {
                getURL(url).success(function (data) {
                    topstories = data;

                    for (var i = 0; i < topstories.items.length; i++) {
                        if (i === topstories.items.length - 1) {
                            var callback = function () {
                              $(loading).modal('hide').delay(100);
                            };
                        } else {
                          updateProgressBar(i+1);
                        }
                        showTopStories(topstories.items[i].link, topstories.items[i].title, topstories.items[i].owner.display_name, "#result_box table tbody", i, callback);
                    }
                });
            })();
          updateProgressBar(0);
        });


        $('#redditProgramming').click(function(){
          $("#feed_name").text("Reddit programming");
          $(loading).modal('show');
          cleanBox();

            var url=$('#redditProgramming a').attr('url');

            var getTopStories = (function () {
                parseRSS(url).success(function (data) {
                    topstories = data.responseData.feed.entries;

                    for (var i = 0; i < topstories.length; i++) {
                        if (i === topstories.length - 1) {
                            var callback = function () {
                              $(loading).modal('hide').delay(100);
                            };
                        } else {
                          updateProgressBar(i+1);
                        }
                        showTopStories(topstories[i].link, topstories[i].title, topstories[i].author, "#result_box table tbody", i, callback);
                    }
                });
            })();
          updateProgressBar(0);
        });

        var showTopStories = function (storieUrl, storieTitle, storieAuthor, box, idStorie, callback) {
            var template = "<tr>"+
            "<td>#"+(idStorie+1)+"</td>"+
            "<td><a target='_blank' href='"+storieUrl+"'>"+storieTitle+"</a></td>"+
            "<td>"+storieAuthor+"</td>"+
            "</tr>";

            console.log(box);

            $(box).append($(template)
                    .hide()
                    .delay(30 * idStorie)
                    .fadeIn(100 * idStorie, function () {
                        if (typeof callback !== 'undefined') {
                          $("#modal_progress_bar").attr("aria-valuenow",100);
                          $("#modal_progress_bar").css("width", "100%").delay(200);
                            callback();
                        }
                    }));
        }
    });
