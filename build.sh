docker build -t my_zhi_hu_web .
docker create --name my_zhi_hu_web -p 80:80 my_zhi_hu_web
docker start --restart=always my_zhi_hu_web
