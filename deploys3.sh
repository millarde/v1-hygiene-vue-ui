aws s3 sync . s3://eap-v1-hygiene-web --dryrun --exclude ".*" --exclude "*.txt" --exclude "README.md" --exclude "*.sh" --exclude "Dockerfile"  --acl public-read