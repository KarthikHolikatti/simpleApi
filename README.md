# simpleApi
This repo is for creating a sample API 


curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"karthik"}' \
  http://localhost:3000/login

curl --header "Content-Type: application/json" --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImthcnRoaWsiLCJpYXQiOjE3NDA3NTQzNTIsImV4cCI6MTc0MDc1Nzk1Mn0.XcMpAudol221jC7LGz28AhJBO6UGdED71WyfS3zEr3E" --request GET http://localhost:3000/hello


export SECRET_KEY=my-secret-key
serverless deploy

