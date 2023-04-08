const mongoose = require('mongoose');
const { REQUIRED_FIELD } = require('../config/errorMessages');

const BeatSchema = new mongoose.Schema({
  beat: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  name: {
    type: String,
    required: [true, REQUIRED_FIELD],
  },
  price: {
    type: Number,
    required: [true, REQUIRED_FIELD],
  },
  image: {
    type: String,
    default: 'https://play-lh.googleusercontent.com/ARszJA-aByYUrOMupplp_8pUUkibe3c35l2FWC0roGAbtE1j8dt6rE0ph5021vN-fw'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, REQUIRED_FIELD],
  },
  bpm: {
    type: Number,
    require: [true, REQUIRED_FIELD]
  },
  key: {
    type: String, 
    require: [true, REQUIRED_FIELD],
    enum: ['None', 'Cm', 'Dm', 'Em', 'Fm', 'Am', 'C#M', 'Gm', 'F#M', 'Bm', 'D#M', 'G#M', 'A#M', 'EbM', 'BbM', 'F#M', 'AbM', 'BbM', 'C#M', 'DbM', 'GbM', 'CbM', 'D#M', 'G#M', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',] 
  },
  scale: {
    type: String,
    require: [true, REQUIRED_FIELD],
    enum: ['minor', 'major']
  },
  genre: {
    type: String,
    require: [true, REQUIRED_FIELD],
    enum: ['Hip-Hop', 'Trap', 'RnB', 'Pop', 'Electronic', 'Reggae', 'Underground', 'Old School', 'West Coast', 'East Cost', 'Drill', 'Reaggaeton', 'Rock', 'Rock', 'Soul', 'Club', 'New Soul', 'Pop Hip-Hop', 'Afro Beat', 'Gangsta', 'Dirty South', 'Dance Hall', 'Orchestral', 'World', 'Pop-Rap', 'Hyperpop', 'Alternative', 'Alternative RnB', 'Grime', 'Alternative Hip-Hop', 'House', 'Pop-Electronic', 'Indie Rock', 'Downtempo', 'Pop-Rock', 'Lo-Fi', 'Country', 'Hip-Hop Soul', 'Beats', 'Ambient', 'Indie', 'Dance', 'New Soul', 'Funk', 'Funk Brazil', 'Boom Bap', 'Class Soul', 'Break Beat', 'K-Pop', 'Crunk', 'Instrumental Hip-Hop', 'Underground Hip-Hop', 'Drum and Bass', 'Rage Beats', 'Latin', 'Chill', 'Alternative Rock', 'Afro', 'Afro Pop', 'Freestyle Rap', 'Gangsta Rap', 'Uk Grime', 'Trip Hop', 'Old School Hip-Hop', 'Roots', 'Emo Hip-Hop', 'Lo-Fi Hip-Hop', 'Experimental Hip-Hop', 'Two Step', 'Pop Country', 'Cloud Rap', 'Dub', 'Contemporany Rb', 'Dubstep', 'Jersey Club', 'Smooth Rnb', 'California Sound', 'Synthwave', 'Jazz', 'Conscious Hip-Hop', 'Classical', 'Hardcore Hip-Hop', 'Folk', 'Classical Rock', 'Country Rock', 'Tropical House', 'Edm', 'Chillwave', 'Dance RnB', 'Pop 80s', 'Industrial', 'Metal', 'Latin Trap', 'G funk', 'Latin Pop', 'Jazz Rap', 'Electro Pop', 'Trance', 'Mumble Rap', 'Jazz Fusion', 'Samba', 'Bossa Nova', 'Cumbia']
  },
  mood: {
    type: String,
    require: [true, REQUIRED_FIELD],
    enum: ['Bouncy', 'Dark', 'Energetic', 'Confident', 'Calm', 'Sad', 'Soulful', 'Inspiring', 'Angry', 'Relaxes', 'Quirky', 'Mellow', 'Accomplished', 'Crazy', 'Happy', 'Determoned', 'Powerful', 'Epic', 'Intense', 'Loved', 'Dirty', 'Depressed', 'Lonely', 'Evil', 'Hyper', 'Peaceful', 'Anxious', 'Flirty', 'Gloomy', 'Rebellious', 'Grateful', 'Adored', 'Eccentric', 'Neutral', 'Romantic', 'Crunk', 'Enraged', 'Annoyed', 'Lazy', 'Disappointed', 'Exciting', 'Tense', 'Giddy', 'Scared', 'Dramatic', 'Frantic', 'Silly', 'Majestic']
  },
  tags: {
    type: String, 
    enum: []
  },
  instrument: {
    type: String,
    enum: ['Percussion', 'Piano', 'Bass Guitar', 'Electric Guitar', 'Acoustic Guitar', 'Strings', 'Violin', 'Brass', 'Flute', 'Cymbals', 'Organ', 'Trumpet', 'Viola', 'Cello', 'Saxophone', 'Double Bass', 'Recorder', 'Banjo', 'Tambourine', 'Triangle', 'French HOrn', 'Ukulele', 'Trombone', 'Sitar', 'Harmonica', 'Piccolo', 'Harpsichord', 'Bassoon', 'Maracas', 'Clarinet', 'Mnadolin', 'Tuba', 'Oboe', 'Lute', 'Castanets', 'Bugle', 'Gong']
  }
  
});

const Beat = mongoose.model('Beat', BeatSchema);

module.exports = Beat;