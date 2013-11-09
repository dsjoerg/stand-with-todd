// Generated by CoffeeScript 1.6.2
(function() {
  (function($){
  $.getUrlParam = function(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
  };
})(jQuery);;
  var addSigners;

  addSigners = function(data) {
    var $img, $li, s, _i, _len, _ref, _results;

    _ref = data.signers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      s = _ref[_i];
      $li = $("<li><img src='" + s.picture_url + "' alt='" + s.name + "' title='" + s.name + "' /></li>");
      $img = $li.find('img');
      $('ul.signers').append($li);
      _results.push($img.height($img.width()));
    }
    return _results;
  };

  $(function() {
    var loading, skip;

    if ($.getUrlParam('signed')) {
      $('h1.signed').show();
      $('h1.not-signed').hide();
    }
    $.getJSON('http://stand-with-todd.herokuapp.com', function(data) {
      addSigners(data);
      return $('.signers-count').text(data.count);
    });
    skip = 10;
    loading = false;
    return $('a.load-more').click(function() {
      var _this = this;

      if (loading) {
        return;
      }
      loading = true;
      $(this).data('original-text', $(this).text());
      $(this).text('Loading...');
      return $.getJSON("http://stand-with-todd.herokuapp.com/more?skip=" + skip, function(data) {
        addSigners(data);
        skip = skip + data.signers.length;
        loading = false;
        return $(_this).text($(_this).data('original-text'));
      });
    });
  });

}).call(this);
