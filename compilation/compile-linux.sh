echo "starting peerserver...\n"
npx peer --port 3001 &
echo "started peerserver\n"
echo "starting server on 127.0.0.1:3000...\n"
cd ..
npx nodemon server.js &
echo "started server\n"
echo "starting typescript compilation on watch mode..."
npx tsc -watch
