from spotify_client import *

client_id = 'xxxxxxxx'
client_secret = 'xxxxxxxx'

spotify = SpotifyAPI(client_id, client_secret)
spotify.search({"track": "Time"}, search_type="track")
