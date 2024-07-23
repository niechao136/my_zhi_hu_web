docker stop my_zhi_hu_web || true
docker rm my_zhi_hu_web || true
docker rmi my_zhi_hu_web || true
docker build -t my_zhi_hu_web .
docker create --name my_zhi_hu_web -p 80:80 -p 443:443 my_zhi_hu_web
docker start my_zhi_hu_web
