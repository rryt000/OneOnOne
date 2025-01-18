python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt

python3 OneOnOne/backend/OneOnOne/manage.py reset_db <<EOF
yes
EOF
python3 OneOnOne/backend/OneOnOne/manage.py makemigrations
python3 OneOnOne/backend/OneOnOne/manage.py migrate
cd ..