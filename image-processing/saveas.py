from PIL import Image
from urllib.request import urlopen


#replace base_src with link to opensea image src
base_src = "https://lh3.googleusercontent.com/KS8qEmMp5cwzUzoprvmC3dWCs020tMuoNhEVagvKqm22foJylOBzF0v4fJv5tNeTYORzWWT_RNno6MyE5mSnVUJWwiHbhRntcjU-=w600"
base_img = Image.open(urlopen(base_src))

overlay_src = "https://saveas-base-resources.s3.us-west-1.amazonaws.com/saveasoverlay.png"
overlay_img = Image.open(urlopen(overlay_src)) #original dim: 482w 166h

w1, h1 = base_img.size
w2, h2 = overlay_img.size
overlay_fraction = .55
overlay_prop = 166/482
new_w2, new_h2 = round(overlay_fraction * w1), round(overlay_fraction * w1 * overlay_prop)
overlay_img = overlay_img.resize((new_w2, new_h2))
overlay_margin_factor = .95


base_img.paste(overlay_img, (round(overlay_margin_factor * (w1 - new_w2)), round(overlay_margin_factor * (h1 - new_h2))), mask = overlay_img)


#show image. instead, want to store in s3 and return link
base_img.show()
