# Outline

Main
- just a container

Muse
- manage global voice / playback

Piano
- controls: sustain, start octave

  PianoKey
    - take pitch name
    - note: play /record

  PianoOctave
    - construct 12 key segments

Song
- show controls: autoplay, rest, load/save/clear

  SongNote
  - represent note
  - play and option edit
  - ? interpret intervals (to show by toggle?)



# Piano
choose scale from menu (to highlight keys in that scale)
show intervals
set tonic note
for now make it reflect shape of keys on keyboard
will abstract the model



# RANDOM

toggle for showing pitch name or interval relative to global tonic

dropdown to choose global mode
  --- keys to respond by tinting notes of that mode


dropdown to pick a tonic, scale

last played note sets insertion index

Work out note abstraction
  i want to be free of the Tone API
  but i don't want to reimplment everything.
  can i use `extend`???


unison doesn’t get a song
minor 2nd, very dangerous
Major 2nd to you
minor 3rd, lullaby
Major 3rd, a female deer
Perfect 4th, this is taps
Tritone - Ah
Perfect 5th, you little star
minor 6th begins to tell a story
Major 6th, the time has come
minor 7th, takes it all
Octave over the rainbow
[Why then, oh why, can’t I?}
