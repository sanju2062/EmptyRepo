# Jobseeker Signup Form Api

### Quick Start

```bash

git clone https://github.com/sanju2062/Resume-Upload-Api.git

# Install dependencies
npm install

nodemon start

```

# To Use BackEnd

To use backend of this application. You have to create a default.json file in the "backend/config" directory and you have to add your mongodb atlas URI in the this file for example {"mongoURI":"mongodb+srv://<YOUR_MONGO_USERNAME_PASWORD_COLLECTION_NAME>?retryWrites=true&w=majority"}.


# End points

# /api/savedata POST
To save data

use Form to Send data and select a pdf
{
"fullname": "xxxx",
  "age": "xxxx",
  "higher_qualification": "xxxx",
  "email": "xxxx",
  "descripition": "xxxx"
}

{
headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": true,
          },
        }
}

# /api/getdata GET
To get all data

# /api/getresume/<resume_id> GET
To get a resume
