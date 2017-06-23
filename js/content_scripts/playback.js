(function() {
  trackInfo = null;

  // TODO: ポーリングからDOM監視にする
  if ( window.location.hostname === 'www.youtube.com' ) {
    setInterval( function() {
      if ( document.getElementById('eow-title') ){
        var nextTrack = 'Now Playing - ';
        nextTrack += `${document.getElementById('eow-title').title} ♫♫ `;
      }

      if ( trackInfo != nextTrack ) {
        trackInfo = nextTrack;

        chrome.extension.sendMessage({
          type: 'nextTrack',
          value: { 'hostname': window.location.hostname, text: nextTrack }
        });
      }
    }, 2000);

  } else if ( window.location.hostname === 'soundcloud.com' ) {
    setInterval( function() {
      titleClassTags = document.getElementsByClassName( 'playbackSoundBadge__titleLink sc-truncate' );
      if ( titleClassTags.length == 1 ){
        var nextTrack = 'Now Playing - ';
        nextTrack += titleClassTags[0].title;

        artistClassTags = document.getElementsByClassName( "playbackSoundBadge__lightLink sc-link-light sc-truncate" );
        if ( artistClassTags.length == 1 &&
             titleClassTags[0].title.indexOf( artistClassTags[0].title == -1 ) ) {
          nextTrack += ` / ${ artistClassTags[0].title } ♫♫ `;
        } else {
          nextTrack += '♫♫ ';
        }
      }

      if ( trackInfo != nextTrack ) {
        trackInfo = nextTrack;

        chrome.extension.sendMessage({
          type: 'nextTrack',
          value: { 'hostname': window.location.hostname, text: nextTrack }
        });
      }
    }, 2000);

  } else if ( window.location.hostname === 'play.google.com' ) {
    setInterval( function() {
      if ( document.getElementById('currently-playing-title') ) {
        var nextTrack = 'Now Playing - ';
        nextTrack += `${document.getElementById('currently-playing-title').title} / `;
        if ( document.getElementById('player-artist') != null ) {
          nextTrack += `${document.getElementById('player-artist').innerHTML} ♫♫ `;
        } else {
          nextTrack += '♫♫ ';
        }

        if ( trackInfo != nextTrack ) {
          trackInfo = nextTrack;

          chrome.extension.sendMessage({
            type: 'nextTrack',
            value: { 'hostname': window.location.hostname, text: nextTrack }
          });
        }
      }
    }, 2000);
  }

}).call(this);
