from qcloud_cos import CosConfig
from qcloud_cos import CosS3Client
import sys
import logging

logging.basicConfig(level=logging.INFO, stream=sys.stdout)

secret_id = os.environ["SecretId"]
secret_key = os.environ["SecretKey"]
region = 'ap-guangzhou'
token = None
scheme = 'https'

config = CosConfig(Region=region, SecretId=secret_id, SecretKey=secret_key, Token=token, Scheme=scheme)
client = CosS3Client(config)

with open('fonts/Harmony.min.woff2', 'rb') as fp:
    response = client.put_object(
        Bucket='amiyabot-1302462817',
        Body=fp,
        Key='resource/Harmony.min.woff2',
        StorageClass='STANDARD',
        EnableMD5=False
    )
print(response['ETag'])