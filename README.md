# core-app

![PREVIEW IMAGE](https://raw.githubusercontent.com/natael/core-app/master/preview.png)

core is a mini-player based on electron which controls the Spotify Client (Spotify.app).

## the idea

While working I don't have time to create playlists or search pre-created playlists,
so I'll listen to a online radio stream where the songs are curated in some way, which is really nice. 

BUT ads, talking and bad quality lead me to the question:
why not play the current song, which is played on the station, on Spotify with nice quality?

so core was born.

the first prototype was a terminal based app, but why not make a mini player with some nice features and learn react and redux? :)

[Video Preview](https://vimeo.com/141940841)


## prerequisite

- Spotify Premium


## setup

download the release at [Releases](https://github.com/natael/core-app/releases) (OSX only atm.) and start it while Spotify is running. You should see the current track and a list of radio channels.

binary release consists of:
[https://github.com/natael/core](https://github.com/natael/core)
[https://github.com/natael/core-radio](https://github.com/natael/core-radio)
[https://github.com/natael/core-spotify-webhelper](https://github.com/natael/core-spotify-webhelper)
[https://github.com/atom/electron](https://github.com/atom/electron)

## hint

double-click the cover or track info and core will minimize to the bottom right corner of the current screen the app is opened currently.


## todo

- add multiple layers of fallback: if a track is not found, try to find the track on soundcloud or youtube or try to find a similar track based on the last 3 played tracks on the channel (via echonest) or switch to a alternative radio channel. 


## country setting

the setting is currently based on DE (germany), which is hardcoded in the client atm.
I'll change that in the future. sorry :)

all Spotify Web API queries are appended with &country=DE to prevent "Song is not available in your Country", but that does not work all the time. (maybe Spotify has a Cache and the Song has been removed)

but the app should work anyway.


## contributions

- the icons are provided from the spoticon-font from Spotify itself
- [malte-wessel](https://github.com/malte-wessel) for the base redux boilerplate and helping to understand redux
- [electron](https://github.com/atom/electron)