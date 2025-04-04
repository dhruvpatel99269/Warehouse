import os
from dotenv import load_dotenv
load_dotenv()
print(os.getenv("SENDGRID_API_KEY"))  # Should NOT be None
