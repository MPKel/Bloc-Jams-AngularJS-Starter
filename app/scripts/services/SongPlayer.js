(function() {
  function SongPlayer($rootScope, Fixtures) {

    /**
    * @desc Object to be returned by this service
    * @type {Object}
    */
    var SongPlayer = {};

    /**
    * @desc Album object to be parsed by this service
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();


 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
    var currentBuzzObject = null;





    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {
      if(currentBuzzObject){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function stopSong
    * @desc Stops currently playing song
    * @param {Object} song
    */
    var stopSong = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null

    };


    /**
    * @function playSong
    * @desc Plays current Buzz object and sets the 'playing' property of song to true
    * @param {Object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function getSongIndex
    * @desc Returns index number of the song within the current album object
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };


    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;


    /**
    * @function this.play
    * @desc calls setSong() and playSong() if SongPlayer.currentSong is not the one clicked. Otherwise this will play the SongPlayer.currentSong or pause if it is already playing
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song){
      setSong(song);

      playSong(song);

    } else if(SongPlayer.currentSong === song) {
      if(currentBuzzObject && currentBuzzObject.isPaused()) {
        playSong(song);
      }
      }

    };



    /**
    * @function this.pause
    * @desc pauses currently playing song and sets 'playing' attribute of song to false
    * @param {Object} song
    */
    SongPlayer.pause = function (song) {
      song = song || SongPlayer.currentSong;
      stopSong();
    };


    /**
    * @function this.previous
    * @desc decrements the current song index by one to select the previous song. If previous song Index is less than 0
    * stop playing and set first song to currently playing, else move to previous song and play it.
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };


    /**
    * @function this.next
    * @desc increments the current song index by one to select the next song. If at end of songlist, stop playing, else play next song.
    */

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;


      if(currentSongIndex > currentAlbum.songs.length -1) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };



    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
          currentBuzzObject.setTime(time);
        }
      };





    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
  }) ();
