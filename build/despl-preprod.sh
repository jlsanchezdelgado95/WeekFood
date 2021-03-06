#!/bin/bash
set -e
echo "Copiando dist/ a ../../www"
rm ../../www/* -rf && 
cp ./build/config/htaccess ../../www/.htaccess &&
cp ./dist/* ../../www -r &&
rm ../../www/configs/prod_config.php &&
mv ../../www/configs/preprod_config.php ../../www/configs/config.php
sudo chown www-data:www-data ../../www/* -R
echo "Copiado correctamente."