from PIL import Image
from urllib.request import urlopen

import boto3
from botocore.exceptions import NoCredentialsError

import os
import io

ACCESS_KEY = os.environ.get('AWS_ACCESS_KEY_ID')
SECRET_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')

import sys
print('#Hello from python#')
print('First param:'+sys.argv[1]+'#')
print('Second param:'+sys.argv[2]+'#')

print(ACCESS_KEY)

# def upload_to_aws(base_img, bucket, s3_file):
#     # Save to local file
#     in_mem_file = io.BytesIO()
#     base_img.save(in_mem_file, format=base_img.format)
#     in_mem_file.seek(0)

#     s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
#                       aws_secret_access_key=SECRET_KEY)
#     try:
#         # Ok well it doesnt error.... but shit still doesn't work??

#         # Upload image to s3
#         s3.upload_fileobj(
#             in_mem_file, # This is what i am trying to upload
#             bucket,
#             s3_file,
#         )
#         print("Upload Successful")
#         return True
#     except FileNotFoundError:
#         print("The file was not found")
#         return False
#     except NoCredentialsError:
#         print("Credentials not available")
#         return False

# # Input: url
# # Output: url
# def overlay(base_src, bucket, s3_file):
#     # replace base_src with link to opensea image src
#     base_img = Image.open(urlopen(base_src))

#     overlay_src = "https://saveas-base-resources.s3.us-west-1.amazonaws.com/saveasoverlay.png"
#     overlay_img = Image.open(urlopen(overlay_src))  # original dim: 482w 166h

#     w1, h1 = base_img.size
#     w2, h2 = overlay_img.size
#     overlay_fraction = .55
#     overlay_prop = 166/482
#     new_w2, new_h2 = round(
#         overlay_fraction * w1), round(overlay_fraction * w1 * overlay_prop)
#     overlay_img = overlay_img.resize((new_w2, new_h2))
#     overlay_margin_factor = .95

#     base_img.paste(overlay_img, (round(overlay_margin_factor * (w1 - new_w2)),
#                                  round(overlay_margin_factor * (h1 - new_h2))), mask=overlay_img)

#     # show image. instead, want to store in s3 and return link
#     # base_img.show()
#     upload_to_aws(base_img, bucket, s3_file)
