python3 -mvenv .e
. .e/bin/activate
pip install tinybird-cli
tb auth --interactive
cp .tinyb tinybird/.tinyb
cd tinybird && tb push --fixtures && cd ..
cp frontend/.env.example frontend/.env